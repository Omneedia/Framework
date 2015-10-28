var EventEmitter = require("events").EventEmitter
var CAS = require('xcas');
var util = require("util");

function CAS_Auth(options) {
	this.on("request", this.onRequest.bind(this));
	EventEmitter.call(this);
};

util.inherits(CAS_Auth, EventEmitter);

CAS_Auth.prototype.onRequest = function(req, res) {
	var _p=this;
	var cas = new CAS({
		base_url: MSettings.auth.cas.server.uri,
		version: 2.0
	});
	var ip = req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
	cas.authenticate(req, res, function(err, status, username, extended) {
		var profile={
			service: "cas",
			username: username
		};
		if (err) {
			_p.emit("error", req, res, err);
		} else {
			_p.emit("auth", req, res, profile)
		}
	});
};

module.exports = CAS_Auth;
