/*
 *
 * Omneedia DB Library
 * version 1.0.1
 * Copyright (c) 2014-2015 CEREMA
 *
 */

var path=require('path');
var fs=require('fs');
 
function removeComments(str) {
    str = ('__' + str + '__').split('');
    var mode = {
        singleQuote: false,
        doubleQuote: false,
        regex: false,
        blockComment: false,
        lineComment: false,
        condComp: false 
    };
    for (var i = 0, l = str.length; i < l; i++) {
 
        if (mode.regex) {
            if (str[i] === '/' && str[i-1] !== '\\') {
                mode.regex = false;
            }
            continue;
        }
 
        if (mode.singleQuote) {
            if (str[i] === "'" && str[i-1] !== '\\') {
                mode.singleQuote = false;
            }
            continue;
        }
 
        if (mode.doubleQuote) {
            if (str[i] === '"' && str[i-1] !== '\\') {
                mode.doubleQuote = false;
            }
            continue;
        }
 
        if (mode.blockComment) {
            if (str[i] === '*' && str[i+1] === '/') {
                str[i+1] = '';
                mode.blockComment = false;
            }
            str[i] = '';
            continue;
        }
 
        if (mode.lineComment) {
            if (str[i+1] === '\n' || str[i+1] === '\r') {
                mode.lineComment = false;
            }
            str[i] = '';
            continue;
        }
 
        if (mode.condComp) {
            if (str[i-2] === '@' && str[i-1] === '*' && str[i] === '/') {
                mode.condComp = false;
            }
            continue;
        }
 
        mode.doubleQuote = str[i] === '"';
        mode.singleQuote = str[i] === "'";
 
        if (str[i] === '/') {
 
            if (str[i+1] === '*' && str[i+2] === '@') {
                mode.condComp = true;
                continue;
            }
            if (str[i+1] === '*') {
                str[i] = '';
                mode.blockComment = true;
                continue;
            }
            if (str[i+1] === '/') {
                str[i] = '';
                mode.lineComment = true;
                continue;
            }
            mode.regex = true;
 
        }
 
    }
    return str.join('').slice(2, -2);
};

function qstr(str) {
	//if (typeof str === 'object') return "";
	try {
		var obj='\''+str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
			console.log('o');
			switch (char) {
				case "\0":
					return "\\0";
				case "\x08":
					return "\\b";
				case "\x09":
					return "\\t";
				case "\x1a":
					return "\\z";
				case "\n":
					return "\\n";
				case "\r":
					return "\\r";
				case "%":
					return "%";
				case "\"":
				case "'":
				case "\\":
					return "\\"+char; // prepends a backslash to backslash, percent,
									  // and double/single quotes
			}
		})+'\'';
	} catch(e) {
		return '\''+str+'\'';
	};
	return obj;
};

function sql(q,params) {
	var util = require('util');
	var prj_d=PROJECT_API+path.sep+"sql"+path.sep+q+".sql";
	var prj_e=PROJECT_SYSTEM+path.sep+"sql"+path.sep+q+".sql";
	var d=__dirname+path.sep+".."+path.sep+".."+path.sep+"sql"+path.sep+q+".sql";
	if (fs.existsSync(d)) {
		var sql=fs.readFileSync(d,"utf-8");
		if (params) {
			for (var el in params) {
				var arr=sql.split('{'+el+'}');
				if (util.isArray(params[el])) {
					var tmp=[];
					for (var i=0;i<params[el].length;i++) {
						tmp.push(qstr(params[el][i]));
					};
					sql=arr.join(tmp.join(','));
				} else {
					if (isNaN(params[el]))
					sql=arr.join(qstr(params[el]));
					else
					sql=arr.join(params[el]);
				}
			};
		};
		return removeComments(sql);
	} else {
		if (!fs.existsSync(prj_d)) prj_d=prj_e;
		if (fs.existsSync(prj_d)) {
			var sql=fs.readFileSync(prj_d,"utf-8");
			if (params) {
				for (var el in params) {
					var arr=sql.split('{'+el+'}');
					if (util.isArray(params[el])) {
						var tmp=[];
						for (var i=0;i<params[el].length;i++) {
							tmp.push(qstr(params[el][i]));
						};
						sql=arr.join(tmp.join(','));
					} else {
						if (isNaN(params[el]))
						sql=arr.join(qstr(params[el]));
						else
						sql=arr.join(params[el]);
					}
				};
			};
			return removeComments(sql);
		} else return "";
	}
};

