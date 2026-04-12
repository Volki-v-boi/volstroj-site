import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  service: String,
  message: String,
  date: { type: Date, default: Date.now },
});

// Экспорт по стандарту ES Modules
const Lead = mongoose.model("Lead", LeadSchema);
export default Lead;
