const express = require('express');  //Require the package
const app = express();                  //initialise express for the "app"
const bodyParser = require('body-parser');  //make form data avialble once POST is done
const path = require('path');           //helps with res.SendFile serve up the file when visitor visits sweb site

app.use(bodyParser.urlencoded({ extended: false }));

/*app.use(express.static(path.join(__dirname + '/public')));
app.use(express.static(path.join(__dirname + '/public/html/')));
app.use(express.static(path.join(__dirname + '/public/html/index.html')))*/

app.get('/', function (req, res) {
    res.send('<h1>Hello Node Web Server<h1>');
    //res.sendFile(path.join(__dirname + 'index.html'));
});

/*app.post('/auth', function(req, res) {  //start the app.post- DB connection and Query need to be inside app.post callback function*/

const sql = require("mssql");


//configure database
const config = {
    user: 'sa',
    password: 'BVC12345',
    server: 'ACERLAPTOP\\SQLEXPRESS',
    database: 'MyGuestbook',
    
    port: 1433,
    options: {
        encrypt: true,
        enableArithAbort: true
    }
};

sql.connect(config, function (err) {
    //get the form data from Select element bodyparser (element name)
    /*let firstName= req.body.fName;
    console.log(firstName);
    let lastName= req.body.lname;
    console.log(lastName);
    let emailAdd= req.body.email;
    console.log(emailAdd);
    let password= req.body.pwd;
    console.log(password);*/


    if (err) console.log(err);
    
    // create new Request object to query with
    var sqlRequest = new sql.Request();

    let sqlQuery='SELECT Comment FROM Users';

    sqlRequest.query(sqlQuery, function(err,data){

    
        if (err) console.log(err)

        //dispaly the data
        console.log(data);  //produces object object
        console.table(data.recordset); //produced index and comment table
        console.log(data.rowsAffected); //number
        console.log(data.recordset[0]); //1st comment
        console.log(data.recordset[1]); //2nd comment

        //res.send(data);         //output the raw data 
       
        //Close the connection
        sql.close();
    }); 
});
//});                 //this line closes the app.post

//The name of the web server
var server = app.listen(5000, function () {
    console.log('Node Web Server is running..');
});

