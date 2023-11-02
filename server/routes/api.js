import express from 'express';
import jobController from '../controllers/jobController.js';
const router = express.Router();

router.post('/job', jobController.addJob, (req, res) => {
    // console.log(res.locals.details)
    res.status(200).json(res.locals.details)
})

router.get('/getJobs', jobController.getAllJobs, (req,res)=>{
    res.status(200).json(res.locals.allJobs)
})
export default router;