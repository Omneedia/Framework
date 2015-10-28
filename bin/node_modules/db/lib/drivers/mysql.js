function qstr(str) {
	//if (typeof str === 'object') return "";
	if (str=="null") return 'null';
	try {
		if (str.indexOf('’')>-1) str=str.replace(/’/g,"'");
	}catch(e) {};
	try {
		var obj='\''+str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
			//console.log('o');
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

module.exports={
	connect: function(name,fn) {
		var db=require('mysql');
		function replaceClientOnDisconnect(client) {
			client.on("error", function (err) {
				if (!err.fatal) {
				  return;
				};
				if (err.code !== "PROTOCOL_CONNECTION_LOST") {
				  throw err;
				};		 
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
		var connection = db.createConnection(name);
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
	},
	query: function(name,sql,fn) {
		this.connect(name,function(err,q) {
			if (err) fn('CONNECTION_REFUSED',err); else  {
				q.query(sql,function(err,rows,fields) {
					q.end();
					fn(err,rows);
				});			
			};
		});
	},
	model: function(name,sql,fn) {
		function getMySQLType(typ) {
			var types=require('mysql').Types;
			for (var el in types) {
				if (types[el]==typ) return el;
			};
		};
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
		this.connect(name,function(err,q) {
			if (err) fn('CONNECTION_REFUSED',err); else  {
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
	},
	store: function(name,sql,fn) {
		var response={
			"type" : "raw",
			"success" : false,
			"message" : "failure",
			"data" : []
		};
		this.connect(name,function(err,q) {
			if (err) fn('CONNECTION_REFUSED',err); else  {
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
	},
	del: function(name,tb,ndx,cb) {
		var response={
			"type" : "raw",
			"success" : false,
			"message" : "failure",
			"data" : []
		};
		this.connect(name,function(err,q) {
			if (err) fn('CONNECTION_REFUSED',err); else  {
				var sql="";
				if (!ndx.isArray) ndx=[ndx];
				for (var i=0;i<ndx.length;i++) {
					ndx[i]=qstr(ndx[i]);
				};
				// get index
				q.query("show index from "+tb+" where Key_name = 'PRIMARY' ;",function(e,r) {
					if (r.length>0) {
						var x=r[0].Column_name;
						//console.log('_____ DELETE');
						var sql="DELETE FROM "+tb+" WHERE "+x+" in ("+ndx.join(',')+")";
						q.query(sql,function(err,rows,fields) {
							q.end();
							cb(err,rows);
						});						
					}
				});
			}
		});
	},
	posts: function(name,tb,o,ndx,results,cb) {
		var _p=this;
		this.post(name,tb,o[ndx],function(e,r) {
			if (ndx+1<o.length) {
				if (e) results.push(e); else results.push(r);
				_p.posts(name,tb,o,ndx+1,results,cb);
			} else {
				if (e) results.push(e); else results.push(r);
				cb(null,results);
			};
		});
	},
	getIndex: function(name,tb,cb) {
		this.connect(name,function(err,q) {
			if (err) fn('CONNECTION_REFUSED',err); else  {
				var sql="";
				// get index
				//console.log("show index from "+tb+" where Key_name = 'PRIMARY' ;");
				q.query("show index from "+tb+" where Key_name = 'PRIMARY' ;",function(e,r) {
					//console.log(e);
					if (!r) cb(false); else 
					if (r.length>0) {
						var ndx=r[0].Column_name;
						cb(ndx);
					} else cb(false);
				});
			}
		});
	},
	post: function(name,tb,o,cb) {
		var response={
			"type" : "raw",
			"success" : false,
			"message" : "failure",
			"data" : []
		};
		if( Object.prototype.toString.call( o ) === '[object Array]' ) {
			if (o.length==0) {
				response.message="success";
				response.success=true;
				cb(response);
				return;
			};
			this.posts(name,tb,o,0,[],cb);
			return;
		};
		function isDate(fld,e,response) {
			for (var i=0;i<response.length;i++) {
				if (response[i].Field==fld) {
					if (response[i].Type.indexOf('date')>-1) return true; else return false;
				};
			};
		};
		function ISODateString(d){
			if (!d) return null;
			function isDate(d) {
				return (d instanceof Date && !isNaN(date.valueOf()));
			};
			String.prototype.toDate=function(){
				try{
					var mydate=this.split('T')[0];
					var mytime=this.split('T')[1].split('Z')[0];
					var y=mydate.split('-')[0]*1;
					var M=mydate.split('-')[1]*1-1;
					var d=mydate.split('-')[2]*1;
					var h=mytime.split(':')[0]*1;
					var m=mytime.split(':')[1]*1;
					var s=mytime.split(':')[2]*1;
					var x=new Date(y,M,d,h,m,s);
					x.setHours(x.getHours() - x.getTimezoneOffset() / 60);
					return x;
				} catch(e) {
					return new Date(0,0,0,0,0,0);
				}
			};			
			function pad(n){return n<10 ? '0'+n : n};
			try{
				if (!isDate(d)) d=d.toDate();
			}catch(e){
			};
			return d.getFullYear()+'-'
				+ pad(d.getMonth()+1)+'-'
				+ pad(d.getDate()) +' '
				+ pad(d.getHours())+':'
				+ pad(d.getMinutes())+':'
				+ pad(d.getSeconds());
		};
		function getBase64(fld,x,ob,cb) {
			if (!fld[x]) cb(); else {				
				var path=ob[fld[x].Field];
				if (!path) {
					x++;
					getBase64(fld,x,ob,cb);
					return;
				};
				var request = App.using('request').defaults({ encoding: null });
				if (path.indexOf('url(')>-1) path=path.substr(path.indexOf('url(')+1,path.length-1);
				if (path.indexOf('://')>-1)
				request.get(path, function (error, response, body) {
					if (!error && response.statusCode == 200) {
						data = "data:" + response.headers["content-type"] + ";base64," + new Buffer(body,'binary').toString('base64');
						ob[fld[x].Field]=data;
						x++;
						getBase64(fld,x,ob,cb);
					} else {
						// ressource non disponible
						x++;
						getBase64(fld,x,ob,cb);						
					}
				}); else {
					x++;
					getBase64(fld,x,ob,cb);					
				}
			}
		};
		var isDBX=0;
		this.connect(name,function(err,q) {
			if (err) fn('CONNECTION_REFUSED',err); else  {
				var sql="";
				// get index
				q.query("SHOW COLUMNS FROM "+tb,function(e,response) {
					var r=[];
					var _fields=[];
					for (var i=0;i<response.length;i++) {
						if (response[i].Key=="PRI") r.push({
							Column_name: response[i].Field
						});
						var tytpe=response[i].Type.toUpperCase();
						if (response[i].Field=="createdAt") isDBX=1;
						if ((tytpe=="LONGTEXT") || (tytpe.indexOf('BLOB')>-1) || (tytpe.indexOf('BINARY')>-1)) _fields.push(response[i]);
					};
					getBase64(_fields,0,o,function() {					
						if (r.length>0) {
							//console.log(o);
							var ndx=r[0].Column_name;
							if (!o[ndx]) {
								//console.log('_____ INSERT');
								var fields=[];
								var values=[];
								for (var el in o) {
									fields.push(el);
									if (isDate(el,o[el],response)) {
										try {
											if (o[el].indexOf('T')>-1) values.push(qstr(o[el].split('T')[0]+' '+o[el].split('T')[1].split('Z')[0]));
										} catch(e) {
											values.push(qstr(ISODateString(o[el])));
										}
									} else {
										if (typeof o[el] === 'object') values.push(qstr(JSON.stringify(o[el]))); else {
											try {
												if (o[el].toLowerCase()=="null") values.push(o[el].toUpperCase()); else values.push(qstr(o[el]));
											} catch(e) {
												values.push(qstr(o[el]));
											}
										}
									}
								};
								if (isDBX==1) {
									fields.push("createdAt");
									values.push(qstr(new Date().toISOString().slice(0, 19).replace('T', ' ')));
									fields.push("updatedAt");
									values.push(qstr(new Date().toISOString().slice(0, 19).replace('T', ' ')));
								};
								var sql="INSERT INTO "+tb+" ("+fields.join(',')+") VALUES ("+values.join(',')+")";
								console.log(sql);
								q.query(sql,function(err,rows,fields) {
									q.end();
									if (rows) {
										err=null;
										rows.method="INSERT";
									} else rows=err;
									cb(err,rows);
								});						
							} else {
								var sql="SELECT * FROM "+tb+" WHERE ";
								var params=[];
								for (var j=0;j<r.length;j++) {
									var ndx=r[j].Column_name;
									params.push(ndx+'='+qstr(o[ndx]));
								};
								sql+=params.join(' AND ');
								q.query(sql,function(err,rows) {
									if (rows.length==0) {
										//console.log('_____ INSERT');
										var fields=[];
										var values=[];								
										for (var el in o) {
											fields.push(el);
											if (isDate(el,o[el],response)) {
												try {
													if (o[el].indexOf('T')>-1) values.push(qstr(o[el].split('T')[0]+' '+o[el].split('T')[1].split('Z')[0]));
												} catch(e) {
													values.push(qstr(ISODateString(o[el])));
												}
											} else {
												if (typeof o[el] === 'object') values.push(qstr(JSON.stringify(o[el]))); else {
													try {
														if (o[el].toLowerCase()=="null") values.push(o[el].toUpperCase()); else values.push(qstr(o[el]));
													} catch(e) {
														values.push(qstr(o[el]));
													}
												}
											}
										};
										if (isDBX==1) {
											fields.push("createdAt");
											values.push(qstr(new Date().toISOString().slice(0, 19).replace('T', ' ')));
											fields.push("updatedAt");
											values.push(qstr(new Date().toISOString().slice(0, 19).replace('T', ' ')));
										};										
										var sql="INSERT INTO "+tb+" ("+fields.join(',')+") VALUES ("+values.join(',')+")";
										console.log(sql);
										q.query(sql,function(err,rows,fields) {
											q.end();
											//console.log(err);
											if (rows) {
												err=null;
												rows.method="INSERT";
											} else rows=err;
											cb(err,rows);
										});								
									} else {
										//console.log('_____ UPDATE');								
										var fields=[];
										for (var el in o) {
											if (isDate(el,o[el],response)) {
												try {
													if (o[el].indexOf('T')>-1) values.push(el+'='+qstr(o[el].split('T')[0]+' '+o[el].split('T')[1].split('Z')[0]));
												} catch(e) {
													fields.push(el+'='+qstr(ISODateString(o[el])));
												}											
											} else {
												if (typeof o[el] === 'object') fields.push(el+'='+qstr(JSON.stringify(o[el]))); else {
													try {
														if (o[el].toLowerCase()=="null") fields.push(el+'='+o[el]); else fields.push(el+'='+qstr(o[el]));													
													} catch(e) {
														fields.push(el+'='+qstr(o[el]));
													}
												}
											};
										};								
										if (isDBX==1) {
											fields.push("updatedAt");
											values.push('updatedAt="'+new Date().toISOString().slice(0, 19).replace('T', ' ')+'"');
										};										
										var sql="UPDATE "+tb+" SET "+fields.join(',')+" WHERE "+params.join(' AND ');
										console.log(sql);
										q.query(sql,function(err,rows,fields) {
											q.end();
											if (rows) {
												err=null;
												rows.method="UPDATE";
												rows.indexID=ndx;
												rows.indexValue=o[ndx];
											} else rows=err;
											cb(err,rows);
										});									
									}
								});
							}
						} else cb("ERR: No index in table",null);
					});
				});
			}
		});
	}
};