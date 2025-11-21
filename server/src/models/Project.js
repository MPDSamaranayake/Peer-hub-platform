const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  requiredSkills: { type: [String], required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  collaborators: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  joinRequests: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
