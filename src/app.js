//require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const apiRouter = require('./routes');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const cors = require('cors');


app.get('/', (req, res) => {
    res.send('Hello word');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
