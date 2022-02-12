const mongoose = require('mongoose');

const EmployeeSchema =  new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name"],
        trim: true,
      },
      bio: {
        type: String,
        required: [true, "Please Enter your about service Name"],
      },
      charge: {
        type: Number,
        required: [true, "Please Enter Your One day Charge"],
        maxLength: [8, "Price cannot exceed 8 characters"],
      },
      ratings: {
        type: Number,
        default: 0,
      },
      images: [
        {
          public_id: {
            type: String,
            required: true,
          },
          url: {
            type: String,
            required: true,
          },
        },
      ],
      category: {
        type: String,
        required: [true, "Please Enter Service Category"],
      },
    addressline1:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
      availability: {
        type:Boolean,
        default: true,
      },
      numOfReviews: {
        type: Number,
        default: 0,
      },
      reviews: [
        {
          user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
          },
          name: {
            type: String,
            required: true,
          },
          rating: {
            type: Number,
            required: true,
          },
          comment: {
            type: String,
            required: true,
          },
        },
      ],
      Qualification: {
        type: String,
      },
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        //required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    
})

module.exports = mongoose.model("Employee",EmployeeSchema);