const express = require('express');
const {  createEmployee, getAllEmployee, updateEmployee, deleteEmployee, getEmployeeDetail } = require('../controller/EmployeeContoller');

const router = express.Router();

router.route("/Employee").get(getAllEmployee);
router.route("/Employee/new").post(createEmployee);
router.route("/Employee/:id").put(updateEmployee).delete(deleteEmployee).get(getEmployeeDetail);

module.exports = router;