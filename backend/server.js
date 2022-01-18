const app = require('./app');
const connectDatabase = require('./config/database');
const dotenv  = require("dotenv");
const cloudinary = require("cloudinary");

//Handling Uncaught Exception
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log('shutting down the server due to uncaught exception');
process.exit(1);
});
//config
dotenv.config({path:"backend/config/config.env"})


//Database Connection
connectDatabase();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const server=app.listen(process.env.PORT,()=>{
    
    console.log(`Server is working on ${process.env.PORT}`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection",(err)=>{
console.log(`Error: ${err.message}`);
console.log('shutting down the server due to unhandled Promise Rejection');

server.close(()=>{
    process.exit(1);
})
});