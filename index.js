require('dotenv').config();
require('./db');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./src/controllers/routes');

const port = process.env.PORT || 6000;

// connectToDatabase();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use('/products', routes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
