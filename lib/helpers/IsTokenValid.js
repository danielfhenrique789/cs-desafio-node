"use strict";
(function(){

	const jwt = require('jsonwebtoken');
	const config = require("./../../config/main");
	const Users = require("./../../modules/api/models/Users");
	module.exports = function(req,res,next){
	  var token = req.get("Authorization");

	  // decode token
	  if (token) {

	    // verifies secret and checks exp
	    jwt.verify(token, config.passport.secret, function(err, decoded) {      
	      if (err) {
	        return res.status(403).send({ status: false, message: 'Não autorizado' });    
	      } else {
	      	var now = new Date();
	      	var last = new Date(decoded.ultimo_login);
	      	var time = Math.round((now-last)/(1000*60));

	      	if(time > 30){
	        	return res.status(408).send({ status: false, message: 'Sessão inválida' });  
	      	}

	      	var userModel = new Users;
	      	var user = userModel.findOne({"_id": decoded.id},{},function(result){	
	      		if(result.status && result.result != null){      		
		        	req.user = decoded;  
			        next();
			    }
			    else{
			    	res.status(403).send({ status: false, message: 'Não autorizado' });
			    }
	      	});

	      }
	    });

	  } else {

	    // if there is no token
	    // return an error
	    return res.status(403).send({ 
	        status: false, 
	        message: 'Não autorizado' 
	    });
	    
	  }
	}
}())