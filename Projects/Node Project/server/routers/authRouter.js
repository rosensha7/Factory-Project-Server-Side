const express = require('express');
const jwt = require('jsonwebtoken');
const usersCredentialsBLL = require('../BLL/usersCredentialsBLL');

const router = express.Router();

// Entry Point: 'http://localhost:8000/auth

router.route('/login').post(async (req, res) => {
  try {
    const { username, email } = req.body;
    const {isValid, id} = await usersCredentialsBLL.validateCredentials(username, email);
    if (isValid) {
      const secretToken = "someKey";
      const accessToken = jwt.sign(
        { id }, //sign each user with its unique ID
        secretToken,
        // { expiresIn: 14400 } // expires after 14400s
      );
      res.json({ accessToken });
    }
  } catch (error) {
    res.status(401).json(error.message);
  }
});

module.exports = router;