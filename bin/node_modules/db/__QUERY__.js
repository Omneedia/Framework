__QUERY__ = {
	post: function(_db,tb,obj,cb) {
		var db=__QUERY__.using('db');
		db.post(_db,tb,obj,cb);
	},
	del: function(_db,tb,obj,cb) {
		var db=__QUERY__.using('db');
		db.del(_db,tb,obj,cb);
	},
	exec: function(o,cb)
	{
		var err=null;
		var response=null;
		var SQL=[];
		function query_fields(q) {
			if (q.indexOf('=')>-1) {
				// =
				if (q.split('=')[1].indexOf('*')>-1) {
					// like
					SQL.push(q.split('=')[0]+' like "'+q.split('=')[1].replace(/\*/g,'%')+'"');
				} else {
					if (q.split('=')[1].indexOf('[')>-1) {
						//in
						SQL.push(q.split('=')[0]+' in ('+q.split('=')[1].split('[')[1].split(']')[0]+')');
					} else {
						// cas d'une fonction
						if (q.indexOf('(')>-1)
						SQL.push(q.split('=')[0]+'='+q.split('=')[1]+'');
						else
						SQL.push(q.split('=')[0]+'="'+q.split('=')[1]+'"');
					}
				}
			}
		};
		function querycommander(o) {
			function getFields(fields,table) {
				for (var i=0;i<fields.length;i++) {
					var temoin=0;
					var item=fields[i];
					if (table) item=table+'.'+item;
					if (fields[i].indexOf('->')>-1) {
						temoin=1;
						var fld=fields[i].split('->')[0];
						var content=fields[i].split('->')[1];
						var tbl=content.split('{')[0];
						RELATION[tbl]=fld;
						if (content.split('{').length>0) {
							var flds=content.split('{')[1].split('}')[0].split(',');
							getFields(flds,tbl);
						}
					};
					try {
						if (fields[i].indexOf('=')==-1) 
						{
							if ((fields[i].indexOf('+')>-1) && (fields[i].indexOf('->')==-1)) {
								ORDERBY.push(item);
								item=item.replace('+','');
							};
							if ((fields[i].indexOf('-')>-1) && (fields[i].indexOf('->')==-1)) {
								ORDERBY.push(item+' DESC');
								item=item.replace('-','');
							};
						}
						else {
							var fld=item.split('=')[0];
							var fldvalue=item.split('=')[1];
							if (fld.split('+').length>0) {
								// concat
								if (fldvalue.indexOf('+')>-1) {
									fldvalue=fldvalue.split('+')[0];
									ORDERBY.push(fldvalue);
								};
								if (fldvalue.indexOf('-')>-1) {
									fldvalue=fldvalue.split('-')[0];
									ORDERBY.push(fldvalue+' DESC');
								};
								item="CONCAT("+fld.split('+').join(',')+") "+fldvalue;
							} else {
								item=fld+' '+fldvalue;
							}							
						};
					} catch(e) {
					
					}
					if (temoin==0) FIELDS.push(item);
				};
			};
			function getNDX(arr,i,cb) {
				var tb=arr[i];
				if (!tb) cb(); else	db.getIndex(_db,tb,function(z) {
					if (RELATION[tb])
					JOINS.push('LEFT JOIN '+tb+' ON '+tb+'.'+z+'='+table+'.'+RELATION[tb]);
					else
					JOINS.push('LEFT JOIN '+tb+' ON '+tb+'.'+z+'='+table+'.'+z);
					if (i<arr.length) getNDX(arr,i+1,cb); else cb();
				});
			};
			var db=__QUERY__.using('db');			
			var ORDERBY=[];
			var LIMIT=[];
			var cmd=o[1];
			var _db=o[0];
			var FIELDS=[];
			var JOINS=[];
			var RELATION={};
			// detection des champs
			console.log(cmd);
			if (cmd=="*") {
				db.model(_db,"SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_SCHEMA = '"+_db+"'",cb);
				return;
			};
			if (cmd.indexOf('@')==0) {
				db.model(_db,"select * from information_schema.columns where table_schema = '"+_db+"' and table_name = '"+cmd.split('@')[1]+"' order by ordinal_position,table_name",function(e,r){
					console.log(e);
					console.log(r);
					cb(e,r);
				});
				return;
			};
			if (cmd.indexOf('}')>-1) {
				var zs=cmd.indexOf('{')+1;
				var ys=cmd.lastIndexOf('}');
				var fields=cmd.substr(zs,ys-zs);
				var results=[];
				var temoin=-1;
				var pos=0;
				for (var i=0;i<fields.length;i++) {
					if (fields[i]=="{") temoin=1;
					if (fields[i]=="}") temoin=-1;
					if ((fields[i]==",") && (temoin==-1)) {
						results.push(fields.substr(pos,i-pos));
						pos=i+1;
					};
				};
				results.push(fields.substr(pos,fields.lengh));
				fields=getFields(results);
			} else var fields=table+".*";
			if (FIELDS.length==0) FIELDS.push(table+'.*');
			var table=cmd.split('?')[0].split('{')[0].split('.')[0];
			SQL.push('SELECT');
			// JOINS
			var external=[];
			for (var i=0;i<FIELDS.length;i++) {
				if (FIELDS[i].indexOf('.')>-1) {
					if (external.indexOf(FIELDS[i].split('.')[0])==-1) {
						if (FIELDS[i].split('.')[1]!="*") {
							external.push(FIELDS[i].split('.')[0]);
						} else FIELDS[i]=FIELDS[i].replace(/undefined/g,table);
					}
				} else {
					if (FIELDS[i].indexOf('(')==-1) FIELDS[i]=table+'.'+FIELDS[i];
				}
			};
			SQL.push(FIELDS.join(','));
			SQL.push('FROM');
			SQL.push(table);
			getNDX(external,0,function(t) {
				
				for (var i=0;i<JOINS.length;i++) {
					SQL.push(JOINS[i]);
				};
				
				SQL.push('WHERE');
				
				// detection des fonctions
				
				if (cmd.indexOf('.limit(')>-1) {
					var fcn=cmd.split('.limit(')[1].split(')')[0];
					LIMIT.push(fcn);
				};
				if (cmd.indexOf('.sort(')>-1) {
					var fcn=cmd.split('.sort(')[1].split(')')[0].split(',');
					for (var i=0;i<fcn.length;i++) ORDERBY.push(fcn[i]);
				};
				
				// detection du query
				if (cmd.indexOf('?')==-1) SQL.push('-1'); else {
					var query=cmd.split('?')[1].split('&');
					for (var i=0;i<query.length;i++)
					{
						if (query[i].indexOf('(')==-1) {
							// AND
							if (i>0) SQL.push('AND');
							if (query[i].indexOf('.')==-1) query[i]=table+'.'+query[i];
							query_fields(query[i]);
						} else {
							// OR
							var kery=cmd.split('(')[1].split(')')[0].split('||');
							if (kery.length==1) {
								// fonction
								console.log('FONCTION');
								query_fields(query[i]);
							} else {
								SQL.push('(');
								for (var i=0;i<kery.length;i++) {
									if (i>0) SQL.push('OR');
									if (kery[i].indexOf('.')==-1) kery[i]=table+'.'+kery[i];
									query_fields(kery[i]);
								};
								SQL.push(')');
							}
						};
					}
				};
				// order by
				if (ORDERBY.length>0) {
					SQL.push('ORDER BY');
					var order_by=[];
					for (var i=0;i<ORDERBY.length;i++)
					{
						if (ORDERBY[i].indexOf('-')>-1) order_by.push(ORDERBY[i].split('-')[0].split('=')[0]+' DESC');
						else order_by.push(ORDERBY[i].split('+')[0].split('=')[0]);
					};
					SQL.push(order_by.join(', '));
				};
				// limit
				if (LIMIT.length>0) {
					SQL.push('LIMIT '+LIMIT[0]);
				}
				console.log(SQL.join(' '));
				db.model(o[0],SQL.join(' '),cb);

			});
			
		};
		if (!o.__SQL__) {
			// Pas de params __SQL__ --> Mauvaise réponse
			err={
				msg: "BAD_RESPONSE"
			};
		} else {
			//console.log(o);
			// get params
			var xargs=[];
			for (var el in o) {
				if ((el!="pudid") && (el!="page") && (el!="query") && (el!="__SQL__") && (el!="start") && (el!="limit")) {
					xargs.push(el+'='+o[el]);
				}
			};
			if (xargs.length>0) {
				if (o.__SQL__.indexOf('?')>-1) o.__SQL__+="&"+xargs.join('&'); else o.__SQL__+="?"+xargs.join('&');
			}
			var QUERY=o.__SQL__.split('://');
			console.log(o.__SQL__);
			// no database selected
			if (QUERY.length<2) {
				err={
					msg: "NO_DATABASE_SELECTED"
				}
			} else querycommander(QUERY);
		};
	}
};

module.exports=__QUERY__;