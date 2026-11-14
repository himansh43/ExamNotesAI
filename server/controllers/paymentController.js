import "dotenv/config";
import Stripe from "stripe";
import userModel from "../models/user.model.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const stripePayment = async (req, res) => {
  try {
    const userId = req.userId;
    const { planName } = req.body;
    const plans = {
      Starter: {
        name: "Starter",
        price: 100,
        credits: 100,
      },
      Popular: {
        name: "Popular",
        price: 300,
        credits: 300,
      },
      Pro: {
        name: "Pro Learner",
        price: 500,
        credits: 500,
      },
    };

    const plan = plans[planName];
    if (!plan) {
      return res.status(400).json({
        message: "Invalid plan selected",
      });
    }
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: `${plan.name} Credits`,
              description: `${plan.credits} AI study credits`,
            },
            unit_amount: plan.price * 100,
          },
          quantity: 1,
        },
      ],
      client_reference_id: user._id.toString(),

      metadata: {
        userId: user._id.toString(),
        planName,
        credits: String(plan.credits),
      },

      success_url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,

      cancel_url: `${process.env.CLIENT_URL}/payment-failed`,
    });

    res.status(200).json({
      url: session.url,
    });
  } catch (error) {
    console.error("Checkout error:", error);

    res.status(500).json({
      message: "Unable to create checkout session",
    });
  }
};
 
const stripeWebHook = async (req, res) => {
  const signature = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (error) {
    console.error("Webhook signature error:", error.message);
    return res.status(400).send("Webhook error");
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const { userId, credits } = session.metadata;

      const creditAmount = Number(credits);

      if (!userId || !Number.isFinite(creditAmount) || creditAmount <= 0) {
        return res.status(400).send("Invalid session metadata");
      }

      await userModel.findByIdAndUpdate(
        userId,
        {
          $inc: { credits: creditAmount },
          $set: { isCreditAvailable: true },
        },
        { new: true },
      );
    }

    return res.json({ received: true });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return res.status(500).json({
      message: "Webhook processing failed",
    });
  }
};

export { stripePayment, stripeWebHook };
