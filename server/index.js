//Importing 3rd party modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const chalk = require('chalk');
const multer = require('multer');

//Importing local modules
const router = require('./routes/route');

//Creating an instance of express
const app = express();
const port = 3030;

//Creating storage for multer to parse files
const fileStorage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'assets')
    },
    filename: (req,file,cb)=>{
        cb(null,file.originalname )
    }
})

//Middleware to parse the incoming multipart/formdata
app.use(multer({storage: fileStorage}).single('image'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

//Enabling cross origin resource sharing
app.use(cors());

//Middleware to server all our requests
app.use(router);



//creating server
app.listen(port, (err) => {
    if (err)
        console.log(chalk.red("Server was not created due to the following error", err))
    else
        console.log(chalk.blue("Server created and running at port ", port))
});

//Connecting to the Database
mongoose.connect("mongodb://localhost:27017/products", { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('error', error => {
    if (error)
        console.log("Database not connected due to the following error", error);
});
mongoose.connection.on('connected', () => {
    console.log(chalk.yellow("Database connected "));
});
