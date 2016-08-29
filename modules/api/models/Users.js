"use strict";
(function(){
	const Class = require('./../../../lib/Class');
	const Crud = require('./../../../lib/Crud');
	const Users = require('./../schemas/Users');
	const Cripto = require('./../../../lib/helpers/CriptoUtils');
	const Config = require('./../../../config/main');
	const jwt = require('jsonwebtoken');

	const User = Class.name("Users").extends(Crud).begin(function(constructor)
	{
		const self = this;
		Crud.call(self,Users);

		self.signUp = function(pUser,callback)
		{	
			self.findOne({"email": pUser.email},{},function(result){
				if(result.status && result.result != null){
					callback({"message":"E-mail já existe","status":false,"statusCode":401});
				}
				else{
					pUser.senha = Cripto.hash(pUser.senha,"asdbakjs");
					pUser.data_criacao = Date.now();
					pUser.data_atualizacao = Date.now();
					pUser.ultimo_login = Date.now();
					self.save(pUser,function(result){ 
						result.result = {
							id : result.result._id,
							data_criacao : result.result.data_criacao,
							data_atualizacao : result.result.data_atualizacao,
							ultimo_login : result.result.ultimo_login
						};
						result.result.token = jwt.sign(result.result,Config.passport.secret,{"expiresIn":3080});
						callback(result);
					});
				}
			});
		}
		self.signIn = function(pUser,callback)
		{
			self.findOne({"email": pUser.email},{},function(result)
			{		
				var msgErrorLogin = "Usuário e/ou senha inválidos";
				if(!result.status){
					callback(result);
				}
				else{				
					var user = result.result;	
					var senha = Cripto.hash(pUser.senha,"asdbakjs");
					if(user && user.senha == senha){
						user.ultimo_login = Date.now();
						self.save(user,function(result){ callback(result); });
					}
					else{
						callback({"message":msgErrorLogin,"status":false,"statusCode":401});
					}
				}		
			});
		}
	});
	module.exports = User;
}())