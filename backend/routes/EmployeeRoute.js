const express = require('express');
const {  createEmployee, 
    getAllEmployee, 
    updateEmployee, 
    deleteEmployee, 
    getEmployeeDetail,
    createEmpolyeeReview,
    getEmployeeReviews,
    deleteReview
 } = require('../controllers/EmployeeContoller');

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/Employees").get(getAllEmployee);

router.route("/Employee/new").post(isAuthenticatedUser,authorizeRoles("admin"),createEmployee);

router.route("/Employee/:id").put(isAuthenticatedUser,authorizeRoles("admin"),updateEmployee)
.delete(isAuthenticatedUser,authorizeRoles("admin"),deleteEmployee)
.get(getEmployeeDetail);

router.route("/review").put(isAuthenticatedUser, createEmpolyeeReview);

router
    .route("/reviews")
    .get(getEmployeeReviews)
    .delete(isAuthenticatedUser,deleteReview);


module.exports = router;