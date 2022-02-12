const Appointment = require("../models/appointmentModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors=require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const Employee = require("../models/EmployeeModel");

//create an appointement
exports.newAppointment=catchAsyncErrors(async(req,res,next)=>{
    const {
        addressInfo,
        appointedEmployees,
        paymentInfo,
        totalPrice,
      } = req.body;

         //await Employee.findOneAndUpdate({_id:req.body.appointedEmployee.employee},{availability:false});
      const appointment= await Appointment.create({
        addressInfo,
        appointedEmployees,
        paymentInfo,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id,
      });
     
     appointedEmployees.forEach( async(worker) => {
        await Employee.findOneAndUpdate({_id:worker.employee},{availability:false});
      });

      res.status(201).json({
        success: true,
        appointment,
      });
    });
    
// get Single Appointment
exports.getSingleAppointment = catchAsyncErrors(async (req, res, next) => {
  const appointment = await Appointment.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!appointment) {
    return next(new ErrorHandler("appointment not found with this Id", 404));
  }

  res.status(200).json({
    success: true,
    appointment,
  });
});

// get logged in user  Orders
exports.myAppointments = catchAsyncErrors(async (req, res, next) => {
  
  const appointment = await Appointment.find({ user: req.user._id });
    
  res.status(200).json({
    success: true,
    appointment,
  });
});

// get all Appointments -- Admin
exports.getAllAppointments = catchAsyncErrors(async (req, res, next) => {
  const appointments = await Appointment.find();

  let totalAmount = 0;

  appointments.forEach((appointment) => {
    totalAmount += appointment.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    appointments,
  });
});
// update Appointment Status -- Admin
exports.updateAppointment = catchAsyncErrors(async (req, res, next) => {
  const appointment = await Appointment.findById(req.params.id);
  console.log(appointment);
  if (!appointment) {
    return next(new ErrorHandler("appointment not found with this Id", 404));
  }

  if (appointment.appointStatus === "Completed") {
    return next(new ErrorHandler("You have already Completed this appointment", 400));
  }


  //We have to change for avilabality of Employee
  /*
  if (req.body.status === "Arrived") {
    appointment.appointmentItems.forEach(async (o) => {
      await updateStock(o.employee, o.quantity);
    });
  }*/
  appointment.appointStatus = req.body.status;

  if (req.body.status === "Completed") {
    appointment.completed =true;

    appointment.appointedEmployees.forEach( async(worker) => {
      await Employee.findOneAndUpdate({_id:worker.employee},{availability:true});
    });
    //await Employee.findOneAndUpdate({_id:appointment.appointedEmployees.employee},{availability:true});
    console.log(appointment.appointedEmployees);
  }

  await appointment.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});
/*
async function updateStock(id, quantity) {
  const employee = await Employee.findById(id);

  employee.Stock -= quantity;

  await employee.save({ validateBeforeSave: false });
}*/

// delete Appointment -- Admin
exports.deleteAppointment = catchAsyncErrors(async (req, res, next) => {
  const appointment = await Appointment.findById(req.params.id);

  if (!appointment) {
    return next(new ErrorHandler("appointment not found with this Id", 404));
  }
  if(appointment.appointStatus!=="Completed")
  {
    appointment.appointedEmployees.forEach( async(worker) => {
      await Employee.findOneAndUpdate({_id:worker.employee},{availability:true});
    });
  }

  await appointment.remove();

  res.status(200).json({
    success: true,
  });
});






