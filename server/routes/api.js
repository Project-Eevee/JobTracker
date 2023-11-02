import express from 'express';
import jobController from '../controllers/jobController.js';
import { manualLogin, signup } from '../controllers/signin.js';
const router = express.Router();

router.post('/job', jobController.addJob, (req, res) => {
  res.status(200).json(res.locals.details);
});

router.post('/login', manualLogin, (req, res) => {
  if (req.user) {
    res.status(200).json({
      message: 'Login successful',
      user: req.user,
    });
  } else {
    res.status(401).json({
      message: 'Login failed',
    });
  }
});

router.post('/signup', signup, (req, res) => {
  if (req.user) {
    res.status(200).json({
      message: 'Signup successful',
      user: req.user,
    });
  } else {
    res.status(400).json({
      message: 'Signup failed',
    });
  }
});
export default router;
