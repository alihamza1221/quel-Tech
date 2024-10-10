import mongoose, { Schema, Document } from "mongoose";

interface Subject extends Document {
  label: string;
  taskIds: mongoose.Types.ObjectId[];
  userEmail: string;
}

const subjectSchema: Schema<Subject> = new Schema<Subject>({
  label: { type: String, required: true },
  taskIds: [
    { type: Schema.Types.ObjectId, ref: "tasks", required: true, default: [] },
  ],
  userEmail: { type: String, required: true },
});
export const subjectModel =
  (mongoose.models.Subject as mongoose.Model<Subject>) ||
  mongoose.model<Subject>("Subject", subjectSchema);

export { subjectSchema };
export type { Subject };
