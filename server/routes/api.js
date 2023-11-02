import express from 'express';
import jobController from '../controllers/jobController.js';
const router = express.Router();

router.post('/job', jobController.addJob, (req, res) => {
    res.status(200).json(res.locals.details)
})

export default router;