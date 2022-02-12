const Employee = require("../models/EmployeeModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors=require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

//create Employee -- Admin
exports.createEmployee = catchAsyncErrors(async (req,res,next)=>{
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "employees",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;
  
  console.log(req.body);
    const  employee = await Employee.create(req.body);

    console.log(employee);
    res.status(201).json({
        success:true,
        employee,
    });
        
});

//Get All Employee
exports.getAllEmployee = catchAsyncErrors(async (req,res,next)=>{
 
  const resultPerPage=8;
    const employeeCount=await Employee.countDocuments();
    
    const apiFeature=new ApiFeatures(Employee.find({availability:true}),req.query).search().filter()
    
    let employees = await apiFeature.query;

    let filteredEmployeesCount = employees.length;
    
   
    apiFeature.pagination(resultPerPage);
    employees= await apiFeature.query.clone();

    res.status(200).json({
      success:true,
      employees,
      employeeCount,
      resultPerPage,
      filteredEmployeesCount});
});
// Get All Product (Admin)
exports.getAdminEmployees = catchAsyncErrors(async (req, res, next) => {
  const employees = await Employee.find();

  res.status(200).json({
    success: true,
    employees,
  });
});

//getEmployee detail
exports.getEmployeeDetail = catchAsyncErrors(async(req,res,next)=>{
   
    const employee = await Employee.findById(req.params.id);

    if(!employee){
        return next(new ErrorHandler("Employee Not Exists",404));
    }
    res.status(200).json({
      success:true,
      employee});
    
});
//update Employee --Admin

exports.updateEmployee =catchAsyncErrors( async (req,res,next)=>{

    let employee = await Employee.findById(req.params.id);

    if(!employee){
        return next(new ErrorHandler("Employee Not Found",404));
    }
// Images Start Here
let images = [];

if (typeof req.body.images === "string") {
  images.push(req.body.images);
} else {
  images = req.body.images;
}

if (images !== undefined) {
  // Deleting Images From Cloudinary
  for (let i = 0; i < employee.images.length; i++) {
    await cloudinary.v2.uploader.destroy(employee.images[i].public_id);
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "employees",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
}
    employee = await Employee.findByIdAndUpdate(req.params.id,req.body,{
    new:true,
    runValidator:true,
    useFindAndModify:false});

    res.status(200).json({
        success:"true",
        employee
    })
});


//Delete Employee --Admin
exports.deleteEmployee = catchAsyncErrors(async(req,res,next)=>{
   
    const employee = await Employee.findById(req.params.id);

    if(!employee){
        return next(new ErrorHandler('Employee Not Found')); 
    }
// Deleting Images From Cloudinary
for (let i = 0; i < employee.images.length; i++) {
  await cloudinary.v2.uploader.destroy(employee.images[i].public_id);
}

    await employee.remove();

    res.status(200).json({
        success:true,
        message:"Employee Deleted Successfully"
    });
});

//Create New Review
exports.createEmpolyeeReview = catchAsyncErrors(async (req,res,next)=>{

    const { rating,comment,employeeId}= req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    };

    const employee = await Employee.findById(employeeId);

    const isReviewed = employee.reviews.find(
        (rev)=> rev.user.toString()===req.user._id.toString()
    );
    if(isReviewed){
        employee.reviews.forEach( (rev)=>{
         if(rev.user.toString()===req.user._id.toString())
         (rev.rating=rating),(rev.comment=comment);
        })

    }else{
        employee.reviews.push(review);
        employee.numOfReviews = employee.reviews.length;
    }
        let avg = 0;

       employee.reviews.forEach((rev) => {
       avg += rev.rating;
       });

       employee.ratings = avg / employee.reviews.length;

       await employee.save({ validateBeforeSave: false });

       res.status(200).json({
       success: true,
       });
    
});



///
// Get All Reviews of a Employee
exports.getEmployeeReviews = catchAsyncErrors(async (req, res, next) => {
    const employee = await Employee.findById(req.query.id);
  
    if (!employee) {
      return next(new ErrorHandler("employee not found", 404));
    }
  
    res.status(200).json({
      success: true,
      reviews: employee.reviews,
    });
  });
  
  // Delete Review
  exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
    const employee = await Employee.findById(req.query.employeeId);
  
    if (!employee) {
      return next(new ErrorHandler("Employee not found", 404));
    }
  
    const reviews = employee.reviews.filter(
      (rev) => rev._id.toString() !== req.query.id.toString()
    );
  
    let avg = 0;
  
    reviews.forEach((rev) => {
      avg += rev.rating;
    });
  
    let ratings = 0;
  
    if (reviews.length === 0) {
      ratings = 0;
    } else {
      ratings = avg / reviews.length;
    }
  
    const numOfReviews = reviews.length;
  
    await Employee.findByIdAndUpdate(
      req.query.employeeId,
      {
        reviews,
        ratings,
        numOfReviews,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
  
    res.status(200).json({
      success: true,
    });
  });
  