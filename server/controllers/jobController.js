import { query } from '../models/jobTrackerModels.js';
const jobController = {};

// jobController.getJobs = async (req, res, next) => {
//     try {
//         let userId = req.params.userId;
//         let conditions = `WHERE j.user = $1`; // Using parameterized query
//         let values = [userId]; // Parameters array for query values

//         if (req.body.title) {
//           conditions += ` AND j.title ILIKE $2`; // Case-insensitive search using ILIKE
//           values.push(`%${req.body.title}%`);
//         }

//         // Sorting
//         let orderBy = "";
//         if (req.body.createdAt) {
//           orderBy = `ORDER BY j.createdAt ${req.body.createdAt}`; // Assuming req.body.createdAt contains ASC or DESC
//         }

//         // Fetch jobs with their category and notes
//         let sql = `
//           SELECT j.*, c.*, n.*
//           FROM jobs j
//           LEFT JOIN categories c ON j.category_id = c.id
//           LEFT JOIN notes n ON j.id = n.job_id
//           ${conditions}
//           ${orderBy}, n.createdAt DESC;  // Order notes by createdAt in descending order after ordering jobs
//         `;

//         const { rows: jobs } = await query(sql, values); // This assumes you're using node-postgres or a similar library

//         if (jobs && jobs.length) {
//           res.json(jobs);
//         } else {
//           res.status(404).send('No jobs found');
//         }

//     } catch(error) {
//         const err = {
//             log: 'Error encountered in jobController.getJobs',
//             status: 502,
//             message: { err: 'Failed to retrieve jobs, check logs'},
//         };
//         return next(err);
//     }
// }

//TODO: fetch job controller here?

jobController.addJob = (req, res, next) => {
  const tableName = req.body.tableName;
  const queryString = `INSERT INTO ${tableName} (
    name, 
    role, 
    date_applied, 
    salary, 
    interest_level, 
    email
    )
    VALUES (
        '${req.body.name}',
        '${req.body.role}',
        '${req.body.date_applied}',
        '${req.body.salary}',
        '${req.body.interest_level}',
        '${req.body.email}'
        )
        RETURNING *;`;

  query(queryString)
    .then((data) => {
      res.locals.details = data;
      return next();
    })
    .catch((error) => {
      console.error('Actual db error:', error);
      return next({
        log: 'Express error handler caught in jobController.addJob',
        status: 500,
        message: { err: 'An error occured' },
      });
    });
};

export default jobController;