function getDriver(name,fn) {
	var m=MSettings.db;
	var temoin=false;
	for (var i=0;i<m.length;i++) {
		var db=m[i];
		if (db.name==name) {
			var uri=db.uri;
			var pos=uri.lastIndexOf('/');
			var database=uri.substr(pos+1,255);
			// check base type
			var type=uri.split('://')[0];
			var driver=__dirname+require('path').sep+"drivers"+require('path').sep+type+".js";
			if (fs.existsSync(driver)) return {
				uri: uri,
				lib: require(driver)
			};
			return {
				ERROR: "DRIVER_NOT_FOUND"
			};
		};
	};
	return {
		ERROR: "DB_NOT_FOUND"
	}
};

function getURI(name,fn) {
	var m=MSettings.db;
	var temoin=false;
	for (var i=0;i<m.length;i++) {
		var db=m[i];
		if (db.name==name) {
			return db.uri;
		}
	};
	return false;
};

function using(b) {
	var path=require('path');
	var fs=require('fs');
	var Sequelize=require('sequelize');
	var _connection = new Sequelize(getURI(b),{
		logging: function (str) {
			// SILENT
		}
	});
	var prj_home=PROJECT_HOME+path.sep+"src"+path.sep+'Contents'+path.sep+'Db'+path.sep+b+'.db';	
	var o={};
	if (fs.existsSync(prj_home)) {
		var dir=fs.readdirSync(prj_home);
		for (var i=0;i<dir.length;i++) {
			var pos=dir[i].lastIndexOf(path.sep)+1;
			var tb=dir[i].split('.js')[0].substr(pos,255);
			o[tb]=_connection.import(prj_home+path.sep+dir[i]);
		}
	};
	return o;
};

function query(name,sql,fn) {
	var db=getDriver(name);
	db.lib.query(db.uri,sql,fn);
};

function model(name,sql,fn) {
	var db=getDriver(name);
	db.lib.model(db.uri,sql,fn);
};

function store(name,sql,fn) {
	var db=getDriver(name);
	db.lib.store(db.uri,sql,fn);
};

function get(q,objects,where)
{
	var prj_d=PROJECT_API+path.sep+"sql"+path.sep+q+".universe";
	var prj_e=PROJECT_SYSTEM+path.sep+"sql"+path.sep+q+".universe";
	var d=__dirname+path.sep+".."+path.sep+".."+path.sep+"sql"+path.sep+q+".universe";
	if (fs.existsSync(d)) {
		var sql=fs.readFileSync(d,"utf-8").split('\n');
		var dbname=sql[0];
		sql=sql.splice(0);
		sql=sql.join(' ');
		sql=sql.replace('$_OBJECTS',objects.join(', '));
		if (where.length>0) {
			where.splice(0, 0, 'WHERE');
			sql=sql.replace('$_WHERE',where.join(' '));
		};
			return "SELECT "+sql.replace(/\n/g, "").replace(/\r/g, "").replace(/\s/g, " ").split('SELECT')[1];
		} else {
		if (!fs.existsSync(prj_d)) prj_d=prj_e;
		if (fs.existsSync(prj_d)) {
			var sql=fs.readFileSync(prj_d,"utf-8").split('\n');
			var dbname=sql[0];
			sql=sql.splice(0);
			sql=sql.join(' ');
			sql=sql.replace('$_OBJECTS',objects.join(', '));
			if (where.length>0) {
				where.splice(0, 0, 'WHERE');
				sql=sql.replace('$_WHERE',where.join(' '));
			};
			return "SELECT "+sql.replace(/\n/g, "").replace(/\r/g, "").replace(/\s/g, " ").split('SELECT')[1];
		} else return "";	
	}
};

function del(name,tb,ndx,cb) {
	var db=getDriver(name);
	db.lib.del(db.uri,tb,ndx,cb);
};

function post(name,tb,o,cb) {
	var db=getDriver(name);
	db.lib.post(db.uri,tb,o,cb);
};

function getIndex(name,tb,cb) {
	var db=getDriver(name);
	db.lib.getIndex(db.uri,tb,cb);
};

exports.query = query;
exports.model = model;
exports.store = store;
exports.del   = del;
exports.get   = get;
exports.post  = post;
exports.qstr  = qstr;
exports.using = using;
exports.sql   = sql;
exports.qstr  = qstr;
exports.getIndex  = getIndex;