import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./myAppointments.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myAppointments } from "../../actions/appointmentAction";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import MetaData from "../layout/MetaData";
import LaunchIcon from "@material-ui/icons/Launch";


const MyAppointments = () => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { loading, error, appointments } = useSelector((state) => state.myAppointments);
  const { user } = useSelector((state) => state.user);
  console.log(appointments);
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
      flex: 0.3,
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
          <Link to={`/appointment/${params.getValue(params.id, "id")}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];
  const rows = [];

  appointments &&
    appointments.forEach((worker,index) => {
      rows.push({
        workersQty: worker.appointedEmployees.length,   //We have used appointedEmployees instead of appointedWorkers
        id: worker._id,
        status: worker.appointStatus,
        amount: worker.totalPrice,
      })
      //console.log(worker);
    });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(myAppointments());
  }, [dispatch, alert, error]);

  return (
    <Fragment>
      <MetaData title={`${user.name} - Booked Services`} />

      {loading ? (
        <Loader />
      ) : (
        <div className="myAppointmentsPage">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="myAppointmentsTable"
            autoHeight
          />

          <Typography id="myAppointementsHeading">{user.name}'s Booked Services</Typography>
        </div>
      )}
    </Fragment>
  );
};

export default MyAppointments;
