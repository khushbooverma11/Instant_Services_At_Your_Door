import React, { Fragment ,useEffect} from 'react'
import {CgMouse} from 'react-icons/all'
import '../Home/Home.css'
import MetaData from "../layout/MetaData";
import {clearErrors, getEmployee} from"../../actions/employeeAction";
import { useSelector,useDispatch } from 'react-redux';
import Loader from "../layout/Loader/Loader"
import {useAlert} from "react-alert";
import EmployeeCard from '../Home/EmployeeCard.js';


const Home = () => {
    const alert=useAlert()
    const dispatch=useDispatch();
    const{loading,error,employees,employeeCount}=useSelector(
(state)=>state.employees
    );
    console.log(employees);
    console.log(employeeCount);

    
   useEffect(() => {
       if(error){
        alert.error(error);
        dispatch(clearErrors());
       }
        dispatch(getEmployee());
        
    }, [dispatch,error,alert]);
    return  (
        <Fragment>
            {loading?(
            <Loader/>
            ):(
            <Fragment>
    <MetaData title="InstantService"/>
    <div className="banner">
         <p>Welcome to InstantService!!</p>
         <h1>Get Our Services at Your Home <br/>No Need to go Outside</h1>
         
         <a href="#container">
             <button>Scroll<CgMouse/></button>
         </a>
     </div>

     <h2 className='homeHeading'>Featured Services</h2>
     <div className='container' id='container'>
    {employees &&employees.map((employee)=>(<EmployeeCard employee={employee}/>))}

     </div>
      </Fragment>)}
       </Fragment> 
    );
    
}

export default Home
