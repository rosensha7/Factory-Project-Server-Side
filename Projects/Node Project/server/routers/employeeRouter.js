const express = require('express');
const router = express.Router();
const EmployeeBLL = require('../BLL/employeesBLL');
const { InvalidDataError } = require('../errors/invalidDataError');
const { validateToken } = require('../middlewares/validationManager');
const { updateActions } = require('../middlewares/actionManager');

// Entry Point: 'http://localhost:8000/employees

router.use(validateToken);
router.use(updateActions);

//GET ALL
router.route('/').get(async (req, res) => {
  try {
    const emps = await EmployeeBLL.getAllEmployees();
    res.json(emps);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

//GET BY ID
router.route('/:id').get(async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await EmployeeBLL.getEmployeeById(id);
    res.json(employee);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

//ADD
router.route('/').post(async (req, res) => {
  try {
    const newEmp = req.body;
    const result = await EmployeeBLL.addEmployee(newEmp);
    res.json(result);
  } catch (error) {
    error instanceof InvalidDataError ? res.status(404) : res.status(400);
    res.json(error.message);
  }
});

//UPDATE
router.route('/:id').put(async (req, res) => {
  try {
    const { id } = req.params;
    const result = await EmployeeBLL.updateEmployee(id, req.body);
    res.json(result);
  } catch (error) {
    error instanceof InvalidDataError ? res.status(404) : res.status(400);
    res.json(error.message);
  }
});

//DELETE
router.route('/:id').delete(async (req, res) => {
  try {
    const { id } = req.params;
    const result = await EmployeeBLL.deleteEmployee(id);
    res.json(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;