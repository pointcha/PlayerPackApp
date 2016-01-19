var mongoose = require('mongoose');
var User = require('../datasets/users');

module.exports.signup = function (req, res, next){
	var user = new User(req.body);
	user.save();

	res.json(req.body);
	next();
}

module.exports.login = function (req, res){
	User.find(req.body, function (err, results){
		if (err){
			console.log("Error out");
		} 

		if (results && results.length === 1){
			res.json(req.body.email);
			
		}
	});
}