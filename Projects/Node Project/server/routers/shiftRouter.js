const express = require('express');
const router = express.Router();
const ShiftBLL = require('../BLL/shiftBLL');
const { InvalidDataError } = require('../errors/invalidDataError');
const { validateToken } = require('../DAL/token');
const { updateActions } = require('../middlewares/actionManager');

// Entry Point: 'http://localhost:8000/shift

router.use(validateToken);
router.use(updateActions);

//GET ALL
router.route('/').get(async (req, res) => {
    try {
        const shifts = await ShiftBLL.getAllShifts();
        res.json(shifts);
    } catch (error) {
        res.status(400).json(error.message);
    }
});

//GET BY ID
router.route('/:id').get(async (req, res) => {
    try {
        const {  id } = req.params;
        const shift = await ShiftBLL.getShiftById(id);
        res.json(shift);
    } catch (error) {
        res.status(400).json(error);
    }
});

//ADD
router.route('/').post(async (req, res) => {
    try {
        const newShift = req.body;
        const result = await ShiftBLL.addShift(newShift);
        res.json(result)
    } catch (error) {
        error instanceof InvalidDataError ? res.status(404) : res.status(400);
        res.json(error.message);
    }
});

//UPDATE
router.route('/:id').put(async (req, res) => {
    try {
        const { id } = req.params;
        const result = await ShiftBLL.updateShift(id, req.body);
        res.json(result)
    } catch (error) {
        error instanceof InvalidDataError ? res.status(404) : res.status(400);
        res.json(error.message);
    }
});

module.exports = router;