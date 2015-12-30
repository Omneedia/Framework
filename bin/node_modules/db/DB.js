/*
 UQL DB Server part
 */
 
module.exports={
	get: function(uql,cb) {
		var engine=require(__dirname+require('path').sep+'__QUERY__.js');
		var o={
			__SQL__: uql
		};
		engine.exec(o,cb);
	},
	post: function(uql,obj,cb) {
		var engine=require(__dirname+require('path').sep+'__QUERY__.js');
		var o={
			__SQL__: uql
		};
		var QUERY=o.__SQL__.split('://');
		engine.post(QUERY[0],QUERY[1],obj,cb);
	},
	del: function(uql,obj,cb) {
		var engine=require(__dirname+require('path').sep+'__QUERY__.js');
		var db=uql.split('://');		
		if (!Array.isArray(obj)) {
			cb=obj;
			var obj=[];				
			if (db[1].split('?').length>=1) {
				var sp=db[1].split('?')[1];
				if (sp.indexOf('=')>-1) {
					sp=sp.split('=')[1];
				};
				console.log(sp);
				obj=sp.split(',');
			}
		};
		var table=db[1].split('?')[0];
		var field=db[1].split('?')[1];
		var db=db[0];
		engine.del(db,table,obj,cb);
	}
};