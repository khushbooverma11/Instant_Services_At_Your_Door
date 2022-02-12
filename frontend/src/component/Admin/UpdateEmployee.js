import React, { Fragment, useEffect, useState } from "react";
import "./updateEmployee.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, updateEmployee,getEmployeeDetails } from "../../actions/employeeAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./Sidebar";
import { UPDATE_EMPLOYEE_RESET } from "../../constants/employeeConstants";

const UpdateEmployee = ({history,match}) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, employee } = useSelector((state) => state.employeeDetails);

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.employee);
  
  const [name, setName] = useState("");
  const [charge, setCharge] = useState(0);
  const [bio, setBio] = useState("");
  const [category, setCategory] = useState("");
  const [availability, setAvailability] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);

  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "Home Repairs",
    "Salon for Women",
    "Home Painting",
    "Appliance Repair",
    "Mental Therapies",
    "Vehical Mechanic",
    "House Cleaning",
  ];
const employeeId = match.params.id;

  useEffect(() => {
    if (employee && employee._id !== employeeId) {
        dispatch(getEmployeeDetails(employeeId));
      } else {
        setName(employee.name);
        setBio(employee.bio);
        setCharge(employee.charge);
        setCategory(employee.category);
        setAvailability(employee.availability);
        setOldImages(employee.images);
      }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
        alert.error(updateError);
        dispatch(clearErrors());
      }
    if (isUpdated) {
      alert.success("Employee Updated Successfully");
      history.push("/admin/employees");
      dispatch({ type: UPDATE_EMPLOYEE_RESET });
    }
  }, [dispatch, alert, error,history,employeeId,employee, isUpdated]);

  const updateEmployeeSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("charge", charge);
    myForm.set("bio", bio);
    myForm.set("category", category);
    myForm.set("availability", availability);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(updateEmployee(employeeId,myForm));
  };

  const updateEmployeeImagesChange = (e) => {
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
        <div className="updateEmployeeContainer">
          <form
            className="updateEmployeeForm"
            encType="multipart/form-data"
            onSubmit={updateEmployeeSubmitHandler}
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
                value={charge}
              />
            </div>

            <div>
              <DescriptionIcon />

              <textarea
                placeholder="Employee Bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div>
              <AccountTreeIcon />
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <StorageIcon />
              <input
                type="bool"
                placeholder="Availability"
                required
                onChange={(e) => setAvailability(e.target.value)}
                value={availability}
              />
            </div>

            <div id="updateEmployeeFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={updateEmployeeImagesChange}
                multiple
              />
            </div>
            <div id="updateEmployeeFormImage">
              {oldImages &&
                oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt="Old Employee Preview" />
                ))}
            </div>
            <div id="updateEmployeeFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Employee Preview" />
              ))}
            </div>

            <Button
              id="updateEmployeeBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Update
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateEmployee;
