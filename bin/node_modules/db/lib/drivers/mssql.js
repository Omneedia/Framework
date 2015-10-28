module.exports={
	connect: function(name,fn) {
		var db=App.using('mssql');
		var cx=name.split('mssql://')[1];
		if (cx.split('@')[1].indexOf(':')>-1) {
			var server=cx.split('@')[1].split(':')[0];
			var port=cx.split('@')[1].split(':')[1].split('/')[0];
		} else {
			var server=cx.split('@')[1].split('/')[0];
			var port=1433;		
		};
		cz=cx.split('/')[1];
		if (cz.indexOf('#')>-1) {
			server=server+'\\'+cz.split('#')[0];
			var dbb=cz.split('#')[1];
		} else {
			var zxz=cz.lastIndexOf('/');
			var dbb=cz.substr(zxz+1,255);
		}
		var config = {
			user: cx.split('@')[0].split(':')[0],
			password: cx.split('@')[0].split(':')[1],
			server: server,
			port: port,			
			database: dbb,
			stream: true,
			options: {
				encrypt: true // Use this if you're on Windows Azure 
			}
		};
		/*console.log(config);
		return;*/
		var connection = new db.Connection(config, function(err,q) {
			if (err) fn(err,null); else fn(null,connection);
		});
		connection.on('error', function (err) {
		  fn(err,null);
		});
	},
	query: function(name,sql,fn) {
		this.connect(name,function(err,q) {
			if (err) fn('CONNECTION_REFUSED',err); else  {
				var request=q.request();
				request.stream = true;
				request.query(sql);
				var rows=[];
				request.on('recordset', function(columns) {
					//console.log(columns);
				});	
				request.on('row', function(row) {
					rows.push(row);
				});
				request.on('error', function(err) {
					console.log(err); 
				});
				request.on('done', function(returnValue) {
					fn(null,rows); 
				});				
			};
		});
	},
	model: function(name,sql,fn) {
		var total=0;
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
				var request=q.request();
				request.stream = true;
				request.query(sql2);
				var rows=[];
				request.on('row', function(row) {
					total++;
				});	
				request.on('done', function(returnValue) {
					var r=q.request();
					r.stream=true;
					r.query(sql);
					var rows=[];
					var fields=[];
					var errors=[];
					r.on('recordset', function(columns) {
						fields.push(columns);
					});	
					r.on('row', function(row) {
						rows.push(row);
					});
					r.on('error', function(err) {
						errors.push(err); 
					});
					r.on('done', function(returnValue) {
						if (errors.length==0) {
							model.success=true;
							model.message="OK";
							model.data=rows;
							model.total=total;
							for (var i=0;i<fields.length;i++) {
								var field=fields[i];
								for (var el in field) {
									var fld=el;
									var typ=field[fld].type().type.toString().split('type:')[1].split('\n')[0].split('TYPES.')[1].split(',')[0].toLowerCase();
									/*console.log(field[fld]);
									console.log(typ);*/
									if (typ.indexOf('char')>-1) typ="string";
									if (typ=="int") typ="int";
									if (typ=="bit") typ="boolean";
									if (typ=="float") typ="float";
									if (typ=="uniqueidentifier") typ="string";
									if (typ.indexOf('binar')>-1) typ="string";
									var o={
										name: field[fld].name,
										type: typ,
										length: field[fld].length
									};
									if (o.type.indexOf("date")>-1) {
										o.dateFormat= 'c';
										o.type="date";
									};
									model.metaData.fields[model.metaData.fields.length]=o;
								};
							};
						} else {
							model.message=err;
						};
						fn(err,model); 
					});					
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
				var request=q.request();
				request.stream = true;
				request.query(sql);			
				var rows=[];
				var errors=[];
				request.on('row', function(row) {
					rows.push(row);
				});
				request.on('error', function(err) {
					errors.push(err); 
				});
				request.on('done', function(returnValue) {				
					if (errors.length==0) {
						model.success=true;
						model.message="OK";
						model.data=rows;
						model.total=rows.length;
					} else {
						model.message=err;
					};
					fn(err,model);
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
				var request=q.request();
				request.stream = true;
				request.query("SELECT KU.table_name as tablename,column_name as primarykeycolumn FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS AS TCINNER JOIN INFORMATION_SCHEMA.KEY_COLUMN_USAGE AS KU ON TC.CONSTRAINT_TYPE = 'PRIMARY KEY' AND TC.CONSTRAINT_NAME = KU.CONSTRAINT_NAME and ku.table_name='"+tb+"' ORDER BY KU.TABLE_NAME, KU.ORDINAL_POSITION;");
				var rows=[];
				var erros=[];
				request.on('row', function(row) {
					rows.push(row);
				});
				request.on('error', function(err) {
					errors.push(err); 
				});
				request.on('done', function(returnValue) {	
					if (errors.length==0) {
						var x=rows[0].primarykeycolumn;
						console.log('_____ DELETE');
						var sql="DELETE FROM "+tb+" WHERE "+x+" in ("+ndx.join(',')+")";					
						var r=q.request();
						var rows=[];
						var errors=[];
						r.on('row',function(row) {
							rows.push(row);
						});
						r.on('error',function(err) {
							errors.push(err);
						});
					} else {
					
					};
				});
				q.query("show index from "+tb+" where Key_name = 'PRIMARY' ;",function(e,r) {
					if (r.length>0) {
						var x=r[0].Column_name;
						console.log('_____ DELETE');
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
	post: function(name,tb,o,cb) {
	
	}
}