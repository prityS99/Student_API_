require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan=require('morgan')
const helmet=require('helmet')
const RateLimit=require('./app/utils/limiter')

const app = express();

//Fs Link//
const fs = require('fs');

//DB Connction//
const DatabaseConnection = require("./app/config/dbcon")


//Database connection //
DatabaseConnection();

app.use(morgan('dev'))
app.use(helmet())
app.use(RateLimit)
app.use(cors());

// EJS//
const ejs = require('ejs');
app.set("view engine", "ejs");
app.set("views", "views");


//Define JSON//
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Static files //
app.use(express.static(path.join(__dirname, "public")));
app.use("uploads", express.static(path.join(__dirname, "/uploads")));
app.use("/uploads", express.static("uploads"));



// AUTH //

const authRoute = require('./app/routes/authRoute')
app.use('/app/v1', authRoute)

// STUDENT API ROUTE //

// const studentApiRoute = require('./app/routes/studentApiRoute')
// app.use('app/v1',studentApiRoute)

const port= 3002

app.listen(port, () => {
  console.log("server is running on port", port);
});


