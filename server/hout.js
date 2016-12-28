var express = require('express');
var fs = require('fs');
var app = express();
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    next();
});
app.use(express.static('../dist'));
app.get('/:n',function(req,res){
		req.header('Content-Type','application/x-www-form-urlencoded');
		var n = req.params.n;
		console.log(n);
		fs.readFile('data/'+n+'.json',(err,data) =>{
			if(err){
				console.log("err");
			}
			else{
				res.send(data);
			}
		})
})
var server = app.listen(4800,function(){
	console.log("服务器已正常启动" + "ee");
})