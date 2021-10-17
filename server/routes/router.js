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


module.exports = router;





