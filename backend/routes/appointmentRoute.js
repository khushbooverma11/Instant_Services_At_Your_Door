const express = require("express");
const {
    deleteAppointment,
    updateAppointment,
  getAllAppointments,
  newAppointment,
  getSingleAppointment,
  myAppointments,
} = require("../controllers/appointmentController");
const router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/appointment/new").post(isAuthenticatedUser, newAppointment);

router.route("/appointment/:id").get(isAuthenticatedUser, getSingleAppointment);

router.route("/appointments/me").get(isAuthenticatedUser, myAppointments);

router
  .route("/admin/appointments")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllAppointments);

router
  .route("/admin/appointment/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateAppointment)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteAppointment);

module.exports = router;
