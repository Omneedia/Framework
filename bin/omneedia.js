/*
/*
 *
 * OMNEEDIA Builder
 *
 */

$_VERSION = "0.9.2";

CDN = "http://omneedia.github.io/cdn"; //PROD
//CDN = "/cdn"; // DEBUG

var fs=require('fs');
var path=require('path');
var isWin = /^win/.test(process.platform);

if (process.argv.indexOf('--builder')>-1) {
	if (process.platform=="linux") {
		if (!fs.existsSync(__dirname+path.sep+'im'+path.sep+'convert')) {
			var cmd="convert $1 $2 $3 $4 $5 $6 $7 $8 $9 $10 $11 $12 $13 $14 $15";
			if (!fs.existsSync(__dirname+path.sep+'im')) fs.mkdirSync(__dirname+path.sep+'im');
			fs.writeFileSync(__dirname+path.sep+'im'+path.sep+'convert',cmd);
			fs.chmodSync(__dirname+path.sep+'im'+path.sep+'convert',777);
		};
	}; 	
};

function _Task_execute(App,Tasker)
{
	if (fs.existsSync(PROJECT_HOME+path.sep+'src'+path.sep+'Contents'+path.sep+'Tasks'+path.sep+"jobs"+path.sep+Tasker.taskId+".json")) {
		try {
			var args=JSON.parse(fs.readFileSync(PROJECT_HOME+path.sep+'src'+path.sep+'Contents'+path.sep+'Tasks'+path.sep+"jobs"+path.sep+Tasker.taskId+".json",'utf-8'));
		} catch(e) {
			setTimeout(function() {
				_Task_execute(App,Tasker);
			},1000);
		};		
		if (args.length>0) App[Tasker.api](args[0],function(err,result) {
			if (!err) {
				args.shift();
				fs.writeFileSync(PROJECT_HOME+path.sep+'src'+path.sep+'Contents'+path.sep+'Tasks'+path.sep+"jobs"+path.sep+Tasker.taskId+".json",JSON.stringify(args,null,4));
				setTimeout(function() {
					_Task_execute(App,Tasker);
				},1000);
			}
		});  else setTimeout(function() {
					_Task_execute(App,Tasker);
			},1000);
	};
};

var uniqueid=require('node-uuid');
_SESSION_=uniqueid.v4();

if (process.argv.indexOf('auto#0')>-1) _FIRST_TIME=1; else _FIRST_TIME=0;

function __RESTART__(op) {
	var _CP=require('child_process');
	var aargs=process.argv.slice(2);
	var rr=aargs.indexOf('--watch');
	if (rr>-1) {
		aargs.splice(rr,1);
		aargs.unshift('session#'+_SESSION_);
		aargs.unshift('auto#'+op);
	};
	var _CP2=_CP.fork(__dirname+require('path').sep+"omneedia.js",aargs);
	_CP2.on('exit',function() {
		__RESTART__(1);
	});
};


if (process.argv.indexOf("--watch")>-1) {
	__RESTART__(0);
	return;
};

PROXY="";

var shelljs=require('shelljs');
var moment = require('moment');
var asciimo = require('asciimo').Figlet;
var colors = require('colors');
var github=require('github');
var file=require('fsutil');
if (isWin) {
	if (!fs.existsSync(__dirname+path.sep+'.home'+path.sep+'AppData')) fs.mkdirSync(__dirname+path.sep+'.home'+path.sep+'AppData');
	if (!fs.existsSync(__dirname+path.sep+'.home'+path.sep+'AppData'+path.sep+'Local')) fs.mkdirSync(__dirname+path.sep+'.home'+path.sep+'AppData'+path.sep+'Local');
};
var zip=require('adm-zip');
var unzip=require('unzip');
var Exec = require('child_process').exec;
var util = require('util');
var htmlminifier = require('html-minifier');
var glob = require('wrench');
var http=require('http');
var UglifyJS = require("uglify-js");
var async = require('async');
var htmlparser = require("htmlparser2");
var authom = require("authom");
var htmlminifier = require('html-minifier');
var request = require('request');
var XML2JS = require('xml2js');

if (!fs.existsSync(__dirname+path.sep+'.appdata')) fs.mkdirSync(__dirname+path.sep+'.appdata'); 
if (!fs.existsSync(__dirname+path.sep+'.appdata'+path.sep+'npm')) fs.mkdirSync(__dirname+path.sep+'.appdata'+path.sep+'npm'); 
if (!fs.existsSync(__dirname+path.sep+'.home')) fs.mkdirSync(__dirname+path.sep+'.home'); 
if (!fs.existsSync(__dirname+path.sep+'.home'+path.sep+'AppData')) fs.mkdirSync(__dirname+path.sep+'.home'+path.sep+'AppData'); 
if (!fs.existsSync(__dirname+path.sep+'.home'+path.sep+'AppData'+path.sep+'Local')) fs.mkdirSync(__dirname+path.sep+'.home'+path.sep+'AppData'+path.sep+'Local'); 
if (!fs.existsSync(__dirname+path.sep+'.home'+path.sep+'AppData'+path.sep+'Local'+path.sep+'Chromium')) fs.mkdirSync(__dirname+path.sep+'.home'+path.sep+'AppData'+path.sep+'Local'+path.sep+'Chromium'); 

argv = process.argv;	

_EXT_ = function () {
	var extTypes = { 
		"3gp"   : "video/3gpp"
		, "a"     : "application/octet-stream"
		, "ai"    : "application/postscript"
		, "aif"   : "audio/x-aiff"
		, "aiff"  : "audio/x-aiff"
		, "asc"   : "application/pgp-signature"
		, "asf"   : "video/x-ms-asf"
		, "asm"   : "text/x-asm"
		, "asx"   : "video/x-ms-asf"
		, "atom"  : "application/atom+xml"
		, "au"    : "audio/basic"
		, "avi"   : "video/x-msvideo"
		, "bat"   : "application/x-msdownload"
		, "bin"   : "application/octet-stream"
		, "bmp"   : "image/bmp"
		, "bz2"   : "application/x-bzip2"
		, "c"     : "text/x-c"
		, "cab"   : "application/vnd.ms-cab-compressed"
		, "cc"    : "text/x-c"
		, "chm"   : "application/vnd.ms-htmlhelp"
		, "class"   : "application/octet-stream"
		, "com"   : "application/x-msdownload"
		, "conf"  : "text/plain"
		, "cpp"   : "text/x-c"
		, "crt"   : "application/x-x509-ca-cert"
		, "css"   : "text/css"
		, "csv"   : "text/csv"
		, "cxx"   : "text/x-c"
		, "deb"   : "application/x-debian-package"
		, "der"   : "application/x-x509-ca-cert"
		, "diff"  : "text/x-diff"
		, "djv"   : "image/vnd.djvu"
		, "djvu"  : "image/vnd.djvu"
		, "dll"   : "application/x-msdownload"
		, "dmg"   : "application/octet-stream"
		, "doc"   : "application/msword"
		, "docx"   : "application/msword"
		, "dot"   : "application/msword"
		, "dtd"   : "application/xml-dtd"
		, "dvi"   : "application/x-dvi"
		, "ear"   : "application/java-archive"
		, "eml"   : "message/rfc822"
		, "eps"   : "application/postscript"
		, "exe"   : "application/x-msdownload"
		, "f"     : "text/x-fortran"
		, "f77"   : "text/x-fortran"
		, "f90"   : "text/x-fortran"
		, "flv"   : "video/x-flv"
		, "for"   : "text/x-fortran"
		, "gem"   : "application/octet-stream"
		, "gemspec" : "text/x-script.ruby"
		, "gif"   : "image/gif"
		, "gz"    : "application/x-gzip"
		, "h"     : "text/x-c"
		, "hh"    : "text/x-c"
		, "htm"   : "text/html"
		, "html"  : "text/html"
		, "ico"   : "image/vnd.microsoft.icon"
		, "ics"   : "text/calendar"
		, "ifb"   : "text/calendar"
		, "iso"   : "application/octet-stream"
		, "jar"   : "application/java-archive"
		, "java"  : "text/x-java-source"
		, "jnlp"  : "application/x-java-jnlp-file"
		, "jpeg"  : "image/jpeg"
		, "jpg"   : "image/jpeg"
		, "js"    : "application/javascript"
		, "json"  : "application/json"
		, "log"   : "text/plain"
		, "m3u"   : "audio/x-mpegurl"
		, "m4v"   : "video/mp4"
		, "man"   : "text/troff"
		, "mathml"  : "application/mathml+xml"
		, "mbox"  : "application/mbox"
		, "mdoc"  : "text/troff"
		, "me"    : "text/troff"
		, "mid"   : "audio/midi"
		, "midi"  : "audio/midi"
		, "mime"  : "message/rfc822"
		, "mml"   : "application/mathml+xml"
		, "mng"   : "video/x-mng"
		, "mov"   : "video/quicktime"
		, "mp3"   : "audio/mpeg"
		, "mp4"   : "video/mp4"
		, "mp4v"  : "video/mp4"
		, "mpeg"  : "video/mpeg"
		, "mpg"   : "video/mpeg"
		, "ms"    : "text/troff"
		, "msi"   : "application/x-msdownload"
		, "odp"   : "application/vnd.oasis.opendocument.presentation"
		, "ods"   : "application/vnd.oasis.opendocument.spreadsheet"
		, "odt"   : "application/vnd.oasis.opendocument.text"
		, "ogg"   : "application/ogg"
		, "p"     : "text/x-pascal"
		, "pas"   : "text/x-pascal"
		, "pbm"   : "image/x-portable-bitmap"
		, "pdf"   : "application/pdf"
		, "pem"   : "application/x-x509-ca-cert"
		, "pgm"   : "image/x-portable-graymap"
		, "pgp"   : "application/pgp-encrypted"
		, "pkg"   : "application/octet-stream"
		, "pl"    : "text/x-script.perl"
		, "pm"    : "text/x-script.perl-module"
		, "png"   : "image/png"
		, "pnm"   : "image/x-portable-anymap"
		, "ppm"   : "image/x-portable-pixmap"
		, "pps"   : "application/vnd.ms-powerpoint"
		, "ppt"   : "application/vnd.ms-powerpoint"
		, "pptx"   : "application/vnd.ms-powerpoint"
		, "ps"    : "application/postscript"
		, "psd"   : "image/vnd.adobe.photoshop"
		, "py"    : "text/x-script.python"
		, "qt"    : "video/quicktime"
		, "ra"    : "audio/x-pn-realaudio"
		, "rake"  : "text/x-script.ruby"
		, "ram"   : "audio/x-pn-realaudio"
		, "rar"   : "application/x-rar-compressed"
		, "rb"    : "text/x-script.ruby"
		, "rdf"   : "application/rdf+xml"
		, "roff"  : "text/troff"
		, "rpm"   : "application/x-redhat-package-manager"
		, "rss"   : "application/rss+xml"
		, "rtf"   : "application/rtf"
		, "ru"    : "text/x-script.ruby"
		, "s"     : "text/x-asm"
		, "sgm"   : "text/sgml"
		, "sgml"  : "text/sgml"
		, "sh"    : "application/x-sh"
		, "sig"   : "application/pgp-signature"
		, "snd"   : "audio/basic"
		, "so"    : "application/octet-stream"
		, "svg"   : "image/svg+xml"
		, "svgz"  : "image/svg+xml"
		, "swf"   : "application/x-shockwave-flash"
		, "t"     : "text/troff"
		, "tar"   : "application/x-tar"
		, "tbz"   : "application/x-bzip-compressed-tar"
		, "tcl"   : "application/x-tcl"
		, "tex"   : "application/x-tex"
		, "texi"  : "application/x-texinfo"
		, "texinfo" : "application/x-texinfo"
		, "text"  : "text/plain"
		, "tif"   : "image/tiff"
		, "tiff"  : "image/tiff"
		, "torrent" : "application/x-bittorrent"
		, "tr"    : "text/troff"
		, "txt"   : "text/plain"
		, "vcf"   : "text/x-vcard"
		, "vcs"   : "text/x-vcalendar"
		, "vrml"  : "model/vrml"
		, "war"   : "application/java-archive"
		, "wav"   : "audio/x-wav"
		, "wma"   : "audio/x-ms-wma"
		, "wmv"   : "video/x-ms-wmv"
		, "wmx"   : "video/x-ms-wmx"
		, "wrl"   : "model/vrml"
		, "wsdl"  : "application/wsdl+xml"
		, "xbm"   : "image/x-xbitmap"
		, "xhtml"   : "application/xhtml+xml"
		, "xls"   : "application/vnd.ms-excel"
		, "xlsx"   : "application/vnd.ms-excel"
		, "xml"   : "application/xml"
		, "xpm"   : "image/x-xpixmap"
		, "xsl"   : "application/xml"
		, "xslt"  : "application/xslt+xml"
		, "yaml"  : "text/yaml"
		, "yml"   : "text/yaml"
		, "zip"   : "application/zip"
	}
	return {
		getExt: function (path) {
			var ext = require('path').extname(path||'').split('.');
			return ext[ext.length - 1];
		},
		getContentType: function (path) {			
			return extTypes[this.getExt(path).toLowerCase()] || 'application/octet-stream';
		}
	};
}();

if (fs.existsSync(__dirname+path.sep+'.config')) {
	var ocfg=JSON.parse(fs.readFileSync(__dirname+path.sep+'.config'));
	if (ocfg.current) {
		if (ocfg.current.proxy) PROXY=ocfg.current.proxy;
	}
};

if (PROXY!="") var Request=request.defaults({'proxy':PROXY}); else var Request=request;

var uuid = require('node-uuid');
var os = require('os');

var express=require('express');	
var open=require('open');
var QRCode=require('qrcode-npm');

BOOTSTRAP_FILES = [];
PROCESSING_VIEW = [];
PROCESSING_STORE = [];
PROCESSING_MODEL = [];

Date.prototype.format = function(format) //author: meizz
{
  var o = {
    "M+" : this.getMonth()+1, //month
    "d+" : this.getDate(),    //day
    "h+" : this.getHours(),   //hour
    "m+" : this.getMinutes(), //minute
    "s+" : this.getSeconds(), //second
    "q+" : Math.floor((this.getMonth()+3)/3),  //quarter
    "S" : this.getMilliseconds() //millisecond
  }

  if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
    (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  for(var k in o)if(new RegExp("("+ k +")").test(format))
    format = format.replace(RegExp.$1,
      RegExp.$1.length==1 ? o[k] :
        ("00"+ o[k]).substr((""+ o[k]).length));
  return format;
};

Auth = {
	user: function(profile,fn) {
		if (profile.provider=="google") var typ="google";
		if (profile.provider=="cas") var typ="cas";	
		if (profile.provider=="twitter") var typ="twitter";
		if (profile.provider=="facebook") var typ="facebook";	
		Auth.login(profile,typ,function(response) {
			console.log(response);
			fn(null,response);
		});		
		
	},
	login: function(profile,auth_type,cb) {
		var off="Officer";
		if (fs.existsSync(PROJECT_WEB+path.sep+"Contents"+path.sep+"Auth"+path.sep+off+".js")) {
			var Auth = require(PROJECT_WEB+path.sep+"Contents"+path.sep+"Auth"+path.sep+off+".js");
			Auth.using = function(unit) {
				if (fs.existsSync(__dirname+path.sep+'node_modules'+path.sep+unit)) 
				return require(__dirname+path.sep+'node_modules'+path.sep+unit);
				else
				return require(PROJECT_HOME+path.sep+'bin'+path.sep+'node_modules'+path.sep+unit);
			};		
			Auth.getProfile=function(user) {
				var response=[];
				if (fs.existsSync(PROJECT_WEB+path.sep+"Contents"+path.sep+"Auth"+path.sep+'Profiler.json')) {
					var profiler=JSON.parse(require('fs').readFileSync(PROJECT_WEB+path.sep+"Contents"+path.sep+"Auth"+path.sep+'Profiler.json','utf-8'));
					for (var el in profiler.profile) {
						var p=profiler.profile[el];
						if (p.indexOf(user)>-1) response.push(el);
					};
				};			
				return response;
			};
			Auth.login(profile,auth_type,function(response) {
				cb(response);
			});
		};
	}
};

function getIPAddress() {
  var interfaces = require('os').networkInterfaces();
  for (var devName in interfaces) {
    var iface = interfaces[devName];

    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal)
        return alias.address;
    }
  }

  return '127.0.0.1';
};

Object.extend = function(destination, source) {
    for (var property in source) {
        if (source.hasOwnProperty(property)) {
            destination[property] = source[property];
        }
    }
    return destination;
};

function getUserInfo($user,$id)
{
	var $dir=PROJECT_VAR+path.sep+"users"+path.sep+$user+".id";
	if (!fs.existsSync($dir)) return false;
	if ($dir=="") return false;
	var $o=fs.readFileSync($dir,"utf-8");
	var $obj=explode("@@",$o);
	for (var $i=0;$i<$obj.length;$i++)
	{
		var $_COM=$obj[$i];
		if ($_COM.substr(0,$id.length)==$id) {
			var $elem=$_COM.substr($id.length,$_COM.length);
			$elem=$elem.trim();
			if ($elem.substr(0,5)=="data:") {
				$elem=$elem.replace(/\n/g,"");
			}
			return $elem;
		}		
	}	
};

function encodeCSS(css,dir)
{
	var url=css.split('url(');
	var str="";
	if (!dir) dir=PROJECT_HOME+path.sep+"src";
	for (var i=0;i<url.length;i++)
	{
		var myURL=url[i].split(')')[0];
		var dd=path.resolve(dir+path.sep+myURL);
		if (fs.existsSync(dd))
		{
			var stats = fs.lstatSync(dd);
			if (!stats.isDirectory()) {
				myURL=fs.realpathSync(dd);
				var type = path.extname(myURL).substring(1);			
				if (type == 'jpg') type = 'jpeg';
				if (type == 'svg') type = 'svg+xml';			
				var base64 = fs.readFileSync(myURL).toString('base64');
				var space=url[i].indexOf(')');
				str+="url(data:image/" + type + ";base64," + base64 + url[i].substr(space,url[i].length);
			} else str+=url[i];
		} else {
			if ((myURL.substr(1,4)=='data') || (myURL.substr(0,4)=='data'))
			{
				str+="url("+url[i];
			}
			else
			str+=url[i];		
		}
	};
	return str;
};

function inArray(array, p_val) {
	var l = array.length;
	for(var i = 0; i < l; i++) {
		if(array[i] == p_val) {
			return true;
		}
	};
	return false;
};

function download_repos (lst,ndx,result,cb) {
	if (ndx<lst.length) { 
		Request({url: 'https://api.github.com/users/'+lst[ndx].trim()+'/repos', encoding: null,headers: {'User-Agent': 'request'}}, function (err, res, body) {
			var bb=JSON.parse(body.toString());
			for (var i=0;i<bb.length;i++) result.push(bb[i]);
			download_repos(lst,ndx+1,result,cb);			
		}) 
	} else cb(result);
};

function download (o, callback) {
	if (o.type=="local") {
		var text=fs.readFileSync(o.src,'utf-8');
		if (o.src.indexOf('Settings.js')>-1)
		{
			var extend = require('util')._extend;
			var _JSON = extend({}, Settings);
			delete(_JSON.FRAMEWORKS);
			delete(_JSON.LIBRARIES);
			delete(_JSON.RESOURCES);
			delete(_JSON.PLUGINS);
			delete(_JSON.SIGN);
			_JSON.DEBUG=false;
			var text="Settings="+JSON.stringify(_JSON);
		};
		callback(null,text);
	} else {
		Request({url: o.src, encoding: null}, function (err, res, body) {
			try{
				callback(null,body.toString());			
			}catch(ex) {
				//callback(null,"");
			}

		});	
	};
};

String.prototype.replaceAll = function(str1, str2, ignore) 
{
	return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
};

String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, "");
};

API={
	_use: function(conf){
	
	},
	using: function(service,host,fnx) {
		var http = require('http');
		var h=host.split(':');
		if (h.length>1) var port=h[1]*1; else var port=80;
		host=h[0];
		var options = {
		  host: host,
		  port: port,
		  path: '/api/'+service+'?javascript',
		  method: 'GET'
		};

		var req = http.request(options, function(res) {
		  res.setEncoding('utf-8');

		  var responseString = '';

		  res.on('data', function(data) {
			responseString += data;
		  });

		  res.on('end', function() {
			var r = JSON.parse(responseString.split('.REMOTING_API=')[1].split(';')[0]).actions[service];
			API[service]={};
			for (var i=0;i<r.length;i++) {
				var Args = require("vargs").Constructor;
				if (r[i].name!="using") API[service][r[i].name]=function func() {
					var args = new Args(arguments);
					var va=args.all;
					
					var name="";
					for (var p in this) {
						if (this[p] === func) name=p;
					};
					
					var d=args.all;
					if (!d[0]) d.push({});
					d[0].page=1;
					d[0].start=0;
					d[0].limit=50;
					
					var user = [
					{
						action: service,
						method: name,
						data: args.all,
						type: "rpc",
						tid: 1
					}
					];

					var userString = JSON.stringify(user);

					var headers = {
					  'Content-Type': 'application/json',
					  'Content-Length': userString.length
					};

					var options = {
					  host: 'omneedia.com',
					  port: 3000,
					  path: '/api',
					  method: 'POST',
					  headers: headers
					};

					var req = http.request(options, function(res) {
						res.setEncoding('utf-8');

						var responseString = '';

						res.on('data', function(data) {
							responseString += data;
						});

						res.on('end', function() {
							var resultObject = JSON.parse(responseString);
							args.callback(resultObject[0].result);
						});
					});

					req.on('error', function(e) {
					  console.log(e);
					});

					req.write(userString);
					req.end();
					
				};
				
			};
			if (fnx) fnx();
		  });
		});
		req.on('error',function(e) {
			console.log(e);	
		});
		req.end();		
	}
};

/*
CALL SUBS
*/

copyFileSync = function(srcFile, destFile) {
  var BUF_LENGTH, buff, bytesRead, fdr, fdw, pos;
  BUF_LENGTH = 64 * 1024;
  buff = new Buffer(BUF_LENGTH);
  fdr = fs.openSync(srcFile, "r");
  fdw = fs.openSync(destFile, "w");
  bytesRead = 1;
  pos = 0;
  while (bytesRead > 0) {
    bytesRead = fs.readSync(fdr, buff, 0, BUF_LENGTH, pos);
    fs.writeSync(fdw, buff, 0, bytesRead);
    pos += bytesRead;
  }
  fs.closeSync(fdr);
  return fs.closeSync(fdw);
};

