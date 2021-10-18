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
   // PUT
router.put('/:id', (req,res) => {
    let queryString = `
            UPDATE "todo_app" 
            SET "completed" = $1
            WHERE "id" = $2;
    `;

    let values = [
        true,
        req.body.id
    ];

    console.log('this is my values ', values);
    
    pool.query(queryString , values)
        .then((results) => {
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log('PUT err', err);
            res.sendStatus(500);
        })
})
// // DELETE

router.delete('/:id', (req, res) => {
    // :id is a route 
    const id = req.params.id
    console.log(req.params)
    const queryString = 'DELETE FROM "todo_app" WHERE id = $1'
    pool.query(queryString, [id]).then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log('There was an error making a query', error)
    res.sendStatus(500);
    })
})


module.exports = router;










