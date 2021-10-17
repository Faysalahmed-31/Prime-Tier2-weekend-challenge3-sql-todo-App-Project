const express = require('express');
const router = express.Router();
const app = express();



// DB CONNECTION
const pool = require( '../modules/pool.js' );