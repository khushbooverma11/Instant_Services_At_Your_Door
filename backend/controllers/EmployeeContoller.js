const Employee = require("../models/EmployeeModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors=require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");


//create Employee -- Admin
exports.createEmployee = catchAsyncErrors(async (req,res,next)=>{
   

    const  employee = await Employee.create(req.body);
    res.status(201).json({
        success:true,
        employee,
    });
        
});

//Get All Employee
exports.getAllEmployee = catchAsyncErrors(async (req,res,next)=>{
 
  const resultPerPage=4;
    const employeeCount=await Employee.countDocuments();
    
    const apiFeature=new ApiFeatures(Employee.find(),req.query).search().filter()
    
    let employees = await apiFeature.query;

    let filteredEmployeeCount = employees.length;
    
   
    apiFeature.pagination(resultPerPage);
    employees= await apiFeature.query.clone();

    res.status(200).json({
      success:true,
      employees,
      employeeCount,
      resultPerPage,
      filteredEmployeeCount});
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
  