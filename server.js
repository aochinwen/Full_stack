const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const bodyParser = require("body-parser");

// load env variables
dotenv.config({ path: './config/config.env'});

// Connect to DB
connectDB();

//initialise express
const app = express();

// initialise body parser
app.use(express.json());

// enable cors
app.use(cors());

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
// test routes
// app.get('/api/v1/closures', (req, res)=>{
//     res.send('Hello world');
// });

//Routes
app.use('/api/v1/closures', require('./routes/closures'));
app.use('/api/v1/users', require('./routes/users'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> console.log(`Server running at ${process.env.NODE_ENV} mode on port ${PORT}`))


// http://localhost:3000/api/v1/users/setSuperAdminRole?id=OZdPePejk9ND6arpaRgIaGMwldp1