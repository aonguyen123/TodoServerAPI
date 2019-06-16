const express = require("express");
//const passport = require('passport');
//const session = require('express-session');
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const config = require("./config/database");
const logInRouter = require('./api/route/loginRouter');
const checkRouter = require('./api/route/checkRouter');
const todoRouter = require('./api/route/todoRouter');
//const loginFacebookRouter = require('./api/route/loginFacebookRouter');
//const configPassport = require('./config/passport');

//configPassport(passport);
const app = express();

const port = process.env.PORT || 4000

app.listen(port, function () {
    console.log('Server listening port ' + port);
});

app.use("/assets", express.static(__dirname + "/public")); //cung cap tai nguyen tinh cho nguoi dung
app.use(bodyParser.json()); // du lieu muon doc tu nguoi dung gui len la json
app.use(bodyParser.urlencoded({ extended: true })) //kieu du lieu mong muon la tuy y

app.use(morgan('dev')); // log moi request ra console

mongoose.connect(config.getDbConnectionString()).then(
    () => {
        console.log('connected to mongoDB');
    },
    (err) => {
        console.log('err', err);
    }
);

logInRouter(app);
checkRouter(app);
todoRouter(app);
//loginFacebookRouter(passport, app);