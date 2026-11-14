import mongoose from "mongoose";
const notesSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    topic: {
      type: String,
    },
    classLevel: {
      type: String,
    },
    examType: {
      type: String,
    },
    revisionMode: {
      type: Boolean,
    },
    includeDiagrams: { type: Boolean },
    includeCharts: { type: Boolean },
    content:{
        type:mongoose.Schema.Types.Mixed,
        required:true
    }
  },
  { timestamps: true },
);

const notesModel = mongoose.model("notes", notesSchema);

export default notesModel;
