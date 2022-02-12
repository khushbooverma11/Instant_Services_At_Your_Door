import React, { Fragment, useEffect, useState } from "react";
import "./newEmployee.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createEmployee } from "../../actions/employeeAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import CallIcon from '@material-ui/icons/Call';
import HomeIcon from '@material-ui/icons/Home';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./Sidebar";
import { NEW_EMPLOYEE_RESET } from "../../constants/employeeConstants";

const NewEmployee = ({history}) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, success } = useSelector((state) => state.newEmployee);

  const [name, setName] = useState("");
  const [charge, setCharge] = useState(0);
  const [serviceName, setserviceName] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [City,setCity] = useState("");
  const [Addressline1,setAddressline1] = useState("");
  //const [Address,setAddress] = useState({addressline1:"",city:""});

  /*let nam, value;
  const handleAddress = (e)=>{
    nam= e.target.name;
    value = e.target.value;
    setAddress({...Address,[nam]:value})
    }*/
  const categories = [
    "Home Repairs",
    "Salon for Women",
    "Home Painting",
    "Appliance Repair",
    "Mental Therapies",
    "Vehical Mechanic",
    "House Cleaning",
  ];
  const cities = [
    "Delhi",
    "Mumbai",
    "Kolkata",
    "Bangalore",
  ];
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Employee Created Successfully");
      history.push("/admin/dashboard");
      dispatch({ type: NEW_EMPLOYEE_RESET });
    }
  }, [dispatch, alert, error,history, success]);

  const createEmployeeSubmitHandler = (e) => {
    e.preventDefault();
    

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("charge", charge);
    myForm.set("bio", serviceName);
    myForm.set("category", category);
    myForm.set("addressline1", Addressline1);
    myForm.set("city", City);
   
    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(createEmployee(myForm));
  };

  const createEmployeeImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <MetaData title="Create Employee" />
      <div className="dashboard">
        <SideBar />
        <div className="newEmployeeContainer">
          <form
            className="createEmployeeForm"
            encType="multipart/form-data"
            onSubmit={createEmployeeSubmitHandler}
          >
            <h1>Create Employee</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Employee Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Charge"
                required
                onChange={(e) => setCharge(e.target.value)}
              />
            </div>

            <div>
              <DescriptionIcon />

              <textarea
                placeholder="Service Name"
                value={serviceName}
                onChange={(e) => setserviceName(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>
            <div>
              <CallIcon/>
            <input
                type="text"
                placeholder="Phone Number"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>          
            <div>
              <AccountTreeIcon />
              <select onChange={(e) => setCategory(e.target.value)}>
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            <p> <HomeIcon/>Employee Address</p>
            <div>
              <LocationOnIcon/>
            <input
                type="text"
                placeholder="Addressline1"
                required
                name="addressline1"
                value={Addressline1}
                onChange={(e) =>setAddressline1(e.target.value)}
              />
            </div>
            <div>
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
          

            <div id="createEmployeeFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createEmployeeImagesChange}
                multiple
              />
            </div>

            <div id="createEmployeeFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Employee Preview" />
              ))}
            </div>

            <Button
              id="createEmployeeBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewEmployee;
