module.exports={
	connect: function(name,fn) {
		var db=App.using('sqlite3');
		var cx=name.split('sqlite://')[1];
		
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
	
	},
	store: function(name,sql,fn) {
	
	},
	del: function(name,tb,ndx,cb) {
	
	},
	post: function(name,tb,o,cb) {
	
	}
}