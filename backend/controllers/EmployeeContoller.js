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
exports.getAllEmployee = catchAsyncErrors(async (req,res)=>{
    const resultPage=5;
    const employeeCount=await Employee.countDocuments();
    
    const ApiFeature=new ApiFeatures(Employee.find(),req.query).search().filter().pagination(resultPage);
    const Emp = await ApiFeature.query;

    res.status(200).json({Emp,employeeCount});
});

//getEmployee detail
exports.getEmployeeDetail = catchAsyncErrors(async(req,res,next)=>{
   
    const employee = await Employee.findById(req.params.id);

    if(!employee){
        return next(new ErrorHandler("Employee Not Exists",404));
    }
    res.status(200).json({employee});
    
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