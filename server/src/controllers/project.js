const Project = require('../models/Project');

// Create a project
exports.createProject = async (req, res) => {
  try {
    const project = await Project.create({
      ...req.body,
      createdBy: req.user.id
    });
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Get all projects (optional skill filter)
exports.getProjects = async (req, res) => {
  try {
    const { skill } = req.query;
    const query = skill ? { requiredSkills: { $in: [skill] } } : {};
    const projects = await Project.find(query).populate('createdBy', 'name');
    res.json(projects);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Get single project
exports.getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('createdBy', 'name')
      .populate('collaborators', 'name');
    if (!project) return res.status(404).json({ msg: 'Not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Send join request
exports.sendJoinRequest = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ msg: 'Project not found' });
    const userId = req.user.id;
    const already = project.joinRequests.find(r => r.user.toString() === userId);
    if (already) return res.status(400).json({ msg: 'Request already sent' });
    project.joinRequests.push({ user: userId });
    await project.save();
    res.json({ msg: 'Join request sent!' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Accept join request
exports.acceptRequest = async (req, res) => {
  try {
    const { projectId, requestId } = req.params;
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ msg: 'Project not found' });
    const request = project.joinRequests.id(requestId);
    if (!request) return res.status(404).json({ msg: 'Request not found' });
    request.status = 'accepted';
    project.collaborators.push(request.user);
    await project.save();
    res.json({ msg: 'User added to project!' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Reject join request
exports.rejectRequest = async (req, res) => {
  try {
    const { projectId, requestId } = req.params;
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ msg: 'Project not found' });
    const request = project.joinRequests.id(requestId);
    if (!request) return res.status(404).json({ msg: 'Request not found' });
    request.status = 'rejected';
    await project.save();
    res.json({ msg: 'Request rejected' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};