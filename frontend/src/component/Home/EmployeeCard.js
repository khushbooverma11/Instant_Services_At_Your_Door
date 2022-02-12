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
    console.log(employee);
    return (
        <Link className="employeeCard" to={`/Employee/${employee._id}`}>
         <img src={employee.images.length &&employee.images[0].url} alt={employee.bio}/>
         <p>{employee.bio}</p>
         <p className="text">{employee.name}</p>
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
