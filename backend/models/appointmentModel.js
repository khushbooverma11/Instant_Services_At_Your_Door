const mongoose = require("mongoose");
const appointmentSchema = new mongoose.Schema({

    addressInfo: {
        address: {
          type: String,
          required: true,
        },
        city: {
            type: String,
            required: true,
          },
      
          state: {
            type: String,
            required: true,
          },
      
          country: {
            type: String,
            required: true,
          },
          pinCode: {
            type: Number,
            required: true,
          },
          phoneNo: {
            type: Number,
            required: true,
          }},
          
          appointedEmployees: [
            {
              name: {
                type: String,
                required: true,
              },
              bio: {
                type:String,
                required: true,
              },
              charge: {
                type: Number,
                required: true,
              },
              image: {
                type: String,
                required: true,
              },
              employee: {
                type: mongoose.Schema.ObjectId,
                ref: "Employee",
                required: true,
              },
            },
          ],
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      paymentInfo: {
        id: {
          type: String,
          required: true,
        },
        status: {
          type: String,
          required: true,
        },
      },
      paidAt: {
        type: Date,
        required: true,
      },
      totalPrice:{
        type: Number,
        required : true,
        default:0,
      },
      appointStatus:{
          type:String,
          required:true,
           default:"Processing",
      },
      completed:{
       type:Boolean,
       required:true,
       default:false
      },
      appointedAt: {
        type: Date,
        default: Date.now(),
      }
  

    
});
module.exports = mongoose.model("Appointment", appointmentSchema);