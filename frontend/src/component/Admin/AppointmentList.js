import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./employeeList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  deleteAppointment,
  getAllAppointments,
  
} from "../../actions/appointmentAction";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { DELETE_APPOINTMENT_RESET } from "../../constants/appointmentConstants";



const AppointmentList = ({history}) => {
    const dispatch = useDispatch();
  
    const alert = useAlert();
  
    const { error, appointments } = useSelector((state) => state.allAppointments);
     console.log(appointments);
   
    const { error: deleteError, isDeleted } = useSelector(
    (state) => state.appointment
    );
  
    const deleteAppointmentHandler = (id) => {
      dispatch(deleteAppointment(id));
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
        alert.success("Appointment Deleted Successfully");
       history.push("/admin/dashboard");
        dispatch({ type: DELETE_APPOINTMENT_RESET });
      }
       
      dispatch(getAllAppointments());
    }, [dispatch, alert, error,history,isDeleted,deleteError]);
  
    const columns = [
        { field: "id", headerName: "Booking ID", minWidth: 300, flex: 1 },
    
        {
          field: "status",
          headerName: "Status",
          minWidth: 150,
          flex: 0.5,
          cellClassName: (params) => {
            return params.getValue(params.id, "status") === "Completed"
              ? "greenColor"
              : "redColor";
          },
        },
        {
          field: "workersQty",
          headerName: "Worker Qty",
          type: "number",
          minWidth: 150,
          flex: 0.4,
        },
    
        {
          field: "amount",
          headerName: "Amount",
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
              <Link to={`/admin/appointment/${params.getValue(params.id, "id")}`}>
                <EditIcon />
              </Link>
  
              <Button
               onClick={()=>
              deleteAppointmentHandler(params.getValue(params.id,"id"))
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
  
    appointments &&
      appointments.forEach((worker) => {
        rows.push({
          id: worker._id,
          workersQty:worker.appointedEmployees.length,
          amount: worker.totalPrice,
          status: worker.appointStatus,
        });
      });
  
    return (
      <Fragment>
        <MetaData title={`ALL APPOINTMENTS - Admin`} />
  
        <div className="dashboard">
          <SideBar />
          <div className="employeeListContainer">
            <h1 id="employeeListHeading">ALL APPOINTMENTS</h1>
  
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
export default AppointmentList;