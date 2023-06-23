const mongoose = require('mongoose');

const connectDB = () => {
  console.log('trying to connect')
  mongoose
    .connect('mongodb://127.0.0.1:27017/factoryDB')
    .then(() => console.log('Connected to factoryDB!'))
    .catch((error) => console.log('error'));
};

module.exports = connectDB;
