// Orad Dostra : 208939736
// Niv Vardi: 209083278

/* imports */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const costRouter = require('./routes');
require('dotenv').config();



const app = express();
const port = 3000;
const connectionString = process.env.MONGODB_CONNECTION_STRING;


/* uses */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(costRouter);
app.use(express.json());
app.use(cors());
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

/* Mongo Connection */
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });
