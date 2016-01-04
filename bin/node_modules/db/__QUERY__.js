__QUERY__ = {
	post: function(_db,tb,obj,cb) {
		try {
			var db=__QUERY__.using('db');
		}catch(e) {
			var db=require(__dirname+require('path').sep+'lib');
		};
		db.post(_db,tb,obj,cb);
	},
	del: function(_db,tb,obj,cb) {
		try {
			var db=__QUERY__.using('db');
		}catch(e) {
			var db=require(__dirname+require('path').sep+'lib');
		};
		db.del(_db,tb,obj,cb);
	},
	exec: function(o,cb)
	{
		var err=null;
		var response=null;
		var SQL=[];
		function querycommander(o,cb) {
					
			/*
			 * Private functions
			 * Queries
			 */
			function cleanArray(array) {
			  var i, j, len = array.length, out = [], obj = {};
			  for (i = 0; i < len; i++) {
				obj[array[i]] = 0;
			  }
			  for (j in obj) {
				out.push(j);
			  }
			  return out;
			};
			function qstr(str) {
				//if (typeof str === 'object') return "";
				if (str=="null") return "NULL";
				try {
					var obj='\''+str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
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
			function query_fields(q) {
				
				if (q.indexOf('=')>-1) {
					// =
					if (q.split('=')[1].indexOf('*')>-1) {
						// like
						if (q.indexOf('!=')>-1) {
							SQL.push(q.split('!=')[0]+' not like "'+q.split('=')[1].replace(/\*/g,'%')+'"');
						} else {
							SQL.push(q.split('=')[0]+' like "'+q.split('=')[1].replace(/\*/g,'%')+'"');
						};
						if (q.indexOf('!=')>-1) var _like='not like'; else _like='like';
						
					} else {
						if (q.split('=')[1].indexOf('[')>-1) {
							//in
							if (q.indexOf('!=')>-1) {
								SQL.push(q.split('!=')[0]+' not in ('+q.split('=')[1].split('[')[1].split(']')[0]+')');
							} else {
								SQL.push(q.split('=')[0]+' in ('+q.split('=')[1].split('[')[1].split(']')[0]+')');
							};						
						} else {
							// cas d'une fonction
							if (q.indexOf('(')>-1)
							SQL.push(q.split('=')[0]+'='+q.split('=')[1]+'');
							else {
								SQL.push(q.split('=')[0]+'='+qstr(q.split('=')[1]));
							}
						}
					}
				}
			};
			/*
			 * Private functions
			 * Fields
			 */
			function compute_item(item,table)
			{
				var ITEM="";
				if (item.split('.')[0].indexOf('->')>-1) {
					ITEM=item.split('->')[1];
					RELATION[item.split('.')[0].split('->')[1]]=table+'.'+item.split('->')[0];
					TABLES.push(item.split('.')[0].split('->')[1]);
				} else {
					if (item.split('.').length>2) {
						ITEM=item.split('.')[1]+'.'+item.split('.')[2];
						RELATION[item.split('.')[1]]="*"+item.split('.')[0].trim();
						TABLES.push(item.split('.')[1]);
					} else {
						if (item.split('.')[1]) {
							ITEM=item.split('.')[0]+'.'+item.split('.')[1];
							TABLES.push(item.split('.')[0]);
						} else ITEM=table+'.'+item;
					}
				};
				return ITEM;
			};
			 
			function getFields(r,table)
			{
				for (var i=0;i<r.length;i++)
				{
					var item=r[i];
					
					// nested table
					if (item.indexOf('{')>-1) {				
						var tbl=item.split('->')[1].split('{')[0];					
						var zs=item.indexOf('{')+1;
						var ys=item.lastIndexOf('}');
						var fields=item.substr(zs,ys-zs).split(',');
						for (var z=0;z<fields.length;z++) {
							if (fields[z].indexOf('+')>-1) {
								var value=fields[z].split('=')[1];
								fields[z]=fields[z].split('=')[0];
								if (fields[z].indexOf('+')!=fields[z].length-1) {
									// concatenation
									var fld=fields[z].split('+');
									var concat=[];
									for (var o=0;o<fld.length;o++) {
										if ((fld[o].indexOf("'")==-1) && (fld[o].indexOf('"')==-1)) concat.push(item.split('->')[0]+'->'+tbl+'.'+fld[o]); else concat.push(fld[o]);
									};
									fields[z]=concat.join('+')+'='+value;
								}
							}
						};						
						getFields(fields,table);
						return;
					};
					
					// detect =			
					if (item.indexOf('=')==-1) {
						// Pas un champ calculé
						// Si le champ n'a pas de table de référence, on écrit celle courante
						if (item.indexOf('.')==-1) item=table+'.'+item; else {
							// On ajoute la table aux TABLES
							// détecte s'il y a une liaison explicite
							item=compute_item(item,table);
						};
						// On détecte le champ Order + ou -
						if (item.indexOf('+')==item.length-1) {
							item=item.split('+')[0];
							ORDERBY.push(item);
						};
						if (item.indexOf('-')==item.length-1) {
							item=item.split('-')[0];
							ORDERBY.push(item+' DESC');
						};
						FIELDS.push(item);				
					} else {
						// C'est un champ calculé
						var lasteq=item.lastIndexOf('=');
						var value=item.substr(lasteq+1,item.length);	
						var item=item.substr(0,lasteq);
						// Concaténation ?
						if (item.indexOf('+')>-1) {
							var items=item.split('+');
							var CONCAT=[];
							for (var j=0;j<items.length;j++) {
								if ((items[j].indexOf("'")==-1) && (items[j].indexOf('"')==-1))
								CONCAT.push(compute_item(items[j],table));
								else
								CONCAT.push(items[j]);
							};
							// On détecte le champ Order + ou - sur value
							if (value.indexOf('+')==value.length-1) {
								value=value.split('+')[0];
								ORDERBY.push(value);
							};
							if (value.indexOf('-')==value.length-1) {
								value=value.split('-')[0];
								ORDERBY.push(value+' DESC');
							};					
							FIELDS.push("CONCAT("+CONCAT.join(',')+") "+value);
						} else {
							// détecte une fonction
							if ((item.indexOf('(')>-1) && (item.indexOf(')')>-1)) {
								var method=item.substr(0,item.indexOf('(')).toUpperCase();
								var args=item.substr(item.indexOf('(')+1,item.indexOf(')')-item.indexOf('(')-1);						
								// On détecte le champ Order + ou - sur value
								if (value.indexOf('+')==value.length-1) {
									value=value.split('+')[0];
									ORDERBY.push(value);
								};
								if (value.indexOf('-')==value.length-1) {
									value=value.split('-')[0];
									ORDERBY.push(value+' DESC');
								};					
								FIELDS.push(method+'('+args.replace(/;/g,',')+') '+value);						
							} else FIELDS.push(item.replace(/;/g,',')+' '+value);
						}
					}
				}
			};
			 
			// using DB library
			
			try {
				var db=__QUERY__.using('db');
			}catch(e) {
				var db=require(__dirname+require('path').sep+'lib');
			};
			
			var SQL=[];
			var cmd=o[1];
			var _db=o[0];
			var ORDERBY=[];
			var GROUPBY=[];
			var LIMIT=[];
			var FIELDS=[];
			var JOINS=[];
			var RELATION={};
			var TABLES=[];
			
			// Description du schéma
			
			/*
			db://*
			Liste des tables de la base de données
			*/
			if (cmd=="*") {
				db.model(_db,"SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_SCHEMA = '"+_db+"'",cb);
				return;
			};
			/*
			db://@table
			Liste des champs de la table
			*/
			if (cmd.indexOf('@')==0) {
				db.model(_db,"select * from information_schema.columns where table_schema = '"+_db+"' and table_name = '"+cmd.split('@')[1]+"' order by ordinal_position,table_name",function(e,r){
					cb(e,r);
				});
				return;
			};
			/*
			db://table 						Retourne tous les enregistrements de la table
			db://table{champ0,champ1} 		Retourne les champs spécifiés de la table
			db://table{champ0,champ1}?id=7 	Retourne les champs spécifiés dont l'id = 7
			*/

			var table=cmd.split('?')[0].split('{')[0].split('.')[0];
			
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
				getFields(results,table);
			};

			if (FIELDS.length==0) FIELDS.push(table+'.*');
			
			/*
			On commence à construire la requête
			*/
			SQL.push('SELECT');	
			SQL.push(FIELDS.join(','));

			SQL.push('FROM');
			SQL.push(table);
			
			// Traitement des jointures
			// Si c'est une innoDB
			var sql="select CONSTRAINT_NAME, TABLE_NAME,COLUMN_NAME, REFERENCED_TABLE_NAME,REFERENCED_COLUMN_NAME from INFORMATION_SCHEMA.KEY_COLUMN_USAGE where CONSTRAINT_SCHEMA='"+_db+"' order by TABLE_NAME";
			db.query(_db,sql,function(e,r) {
				var joins={};
				var primary={}
				for (var i=0;i<r.length;i++) {
					if (r[i].CONSTRAINT_NAME=="PRIMARY") primary[r[i].TABLE_NAME]=r[i].TABLE_NAME+'.'+r[i].COLUMN_NAME;
					if (r[i].TABLE_NAME==table) {
						if (r[i].REFERENCED_TABLE_NAME) joins[r[i].REFERENCED_TABLE_NAME]="LEFT JOIN "+r[i].REFERENCED_TABLE_NAME+" ON "+r[i].TABLE_NAME+'.'+r[i].COLUMN_NAME+'='+r[i].REFERENCED_TABLE_NAME+'.'+r[i].REFERENCED_COLUMN_NAME;				
					};
				};
				TABLES=cleanArray(TABLES);
				for (var i=0;i<TABLES.length;i++) {
					if (joins[TABLES[i]]) JOINS.push(joins[TABLES[i]]); else {
						// on a pas pu trouver de jointure implicite (myISAM par exemple), on en cherche une explicite
						if (RELATION[TABLES[i]]) {
							if (RELATION[TABLES[i]].indexOf("*")>-1) {
								// S'il y a une jointure multiple
								var ttt=RELATION[TABLES[i]].split('*')[1];
								JOINS.push("LEFT JOIN "+TABLES[i]+" ON "+primary[TABLES[i]]+'='+primary[ttt]);	
							} else JOINS.push("LEFT JOIN "+TABLES[i]+" ON "+primary[TABLES[i]]+'='+RELATION[TABLES[i]]);
						} else {
							// Pas de jointure explicite, on déclare une jointure par clé liée (table1.kage=table2.kage)
							JOINS.push("LEFT JOIN "+TABLES[i]+" ON "+primary[TABLES[i]]+'='+table+'.'+primary[TABLES[i]].split('.')[1]);
						}
					}
				};

				if (JOINS.length>0) SQL.push(JOINS.join(' '));
				
				// Traitement du query
				
				SQL.push('WHERE');
				
				if (cmd.indexOf('?')==-1) SQL.push('-1'); else {
					var query=cleanArray(cmd.split('?')[1].split('&'));
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
					
				// group by
				GROUPBY=cmd.substr(cmd.lastIndexOf('}')+2,cmd.length).split('/');
				if (ORDERBY.length>1) {
					SQL.push('GROUP BY '+GROUPBY.join(', '));
				};

				// limit
				if (LIMIT.length>0) {
					SQL.push('LIMIT '+LIMIT[0]);
				};
				
				console.log('------------------------------');
				console.log(o.join('://'));
				SQL=SQL.join(' ');					
				console.log('------------------------------');
				
				db.model(o[0],SQL,cb);

			});			
			
		};
				
		if (!o.__SQL__) {
			// Pas de params __SQL__ --> Mauvaise réponse
			err={
				msg: "BAD_RESPONSE"
			};
		} else {

			// get params
			var xargs=[];
			for (var el in o) {
				if ((el!="pudid") && (el!="filter") && (el!="page") && (el!="query") && (el!="__SQL__") && (el!="start") && (el!="limit")) {
					xargs.push(el+'='+o[el]);
				}
			};
			if (xargs.length>0) {
				if (o.__SQL__.indexOf('?')>-1) o.__SQL__+="&"+xargs.join('&'); else o.__SQL__+="?"+xargs.join('&');
			};
			
			console.log(o.__SQL__);
			
			if (o.__SQL__.indexOf('?')>-1) {
				var tt=o.__SQL__.split('?')[1].split('&');
				var cc={};
				var listargs=[];
				for (var i=0;i<tt.length;i++) {
					var cp=tt[i];
					if (cp.indexOf('=')>-1) {
						cc[cp.split('=')[0]]=cp.split('=')[1];
					} else listargs.push(cp);
				};				
				for (var el in cc) listargs.push(el+'='+cc[el]);
				o.__SQL__=o.__SQL__.split('?')[0]+'?'+listargs.join('&');
			};
			
			var QUERY=o.__SQL__.split('://');
			
			// no database selected
			if (QUERY.length<2) {
				err={
					msg: "NO_DATABASE_SELECTED"
				};
				cb(msg);
			} else querycommander(QUERY,cb);
		};
	}
};

module.exports=__QUERY__;