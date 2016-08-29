"use strict";
(function(){
	const IsTokenValid = require("./lib/helpers/IsTokenValid");
	const User = require("./modules/api/controllers/UserController");
	module.exports = function(app){
		app.post('/api/user/signup',User.signUp);
		app.post('/api/user/signin',User.signIn);
		app.get('/api/user/search',IsTokenValid,User.search);
	}
}())