function make_resources(cb)
{
	console.log('  - Updating resources');
	
	if (Manifest.platform=="mobile")
	{
		if (fs.existsSync(PROJECT_DEV+path.sep+"mobi"+path.sep+"Resources.css")) {
			cb();
			return;
		};
		// Préparation des graphiques
		GRAPHICS=[];
		// startup
		if (!fs.existsSync(PROJECT_WEB+path.sep+'Contents'+path.sep+'Resources'+path.sep+'startup')) fs.mkdirSync(PROJECT_WEB+path.sep+'Contents'+path.sep+'Resources'+path.sep+'startup');
		GRAPHICS[GRAPHICS.length]='"'+__dirname+path.sep+'im'+path.sep+'convert" "'+PROJECT_HOME+path.sep+Manifest.splashscreen.file+'" -gravity center -background "'+Manifest.splashscreen.background+'" -resize 510 -extent 640x920 "'+PROJECT_WEB+path.sep+'Contents'+path.sep+'Resources'+path.sep+'startup'+path.sep+'640x920.png"';
		GRAPHICS[GRAPHICS.length]='"'+__dirname+path.sep+'im'+path.sep+'convert" "'+PROJECT_HOME+path.sep+Manifest.splashscreen.file+'" -gravity center -background "'+Manifest.splashscreen.background+'" -resize 510 -extent 640x1096 "'+PROJECT_WEB+path.sep+'Contents'+path.sep+'Resources'+path.sep+'startup'+path.sep+'640x1096.png"';
		GRAPHICS[GRAPHICS.length]='"'+__dirname+path.sep+'im'+path.sep+'convert" "'+PROJECT_HOME+path.sep+Manifest.splashscreen.file+'" -gravity center -background "'+Manifest.splashscreen.background+'" -resize 320x460 "'+PROJECT_WEB+path.sep+'Contents'+path.sep+'Resources'+path.sep+'startup'+path.sep+'default.png"';
		GRAPHICS[GRAPHICS.length]='"'+__dirname+path.sep+'im'+path.sep+'convert" "'+PROJECT_HOME+path.sep+Manifest.splashscreen.file+'" -gravity center -background "'+Manifest.splashscreen.background+'" -resize 510 -extent 768x1004 "'+PROJECT_WEB+path.sep+'Contents'+path.sep+'Resources'+path.sep+'startup'+path.sep+'768x1004.png"';
		GRAPHICS[GRAPHICS.length]='"'+__dirname+path.sep+'im'+path.sep+'convert" "'+PROJECT_HOME+path.sep+Manifest.splashscreen.file+'" -gravity center -background "'+Manifest.splashscreen.background+'" -resize 510 -extent 748x1024 "'+PROJECT_WEB+path.sep+'Contents'+path.sep+'Resources'+path.sep+'startup'+path.sep+'748x1024.png"';		
		GRAPHICS[GRAPHICS.length]='"'+__dirname+path.sep+'im'+path.sep+'convert" "'+PROJECT_HOME+path.sep+Manifest.splashscreen.file+'" -gravity center -background "'+Manifest.splashscreen.background+'" -resize 510 -extent 1496x2048 "'+PROJECT_WEB+path.sep+'Contents'+path.sep+'Resources'+path.sep+'startup'+path.sep+'1496x2048.png"';
		GRAPHICS[GRAPHICS.length]='"'+__dirname+path.sep+'im'+path.sep+'convert" "'+PROJECT_HOME+path.sep+Manifest.splashscreen.file+'" -gravity center -background "'+Manifest.splashscreen.background+'" -resize 510 -extent 1536x2008 "'+PROJECT_WEB+path.sep+'Contents'+path.sep+'Resources'+path.sep+'startup'+path.sep+'1536x2008.png"';
		GRAPHICS[GRAPHICS.length]='"'+__dirname+path.sep+'im'+path.sep+'convert" "'+PROJECT_HOME+path.sep+Manifest.splashscreen.file+'" -gravity center -background "'+Manifest.splashscreen.background+'" -resize 510 -extent 2048x1496 "'+PROJECT_WEB+path.sep+'Contents'+path.sep+'Resources'+path.sep+'startup'+path.sep+'2048x1496.png"';		
		
		GRAPHICS[GRAPHICS.length]='"'+__dirname+path.sep+'im'+path.sep+'convert" "'+PROJECT_HOME+path.sep+Manifest.splashscreen.file+'" -resize 256x256 "'+PROJECT_WEB+path.sep+'Contents'+path.sep+'Resources'+path.sep+'startup'+path.sep+'logo.png"';
		// icons
		if (!fs.existsSync(PROJECT_WEB+path.sep+'Contents'+path.sep+'Resources'+path.sep+'icons')) fs.mkdirSync(PROJECT_WEB+path.sep+'Contents'+path.sep+'Resources'+path.sep+'icons');
		GRAPHICS[GRAPHICS.length]='"'+__dirname+path.sep+'im'+path.sep+'convert" "'+PROJECT_HOME+path.sep+Manifest.icon.file+'" -flatten -resize 57x57 -background "'+Manifest.icon.background+'" "'+PROJECT_WEB+path.sep+'Contents'+path.sep+'Resources'+path.sep+'icons'+path.sep+'icon.png"';
		GRAPHICS[GRAPHICS.length]='"'+__dirname+path.sep+'im'+path.sep+'convert" "'+PROJECT_HOME+path.sep+Manifest.icon.file+'" -flatten -resize 72x72 -background "'+Manifest.icon.background+'" "'+PROJECT_WEB+path.sep+'Contents'+path.sep+'Resources'+path.sep+'icons'+path.sep+'icon@72.png"';
		GRAPHICS[GRAPHICS.length]='"'+__dirname+path.sep+'im'+path.sep+'convert" "'+PROJECT_HOME+path.sep+Manifest.icon.file+'" -flatten -resize 114x114 -background "'+Manifest.icon.background+'" "'+PROJECT_WEB+path.sep+'Contents'+path.sep+'Resources'+path.sep+'icons'+path.sep+'icon@114.png"';
		GRAPHICS[GRAPHICS.length]='"'+__dirname+path.sep+'im'+path.sep+'convert" "'+PROJECT_HOME+path.sep+Manifest.icon.file+'" -flatten -resize 144x144 -background "'+Manifest.icon.background+'" "'+PROJECT_WEB+path.sep+'Contents'+path.sep+'Resources'+path.sep+'icons'+path.sep+'icon@144.png"';
		async.map(GRAPHICS,convert,function(err,result) {
			cb();
		})
	};
	if (Manifest.platform=="desktop")
	{
		if (fs.existsSync(PROJECT_DEV+path.sep+"webapp"+path.sep+"Resources.css")) {
			cb();
			return;
		};
		GRAPHICS=[];
		GRAPHICS[GRAPHICS.length]='"'+__dirname+path.sep+'im'+path.sep+'convert" "'+PROJECT_HOME+path.sep+Manifest.icon.file+'" -bordercolor white -border 0 -resize x16 -gravity center -background transparent -flatten -colors 256 "'+PROJECT_WEB+path.sep+'Contents'+path.sep+'Resources'+path.sep+'favicon.ico"';
		if (!fs.existsSync(PROJECT_WEB+path.sep+'Contents'+path.sep+'Resources'+path.sep+'startup')) fs.mkdirSync(PROJECT_WEB+path.sep+'Contents'+path.sep+'Resources'+path.sep+'startup');
		GRAPHICS[GRAPHICS.length]='"'+__dirname+path.sep+'im'+path.sep+'convert" "'+PROJECT_HOME+path.sep+Manifest.splashscreen.file+'" -resize 256x256 "'+PROJECT_WEB+path.sep+'Contents'+path.sep+'Resources'+path.sep+'startup'+path.sep+'logo.png"';
		GRAPHICS[GRAPHICS.length]='"'+__dirname+path.sep+'im'+path.sep+'convert" "'+PROJECT_HOME+path.sep+Manifest.icon.file+'" -resize x16 "'+PROJECT_WEB+path.sep+'Contents'+path.sep+'Resources'+path.sep+'webapp'+path.sep+'ico.png"';
		var linkme=false;
		async.map(GRAPHICS,convert,function(err,result) {
			cb();
		});
	}
}

function make_bootstrap()
{
	// Parsing index.html
	console.log('  - Processing package & downloading libraries');
	if (!fs.existsSync(PROJECT_DEV+path.sep+"webapp"+path.sep+"bootstrap.cache"))
	{
		var parser = new htmlparser.Parser({
			onopentag: function(name, attribs){
				if(name === "script" && attribs.type === "text/javascript"){
					if (!fs.existsSync(PROJECT_WEB+path.sep+attribs.src)) {
						BOOTSTRAP_FILES[BOOTSTRAP_FILES.length]={
							type: 'remote',
							src: attribs.src
						};
					} else {
						if (attribs.src!="Contents/Application/app.js")
						BOOTSTRAP_FILES[BOOTSTRAP_FILES.length]={
							type: 'local',
							src: PROJECT_WEB+path.sep+attribs.src
						};
					}
				}
			},
			onclosetag: function(tagname){
				if (tagname === "html") {
					BOOTSTRAP_FILES.unshift({
						type: "local",
						src: PROJECT_WEB+path.sep+"Contents"+path.sep+"Settings.js"
					});					
					for (var i=0;i<Settings.FRAMEWORKS.length;i++) {
						if (!fs.existsSync(PROJECT_WEB+path.sep+Settings.FRAMEWORKS[i])) {
							BOOTSTRAP_FILES[BOOTSTRAP_FILES.length]={
								type: 'remote',
								src: Settings.FRAMEWORKS[i]
							};
						} else {						
							BOOTSTRAP_FILES[BOOTSTRAP_FILES.length]={
								type: 'local',
								src: PROJECT_WEB+path.sep+Settings.FRAMEWORKS[i]
							};		
						};
					};

					async.map(BOOTSTRAP_FILES,download,function(err,result) {
						console.log(err);
						fs.writeFileSync(PROJECT_DEV+path.sep+"webapp"+path.sep+"bootstrap.js","var Ext = Ext || {};Ext.manifest = {compatibility:{ext: '4.2'}}\n"+result.join('\n\n\n/*************************************************/\n\n\n'));
						make_resources(make_libraries);
					});
				}
			}
		});		
		parser.write(fs.readFileSync(PROJECT_HOME+path.sep+"src"+path.sep+"index.html"));
		parser.end();
	} else make_resources(make_libraries);
};

function remote_api(i,tab,cb) {
	if (i<Settings.API.length) {
		Request(Settings.REMOTE_API+'/api/'+Settings.API[i]+'?javascript',function(error,response,body) {
			tab.push(body);
			remote_api(i+1,tab,cb);
		});
	} else cb(tab);
};

function make_ws()
{
	console.log('  - Looking for webservices');
	var result=[];
	
	result.push("if (Ext.syncRequire) Ext.syncRequire('Ext.direct.Manager');Ext.namespace('App');");
	if (Settings.REMOTE_API) {
		remote_api(0,[],function(x) {
			fs.writeFileSync(PROJECT_DEV+path.sep+"webapp"+path.sep+"services.js",x.join(''));
			make_mvc();
		});
	} else {
		var REMOTE_API={};
		REMOTE_API.url="/api";
		REMOTE_API.type="remoting";
		REMOTE_API.namespace="App";
		REMOTE_API.descriptor="App.REMOTING_API";
		REMOTE_API.actions={};
		REMOTE_API.actions["__QUERY__"]=[];
		REMOTE_API.actions["__QUERY__"].push({
			name: "exec",
			len: 1
		});
		REMOTE_API.actions["__QUERY__"].push({
			name: "post",
			len: 3
		});
		REMOTE_API.actions["__QUERY__"].push({
			name: "del",
			len: 3
		});
		var str="if (Ext.syncRequire) Ext.syncRequire('Ext.direct.Manager');Ext.namespace('App');";
		str+="App.REMOTING_API="+JSON.stringify(REMOTE_API,null)+";";
		str+="Ext.Direct.addProvider(App.REMOTING_API);";
		str=str.replace('App.REMOTING_API={"url":"','App.REMOTING_API={"url":document.location.origin+"');
		result.push(str);

		for (var i=1;i<Settings.API.length;i++)
		{
			// charger le script
			console.log('    - Adding service descriptor '+Settings.API[i]);
			var REMOTE_API={};
			REMOTE_API.url="/api";
			REMOTE_API.type="remoting";
			REMOTE_API.namespace="App";
			REMOTE_API.descriptor="App.REMOTING_API";
			REMOTE_API.actions={};
			REMOTE_API.actions[Settings.API[i]]=[];
			if (!fs.existsSync(PROJECT_WEB+path.sep+"Contents"+path.sep+"Services"+path.sep+Settings.API[i]+".js")) {
				res.end('');
				return;
			};
			var _api=require(PROJECT_WEB+path.sep+"Contents"+path.sep+"Services"+path.sep+Settings.API[i]+".js");
			for (var e in _api) {
				if (_api[e].toString().substr(0,8)=="function") {
					var obj={};
					obj.name=e;
					var myfn=_api[e].toString().split('function')[1].split('{')[0].trim().split('(')[1].split(')')[0].split(',');
					obj.len=myfn.length-1;
					REMOTE_API.actions[Settings.API[i]][REMOTE_API.actions[Settings.API[i]].length]=obj;
				}
			};					
			var str="if (Ext.syncRequire) Ext.syncRequire('Ext.direct.Manager');Ext.namespace('App');";
			str+="App.REMOTING_API="+JSON.stringify(REMOTE_API,null)+";";
			str+="Ext.Direct.addProvider(App.REMOTING_API);";
			str=str.replace('App.REMOTING_API={"url":"','App.REMOTING_API={"url":document.location.origin+"');
			result.push(str);
		};
		fs.writeFileSync(PROJECT_DEV+path.sep+"webapp"+path.sep+"services.js",result.join(''));
		make_mvc();	
	};
};

