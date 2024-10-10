import mongoose, { Schema, Document } from "mongoose";
enum Priority {
  Important = "important",
  Moderate = "moderate",
  Normal = "normal",
}
interface Task extends Document {
  label: string;
  isCompleted: boolean;
  priority: Priority;
  deadLine: Date;
  createdAt: Date;
  userEmail: string;
}

const taskSchema: Schema<Task> = new Schema<Task>({
  label: { type: String, required: true },
  isCompleted: { type: Boolean, required: true, default: false },
  priority: {
    type: String,
    enum: Object.values(Priority),
    required: true,
    default: Priority.Normal,
  },
  deadLine: { type: Date, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  userEmail: { type: String, required: true },
});
export const taskModel =
  (mongoose.models.Task as mongoose.Model<Task>) ||
  mongoose.model<Task>("Task", taskSchema);

export { taskSchema, Priority };
export type { Task };
