import { GoogleGenAI } from "@google/genai";
import userModel from "../models/user.model.js";
import notesModel from "../models/notes.model.js";

const googleGenerativeAIResult = async (req, res) => {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  try {
    const {
      topic,
      classLevel,
      examType,
      revisionMode,
      includeCharts,
      includeDiagrams,
    } = req.body;
    if (!topic || !classLevel || !examType) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    const userId = req.userId;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "Unauthorized", success: false });
    }
    if (user.credits < 10) {
      user.isCreditAvailable = false;
      await user.save();
      return res.status(403).json({
        message: "insufficient credits",
      });
    }

    const prompt = `
You are an expert academic teacher, subject matter specialist,
exam paper setter, educational researcher, and professional
study material creator.

Your task is to generate high-quality, comprehensive,
accurate, and examination-oriented study material.

Your content must help students:
- Understand concepts clearly.
- Prepare effectively for examinations.
- Identify important topics.
- Revise important concepts quickly.
- Practice examination-style questions.

==================================================
1. STUDENT INFORMATION
==================================================

Main Topic: ${topic}
Class / Education Level: ${classLevel}
Examination Type: ${examType}

Revision Mode: ${revisionMode ? "Enabled" : "Disabled"}
Include Charts: ${includeCharts ? "Yes" : "No"}
Include Diagrams: ${includeDiagrams ? "Yes" : "No"}

==================================================
2. STRICT OUTPUT REQUIREMENTS
==================================================

CRITICAL: YOUR ENTIRE RESPONSE MUST BE VALID JSON.

The response will be parsed directly using JSON.parse().
Any invalid JSON will cause application failure.

Follow these rules strictly:

- Return JSON only.
- Do not use Markdown code fences around JSON.
- Use double quotes for all JSON keys and string values.
- Never use single quotes for JSON strings.
- Escape all double quotes inside string values.
- Escape newline characters inside strings using \\n.
- Do not include comments.
- Do not include trailing commas.
- Do not include text before or after the JSON object.
- Use valid JSON arrays, objects, strings, numbers and booleans.
- Never use undefined, NaN or Infinity.
- All required keys must be present.
- Do not add extra keys.
- Ensure the final response can be parsed using JSON.parse().

IMPORTANT:
The notes field must contain Markdown-formatted text
encoded as a valid JSON string.

==================================================
3. CONTENT QUALITY RULES
==================================================

Generate content appropriate to the specified class,
education level, and examination.

Follow these rules:

- Use clear, simple and academically accurate language.
- Avoid unnecessary explanations and storytelling.
- Use correct subject-specific terminology.
- Explain difficult concepts in student-friendly language.
- Include relevant examples wherever useful.
- Avoid repeating the same information.
- Focus on concepts relevant to the specified examination.
- Do not invent facts, formulas, statistics or exam weightage.
- Do not include irrelevant advanced concepts.
- Maintain logical progression from basic to advanced concepts.

Do not generate generic content that could apply
to every topic.

Every section must be relevant to the given topic.

==================================================
4. SUBTOPIC CLASSIFICATION
==================================================

Divide the topic into exactly THREE importance categories.

Use these categories:

"⭐":
Very Important Topics
- Fundamental concepts.
- Core definitions and principles.
- Important formulas and processes.
- Concepts essential for understanding the chapter.

"⭐⭐":
Important Topics
- Supporting concepts.
- Applications and examples.
- Important comparisons.
- Secondary concepts that improve understanding.

"⭐⭐⭐":
Frequently Asked Topics
- Common examination questions.
- Repeatedly tested definitions.
- Important diagrams and formulas.
- Common conceptual and practical questions.

RULES:

- All three categories must be present.
- Each category must contain relevant subtopics.
- Avoid unnecessary duplication between categories.
- Use short, meaningful subtopic names.
- Prioritize based on established subject knowledge
  and examination patterns.
- Never claim exact exam frequency without reliable evidence.

==================================================
5. NOTES GENERATION RULES
==================================================

The notes field must contain properly structured Markdown.

Use:
- # for the main heading.
- ## for section headings.
- ### for subheadings.
- Bullet points for important information.
- Numbered lists for sequential processes.
- Bold text for important keywords.
- Markdown tables for comparisons when useful.
- LaTeX notation for mathematical formulas where appropriate.

Do not use emojis in notes.

A. WHEN REVISION MODE IS DISABLED:

Generate detailed but concise examination-oriented notes.

For every major subtopic, include relevant elements such as:

1. Definition.
2. Explanation.
3. Important characteristics.
4. Examples.
5. Applications.
6. Formulas or equations, if applicable.
7. Advantages and disadvantages, if relevant.

Additional rules:

- Explain important concepts in sufficient detail.
- Keep paragraphs approximately 3-5 lines.
- Use bullet points for important facts.
- Include comparisons and tables where useful.
- Explain processes step by step.
- Include common misconceptions where relevant.
- Avoid unnecessary theory and repetition.

Recommended notes structure:

# Main Topic

## 1. Introduction

## 2. Complete Subtopic Overview

## 3. Detailed Explanation

## 4. Important Definitions

## 5. Formulas and Equations

## 6. Differences and Comparisons

## 7. Applications and Examples

## 8. Important Examination Points

## 9. Quick Revision Summary

Only include sections relevant to the topic.
Do not force irrelevant sections.

B. WHEN REVISION MODE IS ENABLED:

Generate concise last-minute revision notes.

STRICT RULES:

- Only bullet points.
- No paragraphs.
- No storytelling.
- No lengthy explanations.
- One-line points wherever possible.
- Include important definitions.
- Include formulas and equations.
- Include keywords and important facts.
- Include important differences.
- Include essential examples.
- Include frequently tested concepts.

The notes should feel like a 5-minute examination
revision sheet.

Cover all essential concepts without unnecessary detail.

==================================================
6. EXAMINATION QUESTIONS
==================================================

Generate relevant examination-style questions
based on the specified class and examination.

The questions object must contain:

"short": []
"long": []
"diagram": ""

SHORT QUESTIONS:

- Generate 8-12 questions when appropriate.
- Include definition-based questions.
- Include conceptual questions.
- Include factual questions.
- Include application-based questions where relevant.
- Include answers with each question.
- Keep answers concise and accurate.

LONG QUESTIONS:

- Generate 4-6 questions when appropriate.
- Include explanation-based questions.
- Include comparison-based questions.
- Include process-based questions.
- Include numerical questions where applicable.
- Include structured answers with important points.
- Match the expected examination difficulty.

IMPORTANT:

Questions must be relevant to the actual topic.
Do not create artificial questions just to meet a count.

For each question, use this format:

{
  "question": "Question text",
  "answer": "Answer text",
  "marks": 2
}

The marks must be a numeric value.

DIAGRAM QUESTION:

- If diagrams are enabled, provide one relevant
  diagram-based examination question.
- If diagrams are disabled, use an empty string.

==================================================
7. DIAGRAM GENERATION RULES
==================================================

If Include Diagrams is YES:

Generate one meaningful Mermaid diagram.

The diagram must:

- Use valid Mermaid syntax.
- Start with exactly: graph TD
- Use square brackets for every node label.
- Use simple alphanumeric node IDs.
- Use --> for connections.
- Avoid special characters inside node labels.
- Avoid HTML tags and styling.
- Avoid unsupported Mermaid syntax.
- Represent the actual topic accurately.
- Be logically organized and easy to understand.
- Contain approximately 5-12 meaningful nodes.

Example:

graph TD
A[Sunlight] --> B[Chlorophyll]
B --> C[Photosynthesis]
D[Water] --> C
E[Carbon Dioxide] --> C
C --> F[Glucose]
C --> G[Oxygen]

If Include Diagrams is NO:

"data": ""

IMPORTANT:
The diagram.data field must contain only Mermaid source code.
Do not include Markdown code fences inside it.

==================================================
8. CHART GENERATION RULES
==================================================

If Include Charts is YES:

Generate at least one relevant chart.

Select the chart according to the nature of the topic.

THEORY TOPICS:
- bar charts for concept comparisons.
- pie charts for meaningful distributions.

PROCESS TOPICS:
- bar charts for stage comparisons.
- line charts for meaningful numerical trends.

NUMERICAL TOPICS:
- histogram for frequency distributions.
- bar or line charts for relevant numerical data.

STRICT RULES:

- Never invent examination weightage.
- Never present fabricated percentages as real exam statistics.
- Use numerical values only in the value field.
- Use short, meaningful labels.
- Keep the chart relevant to the topic.
- Use only supported numerical information.
- If reliable numerical data is unavailable,
  use clearly labeled illustrative conceptual scores
  only when they make sense for the chart.
- Do not create misleading charts.
- Generate at least 4 data points when appropriate.

Allowed chart types:
- bar
- pie
- line
- histogram

Chart object format:

{
  "type": "bar",
  "title": "Example Chart",
  "data": [
    {
      "name": "Concept A",
      "value": 10
    },
    {
      "name": "Concept B",
      "value": 20
    }
  ]
}

If Include Charts is NO:

"charts": []

==================================================
9. QUICK REVISION POINTS
==================================================

The revisionPoints field must contain an array of strings.

Generate 8-15 important revision points when appropriate.

Rules:

- Each point should be concise.
- Include essential definitions.
- Include formulas and equations.
- Include important keywords.
- Include important facts.
- Avoid repeating complete paragraphs from notes.
- Make the points useful for last-minute revision.
- Do not use emojis.

==================================================
10. IMPORTANCE RATING
==================================================

The importance field must contain exactly one of:

"⭐"
"⭐⭐"
"⭐⭐⭐"

Choose the most appropriate overall importance
based on the topic's relevance to the specified examination.

Do not invent official exam weightage.

==================================================
11. STRICT JSON OUTPUT SCHEMA
==================================================
{
  "notes": "Markdown notes",
  "subtopics": {
    "⭐": [],
    "⭐⭐": [],
    "⭐⭐⭐": []
  },
  "questions": {
    "short": [],
    "long": [],
    "diagram": ""
  },
  "diagram": "",
  "charts": [],
  "revisionPoints": [],
  "importance": "⭐"
}


==================================================
12. FINAL VALIDATION BEFORE RESPONDING
==================================================

Before returning your response, internally verify:

1. The response is valid JSON.
2. All required keys are present.
3. No extra keys are present.
4. All strings use valid JSON escaping.
5. No trailing commas exist.
6. The notes field contains Markdown.
7. All three subtopic categories are populated.
8. Revision mode rules are followed.
9. Diagram data is valid Mermaid syntax when enabled.
10. Diagram data is an empty string when disabled.
11. Charts contain valid data when enabled.
12. Charts are an empty array when disabled.
13. Questions contain appropriate questions and answers.
14. No unsupported statistics are presented as facts.
15. No text exists outside the JSON object.

If any validation fails, correct the response before returning it.

FINAL INSTRUCTION:

Return ONLY the valid JSON object.
Never explain your response outside the JSON.
`;

    const interaction = await ai.interactions.create({
      model: "gemini-3-flash-preview",
      // model: "gemini-3.5-flash-lite",
      input: prompt,
    });

    if (!interaction || !interaction.output_text) {
      throw new Error("Failed to generate study material");
    }
    const cleanText = interaction.output_text?.trim();
    if (!cleanText) {
      throw new Error("Gemini returned empty content");
    }
    let parsedNotes;

    try {
      parsedNotes = JSON.parse(cleanText);
    } catch (error) {
      throw new Error("Gemini returned invalid JSON");
    }

    const notes = await notesModel.create({
      user: user._id,
      topic,
      classLevel,
      examType,
      revisionMode,
      includeDiagrams,
      includeCharts,
      content: parsedNotes,
    });
    user.credits = user.credits - 10;
    if (user.credits <= 0) user.isCreditAvailable = false;

    user.notes.push(notes._id);
    await user.save();
    return res.status(200).json({ result: parsedNotes });
  } catch (error) {
    console.log("gemini error is", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

const getnotesById = async (req, res) => {
  try {
    const noteId = req.params.id;
    const note = await notesModel.findById(noteId);
    return res
      .status(200)
      .json({
        message: "Notes by id fetched successfully ",
        success: false,
        note,
      });
  } catch (error) {
    console.log("error is", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

const getAllNotes = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await userModel.findById(userId).populate({
        path: "notes",
        options: {
          sort: { createdAt: -1 },
        },
      });
    if (!user) {
      return res.json({ message: "No user found", success: false });
    }

    return res.status(200).json({
      message: "Fetched all notes successfully",
      success: true,
      notes: user.notes,
    });
  } catch (error) {
    console.log("error is", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export { googleGenerativeAIResult, getAllNotes, getnotesById };

