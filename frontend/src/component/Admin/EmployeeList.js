import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./employeeList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAdminEmployee,
  deleteEmployee,
} from "../../actions/employeeAction";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { DELETE_EMPLOYEE_RESET } from "../../constants/employeeConstants";



const EmployeeList = ({history}) => {
    const dispatch = useDispatch();
  
    const alert = useAlert();
  
    const { error, employees } = useSelector((state) => state.employees);
     console.log(employees);
   
     const { error: deleteError, isDeleted } = useSelector(
      (state) => state.employee
    );
  
    const deleteEmployeeHandler = (id) => {
      dispatch(deleteEmployee(id));
    };
  
    useEffect(() => {
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
  
      if (deleteError) {
        alert.error(deleteError);
        dispatch(clearErrors());
      }
  
      if (isDeleted) {
        alert.success("Employee Deleted Successfully");
       history.push("/admin/dashboard");
        dispatch({ type: DELETE_EMPLOYEE_RESET });
      }
  
      dispatch(getAdminEmployee());
    }, [dispatch, alert, error,history, deleteError, isDeleted]);
  
    const columns = [
      { field: "id", headerName: "Employee ID", minWidth: 200, flex: 0.5 },
  
      {
        field: "name",
        headerName: "Name",
        minWidth: 350,
        flex: 1,
      },
      {
        field: "availability",
        headerName: "Availability",
        type: "bool",
        minWidth: 150,
        flex: 0.3,
      },
  
      {
        field: "charge",
        headerName: "Charge",
        type: "number",
        minWidth: 270,
        flex: 0.5,
      },
  
      {
        field: "actions",
        flex: 0.3,
        headerName: "Actions",
        minWidth: 150,
        type: "number",
        sortable: false,
        renderCell: (params) => {
          return (
            <Fragment>
              <Link to={`/admin/employee/${params.getValue(params.id, "id")}`}>
                <EditIcon />
              </Link>
  
              <Button
                onClick={() =>
                  deleteEmployeeHandler(params.getValue(params.id, "id"))
                }
              >
                <DeleteIcon />
              </Button>
            </Fragment>
          );
        },
      },
    ];
  
    const rows = [];
  
    employees &&
      employees.forEach((worker) => {
        rows.push({
          id: worker._id,
          availability: worker.availability,
          charge: worker.charge,
          name: worker.name,
        });
      });
  
    return (
      <Fragment>
        <MetaData title={`ALL EMPLOYEES - Admin`} />
  
        <div className="dashboard">
          <SideBar />
          <div className="employeeListContainer">
            <h1 id="employeeListHeading">ALL EMPLOYEES</h1>
  
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="employeeListTable"
              autoHeight
            />
          </div>
        </div>
      </Fragment>
    );
  };
export default EmployeeList;