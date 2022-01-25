import React from 'react';
import {Link} from 'react-router-dom';
import { Rating } from "@material-ui/lab";

const EmployeeCard = ({employee}) => {

    const options = {
        size: "large",
        value: employee.ratings,
        readOnly:true,
        precision:0.5,
      };
    //console.log(service);
    return (
        <Link className="employeeCard" to={`/Employee/${employee._id}`}>
         <img src={employee.images[0].url} alt={employee.name}/>
         <p>{employee.name}</p>
         <p>{employee.bio}</p>
         <div>
             <Rating {...options} /> <span  className="employeeCardSpan">
                 {" "}
                 {`Reviews:${employee.numOfReviews}`}</span>
         </div>
              <span>Charge:{`₹${employee.charge}`}</span>
        </Link>
    )
}

export default EmployeeCard;
