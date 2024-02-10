const express = require('express');
const app = express();
const errorMiddleware = require('./middleware/error')
const cokkieParser = require('cookie-parser');

app.use(express.json());
app.use(cokkieParser());

//route imports
const product = require('./routes/productRoute');
const user = require('./routes/userRoute');
app.use('/api/v1',product);

app.use('/api/v1',user);
//middleware for error
app.use(errorMiddleware);

module.exports = app