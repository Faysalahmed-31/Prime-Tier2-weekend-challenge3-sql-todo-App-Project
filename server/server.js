const express = require( 'express' );
const app = express();
const bodyParser = require( 'body-parser' );
const PORT = process.env.PORT || 5000;
const taskRouter = require( './routes/router' );

app.use(bodyParser.urlencoded( { extended: true } ) );
app.use( express.static( 'server/public' ) );

//ROUTES
app.use( '/list', taskRouter );

//Listen for requests on specific port
app.listen( PORT, ()=>{
    console.log( `listening on port`, PORT );
});

// app.delete( '/', (req, res )=>{    
//     let queryString = `DELETE FROM "todo_ap" where id=${ req.query.id };`
//     pool.query( queryString ).then( ( results )=>{
//         res.sendStatus( 200 );
//     }).catch( (err)=>{
//         console.log( err );
//         res.sendStatus( 500 );
//     })
//   })