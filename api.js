const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const sql = require('mssql');
const config = require('./config.js');
//var session = require('./session.js');

const app = express();

app.set('view engine', 'html');

app.engine('html', require('ejs').renderFile);

app.use(express.static(path.join(__dirname + '/public')));
app.use(express.static(path.join(__dirname + '/public/html')));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());//The request data and ther response data will be formated in JSON form


module.exports = function () {

    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname + '/public/html/index.html'));

        let userCommentsEJS = "";

        sql.connect(config, function (err) {

            if (err) console.log(err);

            // create Request object
            var sqlRequest = new sql.Request();
            let sqlQuery = "SELECT * FROM dbo.Users WHERE Comments = '";
            console.log(sqlQuery);

            sqlRequest.query(sqlQuery, function (err, data) {
                if (err) console.log(err)
                console.log(data);
                console.log(data.recordset);

                var i = "";
                data.recordset.forEach(element => {
                    userCommentsEJS += "<tr><td><input style='text-align: left;' type='text' class='form-control'  name='Comment' value='" + data.recordset[i].Comment + "'></td></tr>";
                    i++;
                });
                //console.log(i)

                res.render(path.join(__dirname + '/public/html/index.html'), { comments: userCommentsEJS });

                sql.close();
            });

        });


        //app.get('/auth', function (req, res) { //for testing only
        /*app.post('/auth', function (req, res) {

            //res.sendFile(path.join(__dirname + '/public/html/WelcomePage.html'));

            // connect to your database 
            sql.connect(config, function (err) {
                if (err) console.log(err);

                // create Request object
                var sqlRequest = new sql.Request();

                let email = req.body.email;
                //let FirstName= req.body.fname
                let pwd = req.body.pwd;

                let sqlQuery = "SELECT Email FROM dbo.Users WHERE Email = '" + email + "';";
                //console.log(sqlQuery);

                sqlRequest.query(sqlQuery, function (err, data) {
                    if (err) {
                        console.log(err)
                        res.sendFile(path.join(__dirname + '/public/html/index.html'));
                        // Crash if username not in the database to be resolved!
                    }

                    else {
                        //to remove in production version if not I will expose the password of the user 
                        //console.log(data);
                        //console.log(data.recordset[0].UserPassword + " from SQL");


                        if (data.recordset[0].UserPass == pwd) {
                            userSession = email;
                            console.log("Welcome1 " + usersession + " from Guestbook Page!")

                            //////////////////////////////
                            //res.redirect('/html/WelcomePage.html'); // How to refirect to the get welcompage route
                            //////////////////////////////

                            sql.connect(config, function (err) {
                                if (err) console.log(err);
                                // create Request object
                                var sqlRequest = new sql.Request();
                                let sqlQuery = "SELECT * Comments FROM dbo.Users WHERE Email = '" + userSession + "';";
                                //console.log(sqlQuery);

                                sqlRequest.query(sqlQuery, function (err, data) {
                                    if (err) console.log(err)
                                    //console.log(data);
                                    //console.log(data.recordset);

                                    var li = "";
                                    data.recordset.forEach(element => {
                                        tool7table3EJS += "<tr><td><input style='text-align: left;' type='text' class='form-control'  name='Meth' value='" + data.recordset[i].Method + "'></td><td><input style='text-align: left;' type='text' class='form-control'  name='details' value='" + data.recordset[i].Details + "'></td></tr>";
                                        i++;
                                    });
                                    sql.close();
                                });
                            });

                            //projectName =  req.body.project;

                            console.log("Welcome in " + projectName + " ! from Welcome Page! ");
                            //////////////////////////////
                            return;
                        }
                        else {

                            console.log("Login or Password incorrect!");
                            //res.send("Login or Password incorrect!");
                            res.sendFile(path.join(__dirname + '/public/html/LoginPage.html'));
                            //return false;
                        }
                        //res.end();
                        sql.close();
                    }
                });
            });*/
        });
        return app;
    };

//var server = app.listen(5000, function () {
 // console.log('Server is running..');
//});
