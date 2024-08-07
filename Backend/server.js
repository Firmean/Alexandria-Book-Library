const express = require('express');
const db = require('./connection.js');
const app = express();
const cors = require('cors');
const path = require('path');
app.use(express.json());
app.use(cors());


const userRouter = require('./routes/user');
const adminRouter = require('./routes/admin');
const bookRouter = require('./routes/book');
app.use('/user', userRouter);
app.use('/admin', adminRouter);
app.use('/book', bookRouter);
app.use("/uploads",express.static(path.join(__dirname, "./uploads/")));

const PORT = 3000;
app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});