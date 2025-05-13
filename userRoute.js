const express = require('express');
const router = express.Router();
const userService = require('../services/userService');

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const userId = await userService.addUser(username, password);
    res.status(201).json({ message: 'User created', userId });
  } catch (err) {
    res.status(500).json({ message: 'Error creating user', error: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const isValid = await userService.verifyUser(username, password);
    if (isValid) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error logging in', error: err.message });
  }
});

router.get('/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const user = await userService.getUserByUsername(username);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user', error: err.message });
  }
});

module.exports = router;