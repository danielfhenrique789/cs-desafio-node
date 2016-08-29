"use strict";
const assert = require('assert');
const UsersModel = require('../modules/api/models/Users');
const Users = require('../modules/api/schemas/Users');
const mongoose = require("mongoose");
mongoose.connect('mongodb://Mac-mini-de-Daniel.local/cs-desafio-node'); 

describe('Testes Usuarios signUp', function(){

	var user1;
	var user2;
	var user3;
	var usersModel;
	before(function(){
		user1 = new Users({
			"nome":"Daniel Fernandes Henrique",
		    "email":"danielfhenrique@gmail.com",
		    "senha":"teste123"
		});
		user2 = new Users({
			"nome":"Daniel Fernandes",
		    "email":"danielfernandes@gmail.com",
		    "senha":"teste123"
		});
		user3 = new Users({
			"nome": "string", 
			"email": "string", 
			"senha": "senha", 
			"telefones": [ { "numero": "123456789", "ddd": "11" } ] 
		})
		usersModel = new UsersModel;
  	});

	it('Teste inserir usuario1. Deve inserir.', function(done){
		var usersModel = new UsersModel;
		usersModel.signUp(user1,function(result){
			assert.equal(201,result.statusCode);
			assert.equal(true,result.status);
			assert.equal(false,(!result.result.data_criacao));
			assert.equal(false,(!result.result.data_atualizacao));
			assert.equal(false,(!result.result.ultimo_login));
			done();
		});
	});
	it('Teste inserir usuario2. Deve inserir.', function(done){
		var usersModel = new UsersModel;
		usersModel.signUp(user2,function(result){
			assert.equal(201,result.statusCode);
			assert.equal(true,result.status);			
			assert.equal(false,(!result.result.data_criacao));
			assert.equal(false,(!result.result.data_atualizacao));
			assert.equal(false,(!result.result.ultimo_login));
			done();
		});
	});
	it('Teste inserir usuario3. Deve inserir.',function(){
		var usersModel = new UsersModel;
		usersModel.signUp(user3,function(result){
			assert.equal(201,result.statusCode);
			assert.equal(true,result.status);			
			assert.equal(false,(!result.result.data_criacao));
			assert.equal(false,(!result.result.data_atualizacao));
			assert.equal(false,(!result.result.ultimo_login));
			done();
		});
	});
	it('Teste inserir usuario1 novamente. Não deve inserir.', function(done){
		var usersModel = new UsersModel;
		usersModel.signUp(user1,function(result){
			assert.equal(result.status, false);
			assert.equal(result.message, 'E-mail já existe');
			done();
		});
	});
	

});

describe('Testes Usuarios signIn', function(){

	var user1;
	var user2;
	var usersModel;
	before(function(){
		user1 = new Users({
			"nome":"Daniel Fernandes Henrique",
		    "email":"danielfhenrique@gmail.com",
		    "senha":"teste123"
		});
		user2 = new Users({
			"nome":"Daniel Fernandes",
		    "email":"danielfernandes@gmail.com",
		    "senha":"teste123"
		});
		usersModel = new UsersModel;
  	});
	
	it('Teste login usuario1. Logar sem erro.', function(done){
		var usersModel = new UsersModel;
		usersModel.signIn(user1,function(result){
			assert.equal(true,result.status);
			done();
		});
	});

	it('Teste login usuario2. Senha incorreta, erro.', function(done){
		var usersModel = new UsersModel;
		user2.senha = "152454";
		usersModel.signIn(user2,function(result){
			assert.equal(result.status, false);
			assert.equal("Usuário e/ou senha inválidos",result.message);
			done();
		});
	});
	it('Teste login usuario2. Email incorreta, erro.', function(done){
		var usersModel = new UsersModel;
		user2.email = "152454";
		user2.senha = "teste123";
		usersModel.signIn(user2,function(result){
			assert.equal(result.status, false);
			assert.equal("Usuário e/ou senha inválidos",result.message);
			done();
		});
	});

});

describe('Testes Usuarios search', function(){
	var usersModel;
	before(function(){
		usersModel = new UsersModel;
  	});

  	after(function(done){
		usersModel.remove({},function(result){		
			assert.equal(true,result.status);
			done();
		});
  	});
	
	it('Teste Busca. Encontra 3 registros.', function(done){
		usersModel.find({},{},function(result){
			assert.equal(3,result.result.length);
			done();
		});
	});
});