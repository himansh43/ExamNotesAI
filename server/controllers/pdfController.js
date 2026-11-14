import PDFDocument from "pdfkit";
import { fileURLToPath } from "url";

const fontRegular = fileURLToPath(
  new URL("../node_modules/dejavu-fonts-ttf/ttf/DejaVuSans.ttf", import.meta.url)
);
const fontBold = fileURLToPath(
  new URL(
    "../node_modules/dejavu-fonts-ttf/ttf/DejaVuSans-Bold.ttf",
    import.meta.url
  )
);

const formatStars = (str) => {
  if (!str) return "";
  return String(str).replace(/⭐/g, "★");
};

const pdfController = async (req, res) => {
  try {
    const { result } = req.body;
    if (!result) {
      return res.status(400).json({ error: "No content provided" });
    }

    const doc = new PDFDocument({
      size: "A4",
      margin: 50,
    });

    doc.registerFont("Regular", fontRegular);
    doc.registerFont("Bold", fontBold);
    doc.font("Regular");

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="ExamNotesAI.pdf"'
    );

    doc.pipe(res);

    // Title
    doc
      .font("Bold")
      .fontSize(24)
      .fillColor("#1d4ed8")
      .text("ExamNotesAI", { align: "center" });
    doc.moveDown();

    // Importance
    if (result.importance) {
      doc
        .font("Bold")
        .fontSize(14)
        .fillColor("black")
        .text("Importance: ", { continued: true })
        .fillColor("#eab308")
        .text(formatStars(result.importance));
      doc.moveDown();
    }

    // Sub-Topics
    if (result.subtopics && Object.keys(result.subtopics).length > 0) {
      doc.font("Bold").fontSize(16).fillColor("#1d4ed8").text("Sub Topics");
      doc.moveDown(0.5);

      Object.entries(result.subtopics).forEach(([star, topics]) => {
        doc.moveDown(0.4);
        doc
          .font("Bold")
          .fontSize(13)
          .fillColor("#eab308")
          .text(`${formatStars(star)} `, { continued: true })
          .fillColor("black")
          .text("Priority Topics:");

        doc.font("Regular");
        topics.forEach((t) => {
          doc.fontSize(11).fillColor("#333333").text(`  • ${t}`);
        });
      });
      doc.moveDown();
    }

    // Notes
    if (result.notes) {
      doc.font("Bold").fontSize(16).fillColor("#1d4ed8").text("Notes");
      doc.moveDown(0.5);

      const cleanNotes = result.notes
        .replace(/[#*]/g, "")
        .replace(/\$\^{235}U\$/g, "U-235")
        .replace(/\$D_2O\$/g, "D2O")
        .replace(/\| :--- \| :--- \| :--- \|/g, "");

      doc.font("Regular").fontSize(11).fillColor("black").text(cleanNotes, {
        lineGap: 4,
      });
      doc.moveDown();
    }

    // Important Questions
    if (result.questions) {
      doc
        .font("Bold")
        .fontSize(16)
        .fillColor("#1d4ed8")
        .text("Important Questions");
      doc.moveDown(0.5);

      if (result.questions.short?.length > 0) {
        doc.font("Bold").fontSize(14).fillColor("black").text("Short Questions");
        doc.moveDown(0.4);

        result.questions.short.forEach((q, idx) => {
          doc
            .font("Bold")
            .fontSize(11)
            .fillColor("black")
            .text(`Q${idx + 1}. ${q.question} (${q.marks} Marks)`);
          doc
            .font("Regular")
            .fontSize(11)
            .fillColor("#333333")
            .text(`Ans: ${q.answer}`);
          doc.moveDown(0.6);
        });
      }

      if (result.questions.long?.length > 0) {
        doc.moveDown(0.5);
        doc.font("Bold").fontSize(14).fillColor("black").text("Long Questions");
        doc.moveDown(0.4);

        result.questions.long.forEach((q, idx) => {
          doc
            .font("Bold")
            .fontSize(11)
            .fillColor("black")
            .text(`Q${idx + 1}. ${q.question} (${q.marks} Marks)`);
          doc
            .font("Regular")
            .fontSize(11)
            .fillColor("#333333")
            .text(`Ans: ${q.answer}`);
          doc.moveDown(0.6);
        });
      }

      if (result.questions.diagram) {
        doc.moveDown(0.5);
        doc
          .font("Bold")
          .fontSize(14)
          .fillColor("black")
          .text("Diagram Question");
        doc.moveDown(0.3);
        doc
          .font("Regular")
          .fontSize(11)
          .fillColor("#333333")
          .text(result.questions.diagram);
        doc.moveDown();
      }
    }

    // Revision Points
    if (result.revisionPoints?.length > 0) {
      doc
        .font("Bold")
        .fontSize(16)
        .fillColor("#1d4ed8")
        .text("Revision Points");
      doc.moveDown(0.5);

      doc.font("Regular");
      result.revisionPoints.forEach((p) => {
        doc.fontSize(11).fillColor("black").text(`• ${p}`);
        doc.moveDown(0.3);
      });
    }

    // Footer Date
    doc.moveDown();
    doc
      .font("Regular")
      .fontSize(10)
      .fillColor("gray")
      .text(`Generated on: ${new Date().toLocaleDateString()}`, {
        align: "right",
      });

    doc.end();
  } catch (error) {
    console.error("PDF Generation Error:", error);
    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        message: "Failed to generate PDF",
      });
    }
  }
};

export default pdfController;
