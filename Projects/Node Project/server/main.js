const express = require('express');
const cors = require('cors')
const connectDB = require('./configs/db')

const authRouter = require('./routers/authRouter');
const employeeRouter = require('./routers/employeeRouter');
const departmentRouter = require('./routers/departmentRouter');
const shiftRouter = require('./routers/shiftRouter');
const usersRouter = require('./routers/usersRouter');

const app = express();
const port = 8000;

connectDB()

app.use(cors())
app.use(express.json());

app.use('/auth', authRouter);
app.use('/employees', employeeRouter);
app.use('/departments', departmentRouter);
app.use('/shifts', shiftRouter);
app.use('/users', usersRouter);

app.listen(
  port,
  () => console.log(`app is listening at http://localhost:${port}`)
);