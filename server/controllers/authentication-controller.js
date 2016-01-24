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
			var userData = results[0];
			res.json({email: req.body.email,
					_id: userData._id});
		}
	});
}