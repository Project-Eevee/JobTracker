import { query } from '../models/jobTrackerModels.js';
const jobController = {};

jobController.getAllJobs = (req, res, next) => {
  // Define your SQL query to fetch jobs from multiple tables
  const sqlQuery = `
    SELECT * FROM applied
    UNION
    SELECT * FROM rejected
    UNION
    SELECT * FROM interviewed
    UNION
    SELECT * FROM offered
    `; // Replace with your table names and query

  // Use the query function to execute the SQL query
  query(sqlQuery, (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return next(err);
    }
    const allJobs = results.rows || [];
    // Store the retrieved jobs in the request object for use in route handlers
    res.locals.allJobs = allJobs
    // console.log('this is allJobs', allJobs);
    return next();
  });
};


//TODO: fetch job controller here?

jobController.addJob = (req, res, next) => {
  console.log('this is the request body', req.body)
  const table = req.body.jobStatus;
  const queryString = `INSERT INTO ${table} (
    name, 
    role, 
    date_applied, 
    salary, 
    interest_level, 
    email
    )
    VALUES (
        '${req.body.companyName}',
        '${req.body.nameOfRole}',
        '${req.body.dateApplied}',
        '${req.body.salary}',
        '${req.body.interestLevel}',
        '${req.body.contactEmail}'
        )
        RETURNING *;`;

  query(queryString)
    .then((data) => {
      res.locals.details = data;
      console.log('this is locals.details', res.locals.details);
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
