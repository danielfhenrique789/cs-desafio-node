"use strict";
(function(){
const crypto = require('crypto');

module.exports = {
	"hash" : function(text,secret){
		return crypto.createHmac('sha256', secret).update(text).digest('hex');
	}
}
}())