function getView(v,t)
{
	v=v.replace(/\./g,"/");
	var workspace=PROJECT_WEB+path.sep+"Contents"+path.sep+"Application"+path.sep+"app"+path.sep;
	var myview=fs.readFileSync(workspace+"view"+path.sep+path.sep+v.trim()+".js","utf-8");
	console.log('    - Adding view '+v.trim());
	try {
		var require=myview.split('require')[1].split(']')[0].split('[')[1].trim().replace(/\t/g,'').replace(/\n/g,'').replace(/"/g,'').replace(/'/g,"").split(',');	
		for (var i=0;i<require.length;i++)
		{
			getView(require[i],t);
		};
	} catch (e) {
		//console.log(e);
	};
	//console.log(workspace+"view"+path.sep+v.trim()+".js");
	t[t.length]=workspace+"view"+path.sep+v.trim()+".js";
};

function getDistinctArray(arr) {
    var dups = {};
    return arr.filter(function(el) {
        var hash = el.valueOf();
        var isDup = dups[hash];
        dups[hash] = true;
        return !isDup;
    });
};

function getController(controller)
{
	var workspace=PROJECT_WEB+path.sep+"Contents"+path.sep+"Application"+path.sep+"app"+path.sep;
	var _controller=workspace+"controller"+path.sep+controller+".js";
	console.log('    - Adding controller '+controller);
	if (!fs.existsSync(_controller)) {
		console.error("  ! Can't find controller "+controller+"".yellow);
		return;
	};
	_controller=fs.readFileSync(_controller,"utf-8");
	var views=_controller.split('views')[1].split(']')[0].split('[')[1].trim().replace(/\t/g,'').replace(/\n/g,'').replace(/"/g,'').replace(/'/g,"").split(',');
	try {
		var stores=_controller.split('stores')[1].split(']')[0].split('[')[1].trim().replace(/\t/g,'').replace(/\n/g,'').replace(/"/g,'').replace(/'/g,"").split(',');
	}catch(e) {
		var stores=[];
	};
	try {
	var models=_controller.split('models')[1].split(']')[0].split('[')[1].trim().replace(/\t/g,'').replace(/\n/g,'').replace(/"/g,'').replace(/'/g,"").split(',');
	}catch(e) {
		var models=[];
	};
	var result="";
	for (var i=0;i<models.length;i++)
	{
		var m=models[i].replace(/\./g,"/");
		if (PROCESSING_MODEL.indexOf(m) == -1) {
			models[i]=workspace+"model"+path.sep+m.trim()+".js";
			console.log('    - Adding model '+m.trim());
			if (m!="") result+=fs.readFileSync(models[i],"utf-8")+"\n";
			PROCESSING_MODEL.push(m);
		}
	};
	result+="\n\n";
	
	for (var i=0;i<stores.length;i++)
	{
		var m=stores[i].replace(/\./g,"/");
		if (PROCESSING_STORE.indexOf(m) == -1) {
			stores[i]=workspace+"store"+path.sep+m.trim()+".js";
			if (m!="") result+=fs.readFileSync(stores[i],"utf-8")+"\n";
			PROCESSING_STORE.push(m);
		}
	};
	var nview=[];
	
	for (var i=0;i<views.length;i++)
	{
		var v=views[i];
		if (PROCESSING_VIEW.indexOf(v) == -1) getView(v,nview);
		PROCESSING_VIEW.push(v);
	};
	nview=getDistinctArray(nview);

	for (var i=0;i<nview.length;i++)
	{
		result+=fs.readFileSync(nview[i].replace(/\\/g,require('path').sep),"utf-8")+"\n";
	};


	if (fs.existsSync(PROJECT_DEV+path.sep+"webapp"+path.sep+"objects.js"))
	fs.appendFileSync(PROJECT_DEV+path.sep+"webapp"+path.sep+"objects.js",result);
	else
	fs.writeFileSync(PROJECT_DEV+path.sep+"webapp"+path.sep+"objects.js",result);
};

function make_app()
{
	var app=fs.readFileSync(PROJECT_WEB+path.sep+"Contents"+path.sep+"Application"+path.sep+"app.js","utf-8");
	var _apph=app.split("Ext.Loader.setConfig")[0];
	var _app="Manifest"+app.split('Manifest')[1];
	fs.writeFileSync(PROJECT_DEV+path.sep+"webapp"+path.sep+"app.js",_apph+"\n"+_app);
	if (Settings.TYPE=="mobile")
	{
		var xapp=fs.readFileSync(PROJECT_DEV+path.sep+"webapp"+path.sep+"app.js","utf-8");
		var _JSON={};
		_JSON["320x460"]="data:image/png;base64,"+b64(PROJECT_WEB+path.sep+"Contents"+path.sep+"Resources"+path.sep+"startup"+path.sep+"default.png");
		_JSON["640x920"]="data:image/png;base64,"+b64(PROJECT_WEB+path.sep+"Contents"+path.sep+"Resources"+path.sep+"startup"+path.sep+"640x920.png");		
		_JSON["640x1096"]="data:image/png;base64,"+b64(PROJECT_WEB+path.sep+"Contents"+path.sep+"Resources"+path.sep+"startup"+path.sep+"640x1096.png");		
		_JSON["768x1004"]="data:image/png;base64,"+b64(PROJECT_WEB+path.sep+"Contents"+path.sep+"Resources"+path.sep+"startup"+path.sep+"768x1004.png");				
		_JSON["748x1024"]="data:image/png;base64,"+b64(PROJECT_WEB+path.sep+"Contents"+path.sep+"Resources"+path.sep+"startup"+path.sep+"748x1024.png");		
		_JSON["1536x2008"]="data:image/png;base64,"+b64(PROJECT_WEB+path.sep+"Contents"+path.sep+"Resources"+path.sep+"startup"+path.sep+"1536x2008.png");		
		_JSON["1496x2048"]="data:image/png;base64,"+b64(PROJECT_WEB+path.sep+"Contents"+path.sep+"Resources"+path.sep+"startup"+path.sep+"1496x2048.png");
		_JSON="startupImage:"+JSON.stringify(_JSON)+",";
		var t=xapp.split('startupImage')[0]+_JSON+"isIconPrecomposed"+xapp.split('startupImage')[1].split('isIconPrecomposed')[1];
		fs.writeFileSync(PROJECT_DEV+path.sep+"webapp"+path.sep+"app.js",t);
	};
	
	console.log('  - Compiling bootstrap');
	if (fs.existsSync(PROJECT_DEV+path.sep+"webapp"+path.sep+"bootstrap.cache"))
	var bootstrap = fs.readFileSync(PROJECT_DEV+path.sep+"webapp"+path.sep+"bootstrap.cache","utf-8");
	else {
		var bootstrap = UglifyJS.minify(PROJECT_DEV+path.sep+"webapp"+path.sep+"bootstrap.js");
		bootstrap=bootstrap.code;
	}
	//console.log(bootstrap);
	console.log('  - Compiling libraries');
	var libraries = UglifyJS.minify(PROJECT_DEV+path.sep+"webapp"+path.sep+"libraries.js");
	libraries=libraries.code;
	console.log('  - Compiling services');
	var services = UglifyJS.minify(PROJECT_DEV+path.sep+"webapp"+path.sep+"services.js");
	services=services.code;
	console.log('  - Compiling localizer');
	var langs = UglifyJS.minify(PROJECT_DEV+path.sep+"webapp"+path.sep+"langs.js");
	langs=langs.code;
	console.log('  - Compiling MVC');
	var objects = UglifyJS.minify(PROJECT_DEV+path.sep+"webapp"+path.sep+"objects.js");
	objects=objects.code;
	console.log('  - Linking...');
	var app = UglifyJS.minify(PROJECT_DEV+path.sep+"webapp"+path.sep+"app.js");
	app=app.code;
	var webapp="";
	fs.writeFileSync(PROJECT_DEV+path.sep+"webapp"+path.sep+"Application.js","i18n={};i18n_framework={};"+bootstrap+libraries+webapp+services+langs+objects+app);
	fs.unlinkSync(PROJECT_DEV+path.sep+"webapp"+path.sep+"app.js");
	fs.writeFileSync(PROJECT_DEV+path.sep+"webapp"+path.sep+"bootstrap.cache",bootstrap);
	if (fs.existsSync(PROJECT_DEV+path.sep+"webapp"+path.sep+"bootstrap.js")) fs.unlinkSync(PROJECT_DEV+path.sep+"webapp"+path.sep+"bootstrap.js");
	fs.unlinkSync(PROJECT_DEV+path.sep+"webapp"+path.sep+"libraries.js");
	fs.unlinkSync(PROJECT_DEV+path.sep+"webapp"+path.sep+"services.js");
	fs.unlinkSync(PROJECT_DEV+path.sep+"webapp"+path.sep+"langs.js");
	fs.unlinkSync(PROJECT_DEV+path.sep+"webapp"+path.sep+"objects.js");
	
	// Make Resources
	res_html_compile();
};

function make_culture()
{
	console.log('  - Loading culture');
	var LANG=[];
	var _LANG=[];
	for (var i=0;i<Settings.LANGS.length;i++)
	{
		LANG[LANG.length] = {
			type: "remote",
			src: CDN+"/framework.lang/"+Settings.TYPE+"/ext-lang-"+Settings.LANGS[i]+".js"
		};
		if (fs.existsSync(PROJECT_WEB+path.sep+"Contents"+path.sep+"Culture"+path.sep+Settings.LANGS[i]+".js"))
		_LANG[_LANG.length] = PROJECT_WEB+path.sep+"Contents"+path.sep+"Culture"+path.sep+Settings.LANGS[i]+".js";
	};
	async.map(LANG,download,function(err,result) {
		fs.writeFileSync(PROJECT_DEV+path.sep+"webapp"+path.sep+"langs.js",result.join('\n\n\n'));
		for (var i=0;i<_LANG.length;i++)
		{
			fs.appendFileSync(PROJECT_DEV+path.sep+"webapp"+path.sep+"langs.js",fs.readFileSync(_LANG[i],"utf-8"))
		};
		make_app();
	});	
};

function make_mvc()
{
	console.log('  - Create MVC');
	var appjs=fs.readFileSync(PROJECT_WEB+path.sep+"Contents"+path.sep+"Application"+path.sep+"app.js",'utf-8');
	// get controllers
	var controllers=Settings.CONTROLLERS;
	
	for (var i=0;i<controllers.length;i++)
	{
		getController(controllers[i]);
		var workspace=PROJECT_WEB+path.sep+"Contents"+path.sep+"Application"+path.sep+"app"+path.sep;
		var _controller=workspace+"controller"+path.sep+controllers[i]+".js";
		var result=fs.readFileSync(_controller,"utf-8");
		if (!fs.existsSync(PROJECT_DEV+path.sep+"webapp"+path.sep+"objects.js")) {
			fs.writeFileSync(PROJECT_DEV+path.sep+"webapp"+path.sep+"objects.js",result);
		} else {
			fs.appendFileSync(PROJECT_DEV+path.sep+"webapp"+path.sep+"objects.js",result);
		}
	};
	
	// load Culture
	make_culture();
};

function make_libraries()
{
	console.log('  - Creating libraries');
	var app=PROJECT_WEB+path.sep+"Contents"+path.sep+"Application"+path.sep+"app.js";
	var code=fs.readFileSync(app,'utf-8');
	
	APP_NAMESPACE=code.split('APP_NAMESPACE')[1].split(';')[0];
	var pluscode="APP_NAMESPACE "+APP_NAMESPACE+";\n";
	APP_NAMESPACE=code.split('LANGS')[1].split(';')[0];
	pluscode+="LANGS "+APP_NAMESPACE+"LANGS;\n";
	
	var arr=Settings.PATHS;
	var PATH=[];
	for (var i in arr) {
		PATH[i]=arr[i];
		if (fs.existsSync(PROJECT_WEB+path.sep+PATH[i])) PATH[i]=PROJECT_WEB+path.sep+PATH[i];
	};

	var _require=Settings.MODULES;

	for (var i=0;i<_require.length;i++) {
		var element=_require[i];

		if (element!="") {
			for (var el in PATH) {
				if (el==element.substr(0,el.length)) {
					var tmp=element.substr(el.length,element.length).split('.');
					var _tmp="";
					for (var j=0;j<tmp.length;j++) {
						if (j>0) _tmp+="/"+tmp[j]; else _tmp=PATH[el]+tmp[j];
					};
					_require[i]=_tmp+".js";
				};
				if (el==element.substr(1,el.length)) {
					var tmp=element.substr(el.length+1,element.length).split('.');
					var _tmp="";
					for (var j=0;j<tmp.length;j++) {
						if (j>0) _tmp+="/"+tmp[j]; else _tmp=PATH[el]+tmp[j];
					};
					_require[i]=_tmp+".js";				
				};
			}
		} else _require.splice(i);
	};
	
	var require=[];
	for (var i=0;i<_require.length;i++) {
		if (!fs.existsSync(_require[i])) {
			require[require.length]={
				type: "remote",
				src: _require[i]
			};
		} else {
			require[require.length]={
				type: "local",
				src: _require[i]
			};		
		}
	};

	async.map(require,download,function(err,result) {
		fs.writeFileSync(PROJECT_DEV+path.sep+"webapp"+path.sep+"libraries.js",pluscode+"\n\n"+result.join('\n\n\n'));
		make_ws();
	});
};

function b64(f)
{
	return fs.readFileSync(f).toString('base64');
};

function convert(cmd,callback)
{
	if (os.platform()=="win32")
	{
		fs.writeFileSync("convert.cmd",cmd);
		Exec(fs.readFileSync("convert.cmd","utf-8"), function (error, stdout, stderr) {
			if (fs.existsSync("convert.cmd")) fs.unlinkSync("convert.cmd");
			callback(null,stdout);
		});
	} else {
		Exec(cmd, function (error, stdout, stderr) {
			callback(null,stdout);
		});
	}
};

var loadBase64Image = function (url, callback) {

    // Make request to our image url
	if (url==-1) callback(null,"-1"); else {
	
		Request({url: url, encoding: null}, function (err, res, body) {
			if (!err && res.statusCode == 200) {
				// So as encoding set to null then request body became Buffer object
				var base64prefix = 'data:' + res.headers['content-type'] + ';base64,'
					, image = body.toString('base64');
				if (typeof callback == 'function') {
					callback(null,base64prefix+image);
				}
			} else {
				var str="\n! Warning: Can\'t download image "+url;
				console.log(str.yellow);
				callback(null,"");
			}
		});
		
	}
};

function getURL(url,callback)
{
	Request({url: url, encoding: null}, function (err, res, body) {	
		callback(null,body.toString('utf-8'));
	});
};

function getRemoteCSS(url,callback)
{
	console.log("  - Generating resource "+url);
	var u=[];
	u[u.length]=url;
	
	async.map(u,getURL,function(err,result) {
		var durl=url.lastIndexOf('/');
		durl=url.substr(0,durl);
		result=result[0].split('url(');
		var o=[];
		o[0]="-1";
		for (var i=1;i<result.length;i++) {
			var tt=result[i].indexOf(')');
			var test=result[i].substr(0,tt);
			var type=test.lastIndexOf('.');
			var type=test.substr(type+1,test.length).toLowerCase();
			if ((type=="gif") || (type=="jpg") || (type=="png"))
			{
				o.push(durl+'/'+test);
			} else o.push("-1");
		};
		async.map(o,loadBase64Image,function(err,r) {
			for (var i=0;i<r.length;i++) {
				var element=r[i];
				if (element!=-1) {
					var tt=result[i].indexOf(')');
					result[i]=element+result[i].substr(tt,result[i].length);
				}
			};			
			result=result.join('url(');
			if (fs.existsSync(PROJECT_DEV+path.sep+"webapp"+path.sep+"Resources"))
			fs.appendFileSync(PROJECT_DEV+path.sep+"webapp"+path.sep+"Resources",result);
			else
			fs.writeFileSync(PROJECT_DEV+path.sep+"webapp"+path.sep+"Resources",result);
			callback(null,result);		
		});
	});
	
};

function getLocalCSS(url,callback)
{
	console.log("  - Generating resource "+url);
	var bpath=PROJECT_WEB+path.sep+url;
	var css=fs.readFileSync(bpath,"utf-8");
	css=encodeCSS(css,PROJECT_HOME+path.sep+"src"+path.sep+"Contents"+path.sep+"Resources");
	if (fs.existsSync(PROJECT_DEV+path.sep+"webapp"+path.sep+"Resources"))
	fs.appendFileSync(PROJECT_DEV+path.sep+"webapp"+path.sep+"Resources",css);
	else
	fs.writeFileSync(PROJECT_DEV+path.sep+"webapp"+path.sep+"Resources",css);
	callback(null,css);		
};

function getCSS(url,callback)
{
	var bpath=PROJECT_WEB+path.sep+url;
	if (!fs.existsSync(bpath)) getRemoteCSS(url,callback); else getLocalCSS(url,callback);	
};

function copyMyFiles(src,dst)
{
	var p=glob.readdirSyncRecursive(src);
	if (!fs.existsSync(dst)) fs.mkdirSync(dst);
	for (var i=0;i<p.length;i++)
	{
		var item=src+path.sep+p[i];
		if (fs.lstatSync(item).isDirectory()) {
			if (!fs.existsSync(dst+path.sep+p[i])) fs.mkdirSync(dst+path.sep+p[i]);
		} else {
			if (!fs.existsSync(dst+path.sep+p[i])) copyFileSync(item,dst+path.sep+p[i]);
		}
	};
};



function make_final(err,result) 
{
	// compress css
	if (!fs.existsSync(PROJECT_DEV+path.sep+"webapp"+path.sep+"Resources.css"))
	{
		var css=result.join('\n');
		var link=require('sqwish').minify(css);
		fs.writeFileSync(PROJECT_DEV+path.sep+"webapp"+path.sep+"Resources.css",link);
		fs.unlinkSync(PROJECT_DEV+path.sep+"webapp"+path.sep+"Resources");
	};

	// On copie les fichiers dans build et on supprime le répertoire
	if (!fs.existsSync(PROJECT_BUILD)) fs.mkdirSync(PROJECT_BUILD);
	if (!fs.existsSync(PROJECT_BUILD+path.sep+"webapp")) fs.mkdirSync(PROJECT_BUILD+path.sep+"webapp");
	if (!fs.existsSync(PROJECT_BUILD+path.sep+"webapp")) fs.mkdirSync(PROJECT_BUILD+path.sep+"webapp");
	if (!fs.existsSync(PROJECT_BUILD+path.sep+"webapp"+path.sep+Settings.VERSION+'.'+Settings.BUILD)) fs.mkdirSync(PROJECT_BUILD+path.sep+"webapp"+path.sep+Settings.VERSION+'.'+Settings.BUILD);
	if (!fs.existsSync(PROJECT_BUILD+path.sep+"webapp"+path.sep+Settings.VERSION+'.'+Settings.BUILD+path.sep+"Contents")) fs.mkdirSync(PROJECT_BUILD+path.sep+"webapp"+path.sep+Settings.VERSION+'.'+Settings.BUILD+path.sep+"Contents");

	// et on copie les fichiers
	copyFileSync(PROJECT_DEV+path.sep+"webapp"+path.sep+"Application.js",PROJECT_BUILD+path.sep+"webapp"+path.sep+Settings.VERSION+'.'+Settings.BUILD+path.sep+"Contents"+path.sep+"Application.js");
	copyFileSync(PROJECT_DEV+path.sep+"webapp"+path.sep+"Resources.css",PROJECT_BUILD+path.sep+"webapp"+path.sep+Settings.VERSION+'.'+Settings.BUILD+path.sep+"Contents"+path.sep+"Resources.css");
	copyFileSync(PROJECT_DEV+path.sep+"webapp"+path.sep+"index.html",PROJECT_BUILD+path.sep+"webapp"+path.sep+Settings.VERSION+'.'+Settings.BUILD+path.sep+"index.html");
	fs.unlinkSync(PROJECT_DEV+path.sep+"webapp"+path.sep+"Application.js");
	fs.unlinkSync(PROJECT_DEV+path.sep+"webapp"+path.sep+"index.html");

	console.log('    Done.');
	console.log('');
	
	if (PROCESS_NATIVE) build_native();
	if (PROCESS_PRODUCTION) build_production();
};

function build_native()
{
	if ((PROCESS_ANDROID==-1) && (PROCESS_IOS==-1)) {
		return;
	};
	function NS(ns) {
		var sp=ns.split('.');
		var str=[];
		for (var i=0;i<sp.length;i++)
		{
			str.push(sp[i].substr(0,1).toUpperCase()+sp[i].substr(1,255));
		};
		return str.join('');
	};
	console.log('');
	console.log('  - Making native workspace');
	process.chdir(PROJECT_HOME+path.sep+'dev');	
 	shelljs.exec("cordova create native -i "+Manifest.namespace+" -n "+Manifest.title.replace(/\s/g, "").replace(/([^a-z0-9]+)/gi, ''));
	// write config.xml
	var parseString = require('xml2js').parseString;
	var _config = require('fs').readFileSync(PROJECT_HOME+path.sep+'dev'+path.sep+'native'+path.sep+'config.xml','utf-8');
	parseString(_config, function (err, config) {
		// trouver une solution pour ios (pas de titre avec espace)
		//config.widget.name[0]=Manifest.title;
		config.widget.name[0]=Manifest.title.replace(/\s/g, "").replace(/([^a-z0-9]+)/gi, '')
		config.widget.description[0]=Manifest.description;
		config.widget.author[0]._=Manifest.author.name;
		config.widget.author[0].$.email=Manifest.author.mail;
		config.widget.author[0].$.href=Manifest.author.web;
		config.widget.preference={
			$: {
				name: "Fullscreen",
				value: "false"
			}
		};
		/*
		Unsafe operation
		*/
		if (process.argv.indexOf("unsafe")>-1) {
			if (!config.widget['allow-navigation']) config.widget['allow-navigation']=[];
			config.widget['allow-navigation'].push({
				$:{
					href: "http://*/*"
				}
			});
		};
		
		process.chdir(PROJECT_HOME+path.sep+'dev'+path.sep+'native');	
		
		if (PROCESS_ANDROID!=-1) {
			var t=-1;
			for (var i=0;i<config.widget.platform.length;i++) {
				if (config.widget.platform[i].$.name=="android") t=i;
			};
			var f_android=config.widget.platform[t];
			f_android.icon=[
				{
					$: {
						src: "res/android/ldpi.png",
						density: "ldpi"
					}
				},			
				{
					$: {
						src: "res/android/mdpi.png",
						density: "mdpi"
					}
				},			
				{
					$: {
						src: "res/android/hdpi.png",
						density: "hdpi"
					}
				},	
				{
					$: {
						src: "res/android/xhdpi.png",
						density: "xhdpi"
					}
				}				
			];
			f_android.splash=[
				{
					$: {
						src: "res/android/splash-land-hdpi.png",
						density: "land-hdpi"
					}
				},
				{
					$: {
						src: "res/android/splash-land-ldpi.png",
						density: "land-ldpi"
					}
				},
				{
					$: {
						src: "res/android/splash-land-mdpi.png",
						density: "land-mdpi"
					}
				},
				{
					$: {
						src: "res/android/splash-land-xhdpi.png",
						density: "land-xhdpi"
					}
				},
				{
					$: {
						src: "res/android/splash-port-hdpi.png",
						density: "port-hdpi"
					}
				},
				{
					$: {
						src: "res/android/splash-port-ldpi.png",
						density: "port-ldpi"
					}
				},
				{
					$: {
						src: "res/android/splash-port-mdpi.png",
						density: "port-mdpi"
					}
				},
				{
					$: {
						src: "res/android/splash-port-xhdpi.png",
						density: "port-xhdpi"
					}
				}
			];
		};
		if (PROCESS_IOS!=-1) {
			var t=-1;
			for (var i=0;i<config.widget.platform.length;i++) {
				if (config.widget.platform[i].$.name=="ios") t=i;
			};
			var f_ios=config.widget.platform[t];

			f_ios.icon=[
				{
					$: {
						src: "res/ios/icon-60@3x.png",
						width: "180",
						height: "180"
					}
				},				
				{
					$: {
						src: "res/ios/icon-60.png",
						width: "60",
						height: "60"
					}
				},				
				{
					$: {
						src: "res/ios/icon-60@2x.png",
						width: "120",
						height: "120"
					}
				},				
				{
					$: {
						src: "res/ios/icon-76.png",
						width: "76",
						height: "76"
					}
				},
				{
					$: {
						src: "res/ios/icon-76@2x.png",
						width: "152",
						height: "152"
					}
				},
				{
					$: {
						src: "res/ios/icon-40.png",
						width: "40",
						height: "40"
					}
				},
				{
					$: {
						src: "res/ios/icon-40@2x.png",
						width: "80",
						height: "80"
					}
				},
				{
					$: {
						src: "res/ios/icon.png",
						width: "57",
						height: "57"
					}
				},
				{
					$: {
						src: "res/ios/icon@2x.png",
						width: "114",
						height: "114"
					}
				},
				{
					$: {
						src: "res/ios/icon-72.png",
						width: "72",
						height: "72"
					}
				},
				{
					$: {
						src: "res/ios/icon-72@2x.png",
						width: "144",
						height: "144"
					}
				},
				{
					$: {
						src: "res/ios/icon-small.png",
						width: "29",
						height: "29"
					}
				},
				{
					$: {
						src: "res/ios/icon-small@2x.png",
						width: "58",
						height: "58"
					}
				},
				{
					$: {
						src: "res/ios/icon-50.png",
						width: "50",
						height: "50"
					}
				},
				{
					$: {
						src: "res/ios/icon-50@2x.png",
						width: "100",
						height: "100"
					}
				}					
			];
			
			f_ios.splash=[
				{
					$: {
						src: "res/ios/Default~iphone.png",
						width: "320",
						height: "480"
					}
				},			
				{
					$: {
						src: "res/ios/Default@2x~iphone.png",
						width: "640",
						height: "960"
					}
				},				
				{
					$: {
						src: "res/ios/Default-Portrait~ipad.png",
						width: "768",
						height: "1024"
					}
				},				
				{
					$: {
						src: "res/ios/Default-Portrait@2x~ipad.png",
						width: "1536",
						height: "2048"
					}
				},				
				{
					$: {
						src: "res/ios/Default-Landscape~ipad.png",
						width: "1024",
						height: "768"
					}
				},				
				{
					$: {
						src: "res/ios/Default-Landscape@2x~ipad.png",
						width: "2048",
						height: "1536"
					}
				},				
				{
					$: {
						src: "res/ios/Default-568h@2x~iphone.png",
						width: "640",
						height: "1136"
					}
				},				
				{
					$: {
						src: "res/ios/Default-667h.png",
						width: "750",
						height: "1334"
					}
				},				
				{
					$: {
						src: "res/ios/Default-736h.png",
						width: "1242",
						height: "2208"
					}
				},				
				{
					$: {
						src: "res/ios/Default-Landscape-736h.png",
						width: "2208",
						height: "1242"
					}
				}				
			];
		};		
		
		var builder = new XML2JS.Builder();
		var xml = builder.buildObject(config);
		require('fs').writeFileSync(PROJECT_HOME+path.sep+'dev'+path.sep+'native'+path.sep+'config.xml',xml);

		
		if (!fs.existsSync(PROJECT_HOME+path.sep+'dev'+path.sep+'native'+path.sep+'res')) fs.mkdirSync(PROJECT_HOME+path.sep+'dev'+path.sep+'native'+path.sep+'res');
		if (PROCESS_ANDROID!=-1) {
			if (!fs.existsSync(PROJECT_HOME+path.sep+'dev'+path.sep+'native'+path.sep+'res'+path.sep+'android')) fs.mkdirSync(PROJECT_HOME+path.sep+'dev'+path.sep+'native'+path.sep+'res'+path.sep+'android');
		};
		if (PROCESS_IOS!=-1) {
			if (!fs.existsSync(PROJECT_HOME+path.sep+'dev'+path.sep+'native'+path.sep+'res'+path.sep+'ios')) fs.mkdirSync(PROJECT_HOME+path.sep+'dev'+path.sep+'native'+path.sep+'res'+path.sep+'ios');
		};
		
		var dir_native=PROJECT_HOME+path.sep+'dev'+path.sep+'native'+path.sep+'www'+path.sep+'res'+path.sep;
		GRAPHICS=[];

		// making icons & splashscreen
		// android
		if (PROCESS_ANDROID!=-1) {		
			var dir_native=PROJECT_HOME+path.sep+'dev'+path.sep+'native'+path.sep+'res'+path.sep+'android'+path.sep;
			// icons
			GRAPHICS.push('"'+__dirname+path.sep+'im'+path.sep+'convert" "'+PROJECT_HOME+path.sep+Manifest.icon.file+'" -background "'+Manifest.icon.background+'" -flatten -resize 36x36 "'+dir_native+'ldpi.png"');
			GRAPHICS.push('"'+__dirname+path.sep+'im'+path.sep+'convert" "'+PROJECT_HOME+path.sep+Manifest.icon.file+'" -background "'+Manifest.icon.background+'" -flatten -resize 48x48 "'+dir_native+'mdpi.png"');
			GRAPHICS.push('"'+__dirname+path.sep+'im'+path.sep+'convert" "'+PROJECT_HOME+path.sep+Manifest.icon.file+'" -background "'+Manifest.icon.background+'" -flatten -resize 72x72 "'+dir_native+'hdpi.png"');
			GRAPHICS.push('"'+__dirname+path.sep+'im'+path.sep+'convert" "'+PROJECT_HOME+path.sep+Manifest.icon.file+'" -background "'+Manifest.icon.background+'" -flatten -resize 96x96 "'+dir_native+'xhdpi.png"');
			// splashscreen
			// landscape			
			GRAPHICS.push('"'+__dirname+path.sep+'im'+path.sep+'convert" "'+__dirname+path.sep+'transparent.png" -gravity center -background "'+Manifest.splashscreen.background+'" -size 300x480 "'+dir_native+'splash-land-hdpi.png"');
			GRAPHICS.push('"'+__dirname+path.sep+'im'+path.sep+'convert" "'+__dirname+path.sep+'transparent.png" -gravity center -background "'+Manifest.splashscreen.background+'" -size 320x200 "'+dir_native+'splash-land-ldpi.png"');
			GRAPHICS.push('"'+__dirname+path.sep+'im'+path.sep+'convert" "'+__dirname+path.sep+'transparent.png" -gravity center -background "'+Manifest.splashscreen.background+'" -size 480x320 "'+dir_native+'splash-land-mdpi.png"');
			GRAPHICS.push('"'+__dirname+path.sep+'im'+path.sep+'convert" "'+__dirname+path.sep+'transparent.png" -gravity center -background "'+Manifest.splashscreen.background+'" -size 1280x720 "'+dir_native+'splash-land-xhdpi.png"');
			// portrait
			GRAPHICS.push('"'+__dirname+path.sep+'im'+path.sep+'convert" "'+__dirname+path.sep+'transparent.png" -gravity center -background "'+Manifest.splashscreen.background+'" -size 480x800 "'+dir_native+'splash-port-hdpi.png"');
			GRAPHICS.push('"'+__dirname+path.sep+'im'+path.sep+'convert" "'+__dirname+path.sep+'transparent.png" -gravity center -background "'+Manifest.splashscreen.background+'" -size 200x320 "'+dir_native+'splash-port-ldpi.png"');
			GRAPHICS.push('"'+__dirname+path.sep+'im'+path.sep+'convert" "'+__dirname+path.sep+'transparent.png" -gravity center -background "'+Manifest.splashscreen.background+'" -size 320x480 "'+dir_native+'splash-port-mdpi.png"');
			GRAPHICS.push('"'+__dirname+path.sep+'im'+path.sep+'convert" "'+__dirname+path.sep+'transparent.png" -gravity center -background "'+Manifest.splashscreen.background+'" -size 720x1280 "'+dir_native+'splash-port-xhdpi.png"');
		};
		// ios
		if (PROCESS_IOS!=-1) {
			var dir_native=PROJECT_HOME+path.sep+'dev'+path.sep+'native'+path.sep+'res'+path.sep+'ios'+path.sep;
			// icons
			GRAPHICS.push('"'+__dirname+path.sep+'im'+path.sep+'convert" "'+PROJECT_HOME+path.sep+Manifest.icon.file+'" -background "'+Manifest.icon.background+'" -flatten -resize 180x180 "'+dir_native+'icon-60@3x.png"');
			GRAPHICS.push('"'+__dirname+path.sep+'im'+path.sep+'convert" "'+PROJECT_HOME+path.sep+Manifest.icon.file+'" -background "'+Manifest.icon.background+'" -flatten -resize 60x60 "'+dir_native+'icon-60.png"');
			GRAPHICS.push('"'+__dirname+path.sep+'im'+path.sep+'convert" "'+PROJECT_HOME+path.sep+Manifest.icon.file+'" -background "'+Manifest.icon.background+'" -flatten -resize 120x120 "'+dir_native+'icon-60@2x.png"');
			GRAPHICS.push('"'+__dirname+path.sep+'im'+path.sep+'convert" "'+PROJECT_HOME+path.sep+Manifest.icon.file+'" -background "'+Manifest.icon.background+'" -flatten -resize 76x76 "'+dir_native+'icon-76.png"');
			GRAPHICS.push('"'+__dirname+path.sep+'im'+path.sep+'convert" "'+PROJECT_HOME+path.sep+Manifest.icon.file+'" -background "'+Manifest.icon.background+'" -flatten -resize 152x152 "'+dir_native+'icon-76@2x.png"');
			GRAPHICS.push('"'+__dirname+path.sep+'im'+path.sep+'convert" "'+PROJECT_HOME+path.sep+Manifest.icon.file+'" -background "'+Manifest.icon.background+'" -flatten -resize 40x40 "'+dir_native+'icon-40.png"');
			GRAPHICS.push('"'+__dirname+path.sep+'im'+path.sep+'convert" "'+PROJECT_HOME+path.sep+Manifest.icon.file+'" -background "'+Manifest.icon.background+'" -flatten -resize 80x80 "'+dir_native+'icon-40@2x.png"');
			GRAPHICS.push('"'+__dirname+path.sep+'im'+path.sep+'convert" "'+PROJECT_HOME+path.sep+Manifest.icon.file+'" -background "'+Manifest.icon.background+'" -flatten -resize 57x57 "'+dir_native+'icon.png"');
			GRAPHICS.push('"'+__dirname+path.sep+'im'+path.sep+'convert" "'+PROJECT_HOME+path.sep+Manifest.icon.file+'" -background "'+Manifest.icon.background+'" -flatten -resize 114x114 "'+dir_native+'icon@2x.png"');
			GRAPHICS.push('"'+__dirname+path.sep+'im'+path.sep+'convert" "'+PROJECT_HOME+path.sep+Manifest.icon.file+'" -background "'+Manifest.icon.background+'" -flatten -resize 72x72 "'+dir_native+'icon-72.png"');
			GRAPHICS.push('"'+__dirname+path.sep+'im'+path.sep+'convert" "'+PROJECT_HOME+path.sep+Manifest.icon.file+'" -background "'+Manifest.icon.background+'" -flatten -resize 144x144 "'+dir_native+'icon-72@2x.png"');
			GRAPHICS.push('"'+__dirname+path.sep+'im'+path.sep+'convert" "'+PROJECT_HOME+path.sep+Manifest.icon.file+'" -background "'+Manifest.icon.background+'" -flatten -resize 29x29 "'+dir_native+'icon-small.png"');
			GRAPHICS.push('"'+__dirname+path.sep+'im'+path.sep+'convert" "'+PROJECT_HOME+path.sep+Manifest.icon.file+'" -background "'+Manifest.icon.background+'" -flatten -resize 58x58 "'+dir_native+'icon-small@2x.png"');
			GRAPHICS.push('"'+__dirname+path.sep+'im'+path.sep+'convert" "'+PROJECT_HOME+path.sep+Manifest.icon.file+'" -background "'+Manifest.icon.background+'" -flatten -resize 50x50 "'+dir_native+'icon-50.png"');
			GRAPHICS.push('"'+__dirname+path.sep+'im'+path.sep+'convert" "'+PROJECT_HOME+path.sep+Manifest.icon.file+'" -background "'+Manifest.icon.background+'" -flatten -resize 100x100 "'+dir_native+'icon-50@2x.png"');
			// splashscreen
			GRAPHICS.push('"'+__dirname+path.sep+'im'+path.sep+'convert" "'+__dirname+path.sep+'transparent.png" -gravity center -background "'+Manifest.splashscreen.background+'" -size 320x480 "'+dir_native+'Default~iphone.png"');
			GRAPHICS.push('"'+__dirname+path.sep+'im'+path.sep+'convert" "'+__dirname+path.sep+'transparent.png" -gravity center -background "'+Manifest.splashscreen.background+'" -size 640x960 "'+dir_native+'Default@2x~iphone.png"');
			GRAPHICS.push('"'+__dirname+path.sep+'im'+path.sep+'convert" "'+__dirname+path.sep+'transparent.png" -gravity center -background "'+Manifest.splashscreen.background+'" -size 768x1024 "'+dir_native+'Default-Portrait~ipad.png"');
			GRAPHICS.push('"'+__dirname+path.sep+'im'+path.sep+'convert" "'+__dirname+path.sep+'transparent.png" -gravity center -background "'+Manifest.splashscreen.background+'" -size 1536x2048 "'+dir_native+'Default-Portrait@2x~ipad.png"');
			GRAPHICS.push('"'+__dirname+path.sep+'im'+path.sep+'convert" "'+__dirname+path.sep+'transparent.png" -gravity center -background "'+Manifest.splashscreen.background+'" -size 1024x768 "'+dir_native+'Default-Landscape~ipad.png"');
			GRAPHICS.push('"'+__dirname+path.sep+'im'+path.sep+'convert" "'+__dirname+path.sep+'transparent.png" -gravity center -background "'+Manifest.splashscreen.background+'" -size 2048x1536 "'+dir_native+'Default-Landscape@2x~ipad.png"');
			GRAPHICS.push('"'+__dirname+path.sep+'im'+path.sep+'convert" "'+__dirname+path.sep+'transparent.png" -gravity center -background "'+Manifest.splashscreen.background+'" -size 640x1136 "'+dir_native+'Default-568h@2x~iphone.png"');
			GRAPHICS.push('"'+__dirname+path.sep+'im'+path.sep+'convert" "'+__dirname+path.sep+'transparent.png" -gravity center -background "'+Manifest.splashscreen.background+'" -size 750x1334 "'+dir_native+'Default-667h.png"');
			GRAPHICS.push('"'+__dirname+path.sep+'im'+path.sep+'convert" "'+__dirname+path.sep+'transparent.png" -gravity center -background "'+Manifest.splashscreen.background+'" -size 1242x2208 "'+dir_native+'Default-736h.png"');
			GRAPHICS.push('"'+__dirname+path.sep+'im'+path.sep+'convert" "'+__dirname+path.sep+'transparent.png" -gravity center -background "'+Manifest.splashscreen.background+'" -size 2208x1242 "'+dir_native+'Default-Landscape-736h.png"');
		};

		console.log('  - Adding resources');
		
		async.map(GRAPHICS,convert,function(err,result) {
		
		if (PROCESS_IOS!=-1) {
			// generate platforms
			console.log('  - Adding ios platform');
			shelljs.exec("cordova platform add ios");	
		}
		
		if (PROCESS_ANDROID!=-1) {
			// generate platforms
			console.log('  - Adding android platform');
			shelljs.exec("cordova platform add android");	
		}
			var plugz=Manifest.plugins;
			console.log('  - Configuring plugins');
			for (var i=0;i<plugz.length;i++)
			{
				console.log('    - Adding '+plugz[i]);
				if (!fs.existsSync(PROJECT_HOME+path.sep+'dev'+path.sep+'native'+path.sep+'plugins'+path.sep+plugz[i]) ) shelljs.exec('cordova plugin add "'+plugz[i]+'"');	
			};
			
			glob.rmdirSyncRecursive(PROJECT_HOME+path.sep+'dev'+path.sep+'native'+path.sep+'www');
			shelljs.mkdir(PROJECT_HOME+path.sep+'dev'+path.sep+'native'+path.sep+'www');
			shelljs.cp(PROJECT_HOME+path.sep+'builds'+path.sep+'webapp'+path.sep+Manifest.version+'.'+Manifest.build+path.sep+'index.html',PROJECT_HOME+path.sep+'dev'+path.sep+'native'+path.sep+'www'+path.sep+'index.html');
			var ndx=fs.readFileSync(PROJECT_HOME+path.sep+'dev'+path.sep+'native'+path.sep+'www'+path.sep+'index.html','utf-8');
			ndx=ndx.replace('</body>','<script type=text/javascript src="cordova.js"></script></body>');
			fs.writeFileSync(PROJECT_HOME+path.sep+'dev'+path.sep+'native'+path.sep+'www'+path.sep+'index.html',ndx);
			
			fs.mkdirSync(PROJECT_HOME+path.sep+'dev'+path.sep+'native'+path.sep+'www'+path.sep+'Contents');
			shelljs.cp(PROJECT_HOME+path.sep+'builds'+path.sep+'webapp'+path.sep+Manifest.version+'.'+Manifest.build+path.sep+'Contents'+path.sep+'Application.js',PROJECT_HOME+path.sep+'dev'+path.sep+'native'+path.sep+'www'+path.sep+'Contents'+path.sep+'Application.js');
			shelljs.cp(PROJECT_HOME+path.sep+'builds'+path.sep+'webapp'+path.sep+Manifest.version+'.'+Manifest.build+path.sep+'Contents'+path.sep+'Resources.css',PROJECT_HOME+path.sep+'dev'+path.sep+'native'+path.sep+'www'+path.sep+'Contents'+path.sep+'Resources.css');
			
			
			
			if (PROCESS_ANDROID!=-1) {
				shelljs.rm('-rf',PROJECT_HOME+path.sep+'dev'+path.sep+'native'+path.sep+'platforms'+path.sep+'android'+path.sep+'res'+path.sep+'values-*');
				if (process.argv.indexOf("release")>-1) {
					console.log('  - Compiling release APK... Please wait!');
					shelljs.exec('cordova build --release android',{silent: true});
					if (!fs.existsSync(PROJECT_HOME+path.sep+'etc'+path.sep+'app.keystore')) shelljs.exec('keytool -genkey -v -keystore "'+PROJECT_HOME+path.sep+'etc'+path.sep+'app.keystore'+'" -alias alias_name -keyalg RSA -keysize 2048 -validity 10000');
				} else {
					console.log('  - Compiling debug APK');
					shelljs.exec('cordova build android');
				};
				if (!fs.existsSync(PROJECT_HOME+path.sep+'builds'+path.sep+'native')) fs.mkdirSync(PROJECT_HOME+path.sep+'builds'+path.sep+'native');
				if (!fs.existsSync(PROJECT_HOME+path.sep+'builds'+path.sep+'native'+path.sep+'android')) fs.mkdirSync(PROJECT_HOME+path.sep+'builds'+path.sep+'native'+path.sep+'android');
				fs.mkdirSync(PROJECT_HOME+path.sep+'builds'+path.sep+'native'+path.sep+'android'+path.sep+Manifest.version+'.'+Manifest.build);
				shelljs.cp(PROJECT_HOME+path.sep+'dev'+path.sep+'native'+path.sep+'platforms'+path.sep+'android'+path.sep+'ant-build'+path.sep+'*-debug.apk',PROJECT_HOME+path.sep+'builds'+path.sep+'native'+path.sep+'android'+path.sep+Manifest.version+'.'+Manifest.build);
				console.log('    Done.');
			}
		
		});
		
	});
	
	
};

function make_res()
{
	// get resource from frameworks

	if (fs.existsSync(PROJECT_DEV+path.sep+"webapp"+path.sep+"Resources.css")) make_final();
	else {	
		async.map(Settings.RESOURCES,getCSS,make_final);
	}

};

function res_html_compile()
{
	if (Settings.TYPE=="mobile")
	{
		var css="";
		var links=[];
		links.push('<meta name="HandheldFriendly" content="true"><meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"><meta name="apple-mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-status-bar-style" content="black">');
		links.push('<link rel="apple-touch-icon" href="data:image/png;base64,'+b64(PROJECT_WEB+path.sep+'Contents'+path.sep+'Resources'+path.sep+'icons'+path.sep+'icon.png')+'">');
		links.push('<link rel="apple-touch-icon" sizes="72x72" href="data:image/png;base64,'+b64(PROJECT_WEB+path.sep+'Contents'+path.sep+'Resources'+path.sep+'icons'+path.sep+'icon@72.png')+'" />');
		links.push('<link rel="apple-touch-icon" sizes="114x114" href="data:image/png;base64,'+b64(PROJECT_WEB+path.sep+'Contents'+path.sep+'Resources'+path.sep+'icons'+path.sep+'icon@114.png')+'" />');
		links.push('<link rel="apple-touch-icon" sizes="144x144" href="data:image/png;base64,'+b64(PROJECT_WEB+path.sep+'Contents'+path.sep+'Resources'+path.sep+'icons'+path.sep+'icon@144.png')+'" />');
		var linkme=false;
		var parser = new htmlparser.Parser({
			onopentag: function(name, attribs){
				if (name==="link") linkme=true;
			},
			ontext: function(text){
				if (linkme) {
					css+=encodeCSS(text);
				};
			},		
			onclosetag: function(tagname){
				if(tagname === "head"){
					linkme=false;
				};				
				if(tagname === "html"){
					var link=require('sqwish').minify(css);
					var html=fs.readFileSync(PROJECT_HOME+path.sep+"src"+path.sep+"index.html","utf-8");
					var title=html.split('<title>')[1].split('</title')[0];
					var spinner=html.split('<script>')[1].split('</script>')[0].replace(/\s{2,}/g, '');
					//var favicon="<script>var docHead=document.getElementsByTagName('head')[0];var newLink=document.createElement('link');newLink.rel='shortcut icon';newLink.href='data:image/png;base64,"+b64(PROJECT_WEB+path.sep+'Contents'+path.sep+'Resources'+path.sep+'favicon.ico')+"';docHead.appendChild(newLink);</script>";
					var body=html.split('<body ')[1].split('<script src="http://cdnjs.cloudflare.com/ajax/libs/require.js/2.1.8/require.js"')[0].replace(/\s{2,}/g, '');
					var launcher="<script>window.setTimeout(function(){var script=document.createElement('script');script.src=\"Contents/Application.js\";document.getElementsByTagName('body')[0].appendChild(script);},1000);</script>";
					//var launcher='<script src="Contents/Application.js"></script>';
					if (process.argv.indexOf("unsafe")>-1)
					var html='<!DOCTYPE html><html><head><meta http-equiv="Content-Security-Policy" content="default-src *; style-src \'self\' \'unsafe-inline\'; script-src \'self\' \'unsafe-inline\' \'unsafe-eval\'"><title>'+title+'</title><meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /><script>'+spinner+'</script><style type="text/css">'+link+'</style>'+links.join('')+'</head><body '+body+'><link rel=stylesheet type=text/css href="Contents/Resources.css"></link>'+launcher+'</body></html>';
					else
					var html='<!DOCTYPE html><html><head><title>'+title+'</title><meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /><script>'+spinner+'</script><style type="text/css">'+link+'</style>'+links.join('')+'</head><body '+body+'><link rel=stylesheet type=text/css href="Contents/Resources.css"></link>'+launcher+'</body></html>';
					var html=html.replace(/>>/g,'>');
					html=html.replace('<title>','<meta http-equiv="Content-Type" content="text/html; charset=utf-8"><title>');
					fs.writeFileSync(PROJECT_DEV+path.sep+"webapp"+path.sep+"index.html",html);
					make_res();
				}
			}
		});			
		parser.write(fs.readFileSync(PROJECT_HOME+path.sep+"src"+path.sep+"index.html"));
		parser.end();
				
	};
	
	if (Settings.TYPE=="desktop")
	{
		var css="";
		var parser = new htmlparser.Parser({
			onopentag: function(name, attribs){
				if (name==="link") linkme=true;
			},
			ontext: function(text){
				if (linkme) {
					css+=encodeCSS(text);
				};
			},		
			onclosetag: function(tagname){
				if(tagname === "head"){
					linkme=false;
				};				
				if(tagname === "html"){
					var link=require('sqwish').minify(css);
					var html=fs.readFileSync(PROJECT_HOME+path.sep+"src"+path.sep+"index.html","utf-8");
					var title=html.split('<title>')[1].split('</title')[0];
					var spinner=html.split('<script>')[1].split('</script>')[0].replace(/\s{2,}/g, '');
					var favicon="<script>var docHead=document.getElementsByTagName('head')[0];var newLink=document.createElement('link');newLink.rel='shortcut icon';newLink.href='data:image/png;base64,"+b64(PROJECT_WEB+path.sep+'Contents'+path.sep+'Resources'+path.sep+'favicon.ico')+"';docHead.appendChild(newLink);</script>";					
					var body=html.split('<body ')[1].split('<script src="http://cdnjs.cloudflare.com/ajax/libs/require.js/2.1.8/require.js"')[0].replace(/\s{2,}/g, '');
					var launcher="<script>window.setTimeout(function(){var script=document.createElement('script');script.src=\"Contents/Application.js\";document.getElementsByTagName('body')[0].appendChild(script);},1000);</script>";
					var html='<!DOCTYPE html><html><head><title>'+title+'</title><meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /><script>'+spinner+'</script><style type="text/css">'+link+'</style></head><body '+body+'><link rel=stylesheet type=text/css href="Contents/Resources.css"></link>'+favicon+launcher+'</body></html>';
					var html=html.replace(/>>/g,'>');
					fs.writeFileSync(PROJECT_DEV+path.sep+"webapp"+path.sep+"index.html",html);
					make_res();
				}
			}
		});			
		parser.write(fs.readFileSync(PROJECT_HOME+path.sep+"src"+path.sep+"index.html"));
		parser.end();

	};

};

function generateCode(data)
{
  var qr = QRCode.qrcode(4, 'L');
  qr.addData(data);
  qr.make();
  var qrimgtag = qr.createImgTag(4);
  var idx=qrimgtag.indexOf("base64,") + 7;
  qrimgtag  = qrimgtag.substring(idx);
  idx = qrimgtag.indexOf("\"");

  return "data:image/png;base64,"+qrimgtag.split('"')[0];
};

/********

Config

**********/

cfg={
	set: function(ndx,value) {
		if (!fs.existsSync(__dirname+path.sep+".config")) var config={}; else var config=JSON.parse(fs.readFileSync(__dirname+path.sep+".config",'utf-8'));	
		if (!config.current) config.current={};
		config.current[ndx]=value;
		fs.writeFileSync(__dirname+path.sep+".config",JSON.stringify(config,null,4));
	},
	unset: function(ndx) {
		if (!fs.existsSync(__dirname+path.sep+".config")) var config={}; else var config=JSON.parse(fs.readFileSync(__dirname+path.sep+".config",'utf-8'));	
		if (!config.current) config.current={};
		delete config.current[ndx];
		fs.writeFileSync(__dirname+path.sep+".config",JSON.stringify(config,null,4));
	},
	update: function(ns) {
		// unset proxy for omneedia
		PROXY = "";
		console.log('  - Updating config');
		// unset proxy for npm
		shelljs.exec('npm config delete proxy',{silent: true});
		shelljs.exec('npm config delete https-proxy',{silent: true});
		// unset proxy for git
		shelljs.exec('git config --global core.pager cat',{silent: true});
		shelljs.exec('git config --global --unset http.proxy',{silent: true});
		shelljs.exec('git config --global --unset https.proxy',{silent: true});
		if (!fs.existsSync(__dirname+path.sep+".config")) var config={}; else var config=JSON.parse(fs.readFileSync(__dirname+path.sep+".config",'utf-8'));	
		if (!config.current) config.current={};
		for (var el in config.current) {
			if (el=="proxy") {
				// set proxy for omneedia
				PROXY = config.current['proxy'];
				// set proxy for npm
				shelljs.exec('npm config set proxy '+PROXY,{silent: true});
				shelljs.exec('npm config set https-proxy '+PROXY,{silent: true});
				// set proxy for git
				shelljs.exec('git config --global http.proxy '+PROXY);
				shelljs.exec('git config --global https.proxy '+PROXY);
			}
		};
		console.log('  - Config updated.');
		console.log('');	
	},
	load: function(ns) {

		// unset proxy for omneedia
		PROXY = "";
		console.log('  - Loading config '+ns.white);
		// unset proxy for npm
		shelljs.exec('npm config delete proxy',{silent: true});
		shelljs.exec('npm config delete https-proxy',{silent: true});
		// unset proxy for git
		shelljs.exec('git config --global core.pager cat',{silent: true});
		shelljs.exec('git config --global --unset http.proxy',{silent: true});
		shelljs.exec('git config --global --unset https.proxy',{silent: true});
		if (!fs.existsSync(__dirname+path.sep+".config")) var config={}; else var config=JSON.parse(fs.readFileSync(__dirname+path.sep+".config",'utf-8'));	
		if (!config.current) config.current={};
		if (config[ns]) config.current=config[ns];
		for (var el in config.current) {
			if (el=="proxy") {
				// set proxy for omneedia
				PROXY = config.current['proxy'];
				// set proxy for npm
				shelljs.exec('npm config set proxy '+PROXY,{silent: true});
				shelljs.exec('npm config set https-proxy '+PROXY,{silent: true});
				// set proxy for git
				shelljs.exec('git config --global http.proxy '+PROXY);
				shelljs.exec('git config --global https.proxy '+PROXY);
			}
		};
		fs.writeFileSync(__dirname+path.sep+".config",JSON.stringify(config,null,4));
		console.log('  - Config '+ns+' loaded.');
		console.log('');
	},
	save: function(ns) {
		if (!fs.existsSync(__dirname+path.sep+".config")) var config={}; else var config=JSON.parse(fs.readFileSync(__dirname+path.sep+".config",'utf-8'));	
		if (!config.current) config.current={};
		config[ns]=config.current;
		fs.writeFileSync(__dirname+path.sep+".config",JSON.stringify(config,null,4));
		console.log('  - Config saved.'.green);
		console.log('');
	}
};

/***

***/

function get_mysql_tables(db,res,response) {
	var mysql = require('mysql');
	var connection = mysql.createConnection({
		host     : db.host,
		port	 : db.port,
		user     : db.user,
		password : db.pass
	});

	connection.connect();
	var table="";
	response.tables=[];
	response.db=db.name;
	response.table={};
	connection.query("SELECT * FROM information_schema.columns WHERE table_schema =  '"+db.name+"' ORDER BY table_name, ordinal_position",function(err,rows) {
		if (err) {
			response.error=err;
		} else {
			for (var i=0;i<rows.length;i++) 
			{
				var r=rows[i];
				if (r.TABLE_NAME!=table) {
					response.tables[response.tables.length]=r.TABLE_NAME;
					table=r.TABLE_NAME;
					response.table[table]={
						key: -1,
						fields: [],
						field: {}
					};
				};
				response.table[table].fields[response.table[table].fields.length]=r.COLUMN_NAME;
				if (r.COLUMN_KEY=="PRI") response.table[table].key=r.COLUMN_NAME;
				response.table[table].field[r.COLUMN_NAME]={
					default: r.COLUMN_DEFAULT,
					isNull: r.IS_NULLABLE,
					type: r.DATA_TYPE,
					maxlength: r.CHARACTER_MAXIMUM_LENGTH,
					num_precision: r.NUMERIC_PRECISION,
					num_scale: r.NUMERIC_SCALE,
					key: r.COLUMN_KEY,
					extra: r.EXTRA,
					comment: r.COLUMN_COMMENT
				};
			};
		};
		if (!fs.existsSync(PROJECT_WEB+path.sep+"Contents"+path.sep+"Db")) fs.mkdirSync(PROJECT_WEB+path.sep+"Contents"+path.sep+"Db");
		if (!fs.existsSync(PROJECT_WEB+path.sep+"Contents"+path.sep+"Db"+path.sep+response.db+".scheme")) fs.writeFileSync(PROJECT_WEB+path.sep+"Contents"+path.sep+"Db"+path.sep+response.db+".scheme",JSON.stringify(response,null,4));
		res.end(JSON.stringify(response,null,4));
	});	
	connection.end();
	
};

function getFields(data,table,SCHEME,response,_from)
{
	if (!response) var response={fields:[],field:{}};
	if (!_from) _from=table; else _from=_from+"."+table;
	for (var e in data) {
		if (e==table) {
			for (var el in data[e]) {
				if (SCHEME[table]) {
					if (SCHEME[table][el]) {
						var mytable=SCHEME[table][el].split('.')[0];
						getFields(data,mytable,SCHEME,response,_from);
					} else {
						response.fields[response.fields.length]=_from+"."+el;
						response.field[_from+"."+el]=data[e][el];
					}
				} else {
					response.fields[response.fields.length]=_from+"."+el;
					response.field[_from+"."+el]=data[e][el];
				}
			}
		}
	};
	return response;
};

function fieldz(db,res,response,data) {
	if (fs.existsSync(PROJECT_WEB+path.sep+"Contents"+path.sep+"Db"+path.sep+response.db+".scheme"))  {
		var json=fs.readFileSync(PROJECT_WEB+path.sep+"Contents"+path.sep+"Db"+path.sep+response.db+".scheme");
		var SCHEME=JSON.parse(json);
	} else SCHEME={};
	result=getFields(data,response.table,SCHEME);
	response.fields=result.fields;
	response.field=result.field;
	res.end(JSON.stringify(response,null,4));
};

function get_mysql_fields(db,res,response,cb) {

	var mysql = require('mysql');
	var connection = mysql.createConnection({
		host     : db.host,
		port	 : db.port,
		user     : db.user,
		password : db.pass
	});
	connection.connect();
	var table=db.table;
	response.db=db.name;
	response.table=db.table;
	response.fields=[];
	response.field={};
	connection.query("SELECT * FROM information_schema.columns WHERE table_schema =  '"+db.name+"' ORDER BY table_name, ordinal_position",function(err,rows) {
		var data={};
		for (var i=0;i<rows.length;i++) 
		{
			var r=rows[i];
			if ((r.COLUMN_KEY=="PRI") && (r.TABLE_NAME==response.table)) response.key=response.table+"."+r.COLUMN_NAME;
			if (!data[r.TABLE_NAME]) data[r.TABLE_NAME]={};
			if (!data[r.TABLE_NAME][r.COLUMN_NAME]) data[r.TABLE_NAME][r.COLUMN_NAME]={
				default: r.COLUMN_DEFAULT,
				isNull: r.IS_NULLABLE,
				type: r.DATA_TYPE,
				maxlength: r.CHARACTER_MAXIMUM_LENGTH,
				num_precision: r.NUMERIC_PRECISION,
				num_scale: r.NUMERIC_SCALE,
				key: r.COLUMN_KEY,
				extra: r.EXTRA,
				comment: r.COLUMN_COMMENT
			};
		};		
		cb(db,res,response,data);
	});	
	connection.end();

};

function get_mysql_datas(db,res,response,data) {
	var tables=[];
	var fields=[];
	if (fs.existsSync(PROJECT_WEB+path.sep+"Contents"+path.sep+"Db"+path.sep+response.db+".scheme"))  {
		var json=fs.readFileSync(PROJECT_WEB+path.sep+"Contents"+path.sep+"Db"+path.sep+response.db+".scheme");
		var SCHEME=JSON.parse(json);
	} else SCHEME={};
	result=getFields(data,response.table,SCHEME);
	response.fields=result.fields;
	response.field=result.field;
	for (var i=0;i<response.fields.length;i++) {
		var element=response.fields[i].split('.');
		for (var j=0;j<element.length-1;j++) {
			if (tables.indexOf(element[j])==-1) tables[tables.length]=element[j];
		};
		fields[fields.length]=element[element.length-2]+"."+element[element.length-1];
	};
	var sql="SELECT "+fields.join(', ')+" FROM "+tables.join(', ')+" WHERE";
	for (var table in SCHEME) {
		var mytable=SCHEME[table];
		for (var property in mytable) {
			sql+=" "+table+"."+property+" = "+mytable[property]+" AND";
		}
	};
	console.log(sql);
	res.end(sql);
};

function get_mysql_data(db,res,response) {
	var mysql = require('mysql');
	var connection = mysql.createConnection({
		host     : db.host,
		port	 : db.port,
		user     : db.user,
		password : db.pass
	});

	connection.connect();
	var table=db.table;
	response.db=db.name;
	response.table=db.table;
	response.fields=[];
	response.field={};
	response.data=[];

	if (db.fields=="*") {
		get_mysql_fields(db,res,response,get_mysql_datas);
	}
};



API=[];
PROJECT_HOME=process.cwd();
ROOT=path.dirname(PROJECT_HOME);
if (!fs.existsSync(PROJECT_HOME+path.sep+"app.manifest")) {
	if (!fs.existsSync(PROJECT_HOME+path.sep+".."+path.sep+"app.manifest")) PROJECT_HOME="-";
	else PROJECT_HOME=path.normalize(fs.realpathSync(PROJECT_HOME+path.sep+".."+path.sep));
};

if (PROJECT_HOME!="-") {
	PROJECT_WEB=PROJECT_HOME+path.sep+"src";
	PROJECT_API=PROJECT_WEB+path.sep+"Contents"+path.sep+"Services";
	PROJECT_DEV=PROJECT_HOME+path.sep+"dev";
	PROJECT_VAR=PROJECT_HOME+path.sep+"var";
	PROJECT_SYSTEM=PROJECT_WEB+path.sep+"System";
	PROJECT_BUILD=PROJECT_HOME+path.sep+"builds";
	PROJECT_NS=ROOT.split(path.sep)[ROOT.split(path.sep).length-1];	

	if (!fs.existsSync(PROJECT_HOME+path.sep+'dev')) fs.mkdirSync(PROJECT_HOME+path.sep+'dev');
	if (!fs.existsSync(PROJECT_HOME+path.sep+'dev'+path.sep+'webapp')) fs.mkdirSync(PROJECT_HOME+path.sep+'dev'+path.sep+'webapp');

	// Settings
	if (fs.existsSync(PROJECT_HOME+path.sep+'src'+path.sep+'Contents'+path.sep+'Settings.js'))
	{
		var settings=fs.readFileSync(PROJECT_HOME+path.sep+'src'+path.sep+'Contents'+path.sep+'Settings.js','utf-8');
		eval(settings);
	}

	// get app.manifest
	var json=fs.readFileSync(PROJECT_HOME+path.sep+"app.manifest");
	Manifest=JSON.parse(json);
	
	//get args
	if (process.argv.indexOf("start")>-1) var setmeup=process.argv[process.argv.indexOf("start")+1];
	if (process.argv.indexOf("updatedb")>-1) var setmeup=process.argv[process.argv.indexOf("updatedb")+1];
	if (process.argv.indexOf("migrationdb")>-1) var setmeup=process.argv[process.argv.indexOf("migrationdb")+1];

	PROCESS_CUSTOM=-1;
	if (process.argv.indexOf('production')>-1) {
		PROCESS_NATIVE=false;				
		PROCESS_PRODUCTION=true;
		var p=glob.readdirSyncRecursive(PROJECT_HOME+path.sep+'etc');
		for (var z=0;z<p.length;z++) {
			try {
			var cc=p[z].split('settings-')[1].split('.json')[0];
			if (process.argv.indexOf(cc)>-1) PROCESS_CUSTOM=cc;
			}catch(e) {
			
			}
		}
	};
	
	if (process.argv.indexOf("build")>-1) {
		setmeup="prod";
		if (PROCESS_CUSTOM!=-1) setmeup=PROCESS_CUSTOM;
		if (!fs.existsSync(PROJECT_HOME+path.sep+'etc'+path.sep+'settings-'+setmeup+'.json')) {
			console.log("  ! No settings-prod found. Can't build.".yellow);
			return;
		}
	};
	
	if (setmeup) {
		if (fs.existsSync(PROJECT_HOME+path.sep+'etc'+path.sep+'settings-'+setmeup+'.json')) {
			var _set=fs.readFileSync(PROJECT_HOME+path.sep+'etc'+path.sep+'settings-'+setmeup+'.json','utf-8');
			MSettings=JSON.parse(_set);
		} else console.log(setmeup+' settings not found');
	} else {
		if (fs.existsSync(PROJECT_HOME+path.sep+'etc'+path.sep+'settings.json')) {
			var _set=fs.readFileSync(PROJECT_HOME+path.sep+'etc'+path.sep+'settings.json','utf-8');
			MSettings=JSON.parse(_set);		
		}
	};
	
};

function update_npm()
{
	if (fs.existsSync(PROJECT_HOME+path.sep+'bin'+path.sep+'package.json')) {
		var npm=fs.readFileSync(PROJECT_HOME+path.sep+'bin'+path.sep+'package.json','utf-8');
		npm=JSON.parse(npm);
		var list=[];
		for (var element in npm.dependencies) {
			list.push(element);
		};
		if (list.length>0) {
			console.log('  - Updating npm packages');
			process.chdir(PROJECT_HOME+path.sep+'bin');
			for (var i=0;i<list.length;i++)
			{
				if (!fs.existsSync(PROJECT_HOME+path.sep+'bin'+path.sep+'node_modules'+path.sep+list[i])) {
					console.log('    - Downloading '+list[i]);
					shelljs.exec('npm install');
					console.log('      Done.');
				};
			};
		};
		// remove unnecessary packages
		if (!fs.existsSync(PROJECT_HOME+path.sep+'bin'+path.sep+'node_modules')) fs.mkdirSync(PROJECT_HOME+path.sep+'bin'+path.sep+'node_modules');
		var dir=fs.readdirSync(PROJECT_HOME+path.sep+'bin'+path.sep+'node_modules');
		for (var i=0;i<dir.length;i++) {
			if (list.indexOf(dir[i])==-1) glob.rmdirSyncRecursive(PROJECT_HOME+path.sep+'bin'+path.sep+'node_modules'+path.sep+dir[i]);
		};
		process.chdir(PROJECT_HOME);
	};
};

function build_production()
{
	console.log('  - Downloading worker API');
	Request('https://github.com/Omneedia/tpl.omneedia.production/archive/master.zip').on('end',function() {
		console.log('  - Expanding production template');
		var readStream = fs.createReadStream(PROJECT_HOME+path.sep+'master.zip');
		var writeStream = require('fstream').Writer(PROJECT_HOME);
		readStream
		.pipe(unzip.Parse())
		.pipe(writeStream.on('close',function() {
			if (!fs.existsSync(PROJECT_HOME+path.sep+'builds')) fs.mkdirSync(PROJECT_HOME+path.sep+'builds'); 
			if (!fs.existsSync(PROJECT_HOME+path.sep+'builds'+path.sep+'production')) fs.mkdirSync(PROJECT_HOME+path.sep+'builds'+path.sep+'production'); 
			if (!fs.existsSync(PROJECT_HOME+path.sep+'builds'+path.sep+'production'+path.sep+Manifest.version+'.'+Manifest.build)) fs.mkdirSync(PROJECT_HOME+path.sep+'builds'+path.sep+'production'+path.sep+Manifest.version+'.'+Manifest.build); 
			glob.copyDirSyncRecursive(PROJECT_HOME+path.sep+'tpl.omneedia.production-master', PROJECT_HOME+path.sep+'builds'+path.sep+'production'+path.sep+Manifest.version+'.'+Manifest.build+path.sep+Manifest.namespace);
			require('fs').unlinkSync(PROJECT_HOME+path.sep+'master.zip');
			glob.rmdirSyncRecursive(PROJECT_HOME+path.sep+'tpl.omneedia.production-master');
			var _cdir=PROJECT_HOME+path.sep+'builds'+path.sep+'production'+path.sep+Manifest.version+'.'+Manifest.build+path.sep+Manifest.namespace+path.sep+'Contents';
			if (!fs.existsSync(_cdir+path.sep+'bin')) fs.mkdirSync(_cdir+path.sep+'bin');
			if (!fs.existsSync(_cdir+path.sep+'etc')) fs.mkdirSync(_cdir+path.sep+'etc');
			if (!fs.existsSync(_cdir+path.sep+'api')) fs.mkdirSync(_cdir+path.sep+'api');
			if (!fs.existsSync(_cdir+path.sep+'var')) fs.mkdirSync(_cdir+path.sep+'var');
			if (!fs.existsSync(_cdir+path.sep+'www')) fs.mkdirSync(_cdir+path.sep+'www');
			if (!fs.existsSync(_cdir+path.sep+'www'+path.sep+'Contents')) fs.mkdirSync(_cdir+path.sep+'www'+path.sep+'Contents');
			
			if (Manifest.platform=="mobile")
			{
				console.log('  - Processing index');
				var index=[
					"OMNEEDIA API SERVER"
				];
				fs.writeFileSync(_cdir+path.sep+'www'+path.sep+'index.html',index.join('\n'));
			} else {
				console.log('  - Processing app');
				shelljs.cp(PROJECT_HOME+path.sep+'builds'+path.sep+'webapp'+path.sep+Manifest.version+'.'+Manifest.build+path.sep+'index.html', _cdir+path.sep+'www'+path.sep+'index.html');
				shelljs.cp(PROJECT_HOME+path.sep+'builds'+path.sep+'webapp'+path.sep+Manifest.version+'.'+Manifest.build+path.sep+'Contents'+path.sep+'Application.js', _cdir+path.sep+'www'+path.sep+'Contents'+path.sep+'Application.js');
				shelljs.cp(PROJECT_HOME+path.sep+'builds'+path.sep+'webapp'+path.sep+Manifest.version+'.'+Manifest.build+path.sep+'Contents'+path.sep+'Resources.css', _cdir+path.sep+'www'+path.sep+'Contents'+path.sep+'Resources.css');
			}
			
			// update package.json
			console.log('  - Processing package.json');
			var pkg=JSON.parse(fs.readFileSync(_cdir+path.sep+'package.json','utf-8'));
			for (var i=0;i<Manifest.packages.length;i++) pkg.dependencies[Manifest.packages[i]]="*";
			fs.writeFileSync(_cdir+path.sep+'package.json',JSON.stringify(pkg,null,4));

			// update settings
			console.log('  - Processing settings');
			shelljs.cp(PROJECT_HOME+path.sep+'etc'+path.sep+'settings-prod.json', _cdir+path.sep+'etc'+path.sep+'settings-prod.json');			
			
			// update api
			console.log('  - Processing api');
			glob.copyDirSyncRecursive(PROJECT_HOME+path.sep+'src'+path.sep+'Contents'+path.sep+'Services', _cdir+path.sep+'api',{
				forceDelete: true
			});					

			// update api
			console.log('  - Processing worker system');
			glob.copyDirSyncRecursive(PROJECT_HOME+path.sep+'src'+path.sep+'System', _cdir+path.sep+'var',{
				forceDelete: true
			});				

			// update manifest
			console.log('  - Processing manifest');
			shelljs.cp(PROJECT_HOME+path.sep+'app.manifest', _cdir+path.sep+'app.manifest');				

			// update auth (officer)
			console.log('  - Processing Auth');
			shelljs.mkdir(_cdir+path.sep+'auth');
			shelljs.cp(PROJECT_HOME+path.sep+'src'+path.sep+'Contents'+path.sep+'Auth'+path.sep+'Officer.js', _cdir+path.sep+'auth'+path.sep+'Officer.js');				
			if (fs.existsSync(PROJECT_HOME+path.sep+'src'+path.sep+'Contents'+path.sep+'Auth'+path.sep+'Profiler.json'))
			shelljs.cp(PROJECT_HOME+path.sep+'src'+path.sep+'Contents'+path.sep+'Auth'+path.sep+'Profiler.json', _cdir+path.sep+'auth'+path.sep+'Profiler.json');				
			
			// creating package
			console.log('  - Creating drone');
			
			shelljs.exec('7z a "'+PROJECT_HOME+path.sep+'builds'+path.sep+'production'+path.sep+Manifest.version+'.'+Manifest.build+path.sep+Manifest.namespace+'.drone" "'+PROJECT_HOME+path.sep+'builds'+path.sep+'production'+path.sep+Manifest.version+'.'+Manifest.build+path.sep+Manifest.namespace+'"',{silent: true});

			// deleting temp files
			console.log('  - Deleting temp files');	
			shelljs.rm('-rf',PROJECT_HOME+path.sep+'builds'+path.sep+'production'+path.sep+Manifest.version+'.'+Manifest.build+path.sep+Manifest.namespace);
			
			/*
			Publishing it
			*/
			
			if (argv.indexOf('publish')>-1)
			{
				if (!ocfg.current["publish.host"]) { console.log('  ! Publishing failed. No publish.host defined'.yellow); return; }
				// get last drone
				var p=glob.readdirSyncRecursive(PROJECT_HOME+path.sep+'builds'+path.sep+'production');
				if (p.length==0) {
					console.log('  ! Publishing failed. No drone found'.yellow);
					return;
				};
				console.log('  - Publishing drone v'+p[p.length-1].split(require('path').sep)[0]);
				if (ocfg.current["publish.port"]) var port=ocfg.current["publish.port"]; else var port=9191;
				
				var req = request.post("http://"+ocfg.current["publish.host"]+":"+port+"/upload", function (err, resp, body) {
					 console.log(err);
					 console.log(resp);
					 console.log(body);
					 if (err) {
						console.log('  ! Publishing failed. Check your config'.yellow);
					 } else {
						console.log('  Done.');
					 }
				});
				var form = req.form();
				form.append('file', fs.createReadStream(PROJECT_HOME+path.sep+'builds'+path.sep+'production'+path.sep+p[p.length-1]));
				return;
			};

			
			console.log('    Done. ');
			
			
			
		}));

	}).pipe(fs.createWriteStream(PROJECT_HOME+path.sep+'master.zip'));	
};

function do_get()
{
	var op=argv[argv.indexOf('get')+1];
	console.log('  - Cloning project '+op);
	if (fs.existsSync(__dirname+path.sep+'.repositories')) {
		var ff=JSON.parse(fs.readFileSync(__dirname+path.sep+'.repositories','utf-8'));
	} else {
		if (!fs.existsSync(__dirname+path.sep+'repositories.config')) {
			var lst=[
				"Omneedia",
				"oxpm"
			];
			fs.writeFileSync(__dirname+path.sep+'repositories.config',lst.join('\n'));
		};
		var lst=fs.readFileSync(__dirname+path.sep+'repositories.config','utf-8').split('\n');
		download_repos (lst,0,[],function(r) {
			fs.writeFileSync(__dirname+path.sep+'.repositories',JSON.stringify(r,null,4));
			do_get();
		});
		return;
	};
	var url="";
	for (var i=0;i<ff.length;i++) {
		if (ff[i].name==op) var url=ff[i].git_url;
	};
	
	if (url=="") {
		console.log("   ! "+op+" not found".yellow);
	} else {
		
		var r=shelljs.exec('git clone '+url.replace('git://github.com/','https://github.com/'),{silent: true});
		if (r.output.indexOf('fatal')>-1) {
			console.log('  ! Cloning failed'.yellow);
		} else {
			console.log('  - Updating project');
			App_Update(op);
		}
	};
}

function App_Migration_Db()
{

	console.log('  - Migrating DB Schemes');
	
	if (!fs.existsSync(PROJECT_HOME+path.sep+'app.manifest')) {
		PROJECT_HOME=pcwd;
		PROJECT_DEV=PROJECT_HOME+path.sep+"dev";
		PROJECT_WEB=PROJECT_HOME+path.sep+"src";
		var manifest=PROJECT_HOME+path.sep+'app.manifest';
		if (!fs.existsSync(manifest)) {
			console.log('  ! Can\'t open manifest file.'.yellow);
			return;
		};
		Manifest=JSON.parse(fs.readFileSync(manifest));		
	};

	var manifest=PROJECT_HOME+path.sep+'app.manifest';
	var PACKAGE_NAME=PROJECT_HOME.split(path.sep)[PROJECT_HOME.split(path.sep).length-1];
	var PACKAGE_COMPANY=PACKAGE_NAME.split(".")[PACKAGE_NAME.split(".").length-2].toUpperCase();
	if (!fs.existsSync(manifest)) {
		console.log('  ! Can\'t open manifest file.'.yellow);
		return;
	};
	manifest=JSON.parse(fs.readFileSync(manifest));	
	// list all databases
	var dbo=manifest.db;
	
	for (var i=0;i<dbo.length;i++) {


		var mydb=dbo[i];
		var c=-1;
		for (var j=0;j<MSettings.db.length;j++) {
			if (MSettings.db[j].name==mydb) c=j;
		};
		var setup=MSettings.db[c].uri;
		var cmd=['sequelize-auto'];

		setup=setup.split('://');
		cmd.push('-e '+setup[0]);
		setup=setup[1];
		cmd.push('-o "'+PROJECT_HOME+path.sep+"src"+path.sep+'Contents'+path.sep+'Db'+path.sep+mydb+'.db"');			
		var users=setup.split('@')[0];
		var user=users.split(':')[0];
		var password=users.split(':')[1];
		cmd.push('-u '+user);
		cmd.push('-x '+password);
		var hosts=setup.split('@')[1].split('/')[0];
		var host=hosts.split(':')[0];
		try {
			var port=hosts.split(':')[1];
		}catch(e) {
			var port=-1;
		};
		cmd.push('-h '+host);
		if (port!=-1) cmd.push('-p '+port);
		var db=setup.split('/')[1];
		cmd.push('-d '+db);			

		if (!fs.existsSync(PROJECT_HOME+path.sep+'src'+path.sep+'Contents'+path.sep+'Db'+path.sep+mydb+'.scheme')) 
		{
			fs.mkdirSync(PROJECT_HOME+path.sep+'src'+path.sep+'Contents'+path.sep+'Db'+path.sep+mydb+'.db');
			console.log(cmd.join(' '));
			shelljs.exec(cmd.join(' '));
		}
	}	
		
		
};

function App_Model_Db()
{
	function _SDATA(item)
	{
		// map type to sequelize
		if (item=="int") return "DataTypes.INTEGER(11)";
		if (item=="string") return "DataTypes.STRING(255)";
		if (item=="datetime") return "DataTypes.DATE";
		if (item=="date") return "DataTypes.DATE";
		if (item=="float") return "DataTypes.FLOAT";
		if (item=="blob") return "DataTypes.BLOB";
		if (item=="boolean") return "DataTypes.BOOLEAN";
		if (item=="text") return "DataTypes.TEXT";
		return false;
	};
	if (setmeup) console.log("  + switch to settings ["+setmeup+"]\n");
	if (fs.existsSync(PROJECT_HOME+path.sep+'etc'+path.sep+'settings-'+setmeup+'.json')) {
		var _set=fs.readFileSync(PROJECT_HOME+path.sep+'etc'+path.sep+'settings-'+setmeup+'.json','utf-8');
		MSettings=JSON.parse(_set);
	} else {
		var _set=fs.readFileSync(PROJECT_HOME+path.sep+'etc'+path.sep+'settings.json','utf-8');
		MSettings=JSON.parse(_set);	
	};
	
	console.log('  - Updating DB Scheme');
	
	if (!fs.existsSync(PROJECT_HOME+path.sep+'app.manifest')) {
		PROJECT_HOME=pcwd;
		PROJECT_DEV=PROJECT_HOME+path.sep+"dev";
		PROJECT_WEB=PROJECT_HOME+path.sep+"src";
		var manifest=PROJECT_HOME+path.sep+'app.manifest';
		if (!fs.existsSync(manifest)) {
			console.log('  ! Can\'t open manifest file.'.yellow);
			return;
		};
		Manifest=JSON.parse(fs.readFileSync(manifest));		
	};

	var manifest=PROJECT_HOME+path.sep+'app.manifest';
	var PACKAGE_NAME=PROJECT_HOME.split(path.sep)[PROJECT_HOME.split(path.sep).length-1];
	var PACKAGE_COMPANY=PACKAGE_NAME.split(".")[PACKAGE_NAME.split(".").length-2].toUpperCase();
	if (!fs.existsSync(manifest)) {
		console.log('  ! Can\'t open manifest file.'.yellow);
		return;
	};
	manifest=JSON.parse(fs.readFileSync(manifest));	
	// list all databases
	var dbo=manifest.db;
	for (var i=0;i<dbo.length;i++) {
		var mydb=dbo[i];
		for (var j=0;j<MSettings.db.length;j++) {
			if (MSettings.db[j].name==mydb) c=j;
		};
		var setup=MSettings.db[c].uri;
		if (fs.existsSync(PROJECT_HOME+path.sep+"src"+path.sep+'Contents'+path.sep+'Db'+path.sep+mydb+'.scheme')) {
			var texto=fs.readFileSync(PROJECT_HOME+path.sep+"src"+path.sep+'Contents'+path.sep+'Db'+path.sep+mydb+'.scheme','utf-8').split('}');
			// Classes
			var _IMPORT={};
			var Sequelize=require('sequelize');
			var sequelize = new Sequelize(setup);
			for (var i=0;i<texto.length-1;i++) {
				var maclasse=texto[i].split('{')[0].trim();
				var madata=texto[i].split('{')[1];
				if (madata) madata=madata.split('-'); else madata=[];
				var COM=[];
				var XCOM=[];
				COM.push("module.exports = function(sequelize, DataTypes) {");	
				COM.push("	return sequelize.define('"+maclasse+"', {");
				var LINKS=[];
				for (var j=0;j<madata.length;j++) {					
					var mafield=madata[j].split('\r')[0].split('\n')[0].split('\t')[0].trim();
					if (mafield) {
						var matype=mafield.split(')')[0].split('(')[1];
						mafield=mafield.split(')')[1];
						mafield=mafield.replace(/\s/g,'');
						var mytype=_SDATA(matype);
						if (mytype) {
							if (mafield!="") {
								COM.push("		"+mafield+": {");
								COM.push("			type: "+_SDATA(matype)+",");
								COM.push("			allowNull: true");
								COM.push("		},");
							} 
						} else {
							XCOM.push("		"+mafield+"Id: {");
							XCOM.push("			type: DataTypes.INTEGER(11),");
							XCOM.push("			allowNull: false");
							XCOM.push("		},");
							LINKS.push({
								from: maclasse,
								as: mafield,
								tb: matype
							});
						}
					}
				};
				var ZCOM=COM;
				ZCOM.push("	})");
				ZCOM.push("};");
				var dbdir=PROJECT_HOME+path.sep+"src"+path.sep+'Contents'+path.sep+'Db'+path.sep+mydb+'.db';
				if (!fs.existsSync(dbdir)) fs.mkdirSync(dbdir);
				fs.writeFileSync(dbdir+path.sep+maclasse+'.js',ZCOM.join('\n'));
				_IMPORT[maclasse]=sequelize.import(dbdir+path.sep+maclasse+'.js');
				
				for (var k=0;k<LINKS.length;k++) {
					_IMPORT[maclasse].belongsTo(_IMPORT[LINKS[k].tb],{as: LINKS[k].as});
				};
				console.log('		- Creating '+maclasse);
				//_IMPORT[maclasse].sync({force: true}).then(function(){;
				if (XCOM.length>0) {
					COM.splice(-1,1);
					COM.splice(-1,1);
				};
				for (var z=0;z<XCOM.length;z++) COM.push(XCOM[z]);
				var ZCOM=COM;
				ZCOM.push("	})");
				ZCOM.push("};");
				var dbdir=PROJECT_HOME+path.sep+"src"+path.sep+'Contents'+path.sep+'Db'+path.sep+mydb+'.db';
				if (!fs.existsSync(dbdir)) fs.mkdirSync(dbdir);
				if (XCOM.length>0) fs.writeFileSync(dbdir+path.sep+maclasse+'.js',ZCOM.join('\n'));						
				sequelize.sync({force: true});
			};
		};

	};
	
};

function App_Update(nn,cb)
{
	console.log('  - Updating project');
	// reading manifest.json
	var pcwd=process.cwd();
	if (nn!="") pcwd+=path.sep+nn; else pcwd+=path.sep+argv[p+1];

	var p=argv.indexOf('create');
	if (!fs.existsSync(PROJECT_HOME+path.sep+'app.manifest')) {
		PROJECT_HOME=pcwd;
		PROJECT_DEV=PROJECT_HOME+path.sep+"dev";
		PROJECT_WEB=PROJECT_HOME+path.sep+"src";
		var manifest=PROJECT_HOME+path.sep+'app.manifest';
		if (!fs.existsSync(manifest)) {
			console.log('  ! Can\'t open manifest file.'.yellow);
			return;
		};
		Manifest=JSON.parse(fs.readFileSync(manifest));		
	};

	var manifest=PROJECT_HOME+path.sep+'app.manifest';
	var PACKAGE_NAME=PROJECT_HOME.split(path.sep)[PROJECT_HOME.split(path.sep).length-1];
	var PACKAGE_COMPANY=PACKAGE_NAME.split(".")[PACKAGE_NAME.split(".").length-2].toUpperCase();
	if (!fs.existsSync(manifest)) {
		console.log('  ! Can\'t open manifest file.'.yellow);
		return;
	};
	manifest=JSON.parse(fs.readFileSync(manifest));
	
	// get api
	if (fs.existsSync(PROJECT_HOME+path.sep+'src'+path.sep+'Contents'+path.sep+'Services')) {
		console.log('  - Updating API');
		manifest.api=[];
		var api_dir=fs.readdirSync(PROJECT_HOME+path.sep+'src'+path.sep+'Contents'+path.sep+'Services');
		for (var i=0;i<api_dir.length;i++) {
			try {
				var text=fs.readFileSync(PROJECT_HOME+path.sep+'src'+path.sep+'Contents'+path.sep+'Services'+path.sep+api_dir[i],'utf-8');
				var idx=text.indexOf('module.exports');
				if (idx>-1) text=text.substr(idx,text.length).split('=')[1].trim().split(';')[0];
				if (!manifest.api) manifest.api={};
				if (text!="") manifest.api.push(text);
			} catch(ex) {
			
			}
		};
	};

	make_resources(function() {
		
		// updating manifest
		manifest.namespace=PACKAGE_NAME;
		if (manifest.title=="App") manifest.title=PACKAGE_NAME;
		if (manifest.description=="Template") manifest.description="Package description goes here";
		var uniqueid=require('node-uuid');
		if (manifest.uid=="e4182ba0-d423-11e3-9c1a-0800200c9a66") manifest.uid=uniqueid.v4();
		var date=new Date();
		var year = date.getFullYear();
		if (manifest.copyright=="XXX") manifest.copyright='Copyright (c) '+year+' By '+PACKAGE_COMPANY;
		// saving manifest
		fs.writeFileSync(PROJECT_HOME+path.sep+'app.manifest',JSON.stringify(manifest,null,4));
		
		// making settings
		Settings={};
		Settings.DEBUG=true;
		Settings.NAMESPACE=manifest.namespace;
		Settings.TITLE=manifest.title;
		Settings.DESCRIPTION=manifest.description
		Settings.COPYRIGHT=manifest.copyright;
		Settings.TYPE=manifest.type;
		Settings.PLATFORM=manifest.targets;
		Settings.TYPE=manifest.platform;
		Settings.LANGS=manifest.langs;
		Settings.AUTH={
			passports: [
				
			],
			passport: {
			
			}
		};
		for (var i=0;i<manifest.auth.length;i++)
		{
			var t0=__dirname+path.sep+"auth.template"+path.sep+manifest.auth[i]+".config";
			if (fs.existsSync(t0)) {
				t0=JSON.parse(fs.readFileSync(t0,'utf-8'));
				Settings.AUTH.passports.push(t0.type);
				Settings.AUTH.passport[t0.type]= {
					caption: "PASSPORT_"+manifest.auth[i].toUpperCase()
				};
			}
		};		
		var frameworks=[];
		var resources=[];
		for (var i=0;i<manifest.frameworks.length;i++) {
			var m=manifest.frameworks[i];
			if (m.src) {
				if (m.src.constructor === Array) {
					for (var zz=0;zz<m.src.length;zz++) {
						var src=m.src[zz].replace(/{version}/g,m.version);
						src=src.replace(/{theme}/g,m.theme);
						frameworks.push(src);
					}
				} else {
					var src=m.src.replace(/{version}/g,m.version);
					src=src.replace(/{theme}/g,m.theme);
					frameworks.push(src);
				}
			};
			if (m.res) {
				if (m.res.constructor === Array) {
					for (var zz=0;zz<m.res.length;zz++) {
						var res=m.res[zz].replace(/{version}/g,m.version);
						res=res.replace(/{theme}/g,m.theme);
						resources.push(res);
					}				
				} else {
					var res=m.res.replace(/{version}/g,m.version);				
					res=res.replace(/{theme}/g,m.theme);
					resources.push(res);
				}
			};
		};
		Settings.FRAMEWORKS=frameworks;
		Settings.RESOURCES=resources;
		if (manifest.platform=="desktop") {
			Settings.RESOURCES.push(CDN+"/omneedia/res/webapp.css");
			Settings.RESOURCES.push(CDN+"/ext/res/ux.css");
			Settings.RESOURCES.push("Contents/Resources/webapp.css");
		};
		if (manifest.platform=="mobile") {
			Settings.RESOURCES.push(CDN+"/omneedia/res/mobi.css");
			Settings.RESOURCES.push("Contents/Resources/mobi.css");		
		};
		if (manifest.libraries)
		Settings.LIBRARIES=manifest.libraries;
		else
		Settings.LIBRARIES=[];
		// we load omneedia.modules
		var SETMODULES=JSON.parse(require('fs').readFileSync(__dirname+require('path').sep+'omneedia.modules','utf-8'));
		
		Settings.PATHS = {
			"Contents": "Contents/Application/app",
			"Culture": "Contents/Culture",
			"omneedia": CDN+"/omneedia",
			"Ext.ux": CDN+"/ext/ux",
			"Ext.plugin": CDN+"/ext/plugin",
			"Ext.util": CDN+"/ext/util"		
		};
		Settings.CONTROLLERS=[];
		for (var i=0;i<manifest.controllers.length;i++) Settings.CONTROLLERS.push(manifest.controllers[i]);
		Settings.MODULES = SETMODULES['*'];
		
		Settings.LIBRARIES=[];
		if (manifest.libraries)
		for (var i=0;i<manifest.libraries.length;i++) Settings.LIBRARIES.push(manifest.libraries[i]);
		
		if (manifest.platform=="desktop") {
			for (var i=0;i<SETMODULES.desktop.length;i++) {
				Settings.MODULES.push(SETMODULES.desktop[i]);
			}
		};
		if (manifest.platform=="mobile") {
			for (var i=0;i<SETMODULES.mobile.length;i++) {
				Settings.MODULES.push(SETMODULES.mobile[i]);
			}
		};
		
		for (var i=0;i<manifest.modules.length;i++) Settings.MODULES.push(manifest.modules[i]);

		Settings.AUTHORS=[];
		Settings.API=[];
		Settings.API.push('__QUERY__');
		for (var i=0;i<manifest.api.length;i++) Settings.API.push(manifest.api[i]);
		
		Settings.AUTHORS.push({
			role: "creator",
			name: manifest.author.name,
			mail: manifest.author.mail,
			twitter: manifest.author.twitter,
			web: manifest.author.web,
			github: manifest.author.github
		});
		
		// REMOTES
		try {
			if (MSettings) {
				if (MSettings.remote) {
					if (MSettings.remote.auth) {
						Settings.REMOTE_AUTH=MSettings.remote.auth;
					}
					if (MSettings.remote.api) {
						Settings.REMOTE_API=MSettings.remote.auth;
					}
				};
			};
		}catch(e) {
		
		};
		
		for (var el in manifest.team) {
			var tabx=manifest.team[el];
			var role=el;
			for (var i=0;i<tabx.length;i++) {
				Settings.AUTHORS.push({
					role: role,
					name: tabx[i].name,
					mail: tabx[i].mail,
					twitter: tabx[i].twitter,
					web: tabx[i].web,
					github: tabx[i].github
				});				
			};
		};
		
		Settings.VERSION=manifest.version;
		Settings.BUILD=manifest.build;
		Settings.CDN=CDN;
		
		fs.writeFileSync(PROJECT_HOME+path.sep+'src'+path.sep+'Contents'+path.sep+'Settings.js','Settings='+JSON.stringify(Settings));		
		var ndx=fs.readFileSync(PROJECT_HOME+path.sep+'src'+path.sep+'index.html','utf-8');
		ndx=ndx.split('<title>')[0]+'<title>'+manifest.title+'</title>'+ndx.split('</title>')[1];		
		var style=fs.readFileSync(PROJECT_HOME+path.sep+'.style','utf-8');
		style=style.replace('{COLOR}',manifest.splashscreen.background);
		style=style.replace('{BKCOLOR}',manifest.splashscreen.color);
		//style=style+'\t.omneedia-overlay{background-color: rgba(0, 0, 0, 0.8);z-index: 9999999999;position:absolute;left:0px;top:0px;width:100%;height:100%;display:none;}\n';
		style=style+'\t.omneedia-overlay{z-index: 9999999999;position:absolute;left:0px;top:0px;width:100%;height:100%;display:none;}\n';
		ndx=ndx.split('<style type="text/css">')[0]+'<style type="text/css">\n'+style+'\t</style>'+ndx.split('</style>')[1];
		fs.writeFileSync(PROJECT_HOME+path.sep+'src'+path.sep+'index.html',ndx);
		
		if (!fs.existsSync(PROJECT_HOME+path.sep+'etc'+path.sep+"settings.json")) {
			if (!fs.existsSync(PROJECT_HOME+path.sep+'etc')) fs.mkdirSync(PROJECT_HOME+path.sep+'etc');
			var _settings={
				auth : {
				},
				db: [
				
				]
			};
			fs.writeFileSync(PROJECT_HOME+path.sep+'etc'+path.sep+'settings.json',JSON.stringify(_settings,null,4));
		} else _settings=JSON.parse(fs.readFileSync(PROJECT_HOME+path.sep+'etc'+path.sep+'settings.json','utf-8'));
		
		if (Manifest.auth) {
			try {
				for (var i=0;i<Manifest.auth.length;i++) {
					if (fs.existsSync(__dirname+path.sep+"auth.template"+path.sep+Manifest.auth[i]+".config")) {
						var yauth=JSON.parse(fs.readFileSync(__dirname+path.sep+"auth.template"+path.sep+Manifest.auth[i]+".config",'utf-8'));
						if (!_settings.auth[yauth.type]) _settings.auth[yauth.type]=yauth.config;
					}
				}
			}catch(e) {
			
			}
		};
		
		if (Manifest.db) {
			try {
				for (var i=0;i<Manifest.db.length;i++) {
					var _temoin=-1;
					for (var j=0;j<_settings.db.length;j++) {
						if (_settings.db[j].name==Manifest.db[i]) _temoin=1;
					};
					if (_temoin==-1) {
						_settings.db.push({
							name: Manifest.db[i],
							uri: "mysql://user:pass@host:port/db"
						});
					}
				}
			}catch(e) {
			
			}
		};		

		fs.writeFileSync(PROJECT_HOME+path.sep+'etc'+path.sep+'settings.json',JSON.stringify(_settings,null,4));
		
		// package.json
		var pkg={
			name: manifest.namespace,
			description: manifest.description,
			dependencies:{},
			license: manifest.license
		};
		for (var j=0;j<manifest.packages.length;j++)
		{
			pkg.dependencies[manifest.packages[j]]="*";
		};
		if (!fs.existsSync(PROJECT_HOME+path.sep+'bin')) fs.mkdirSync(PROJECT_HOME+path.sep+'bin');
		fs.writeFileSync(PROJECT_HOME+path.sep+'bin'+path.sep+'package.json',JSON.stringify(pkg,null,4));
		
		//update readme.md
		var readme=fs.readFileSync(PROJECT_HOME+path.sep+'README.md','utf-8');
		
		readme=readme.replace('{package.namespace}',manifest.namespace);
		readme=readme.replace('{package.title}',manifest.title);
		readme=readme.replace('{package.description}',manifest.description);
		readme=readme.replace('{package.copyright}',manifest.copyright);
		readme=readme.replace('(The MIT License)',manifest.license);
		
		fs.writeFileSync(PROJECT_HOME+path.sep+'README.md',readme);
		
		update_npm();
		process.chdir(PROJECT_HOME);
		if (!fs.existsSync(PROJECT_HOME+path.sep+'.git'))
		{
			console.log('  - Init local repository');
			shelljs.exec('git init',{silent: true});
			console.log('  - First commit');
			shelljs.exec('git config --global core.autocrlf false',{silent: true});
			//shelljs.exec('git config --global --unset credential.helper');
			shelljs.exec('git config --global credential.helper',{silent: true});
			shelljs.exec('git add --all',{silent: true});
			shelljs.exec('git commit -m "First commit"',{silent: true});		
		} else {
			console.log('  - Updating local repository');
			shelljs.exec('git config --global core.autocrlf false',{silent: true});
			shelljs.exec('git add --all',{silent: true});
			
			var x=shelljs.exec('git log',{silent: true}).output;			

			shelljs.exec('git commit -m "Update# '+x.split('commit ').length+'"',{silent: true});
		};
		console.log('    Done.');
		console.log('');
		if (cb) cb();
	});
};

asciimo.write(" omneedia", "Colossal", function(art){

		console.log('\n        Omneedia Builder v'+$_VERSION);
		console.log(art.cyan);
		
		if (argv.length<=2) {
			console.log('    Usage: omneedia command [options]'.yellow);
			console.log('');
			console.log('');
			console.log('    Global commands: '.green);
			console.log('    create name --type [desktop|mobile]\t\tCreate a project'.white);
			console.log('    config\t\t\t\t\tDisplay config'.white);
			console.log('    config set [namespace] [value]\t\tSet setting=value'.white);
			console.log('    config unset [namespace]\t\t\tUnset setting'.white);
			console.log('    config load [name]\t\t\t\tLoad config [name]'.white);
			console.log('    config update\t\t\t\tUpdate current config'.white);
			console.log('    config save [name]\t\t\t\tSave current config to [name]'.white);
			console.log('');
			console.log('    Project commands: '.green);
			console.log('    update\t\t\t\t\tUpdate project'.white);
			console.log('    start\t\t\t\t\tStart drone app'.white);
			console.log('    build [platform]\t\t\t\tBuild project'.white);
			console.log('');
			console.log('    Samples: '.green);
			console.log('    omneedia config set proxy http://my.proxy.com:8080/'.white); 
		};
	
	// login interface
/*	if (program.user)
	{
		if (process.argv[3]=="add") {
			if ((!process.argv[4]) || (!process.argv[5])) {
				console.log('  ! Use: omnedia user add "name" name@host.com').yellow;
				return;
			};
			fs.writeFileSync(__dirname+path.sep+'.user',process.argv[4]+'|'+process.argv[5]);
			shelljs.exec('git config --global user.name '+process.argv[4]);
			shelljs.exec('git config --global user.email '+process.argv[5]);
			console.log('  - Switch user to '+process.argv[5].cyan+' ('+process.argv[4].cyan+')');
		};
		if (process.argv.length==3) console.log('  - Current user is '+fs.readFileSync(__dirname+path.sep+'.user','utf-8').split('|')[0]);
		return;
	};
*/	

	if (argv.indexOf('get')>-1) 
	{
		do_get();
		return;
	};

	if (argv.indexOf('upgrade')>-1) 
	{
		console.log('  - Upgrading omneedia');
		if (!fs.existsSync(__dirname+path.sep+'repositories.config')) {
			var lst=[
				"Omneedia",
				"oxpm"
			];
			fs.writeFileSync(__dirname+path.sep+'repositories.config',lst.join('\n'));
		};
		var lst=fs.readFileSync(__dirname+path.sep+'repositories.config','utf-8').split('\n');
		download_repos (lst,0,[],function(r) {
			fs.writeFileSync(__dirname+path.sep+'.repositories',JSON.stringify(r,null,4));
			process.chdir(__dirname+path.sep+'..');
			shelljs.exec('git pull origin master',{silent: true});
			console.log('  Done.');
		});
		return;
		
	};
	
	// Push interface
	if (argv.indexOf('pull')>-1)
	{
		console.log('  - Updating project\n');
		shelljs.exec('git config --global user.name "'+Manifest.author.name+'"',{silent:true});
		shelljs.exec('git config --global user.email '+Manifest.author.mail,{silent:true});			
		shelljs.exec('git fetch origin',{silent:true});
		shelljs.exec('git reset --hard origin/master',{silent:true});
		shelljs.exec('git pull origin master',{silent:true});
		console.log('\n    Done.');
		return;
	}
	
	if (argv.indexOf('push')>-1) 
	{
		console.log('  - Push project to github');
		
		if (Manifest.git!="") {
			process.chdir(PROJECT_HOME);
			var text=shelljs.exec('git remote',{silent: true});
			if (text.output.indexOf('origin')==-1) {
				console.log('  - Adding origin point');
				shelljs.exec('git remote add origin '+Manifest.git,{silent:true});
			};

			shelljs.exec('git config --global user.name "'+Manifest.author.name+'"',{silent:true});
			shelljs.exec('git config --global user.email '+Manifest.author.mail,{silent:true});			
			
			shelljs.exec('git add --all',{silent:true});
			
			var x=shelljs.exec('git log',{silent: true}).output;
			
			if (process.argv[3]) shelljs.exec('git commit -m "'+process.argv[3]+'"',{silent:true}); else shelljs.exec('git commit -m "Update# '+x.split('commit ').length+'"',{silent:true});
			shelljs.exec('git push origin master');
		} else console.log("\n  ! There is no github url in manifest".yellow);
		
		return;
	};
	
	// Config interface
	if (argv.indexOf('config')>-1)
	{	
		if (argv.indexOf('set')>-1) {
			cfg.set(argv[argv.indexOf('set')+1],argv[argv.indexOf('set')+2]);
		};
		if (argv.indexOf('unset')>-1) {
			cfg.unset(argv[argv.indexOf('unset')+1]);
		};
		if (argv.indexOf('update')>-1) {
			cfg.update(argv[argv.indexOf('unset')+1]);
		};
		if (argv.indexOf('load')>-1) {
			cfg.load(argv[argv.indexOf('load')+1]);
		};
		if (argv.indexOf('save')>-1) {
			cfg.save(argv[argv.indexOf('save')+1]);
		};
		if (!fs.existsSync(__dirname+path.sep+".config")) var config={current:""}; else var config=JSON.parse(fs.readFileSync(__dirname+path.sep+".config",'utf-8'));		
		console.log('  Config'.yellow);
		console.log('  ------'.yellow);
		console.log('  '+JSON.stringify(config.current,null,4));
		console.log('');
		return;
	}
	
	// add interface
	if (argv.indexOf('add')>-1)
	{
		
		return;
	}
	
	// Create interface
	if (argv.indexOf('create')>-1)
	{
		var p=argv.indexOf('create');
		console.log('  - Create package '+argv[p+1]);
		PROJECT_HOME=process.cwd();
		
		if (!fs.existsSync(PROJECT_HOME+path.sep+argv[p+1]+path.sep+'manifest.xml')) {
			var dots=argv[p+1].split('.').length;
			if (dots<3) {
				console.log('');
				console.log('  ! project namespace must be like com.example.demo'.yellow);
				console.log('');
				return;
			};
		
			if (process.argv.indexOf('--type')==-1) {
				console.log('');
				console.log('  ! project type is undefined (desktop or mobile)'.yellow);
				console.log('  ! Ex: omneedia create com.mycompany.myapp --type desktop'.yellow);
				console.log('');
				return;
			};
			
			if (process.argv.indexOf('desktop')>-1) {
				console.log('  - Downloading desktop template');
				Request('https://github.com/Omneedia/tpl.omneedia.webapp/archive/master.zip').on('end',function() {
					console.log('  - Expanding desktop template');
					var readStream = fs.createReadStream(PROJECT_HOME+path.sep+'master.zip');
					var writeStream = require('fstream').Writer(PROJECT_HOME);
					readStream
					.pipe(unzip.Parse())
					.pipe(writeStream.on('close',function() {
						glob.copyDirSyncRecursive(PROJECT_HOME+path.sep+'tpl.omneedia.webapp-master', PROJECT_HOME+path.sep+argv[p+1]);
						shelljs.rm(PROJECT_HOME+path.sep+'master.zip');
						glob.rmdirSyncRecursive(PROJECT_HOME+path.sep+'tpl.omneedia.webapp-master');
						console.log('  - Project '+argv[p+1]+' created');
						App_Update(argv[p+1]);						
					}));

				}).pipe(fs.createWriteStream(PROJECT_HOME+path.sep+'master.zip'));
			};
			
			if (process.argv.indexOf('mobile')>-1) {
				console.log('  - Downloading mobile template');

				Request('https://github.com/Omneedia/tpl.omneedia.mobile/archive/master.zip').on('end',function() {
					console.log('  - Expanding mobile template');
					var readStream = fs.createReadStream(PROJECT_HOME+path.sep+'master.zip');
					var writeStream = require('fstream').Writer(PROJECT_HOME);
					readStream
					.pipe(unzip.Parse())
					.pipe(writeStream.on('close',function() {
						glob.copyDirSyncRecursive(PROJECT_HOME+path.sep+'tpl.omneedia.mobile-master', PROJECT_HOME+path.sep+argv[p+1]);
						shelljs.rm(PROJECT_HOME+path.sep+'master.zip');
						glob.rmdirSyncRecursive(PROJECT_HOME+path.sep+'tpl.omneedia.mobile-master');
						console.log('  - Project '+argv[p+1]+' created');
						App_Update(argv[p+1]);
					}));

				}).pipe(fs.createWriteStream(PROJECT_HOME+path.sep+'master.zip'));
				
			};
		
		} else console.log("  ! Package namespace already exists".yellow);
		return;
	};
	

	if (argv.length==2) {
		// display help
		//program.help();
		return;
	} else {
		if (PROJECT_HOME=="-") {
			console.error('  ! omneedia must be run under the project directory.'.yellow);
			return;
		}
	};

	if (argv.indexOf('db')>-1)
	{
		if (argv.indexOf('update')>-1) {
			App_Model_Db();
			return;
		};
		if (argv.indexOf('import')>-1)
		{
			App_Migration_Db();
			return;
		};
		return;		
	};

	if (argv.indexOf('update')>-1)
	{
		App_Update('');
		return;
	};	
	
	if (argv.indexOf('clean')>-1)
	{
		if (require('fs').existsSync(PROJECT_HOME+path.sep+'bin')) glob.rmdirSyncRecursive(PROJECT_HOME+path.sep+'bin');
		if (require('fs').existsSync(PROJECT_HOME+path.sep+'dev')) glob.rmdirSyncRecursive(PROJECT_HOME+path.sep+'dev');
		if (require('fs').existsSync(PROJECT_HOME+path.sep+'builds')) glob.rmdirSyncRecursive(PROJECT_HOME+path.sep+'builds');
		console.log('    Clean.');
	}

	if (argv.indexOf('cleanres')>-1)
	{
		if (fs.existsSync(PROJECT_DEV+path.sep+"webapp"+path.sep+"Resources.css")) fs.unlinkSync(PROJECT_DEV+path.sep+"webapp"+path.sep+"Resources.css");
		console.log('    Cleaned Resources.');
	}
	
	// Builder interface
	if (argv.indexOf('build')>-1)
	{
		PROCESS_NATIVE=-1;
		PROCESS_ANDROID=-1;
		PROCESS_IOS=-1;
		PROCESS_WP8=-1;
		PROCESS_WP7=-1;
		PROCESS_PRODUCTION=-1;

		App_Update('',function() {
		
			if (process.argv.indexOf('android')>-1) {
				PROCESS_NATIVE=true;
				PROCESS_ANDROID=true;
			};
			if (process.argv.indexOf('ios')>-1) {
				PROCESS_NATIVE=true;
				PROCESS_IOS=true;
			};
			if (process.argv.indexOf('wp7')>-1) {
				PROCESS_NATIVE=true;
				PROCESS_WP7=true;
			};
			if (process.argv.indexOf('wp8')>-1) {
				PROCESS_NATIVE=true;
				PROCESS_WP8=true;
			};
			PROCESS_CUSTOM=-1;
			if (process.argv.indexOf('production')>-1) {
				PROCESS_NATIVE=false;				
				PROCESS_PRODUCTION=true;
				var p=glob.readdirSyncRecursive(PROJECT_HOME+path.sep+'etc');
				for (var z=0;z<p.length;z++) {
					try {
					var cc=p[z].split('settings-')[1].split('.json')[0];
					if (process.argv.indexOf(cc)>-1) PROCESS_CUSTOM=cc;
					}catch(e) {
					
					}
				}
			};

			if (!fs.existsSync(PROJECT_HOME+path.sep+'dev')) fs.mkdirSync(PROJECT_HOME+path.sep+'dev');
			if (!fs.existsSync(PROJECT_HOME+path.sep+'dev'+path.sep+'webapp')) fs.mkdirSync(PROJECT_HOME+path.sep+'dev'+path.sep+'webapp');
			var datetime = new Date();
			Settings.BUILD=Settings.BUILD*1+1;
			Manifest.build=Settings.BUILD;
			Settings.BUILD_DATE=datetime;
			
			if (MSettings.remote) {
				if (MSettings.remote.auth) {
					Settings.REMOTE_AUTH=MSettings.remote.auth;
				};
				if (MSettings.remote.api) {
					Settings.REMOTE_API=MSettings.remote.auth;
				};
			};
			
			fs.writeFileSync(PROJECT_HOME+path.sep+'src'+path.sep+'Contents'+path.sep+'Settings.js',"Settings = "+JSON.stringify(Settings,null, 4));
			
			// ADD TO MANIFEST BUILD SETTINGS
			fs.writeFileSync(PROJECT_HOME+path.sep+'app.manifest',JSON.stringify(Manifest,null, 4));
		
			if (PROCESS_PRODUCTION==-1)	make_bootstrap();
			else {
				// si c'est une application mobile 
				// build production crée le worker sans builder le client natif
				// si c'est une webapp
				// build production crée le worker et on build le client
				if (Settings.TYPE=="mobile") {
					build_production();
				} else make_bootstrap();
			}
			
		});

	};
	
	if (argv.indexOf('publish')>-1)
	{
		if (argv.indexOf('build')>-1) return;
		if (!ocfg.current["publish.host"]) { console.log('  ! Publishing failed. No publish.host defined'.yellow); return; }
		// get last drone
		var p=glob.readdirSyncRecursive(PROJECT_HOME+path.sep+'builds'+path.sep+'production');
		if (p.length==0) {
			console.log('  ! Publishing failed. No drone found'.yellow);
			return;
		};
		console.log('  - Publishing drone v'+p[p.length-1].split(require('path').sep)[0]);
		if (ocfg.current["publish.port"]) var port=ocfg.current["publish.port"]; else var port=9191;
		var req = request.post("http://"+ocfg.current["publish.host"]+":"+port+"/upload", function (err, resp, body) {
		  if (err) {
			console.log('  ! Publishing failed. Check your config'.yellow);
			console.log(err);
		  } else {
			console.log('  Done.');
		  }
		});
		var form = req.form();
		form.append('file', fs.createReadStream(PROJECT_HOME+path.sep+'builds'+path.sep+'production'+path.sep+p[p.length-1]));
		return;
	};
	
	/*if (argv.indexOf('connect')>-1)
	{
		var server = express();
		server.configure(function(){
			
			server.use(express.static(PROJECT_WEB));
			
			//server.use("/emulator",express.static(__dirname +path.sep+"emulator"));
			server.get("/debug.me",function(req,res) {
				res.send('<script>location.href="http://'+getIPAddress()+':'+Manifest.debug.port+'/client"</script>');
			});
			
			server.get("/index",function (req,res) {
				var r = require('ua-parser').parse(req.headers['user-agent']);
				
				
				// on fabrique une version cordova de index.html en incluant tous les plugins
				var index=fs.readFileSync(PROJECT_WEB+path.sep+"index.html","utf-8");
				
				var script='<script type=text/javascript src="Contents/Plugins/cordova/'+r.os.family.replace(/ /g,"_")+'/cordova.js"></script>';
				for (var i=0;i<Manifest.plugins.length;i++)
				{
					var my_script=Manifest.plugins[i].split('.')[Manifest.plugins[i].split('.').length-1]+".js";
					script+='<script type=text/javascript src="Contents/Plugins/cordova/"'+Manifest.plugins[i]+'"/www/"'+my_script+'"></script>';
				};
				index=index.replace('<body>','<body>'+script);
				index=index.replace('<head>','<head><script type=text/javascript src="http://'+getIPAddress()+':'+Manifest.debug.port+'/target/target-script-min.js#anonymous"></script>');
				res.send(index);
			});
			server.use("/connect",express.static(__dirname +path.sep+"scanner"+path.sep+"qrcode"));
			server.use("/resources",express.static(__dirname +path.sep+"scanner"+path.sep+"resources"));
			server.get('/qrcode', function(req, res){
				res.send(generateCode('http://'+getIPAddress()+':'+Manifest.server.port+'/index'));
			});
		});	


		Exec(__dirname+path.sep+"node_modules"+path.sep+".bin"+path.sep+"weinre --httpPort "+Manifest.debug.port+" --boundHost -all-",function(){});
		
		server.listen(Manifest.server.port);
		
		open('http://'+getIPAddress()+':'+Manifest.server.port+'/connect/','chrome');
	}*/
	
	
	function process_api(d,i,batch,res)
	{
		if (i>=d.length) {
			var str = JSON.stringify(batch, 'utf8');
			res.end(str);
		} else {
			var api=d[i];			
			try{
				var name = require.resolve(api.action);
				delete require.cache[name];
			}catch(e){
			};			
			if (api.action=="__QUERY__")
			var x=require(__dirname+path.sep+"node_modules"+path.sep+"db"+path.sep+api.action+".js");
			else
			var x=require(PROJECT_WEB+path.sep+"Contents"+path.sep+"Services"+path.sep+api.action+".js");
			x.using=function(unit) {
				if (fs.existsSync(__dirname+path.sep+'node_modules'+path.sep+unit)) 
				return require(__dirname+path.sep+'node_modules'+path.sep+unit);
				else {
					if (fs.existsSync(PROJECT_HOME+path.sep+'bin'+path.sep+'node_modules'+path.sep+unit)) 
						return require(PROJECT_HOME+path.sep+'bin'+path.sep+'node_modules'+path.sep+unit);
					else {
						return require(PROJECT_WEB+path.sep+"Contents"+path.sep+"Services"+path.sep+unit.replace(/\//g,require('path').sep));
					}
				}
			};
			
			var myfn=x[api.method].toString().split('function')[1].split('{')[0].trim().split('(')[1].split(')')[0].split(',');
			var response={};
			response.params=[];
			for (var j=0;j<myfn.length;j++)
			{
				if (myfn[j].trim()!="") response.params[response.params.length]=myfn[j].trim();
			};

			var p=[];
			for (var e=0;e<response.params.length-1;e++) {
				p.push(api.data[e]);
			};
			p.push(function(err,response){
				if (err) {
					batch.push({
						action: api.action,
						method: api.method,
						result: response,
						message: err.message,
						data: err,
						tid: api.tid,
						type: "rpc"
					});
				} else {
					err=null;
					batch.push({
						action: api.action,
						method: api.method,
						result: response,
						tid: api.tid,
						type: "rpc"
					});
				};
				process_api(d,i+1,batch,res);				
			});
			try {
				x[api.method].apply({},p);
			} catch (e) {
				batch.push({
					type: 'exception',
					action: api.action,
					method: api.method,
					message: e.message,
					data: e
				});		
				process_api(d,i+1,batch,res);
			}
		}
	};
	function processRoute (req, resp)
	{
		var data=req.body;
		var d=[];
        if(data instanceof Array){
            d = data;
        }else{
            d.push(data);
        };
		for (var i=0;i<d.length;i++)
		{
			process_api(d,0,[],resp);
		}
    };
	
	if (argv.indexOf('start')>-1)
	{
		if (setmeup) console.log("  + switch to settings ["+setmeup+"]\n");
		
		var app = express();
		
		/*
		setup_settings
		*/
				
		var bodyParser=require('body-parser');

		app.use(bodyParser.json({limit: '5000mb', extended: true}));
		app.use(bodyParser.urlencoded({limit: '5000mb', extended: true}));
		
		var multer=require('multer');
		app.use(multer({ dest: __dirname+require('path').sep+'uploads'}));

		app.use(require('cookie-parser')());

		if (process.argv.indexOf('--debug')>-1) app.use(require('morgan')('dev'));
		app.use(require('cors')());

		app.use(require('compression')());
		app.use(express.static(PROJECT_WEB));
		
		if (fs.existsSync(__dirname+path.sep+".."+path.sep+"omneedia.github.io"+path.sep+"cdn"))
		app.use('/cdn',express.static(__dirname+path.sep+".."+path.sep+"omneedia.github.io"+path.sep+"cdn"));

		var session = require('express-session');

		var sessionstore = require ('sessionstore');
		
		app.use(session({
			key: 'omneedia', 
			secret: 'omneedia_rulez',
			store: sessionstore.createSessionStore(),
			saveUninitialized: true,
			resave: true			
		}));
		
		app.use(require('errorhandler')({ dumpExceptions: true, showStack: true }))
		
		// MOBILE STUFF
		
		if (Manifest.platform=="mobile")
		{
		
			app.get("/index",function (req,res) {
				res.set('Content-Type', 'text/html');
			
				// on fabrique une version cordova de index.html en incluant tous les plugins
				var index=fs.readFileSync(PROJECT_WEB+path.sep+"index.html","utf-8");

				var script='<script type=text/javascript src="cordova.js"></script>';
				index=index.replace('</body>',script+'</body>');				
				index=index.replace('<head>','<head><script type=text/javascript src="http://'+getIPAddress()+':'+Manifest.debug.port+'/target/target-script-min.js#anonymous"></script>');
				res.send(index);
			});
			app.use("/connect",express.static(__dirname +path.sep+"scanner"));
			app.use("/plugins",express.static(__dirname +path.sep+"scanner"+path.sep+"plugins"));
			app.get('/cordova.js',function(req,res) {
				res.set('Content-Type', 'text/javascript');
				var ua = req.headers['user-agent'];
				if (/Windows NT/.test(ua)) {
					console.log('browser');
					res.end(fs.readFileSync(__dirname +path.sep+"scanner"+path.sep+"cordova"+path.sep+"browser"+path.sep+"cordova.js","utf-8"));
					return;				
				};
				if (/(Intel|PPC) Mac OS X/.test(ua)) {
					console.log('browser');
					res.end(fs.readFileSync(__dirname +path.sep+"scanner"+path.sep+"cordova"+path.sep+"browser"+path.sep+"cordova.js","utf-8"));
					return;								
				};
				if (/like Mac OS X/.test(ua)) {
					console.log('IOS');
					res.end(fs.readFileSync(__dirname +path.sep+"scanner"+path.sep+"cordova"+path.sep+"ios"+path.sep+"cordova.js","utf-8"));
					return;
				};
				if (/Android/.test(ua)) {
					console.log('ANDROID');
					res.end(fs.readFileSync(__dirname +path.sep+"scanner"+path.sep+"cordova"+path.sep+"android"+path.sep+"cordova.js","utf-8"));
					return;
				};
				
			});
			app.get('/cordova_plugins.js',function(req,res) {
				res.set('Content-Type', 'text/javascript');
				res.send(fs.readFileSync(__dirname +path.sep+"scanner"+path.sep+"cordova_plugins.js","utf-8"));
			});
			app.get('/qrcode', function(req, res){
				res.send(generateCode('http://'+getIPAddress()+':'+Manifest.server.port+'/index'));
			});		
		};


		/**
		 *
		 * AUTH STRATEGY
		 *
		**/
		
		try {
			if (MSettings) {}
		} catch(ex) {
			if (!fs.existsSync(PROJECT_HOME+path.sep+'etc')) {
				fs.mkdirSync(PROJECT_HOME+path.sep+'etc');
			};
			if (!fs.existsSync(PROJECT_HOME+path.sep+'etc'+path.sep+'settings.json')) {
				var _settings={
					auth : {
					},
					db: [
					
					]
				};
				if (Manifest.db) {
					for (var i=0;i<Manifest.db.length;i++) _settings.db.push({
						name: Manifest.db[i],
						uri: "mysql://user:pass@host:3306/db"
					});
				};
				fs.writeFileSync(PROJECT_HOME+path.sep+'etc'+path.sep+'settings.json',JSON.stringify(_settings,null,4));			
				var _set=fs.readFileSync(PROJECT_HOME+path.sep+'etc'+path.sep+'settings.json','utf-8');
				MSettings=JSON.parse(_set);
			};
		};
		
		if (MSettings.auth) {
			console.log('------------------------------------------------------------');

			app.get('/login', function(req,res) {
				res.status(401).send('missing authorization header');
			});		
			app.post('/remotelogin', function(req,res) {
				var response=JSON.parse(req.body.response);
				var profile={};
				if (response.service=="google") {
					profile=response.data;
					profile.provider="google";
				};
				
				Auth.user(profile,function(err,response) {
					console.log(response);
					req.session.user=response;
					res.end("{}");
				});				
				
			});		
			app.get('/logout', function(req, res){
				var authType=req.session.authType;
				req.session.destroy();
				res.redirect(MSettings.auth[authType.toLowerCase()].logout);
			});				
			app.post('/account', ensureAuthenticated, function(req, res){
				if (req.body.udid) {
					// on récupère le udid crée côté client
					req.session.udid=new Buffer(req.body.udid, 'base64').toString('utf-8');
					req.session.device=req.session.udid.split('|')[1];
					req.session.uid=req.session.udid.split('|')[0];			
					// on ajoute l'utilisateur pour créer le pudid (personal udid)
					req.session.user.pudid=new Buffer(req.session.uid+'|'+req.session.user.uid+'|'+req.session.device).toString('base64');
					req.session.udid=req.body.udid;
				};
				if (!req.user) req.user=req.session.user;
				//console.log(req.session);				
				res.end(JSON.stringify(req.user,null,4));
			});  
			app.get('/account', ensureAuthenticated, function(req, res){
				if (!req.user) req.user=req.session.user;
				res.end(JSON.stringify(req.user,null,4));
			}); 			
			app.get('/udid',function(req,res) {
				res.end(req.session.udid);
			});
			
			function ensureAuthenticated(req, res, next) {
				console.log(req.session);
				if (MSettings.auth.cas) req.session.authType="CAS";
				if (MSettings.auth.google) req.session.authType="GOOGLE";
				if (MSettings.auth.twitter) req.session.authType="TWITTER";
				if (MSettings.auth.facebook) req.session.authType="FACEBOOK";
				if (!req.user) req.user=req.session.user;
				if (req.user) { 
					return next(); 
				};
				res.redirect('/login');
			};				
			
			if (MSettings.auth.local) {
				// a développer !
			};
			
			if (MSettings.auth.cas) {
				
				authom.createServer({
				  service: "cas"
				});
							
			};
			
			if (MSettings.auth.google) {				

				var google=MSettings.auth.google;
				
				authom.createServer({
				  service: "google",
				  id: google.key,
				  secret: google.secret,
				  scope: MSettings.auth.google.scope
				})

			};
			if (MSettings.auth.twitter) {

				var twitter=MSettings.auth.twitter;
				
				authom.createServer({
				  service: "twitter",
				  id: twitter.key,
				  secret: twitter.secret
				})
			};
			if (MSettings.auth.facebook) {

				var facebook=MSettings.auth.facebook;
				console.log(facebook);
				authom.createServer({
				  service: "facebook",
				  id: facebook.key,
				  secret: facebook.secret
				})

			};

			authom.on("auth", function(req, res, data) {
				console.log(data);
				if (data.service=="google") {
					var profile={};
					profile.username=data.data;
					profile.provider="google";					
					Auth.user(profile, function (err, response) {
						req.session.user=response;
						res.end("<html><body><script>setTimeout(window.close, 1000);</script></body></html>");					
					});					
				};
				if (data.service=="cas") {
					var profile={};
					profile.provider="cas";
					profile.username=data.username;					
					Auth.user(profile,function(err,response) {
						console.log(response);
						req.session.user=response;
						res.end("<html><body><script>setTimeout(window.close, 1000);</script></body></html>");
					});				  
				};
				
			});

			authom.on("error", function(req, res, data) {
			  // called when an error occurs during authentication
			  console.log('--------');
			  console.log(data);
			});
			
		};
		
		if (MSettings.auth) app.get("/auth/:service", authom.app);
			
		app.get('/Contents/Services/:any',function(req,res) {
			res.set('Allow', 'GET');
			res.send(405, 'Method Not Allowed');
		});
		
		app.post('/api',processRoute);
		
		app.get('/session',function(req,res) {			
			res.header("Content-Type", "application/json; charset=utf-8");
			var response = {
				omneedia : {
					engine: $_VERSION
				},
				session: _SESSION_
			};
			res.end(JSON.stringify(response,null,4));
		});
		
		app.get('/api',function(req,res) {
			res.header("Content-Type", "application/json; charset=utf-8");
			var response = {
				omneedia : {
					engine: $_VERSION
				},
				namespace: PROJECT_NS,
				classes: []
			};
			
			var classes=fs.readdirSync(PROJECT_WEB+path.sep+"Contents"+path.sep+"Services");
			var myclass=[];
			for (var i=0;i<classes.length;i++) {
				if ((classes[i]!="node_modules") && (classes[i]!="sql") && (classes[i].substr(0,1)!=".")) myclass[myclass.length]=classes[i].split('.js')[0];
			};
			response.classes=myclass;
			res.end(JSON.stringify(response,null,4));
		});
		app.get('/api/:ns',function(req,res) {
			var url=req.url.split('?');
			if (url.length>1) {
				if (url[1]=="javascript") {
					res.header("Content-Type", "application/json; charset=utf-8");
					var REMOTE_API={};
					REMOTE_API.url="http://"+req.headers.host+"/api";
					REMOTE_API.type="remoting";
					REMOTE_API.namespace="App";
					REMOTE_API.descriptor="App.REMOTING_API";
					REMOTE_API.actions={};
					REMOTE_API.actions[req.params.ns]=[];
					
					if (req.params.ns.indexOf("__QUERY__")==-1) {
						if (!fs.existsSync(PROJECT_WEB+path.sep+"Contents"+path.sep+"Services"+path.sep+req.params.ns+".js")) {
							res.end('');
							return;
						};
					} else {		
						if (!fs.existsSync(__dirname+path.sep+"node_modules"+path.sep+"db"+path.sep+"__QUERY__.js")) {
							res.end('');
							return;
						} else {
							var _api=require(__dirname+path.sep+"node_modules"+path.sep+"db"+path.sep+"__QUERY__.js");
							for (var e in _api) {
								if (_api[e].toString().substr(0,8)=="function") {
									var obj={};
									obj.name=e;
									var myfn=_api[e].toString().split('function')[1].split('{')[0].trim().split('(')[1].split(')')[0].split(',');
									obj.len=myfn.length-1;
									REMOTE_API.actions[req.params.ns][REMOTE_API.actions[req.params.ns].length]=obj;
								}
							};					
							var str="if (Ext.syncRequire) Ext.syncRequire('Ext.direct.Manager');Ext.namespace('App');";
							str+="App.REMOTING_API="+JSON.stringify(REMOTE_API,null)+";";
							str+="Ext.Direct.addProvider(App.REMOTING_API);";
							res.end(str);
							return;
						}						
					};
					var _api=require(PROJECT_WEB+path.sep+"Contents"+path.sep+"Services"+path.sep+req.params.ns+".js");
					for (var e in _api) {
						if (_api[e].toString().substr(0,8)=="function") {
							var obj={};
							obj.name=e;
							var myfn=_api[e].toString().split('function')[1].split('{')[0].trim().split('(')[1].split(')')[0].split(',');
							obj.len=myfn.length-1;
							REMOTE_API.actions[req.params.ns][REMOTE_API.actions[req.params.ns].length]=obj;
						}
					};					
					var str="if (Ext.syncRequire) Ext.syncRequire('Ext.direct.Manager');Ext.namespace('App');";
					str+="App.REMOTING_API="+JSON.stringify(REMOTE_API,null)+";";
					str+="Ext.Direct.addProvider(App.REMOTING_API);";
					res.end(str);
				};
				return;
			};
			res.header("Content-Type", "application/json; charset=utf-8");
			if (fs.existsSync(PROJECT_WEB+path.sep+"Contents"+path.sep+"Services"+path.sep+req.params.ns+".js")) {
				var _api=require(PROJECT_WEB+path.sep+"Contents"+path.sep+"Services"+path.sep+req.params.ns+".js");
				var response = {
					omneedia : {
						engine: $_VERSION
					},
					namespace: PROJECT_NS,
					class: req.params.ns,
					methods: []
				};
				for (var e in _api) {
					if (_api[e].toString().substr(0,8)=="function") response.methods[response.methods.length]=e;
				};
				res.end(JSON.stringify(response,null,4));
			} else res.end('Service not found');
		});	
		app.get('/favicon.ico',function(req,res) {
			res.end('');
		});
		app.get('/api/:ns/:fn',function(req,res) {
			res.header("Content-Type", "application/json; charset=utf-8");
			if (fs.existsSync(PROJECT_WEB+path.sep+"Contents"+path.sep+"Services"+path.sep+req.params.ns+".js")) {
				var _api=require(PROJECT_WEB+path.sep+"Contents"+path.sep+"Services"+path.sep+req.params.ns+".js");
				_api.using=function(unit) {
					if (fs.existsSync(__dirname+path.sep+'node_modules'+path.sep+unit)) 
					return require(__dirname+path.sep+'node_modules'+path.sep+unit);
					else
					return require(PROJECT_HOME+path.sep+'bin'+path.sep+'node_modules'+path.sep+unit);
					
				};						
				var response = {
					omneedia : {
						engine: $_VERSION
					},
					namespace: PROJECT_NS,
					class: req.params.ns,
					method: req.params.fn,
					params: []
				};
				if (_api[req.params.fn]) {
					var myfn=_api[req.params.fn].toString().split('function')[1].split('{')[0].trim().split('(')[1].split(')')[0].split(',');
					for (var i=0;i<myfn.length-1;i++)
					{
						if (myfn[i].trim()!="") response.params[response.params.length]=myfn[i].trim();
					};

					if (!response.param) response.param={};
					var url=req.url.split('?');

					if (url.length>=1) {
						try {
							url=url[1].split('&');
							for (var i=0;i<url.length;i++) {
								var elem=url[i].split('=');
								if (response.params.indexOf(elem[0])==-1) 
								res.end('param '+elem[0]+' not found');
								else {
									if (elem[1].substr(0,1)=="[")
									response.param[elem[0]]=eval(decodeURI(elem[1]));
									else
									if (elem[1].substr(0,1)=="{")
									response.param[elem[0]]=JSON.parse(decodeURI(elem[1]));
									else									
									response.param[elem[0]]=elem[1];
								}
							};
						} catch(e) {
							url=[];
						}
					};
					var params=[];
					for (var i=0;i<response.params.length;i++)
					{
						params.push(response.param[response.params[i]]);
					};
					console.log(params);
					if ((response.params.length>0) && (url.length<1)) res.end(JSON.stringify(response,null,4));
					else {
						params.push(function(e,x){
							if (!x) {
								x={
									"error" : e
								};
							} else {
								if (x.type=="raw") {
									response=Object.extend(response,x);
								} else response.result=x;						
							};
							res.end(JSON.stringify(response,null,4));
						});
						_api[req.params.fn].apply({},params);
					};					
				} else res.end('Method not found');
			} else res.end('Service not found');
		});		
		app.post('/auth/q',function(req,res) {
			var data=req.body;
			var $_INFO=data.key;
			if (data.ukey) {
				if (fs.existsSync(PROJECT_VAR+path.sep+"udid"+path.sep+data.ukey+path.sep+"default")) fs.unlinkSync(PROJECT_VAR+path.sep+"udid"+path.sep+data.ukey+path.sep+"default");
			};
			var $user="x";
			if (fs.existsSync(PROJECT_VAR+path.sep+"udid"+path.sep+$_INFO+path.sep+"default"))
			$user=fs.readFileSync(PROJECT_VAR+path.sep+"udid"+path.sep+$_INFO+path.sep+"default","utf-8");

			var $img=getUserInfo($user,"PICTURE");
			if ($img!="") var $imdata=$img;
			else {
				/*var $im = fs.readFileSync(__dirname+path.sep+"node_modules"+path.sep+"login.png");
                var image = $im.toString('base64');
				var $imdata = "data:image/png;base64,"+image;*/
			};
			var $arr = {
				img: $imdata,
				user: $user
			};
			res.header("Content-Type", "application/json; charset=utf-8");
			res.end(JSON.stringify($arr,null,4));
		});
		app.get('/auth/login',function(req,res) {
			var $_RAW=req.headers.raw;
			var buf = new Buffer($_RAW, 'base64');
			$_RAW=buf.toString('utf-8').split('|');
			var $_LOGIN=$_RAW[0];
			var $_PASSWORD=$_RAW[1];
			var $_UDID=$_RAW[2];
			var $_NS=$_RAW[3];

			var $_RESPONSE={
				authenticate: false
			};
			
			if ($_PASSWORD=="")
			{		
				return;
			};
			
			// on check le login !
			Auth.login(req,Manifest.officer,$_LOGIN,$_PASSWORD,function(checked){
				if (checked) {
					$_RESPONSE.authenticate=true;
				};
				if (!$_RESPONSE.authenticate) res.send(401); else res.send(JSON.stringify($_RESPONSE,null,4));
			});
			
		});
		
		/*
		
		NOTIFICATION CENTER PLUGIN
		WORK IN PROGRESS....
		
		*/
		
		app.get('/notificationcenter.plugin',function(req,res) {
			res.send('<html><head></head><script type="text/javascript">window.onload=function(){if (parent) {var oHead = document.getElementsByTagName("head")[0];var arrStyleSheets = parent.document.getElementsByTagName("link");for (var i = 0; i < arrStyleSheets.length; i++) oHead.appendChild(arrStyleSheets[i].cloneNode(true));}}</script><body class="NotificationBackground"><div>#Today</div></body></html>');
		});
		
		/*
		
		END OF NOTIFICATION PLUGIN
		
		*/
		
		app.get('/db',function(req,res) {
			res.header("Content-Type", "application/json; charset=utf-8");
			var response = {
				omneedia : {
					engine: $_VERSION
				},
				namespace: PROJECT_NS,
				db: []
			};	
			for (var i=0;i<MSettings.db.length;i++) {
				response.db[response.db.length]=MSettings.db[i].name;
			};
			res.end(JSON.stringify(response,null,4));
		});
		app.get('/db/:db',function(req,res) {
			res.header("Content-Type", "application/json; charset=utf-8");
			var response = {
				omneedia : {
					engine: $_VERSION
				},
				namespace: PROJECT_NS,
				db: req.params.db,
				tables: []
			};	
			var uri = "";
			for (var i=0;i<MSettings.db.length;i++) {
				if (MSettings.db[i].name==req.params.db) {
					uri=MSettings.db[i].uri;
				};
			};
			if (uri=="") res.end('Database namespace not found');
			var db={
				type: uri.split('://')[0],
				host: uri.split('://')[1].split('@')[1].split(':')[0],
				user: uri.split('://')[1].split('@')[0].split(':')[0],
				pass: uri.split('://')[1].split('@')[0].split(':')[1],
				name: uri.split('://')[1].split('@')[1].split('/')[1]			
			};
			if (uri.split('://')[1].split('@')[1].split(':').length>1) db.port=uri.split('://')[1].split('@')[1].split(':')[1].split('/')[0]*1; else db.port=3306;
			if (db.type=="mysql") get_mysql_tables(db,res,response);
		});		
		app.get('/db/:db/:table',function(req,res) {
			res.header("Content-Type", "application/json; charset=utf-8");
			var table=req.params.table.split('{')[0];
			try {
				var params=req.param('table').split('{')[1].split('}')[0];
			} catch(e) {
				var params="";
			};
			var uri = "";
			for (var i=0;i<MSettings.db.length;i++) {
				if (MSettings.db[i].name==req.param('db')) {
					uri=MSettings.db[i].uri;
				};
			};
			if (uri=="") res.end('Database namespace not found');
			//res.end(req.param('table')+' '+JSON.stringify(req.query));
			var dbi=require('db');
			var SQL=[];
			var fieldz=[];
			var orderby=[];
			SQL.push("SELECT");
			if (params=="") SQL.push('*'); else {
				params=params.split(',');
				for (var i=0;i<params.length;i++) {
					if (params[i].indexOf('+')>-1) {
						orderby.push(params[i].substr(0,params[i].indexOf('+')-1));
						fieldz.push(params[i].substr(0,params[i].indexOf('+')-1));
					} else fieldz.push(params[i]);
				};
				SQL.push(fieldz.join(','));
			};
			SQL.push("FROM");
			SQL.push(table);
			SQL.push("WHERE");
			SQL.push('-1');
			dbi.model(req.param('db'),SQL.join(' '),function(e,r) {
				res.end(JSON.stringify(r,null,4));
			});
		});	
		app.delete('/db/:db/:table',function(req,res) {
			res.header("Content-Type", "application/json; charset=utf-8");
			var arr={
				status: "done"
			};
			//console.log(req.body);
			res.end(JSON.stringify(arr));
		});
		// load plugins
		if (fs.existsSync(PROJECT_SYSTEM+path.sep+"var"+path.sep+"www")) {
			app.use('/app',express.static(PROJECT_SYSTEM+path.sep+"var"+path.sep+"www"));			
		};
		if (fs.existsSync(PROJECT_WEB+path.sep+"Contents"+path.sep+"Auth"+path.sep+"logmein")) {
			app.use('/logmein',express.static(PROJECT_WEB+path.sep+"Contents"+path.sep+"Auth"+path.sep+"logmein"));
		};


		// update !!!
		
		App_Update('',function(){

		if (fs.existsSync(PROJECT_SYSTEM+path.sep+"app.js")) {
			var _App = require(PROJECT_SYSTEM+path.sep+"app.js");
			_App.removetmp = function(req) {
				var dirPath=_App.tmp(req);
				try { var files = fs.readdirSync(dirPath); }
				catch(e) { return; }
				if (files.length > 0)
				for (var i = 0; i < files.length; i++) {
					var filePath = dirPath + '/' + files[i];
					if (fs.statSync(filePath).isFile()) fs.unlinkSync(filePath);
				};
			};			
			_App.tmp = function(req) {
				if (!req) return false;
				if (!req.session.udid) return false;
				if (!fs.existsSync(PROJECT_WEB+path.sep+".."+path.sep+"var"+path.sep+"tmp"))
				glob.mkdirSyncRecursive(PROJECT_WEB+path.sep+".."+path.sep+"var"+path.sep+"tmp");
				return fs.realpathSync(PROJECT_WEB+path.sep+".."+path.sep+"var"+path.sep+"tmp")+path.sep+req.session.user.pudid;
			};	
			_App.upload={
				up: function(req,res,cb) {
					for (var el in req.files) {};
					if (el) {
						var stat=require('fs').statSync(__dirname+require('path').sep+'uploads'+require('path').sep+req.files[el].name);
						var size=stat.size;
						var o={
							message: req.files[el].name+"|"+req.files[el].fieldname+"|"+_EXT_.getContentType(req.files[el].name)+'|'+size,
							test: "OK",
							success: true
						};
					} else var o={
						message: "FATAL_ERROR",
						test: "OK",
						success: false
					};
					if (cb) {
						cb(req.files[el].name);
					};
					res.end(JSON.stringify(o));
				},
				reader: function(filename,cb) {
					if (!filename) cb("NOT_FOUND",null); else {
						var path=__dirname+require('path').sep+'uploads'+require('path').sep+filename;
						if (fs.existsSync(path)) {
							fs.readFile(path,cb);
						} else cb("NOT_FOUND",null);
					};
				},
				getFileID: function(filename) {
					function checksum (str) {
						return require('crypto').createHash('md5').update(str, 'utf8').digest('hex');
					};
					return checksum(__dirname+require('path').sep+'uploads'+require('path').sep+filename);
				},
				getFilePath: function(filename) {
					return __dirname+require('path').sep+'uploads'+require('path').sep+filename;
				},
				toBase64: function(filename) {					
					if (!filename) return "";
					var path=__dirname+require('path').sep+'uploads'+require('path').sep+filename;
					if (fs.existsSync(path)) {
						var bin=fs.readFileSync(path);
						var base64Image = new Buffer(bin, 'binary').toString('base64');	
						return "data:"+_EXT_.getContentType(path)+";base64,"+base64Image;
					} else {
						return "";
					}
				},
				dir: __dirname+require('path').sep+'uploads' 
			};
			_App.using = function(unit) {
				if (fs.existsSync(__dirname+path.sep+'node_modules'+path.sep+unit)) 
				return require(__dirname+path.sep+'node_modules'+path.sep+unit);
				else
				{
					if (fs.existsSync(PROJECT_HOME+path.sep+'bin'+path.sep+'node_modules'+path.sep+unit)) 
					return require(PROJECT_HOME+path.sep+'bin'+path.sep+'node_modules'+path.sep+unit);
					else {
						console.log(__dirname+path.sep+unit.replace(/\//g,require('path').sep));
						return require(__dirname+path.sep+unit.replace(/\//g,require('path').sep));
					}
				}
			};
			_App.api = require(__dirname+path.sep+'node_modules'+path.sep+"api");
			for (var i=0;i<Settings.API.length;i++) {
				if (Settings.API[i]=="__QUERY__")
				_App[Settings.API[i]]=require(__dirname+path.sep+'node_modules'+path.sep+'db'+path.sep+'__QUERY__.js');
				else
				_App[Settings.API[i]]=require(PROJECT_SYSTEM+path.sep+'..'+path.sep+'Contents'+path.sep+'Services'+path.sep+Settings.API[i]+'.js');
				var self = _App[Settings.API[i]].model = {
					_model: {
						"type" : "raw",
						"metaData" : {
							"idProperty" : -1,
							"totalProperty" : "total",
							"successProperty" : "success",
							"root" : "data",
							"fields" : []
						},
						"total" : 0,
						"data" : [],
						"success" : false,
						"message" : "failure"
					},
					init: function()
					{
						self._model.metaData.fields=[];
						self._model.data=[];
						self._model.success=false;
						self._model.message="failure";
					},
					fields: {
						add: function(o)
						{
							if (o === Object(o)) 
							self._model.metaData.fields.push(o);
							else {
								var t=o.split(',');
								if (t.length==3) {
									var o={
										name: t[0],
										type: t[1],
										length: t[2]					
									};
									if (o.type=="date") o.dateFormat= 'c';
								} else {
									var o={
										name: o,
										type: 'string',
										length: 255					
									};			
								};
								self._model.metaData.fields.push(o);
							}
						}	
					},
					data: {
						add: function(o)
						{
							self._model.data.push(o);
							self._model.total=self._model.data.length;
						}		
					},
					get: function()
					{
						self._model.success=true;
						self._model.message="success";
						return self._model;
					}
				
				};				
				_App[Settings.API[i]].using=function(unit) {
					if (fs.existsSync(__dirname+path.sep+'node_modules'+path.sep+unit)) 
					return require(__dirname+path.sep+'node_modules'+path.sep+unit);
					else {
						if (fs.existsSync(PROJECT_HOME+path.sep+'bin'+path.sep+'node_modules'+path.sep+unit)) 
						return require(PROJECT_HOME+path.sep+'bin'+path.sep+'node_modules'+path.sep+unit);
						else {
							console.log(__dirname+path.sep+unit.replace(/\//g,require('path').sep));
							return require(__dirname+path.sep+unit.replace(/\//g,require('path').sep));
						}
					}
									
				};										
								
			};
			_App.init(app,express);
		};
		
			/*
					
			Add Task runner
					
			*/
					
			var __TTimer={};
			if (Manifest.tasks) {
				if (fs.existsSync(PROJECT_HOME+path.sep+'src'+path.sep+'Contents'+path.sep+'Tasks'+path.sep+"index.js")) { 
					var _Task = require(PROJECT_HOME+path.sep+'src'+path.sep+'Contents'+path.sep+'Tasks'+path.sep+"index.js");
					for (var i=0;i<Manifest.tasks.length;i++) _Task_execute(_Task,Manifest.tasks[i]);
				};
			};
			
			App.tasks={
				add: function(cc,o)
				{
					var dd=PROJECT_HOME+path.sep+'src'+path.sep+'Contents'+path.sep+'Tasks'+path.sep+"jobs";
					if (!fs.existsSync(dd)) fs.mkdirSync(dd);
					dd=dd+path.sep+cc+".json";
					if (fs.existsSync(dd)) dd=JSON.parse(fs.readFileSync(dd,'utf-8')); else dd=[];
					dd.push(o);
					fs.writeFileSync(PROJECT_HOME+path.sep+'src'+path.sep+'Contents'+path.sep+'Tasks'+path.sep+"jobs"+path.sep+cc+".json",JSON.stringify(dd,null,4));
				}
			};
			
			app.listen(Manifest.server.port);
			
			if (Manifest.platform=="mobile") {
				console.log('  - Debug service started at http://'+getIPAddress()+':'+Manifest.debug.port+'/client');
				Exec(__dirname+path.sep+"node_modules"+path.sep+".bin"+path.sep+"weinre --httpPort "+Manifest.debug.port+" --boundHost -all-",function(){});
				if (_FIRST_TIME==1) open('http://'+getIPAddress()+':'+Manifest.server.port+'/connect/','chrome');
			} else
			{
				//open('http://'+getIPAddress()+':'+Manifest.server.port+'/','chrome');
				if (_FIRST_TIME==1) open('http://127.0.0.1:'+Manifest.server.port+'/','chrome');
			}
				
			console.log('  - Drone started in debug mode at http://'+getIPAddress()+':'+Manifest.server.port+'');
			console.log('');

			if ((process.argv.indexOf("auto#1")>-1) || (process.argv.indexOf("auto#0")>-1)) {
				var fsmonitor = require('fsmonitor');
				
				var prefs={
					// include files
					matches: function(realpath) {
						if (realpath.indexOf('.js')>-1) return true; 
						if (realpath.indexOf('.json')>-1) return true; 
						if (realpath.indexOf('.css')>-1) return true; 
						return false;
					},
					// exclude directories
					excludes: function(realpath) {
						if (realpath.indexOf('.git')>-1) return true;
						if (realpath.indexOf('bin')>-1) return true;
						if (realpath.indexOf('dev')>-1) return true;
						if (realpath.indexOf('builds')>-1) return true;
						if (realpath.indexOf('Tasks')>-1) return true;
						if (realpath.indexOf('tmp')>-1) return true;
					}
				};
				fsmonitor.watch(PROJECT_HOME, prefs , function(change) {
					console.log("");
					console.log("	!!!! Change detected... reload".yellow);  
					console.log("");
					console.log(change);
					console.log("");
					process.kill(process.pid);							
				});
			};
			
		});
				
	}
	
	
});