const express = require('express');
const app = express();


app.use('/', require('./api')());

//var server = app.listen(5000, function () {
 //   console.log('Server is running..');
//});



