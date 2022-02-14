import React, { Fragment,useEffect,useState } from 'react';
import  "./Employees.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getEmployee
  
} from "../../actions/employeeAction";
import EmployeeCard from "../Home/EmployeeCard"
import Loader from "../layout/Loader/Loader";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import {useAlert} from "react-alert";
import MetaData from '../layout/MetaData';
import LocationCityIcon from '@material-ui/icons/LocationCity';

const categories = [
  "Home Repairs",
  "Salon for Women",
  "Home Painting",
  "Appliance Repair",
  "Mental Therapies",
  "Vehical Mechanic",
  "House Cleaning",
];
const Employees = ({match}) => {

    const dispatch = useDispatch();
    const alert=useAlert();

    const [currentPage, setCurrentPage] = useState(1);
    const [charge, setCharge] = useState([0, 25000]);
    
   const [category, setCategory] = useState("");
   const [City,setCity] = useState("");
   const [ratings, setRatings] = useState(0);
   const cities = [
    "Delhi",
    "Mumbai",
    "Kolkata",
    "Bangalore",
  ];
    const {
      employees,
      loading,
      error,
      employeesCount,
      resultPerPage,
      filteredEmployeesCount
    } = useSelector((state) => state.employees);
    
    const {  user } = useSelector((state) => state.user);
    const keyword =match.params.keyword;

    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
      };

      const chargeHandler = (event, newcharge) => {
        setCharge(newcharge);
      };

    useEffect(() => {
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
      
        dispatch(getEmployee(keyword,currentPage,charge,category,ratings,City))
    }, [dispatch,keyword,currentPage,charge,category,alert,error,ratings,City,user]);

    let count = filteredEmployeesCount;
    return (
      <Fragment>
        {loading ? (
          <Loader />
        ) : (
          <Fragment>
              <MetaData title="SERVICES"/>
              <div className="setLocation">
              <LocationCityIcon/>
              <select value={City} onChange={(e) =>setCity(e.target.value)}  name="city">
                <option value="">Choose City</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
                 <h2 className="employeesHeading">Services</h2>

                 <div className="employees">
                     {employees &&
                 employees.map((employee)=>(
                 <EmployeeCard key={employee._id} employee={employee} />
                 ))}
                 </div>

                
                <div className="filterBox">
                <Typography>Charge</Typography>
                
                <Slider
                 value={charge}
                 onChange={chargeHandler}
                 valueLabelDisplay="auto"
                 aria-labelledby="range-slider"
                 min={0}
                  max={25000}
               />

             <Typography>Categories</Typography>
             <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>

            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
               </div>

            {resultPerPage < count && (
              <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={employeesCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
            )}
             
                </Fragment>
            )}
        </Fragment>
    )
}

export default Employees
