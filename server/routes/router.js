const express = require('express');
const router = express.Router();
const app = express();



// DB CONNECTION
const pool = require( '../modules/pool' );

// GET
router.get('/', (req, res) => {
    let queryString = `
        SELECT * FROM "todo_app"
    `;
    pool.query(queryString)
        .then((results) => {
            // log the response data
            console.log(results.rows);
            
            // send the db results
            // to the client
            res.send(results.rows);
        })
        .catch((err) => {
            console.log('SQL GET failed ', err);
            res.sendStatus(500);
        });
});

// POST
router.post('/', (req, res) => {
    // add a new tasks to the DB
   let queryString = `INSERT INTO "todo_app" ( task ) VALUES ($1);`;
       let values = [
           req.body.task,  // $1
       ]
      console.log('this is my values', values )
       
       // Send the query to the DB
       pool.query(queryString , values)
               .then((results) => {
                   res.sendStatus(201);
               })
               .catch((err) => {
                   console.log('POST to sql failed error', err);
                   res.sendStatus(500);                
               })
   });

module.exports = router;





