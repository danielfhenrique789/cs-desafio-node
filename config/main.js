"use strict";
(function(){
	const os = require("os");	
	const hostname = os.hostname();

	module.exports = {
		"passport" : {
			"secret" : "aksjkshaijsjkakjeiu775s56s455"
		},
		"mongoose" : {
			"connectString" : "mongodb://"+hostname+"/cs-desafio-node"
		}
	}
}())