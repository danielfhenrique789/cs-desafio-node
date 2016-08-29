"use strict";
(function(){
	const mongoose = require("mongoose");
	const Schema   = mongoose.Schema;

	const Users = new Schema({
		"nome": String,
		"email": String,
		"senha": String,
		"token": String,
		"telefones": [ { "numero": String, "ddd": String } ],	
		"data_criacao": Date,
		"data_atualizacao": Date,
		"ultimo_login": Date
	});

	module.exports =  mongoose.model("Users",Users);
}())