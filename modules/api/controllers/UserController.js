"use strict";
(function(){
const HelperJson = require('./../../../lib/helpers/JsonUtils');
const UsersModel = require('./../models/Users');
const Users = require('./../schemas/Users');

module.exports = {
	"signUp" : function(req,res){
		var users = new Users(req.body);
		var usersModel = new UsersModel;
		usersModel.signUp(users,function(result){ res.status(result.statusCode).send(HelperJson.getResultJson(result)); });
	},
	"signIn" : function(req,res){
		var users = new Users(req.body);
		var usersModel = new UsersModel;
		usersModel.signIn(users,function(result) { res.status(result.statusCode).send(HelperJson.getResultJson(result)); });
	},
	"search" : function(req,res){
		var usersModel = new UsersModel;
		usersModel.find({},{},function(result){	res.status(result.statusCode).send(HelperJson.getResultJson(result)); });
	}
}
}())