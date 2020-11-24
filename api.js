const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const sql = require('mssql');
const config = require('./config.js');
//var session = require('./session.js');

const app = express();

app.set('view engine', 'html');

app.engine('html', require('ejs').renderFile);

//app.use(express.static(path.join(__dirname + '/public')));
app.use(express.static(path.join(__dirname + '/public/html')));
//app.use(express.static(path.join(__dirname + '/public/html/index.html')));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());//The request data and ther response data will be formated in JSON form


module.exports = function () {

    app.get('/auth', function (req, res) {
        res.sendFile(path.join(__dirname + '/public/html/index.html'));
        });

        let userCommentsEJS = "";

        //connect to database
        sql.connect(config, function (err) {


            if (err) console.log(err);


            // create Request object
            var sqlRequest = new sql.Request();

            let sqlQuery = 'SELECT Comment FROM Users';

            sqlRequest.query(sqlQuery, function (err, data) {

                if (err) console.log(err)

                //dispaly the data
                console.log(data);
                console.table(data.recordset);
                console.log(data.rowsAffected);
                console.log(data.recordset[0]);  //this is the one we want!

                var i = 0;
                data.recordset.forEach(element => {
                    userCommentsEJS += "<tr><td><input style='text-align: left;' type='text' class='form-control' name='comments' value='" + data.recordset[i].Comment + "'></td></tr>";
                    i++;
                });

                console.log(userCommentsEJS);

                //res.render(path.join(__dirname + '/public/html/index.html'), {comments: userCommentsEJS });


                //send records as a response
                //res.send(data);
                sql.close();
            });
        });

    //});
    return app;
};

var server = app.listen(5000, function () {
    console.log('Server is running..');
});
