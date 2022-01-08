const express = require('express');

const errorMiddleware = require("./middleware/error");
const app = express();
app.use(express.json());

//Routes Imports
const Employee = require("./routes/EmployeeRoute");

app.use("/api/v1",Employee);

//Middleware for Error;
app.use(errorMiddleware);



module.exports =app;