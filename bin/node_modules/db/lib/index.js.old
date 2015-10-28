/*
 *
 * Omneedia DB Library
 * version 1.0.1
 * Copyright (c) 2014-2015 CEREMA
 *
 */
 
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

var path=require('path');
var fs=require('fs');

function replaceClientOnDisconnect(client) {
  client.on("error", function (err) {
    if (!err.fatal) {
      return;
    }
 
    if (err.code !== "PROTOCOL_CONNECTION_LOST") {
      throw err;
    }
 
    // client.config is actually a ConnectionConfig instance, not the original
    // configuration. For most situations this is fine, but if you are doing 
    // something more advanced with your connection configuration, then 
    // you should check carefully as to whether this is actually going to do
    // what you think it should do.
    client = mysql.createConnection(client.config);
    replaceClientOnDisconnect(client);
    connection.connect(function (error) {
      if (error) {
        // Well, we tried. The database has probably fallen over.
        // That's fairly fatal for most applications, so we might as
        // call it a day and go home.
        process.exit(1);
      }
    });
  });
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


function getMySQLType(typ) {
	var types=require('mysql').Types;
	for (var el in types) {
		if (types[el]==typ) return el;
	};
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

function connect(name,fn) {
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
			if (type=="mysql") {
				var db=require('mysql');
				var connection = db.createConnection(uri);
				connection.connect(function (err) {
					  if (err) {
						fn(err,null);
					  } else {
						fn(null,connection);
					  }
				});
				connection.on('error', function (err) {
				  fn(err,null);
				});
				replaceClientOnDisconnect(connection);				
			};
			if (type=="mssql") {
				var Sequelize=require('sequelize');
				var sequelize = new Sequelize('essai', 'sa', 'root', {
					host: '127.0.0.1',
					dialect: 'mssql',
					dialectOptions: {
						instanceName: 'SQLEXPRESS'
					}
				});		
				sequelize.authenticate().complete(function(err){
				if(err){
					callback('sequelize couldnt connect to database:' + err, false);
				}else{
					console.log('sequelize successfully connected to database.');					
				}
				});				
				sequelize.query("select * from person.stateprovince").spread(function(results, metadata) {
					//console.log(results);
					console.log(metadata);
				});
			}
		}
	};
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

function query(name,sql,fn) {
	connect(name,function(err,q) {
		console.log(err);
		console.log(q);
		if (q) {
			q.query(sql,function(err,rows,fields) {
				q.end();
				fn(err,rows);
			});
		}
	});
};

function store(name,sql,fn) {
	var response={
		"type" : "raw",
		"success" : false,
		"message" : "failure",
		"data" : []
	};
	connect(name,function(err,q) {
		if (q) {
			q.query(sql,function(err,rows,fields) {
				if (!err) {
					response.success=true;
					response.message="OK";
					response.data=rows;
					response.total=rows.length;
				} else {
					response.message=err;
				};
				q.end();
				fn(err,response);				
			});
		}
	})
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

function model(name,sql,fn) {
	var model={
		"type" : "raw",
		"metaData" : {
			"idProperty" : -1,
			"totalProperty" : "total",
			"successProperty" : "success",
			"root" : "data",
			"fields" : [],
			"columns" : []
		},
		"total" : 0,
		"data" : [],
		"success" : false,
		"message" : "failure"
	};	
	connect(name,function(err,q) {
		if (q) {
			var sql2=sql.split('LIMIT')[0];
			q.query(sql2,function(err,rows,fields) {
				if (!err) {
					var total=rows.length;
					q.query(sql,function(err,rows,fields) {
						if (!err) {
							model.success=true;
							model.message="OK";
							model.data=rows;
							model.total=total;
							for (var i=0;i<fields.length;i++) {
								var field=fields[i];
								var typ=getMySQLType(field.type).toLowerCase();
								if (typ=="var_string") typ="string";
								if (typ=="long") typ="int";
								if (typ=="newdecimal") typ="float";
								if (typ=="blob") typ="string";
								if (typ=="tiny") typ="boolean";
								if (typ=="short") typ="int";
								if (typ=="double") typ="float";
								if (field.flags=="16899") model.metaData.idProperty=field.name;
								var o={
									name: field.name,
									type: typ,
									length: field.length
								};
								if (o.type.indexOf("date")>-1) {
									o.dateFormat= 'c';
									o.type="date";
								};
								model.metaData.fields[model.metaData.fields.length]=o;
							};
						} else {
							model.message=err;
						};
						q.end();
						fn(err,model);
					});					
				} else {
					model.message=err;
					q.end();
					fn(err,model);
				}
			});
		}
	});
};

function update(name,tb,idx,values,cb)
{
	var response={
		"type" : "raw",
		"success" : false,
		"message" : "failure",
		"data" : []
	};
	var sql=[
		"UPDATE",
		tb,
		"SET"
	];
	var fields=[];
	for (var el in values) fields.push(el+'='+qstr(values[el]));
	sql.push(fields.join(', '));
	sql.push('WHERE');
};

function post(name,tb,o,cb) {
	var response={
		"type" : "raw",
		"success" : false,
		"message" : "failure",
		"data" : []
	};
	function isDate(e) {
		try {
			if (typeof e === 'object') {
				if (e.getUTCDay) return true; else return false;
			} else return false;
		}catch(e) {
			return false;
		}
	};
	function ISODateString(d){
		function pad(n){return n<10 ? '0'+n : n}
		return d.getFullYear()+'-'
			+ pad(d.getMonth()+1)+'-'
			+ pad(d.getDate()) +' '
			+ pad(d.getHours())+':'
			+ pad(d.getMinutes())+':'
			+ pad(d.getSeconds())
	};
	connect(name,function(err,q) {
		if (q) {
			var sql="";
			// get index
			q.query("show index from "+tb+" where Key_name = 'PRIMARY' ;",function(e,r) {
				if (r.length>0) {
					var ndx=r[0].Column_name;
					if (!o[ndx]) {
						//console.log('_____ INSERT');
						var fields=[];
						var values=[];
						for (var el in o) {
							fields.push(el);
							if (isDate(o[el])) {
								values.push(qstr(ISODateString(o[el])));
							} else {
								if (typeof o[el] === 'object') values.push(qstr(JSON.stringify(o[el]))); else values.push(qstr(o[el]));
							}
						};
						var sql="INSERT INTO "+tb+" ("+fields.join(',')+") VALUES ("+values.join(',')+")";
						//console.log(sql);
						q.query(sql,function(err,rows,fields) {
							q.end();
							cb(err,rows);
						});						
					} else {
						//console.log('_____ UPDATE');
						var fields=[];
						for (var el in o) {
							if (isDate(o[el])) {
								fields.push(el+'='+qstr(ISODateString(o[el])));
							} else {
								if (typeof o[el] === 'object') fields.push(el+'='+qstr(JSON.stringify(o[el]))); else
								fields.push(el+'='+qstr(o[el]));
							};
						};
						sql="UPDATE "+tb+" SET "+fields.join(',')+" WHERE "+ndx+"='"+o[ndx]+"'";
						//console.log(sql);
						q.query(sql,function(err,rows,fields) {
							q.end();
							cb(err,rows);
						});						
					}
				} else cb("ERR: No index in table",null);
			});
		}
	});
	
};

function del(name,tb,ndx,cb)
{
	var response={
		"type" : "raw",
		"success" : false,
		"message" : "failure",
		"data" : []
	};
	connect(name,function(err,q) {
		if (q) {
			var sql="";
			if (!ndx.isArray) ndx=[ndx];
			for (var i=0;i<ndx.length;i++) {
				ndx[i]=qstr(ndx[i]);
			};
			// get index
			q.query("show index from "+tb+" where Key_name = 'PRIMARY' ;",function(e,r) {
				if (r.length>0) {
					var x=r[0].Column_name;
					console.log('_____ DELETE');
					var sql="DELETE FROM "+tb+" WHERE "+x+" in ("+ndx.join(',')+")";
					console.log(sql);
					q.query(sql,function(err,rows,fields) {
						console.log(err);
						console.log(rows);
						q.end();
						cb(err,rows);
					});						
				}
			});
		}
	});
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
			console.log(dir[i]);
			o[tb]=_connection.import(prj_home+path.sep+dir[i]);
		}
	};
	return o;
};

exports.post = post;
exports.qstr = qstr;
exports.model	= model;
exports.store	= store;
exports.query	= query;
exports.connect = connect;
exports.sql = sql;
exports.get = get;
exports.del = del;
exports.qstr = qstr;
exports.using = using;