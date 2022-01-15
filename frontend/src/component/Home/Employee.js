import React from 'react';
import {Link} from 'react-router-dom';
import ReactStars from "react-rating-stars-component";


const Employee = ({employee}) => {

    const options ={
        edit:false,
        color:"rgba(20,20,20,0.1)",
        activeColor:"tomato",
        size: window.innerWidth < 600 ? 20:25,
        value:employee.ratings,
        isHalf: true
    }
    //console.log(service);
    return (
        <Link className="employeeCard" to={employee._id}>
         
         <p>{employee.name}</p>
         <p>{employee.bio}</p>
         <div>
             <ReactStars {...options} /> <span>{`Reviews:${employee.numOfReviews}`}</span>
         </div>
              <span>Charge:{`₹${employee.charge}`}</span>
        </Link>
    )
}

export default Employee
