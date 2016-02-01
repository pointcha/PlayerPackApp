var User = require('../datasets/users');
var fs = require('fs-extra');
var path = require('path');

module.exports.updatePhoto = function (req, res){
	var file = req.files.file;
	var userId = req.body.userId;

	console.log("User " + userId + " is submitting " , file);
	var now = new Date();
	var uploadDate = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());

	console.log(uploadDate);

	var tempPath = file.path;
	var targetPath = path.join(__dirname, "../../uploads/profilephotos" + userId + "_" + uploadDate + "_" + file.name);
	var savePath = "/uploads/profilephotos/" + userId + "_" + uploadDate + "_" + file.name;
	console.log(savePath);

	fs.rename(tempPath, targetPath, function (err){
		if (err){
			console.log(err);
		} else {
			User.findById(userId, function(err, userData){
				var user = userData;
				user.cardimage = savePath;
				user.save(function(err, userData){
					if (err){
						console.log("failed save");
						res.json({status: 500});
					} else {
						console.log("save successful");
						res.json({status: 200});
					}
				})
			});
		}
	});
};



module.exports.updateProfile = function (req, res){
console.log(req.body.userId);

	var userfirstname = req.body.userfirstname;
	var userlastname = req.body.userlastname;
	var usernumber = req.body.usernumber;
	var userposition = req.body.userposition;
	var userteam = req.body.userteam;
	var bio = req.body.bio;
	var userId = req.body.userId;

	User.findById(userId, function(err, userData){

		var user = userData;
		user.userfirstname = userfirstname;
		user.userlastname = userlastname;
		user.usernumber = usernumber;
		user.userposition = userposition;
		user.userteam = userteam;
		user.bio = bio;

		user.save(function(err){
			if (err){
				console.log("failed");
				res.json({status: 500});
			} else {
				console.log("success");
				res.json({status: 200});
			}
		})
	});
};



