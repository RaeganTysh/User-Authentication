const express = require('express');
const app = express();


//var userSession = "";
//var projectName = "projectU1";

//global.userSession ="";
//global.projectName ="projectU1";


app.use('/', require('./api')());
//app.use('/', require('./newAccount')());
//app.use('/', require('./accountSetting')());
//app.use('/', require('./welcomePage')());
//app.use('/', require('./newProject')());
//app.use('/', require('./ToolsPage')());
//app.use('/', require('./Tool1')());
//app.use('/', require('./Tool2')());
//app.use('/', require('./Tool3')());
//app.use('/', require('./Tool4')());
//app.use('/', require('./Tool5')());
//app.use('/', require('./Tool6')());
//app.use('/', require('./Tool7')());
//app.use('/', require('./Tool8')());
//app.use('/', require('./Tool9')());
//app.use('/', require('./Logout')());
//app.use('/', require('./viewDoc')());

var server = app.listen(5000, function () {
    console.log('Server is running..');
});



