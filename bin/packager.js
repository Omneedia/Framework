var fs = require("fs");

function main() {
  var fs=require('fs');
  fs.readdir("./node_modules", function (err, dirs) {
    if (err) {
      console.log(err);
      return;
    };
	var response=[];
    dirs.forEach(function(dir){
      if (dir.indexOf(".") !== 0) {
        var packageJsonFile = "./node_modules/" + dir + "/package.json";
        if (fs.existsSync(packageJsonFile)) {
          fs.readFile(packageJsonFile, function (err, data) {
            if (err) {
              console.log(err);
            }
            else {
              var json = JSON.parse(data);
			  if ((json.name!="db") && (json.name!="")) response.push('"'+json.name+'": "' + json.version + '"');
			  fs.writeFileSync('p.json',response.join(',\n'));
            }
          });
        };
      }
    });

  });
}

main();