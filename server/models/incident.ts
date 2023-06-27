import mongoose from "mongoose";

const incidentSchema = new mongoose.Schema({
  incidentNumber: { type: String, required: true },
  shortDescription: { type: String, required: true },
  description: { type: String, required: true },
  priority: { type: String, required: true },
  category: { type: String, required: true },
  assignmentGroup: { type: String, required: true },
  state: { type: String, required: true },
  updateDate: { type: Date, default: Date.now },
  createDate: { type: Date, default: Date.now },
  read: { type: Boolean, default: false },
});

const IncidentModel = mongoose.model("Incidents", incidentSchema);

export default IncidentModel;
