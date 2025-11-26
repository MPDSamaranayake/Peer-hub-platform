const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
	createProject,
	getProjects,
	getProject,
	sendJoinRequest,
	acceptRequest,
	rejectRequest
} = require('../controllers/project');

// Project CRUD
router.get('/', getProjects);
router.post('/', auth, createProject);
router.get('/:id', getProject);

// Join request flows
router.post('/:id/join', auth, sendJoinRequest);
router.put('/:projectId/accept/:requestId', auth, acceptRequest);
router.put('/:projectId/reject/:requestId', auth, rejectRequest);

module.exports = router;
