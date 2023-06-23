const express = require('express');
const router = express.Router();
const DepartmentBLL = require('../BLL/departmentBLL');
const { InvalidDataError } = require('../errors/invalidDataError');
const { validateToken } = require('../middlewares/validationManager');
const { updateActions } = require('../middlewares/actionManager');

// Entry Point: 'http://localhost:8000/departments

router.use(validateToken);
router.use(updateActions);

//GET ALL
router.route('/').get(async (req, res) => {
    try {
        const departments = await DepartmentBLL.getAllDepartments();
        res.json(departments);
    } catch (error) {
        res.status(400).json(error.message);
    }
});

//GET BY ID
router.route('/:id').get(async (req, res) => {
    try {
        const department = await DepartmentBLL.getDepartmentById(req.params.id);
        res.json(department);
    } catch (error) {
        res.status(400).json(error.message);
    }
});

//ADD
router.route('/').post(async (req, res) => {
    try {
        const newDepartment = req.body;
        const result = await DepartmentBLL.addDepartment(newDepartment);
        res.json(result);
    } catch (error) {
        error instanceof InvalidDataError ? res.status(404).json(error.message) : res.status(400).json(error.message);
    }
});

//UPDATE
router.route('/:id').put(async (req, res) => {
    try {
        const result = await DepartmentBLL.updateDepartment(req.params.id, req.body);
        res.json(result);
    } catch (error) {
        error instanceof InvalidDataError ? res.status(404).json(error.message) : res.status(400).json(error.message);
    }
});

//DELETE
router.route('/:id').delete(async (req, res) => {
    try{
        const result = await DepartmentBLL.deleteDepartment(req.params.id);
        res.json(result)
    } catch (error) {
        error instanceof InvalidDataError ? res.status(404).json(error.message) : res.status(400).json(error.message);
    }
});

module.exports = router;