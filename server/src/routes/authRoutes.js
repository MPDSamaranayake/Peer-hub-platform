const express = require('express');
const router = express.Router();

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
  // placeholder
  res.json({ ok: true });
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  // placeholder
  res.json({ token: 'dummy' });
});

module.exports = router;