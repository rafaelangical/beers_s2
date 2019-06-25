const userModel = require('../models/users');
const bcrypt = require('bcrypt');	
const jwt = require('jsonwebtoken');				

module.exports = {
	create: function(req, res, next) {
		//res.setHeader('Content-Type', 'application/json');
		//res.setHeader('Access-Control-Allow-Origin', '*');
		userModel.create({ name: req.body.name, email: req.body.email, password: req.body.password }, function (err, result) {
			if (err) 
				next(err);
			else
				var token = jwt.sign({id: result._id}, req.app.get('secretKey'), { expiresIn: '1h' });
				res.json({status: "success", message: "User added successfully!!!", data:{ token: token, user: result }});
				//console.log(`token:  ${token}`);
			});
	},
	list: function(req, res, next) {
		
		const user = userModel.find({});
			if (err) 
				next(err);
			else{
				console.log(user);
				return res.json({ user });
			}
	},
	authenticate: function(req, res, next) {
		userModel.findOne({email:req.body.email}, function(err, userInfo){
			if (err) {
				next(err);
			} else {

				if(userInfo != null && bcrypt.compareSync(req.body.password, userInfo.password)) {

					const token = jwt.sign({id: userInfo._id}, req.app.get('secretKey'), { expiresIn: '1h' }); 
					res.json({status:"success", message: "user found!!!", data:{user: userInfo, token:token}});	

				}else{
					res.json({status:"error", message: "Invalid email/password!!!", data: null});
				}
			}
		});
	},
}					
