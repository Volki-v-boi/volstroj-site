import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  // Теперь это массив ссылок. Первая будет обложкой.
  images: [{ type: String }],
  category: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Project = mongoose.model("Project", ProjectSchema);
export default Project;
