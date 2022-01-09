const express = require('express');

const errorMiddleware = require("./middleware/error");
const app = express();
const cookieParser = require("cookie-parser");
//const bodyParser = require("body-parser");

app.use(express.json());
app.use(cookieParser());
//app.use(bodyParser.urlencoded({ extended: true }));


//Routes Imports
const Employee = require("./routes/EmployeeRoute");
const user = require("./routes/userRoute");

app.use("/api/v1",Employee);
app.use("/api/v1", user);

//Middleware for Error;
app.use(errorMiddleware);



module.exports =app;