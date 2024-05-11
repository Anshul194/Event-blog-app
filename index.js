const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./config/dbConfig');
require('dotenv').config();
const router=require('./Routes')

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('./middleware/errorHandler'));

app.use('/', router);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  

    module.exports=app;
