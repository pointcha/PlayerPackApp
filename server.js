var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();
var authenticationController = require('./server/controllers/authentication-controller');

mongoose.connect('mongodb://root@localhost:27017/PlayerPackTeam'); // connect to our database

app.use(bodyParser.json());
app.use('/app', express.static(__dirname + "/app"));
app.use('/node_modules', express.static(__dirname + "/node_modules"));


app.get('/', function(req, res) {
        res.sendfile('index.html'); 
    });

//Authentication
app.post('/api/user/signup', authenticationController.signup, function(req, res){
	res.send();
});
app.post('/api/user/login', authenticationController.login);

app.listen('3000', function (){
	console.log("Listening for Local Host 3000")
});