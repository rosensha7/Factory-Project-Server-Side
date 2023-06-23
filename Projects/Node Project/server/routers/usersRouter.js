const express = require('express');
const router = express.Router();
const UserBLL = require('../BLL/usersBLL');
const { InvalidDataError } = require('../errors/invalidDataError');
const { updateActions } = require('../middlewares/actionManager');
const { validateToken } = require('../middlewares/validationManager');

// Entry Point: 'http://localhost:8000/users

router.use(validateToken);
router.use(updateActions);

//GET ALL
router.route('/').get(async (req, res) => {
    try {
        const users = await UserBLL.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(400).json(error.message);
    }
});

//GET BY ID
router.route('/:id').get(async (req, res) => {
    try {
        const { id } = req.params;
        const user = await UserBLL.getUserById(id);
        res.json(user);
    } catch (error) {
        res.status(400).json(error.message);
    }
});

//ADD
router.route('/').post(async (req, res) => {
    try {
        const result = await UserBLL.addUser(req.body);
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
        const result = await UserBLL.updateUser(id, req.body);
        res.json(result)
    } catch (error) {
        error instanceof InvalidDataError ? res.status(404) : res.status(400);
        res.json(error.message);
    }
});

//DELETE
router.route('/:id').delete(async (req, res) => {
    try {
        const { id } = req.params;
        const result = await UserBLL.deleteUser(id);
        res.json(result);
    } catch (error) {
        res.status(400).json(error.message);
    }
});

module.exports = router;