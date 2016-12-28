function detail(){
function createXHR(){
		//如果浏览器支持XMLHttpRequest那么直接创建返回该对象
		if (typeof XMLHttpRequest != 'undefined'){
			return new XMLHttpRequest();
		}else if(typeof ActiveXObject != 'undefined'){
			if (typeof arguments.callee.activeXString != 'string'){
				var versions = ['MSXML2.XMLHttp.6.0', 'MSXML2.XMLHttp.3.0','MSXML2.XMLHttp'];
				for(var i = 0; i < versions.length;i++){
					try{
						new ActiveXObject(versions[i]);
						arguments.callee.activeXString = versions[i]
					}catch(e){

					}
				}
			}
			return new ActiveXObject(arguments.callee.activeXString);
		}else{
			throw new Error("没法正常的创建ajax对象");
		}
	}
var baseUrl = "http://localhost:4800";
var inputs = document.querySelector("#input");
var uls = document.querySelector(".uls");
function dataGet(j){
	var xhr = createXHR();
	xhr.open('get',baseUrl+"/"+j);
	xhr.send(null);
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4){
			if(xhr.status == 200 || xhr.status == 304){
				var data = JSON.parse(xhr.responseText)["product"];
				for (var i = 0; i < data.length;i++) {
					var pro = ["product_img","product_name","service_desc1","product_price"];
					var myli = document.createElement("li");
					var img = document.createElement("img");
					img.src = data[i][pro[0]];
					img.className = "pic1"
					myli.appendChild(img);
					var odiv = document.createElement("div");
					odiv.className = "lie_r";
					var div1 = document.createElement("div");
					div1.className = "service";
					var p1 = document.createElement("p");
					var a = document.createElement("a");
					a.innerHTML = data[i][pro[1]];
					p1.appendChild(a);
					var p2 = document.createElement("p");
					p2.innerHTML = data[i][pro[2]];
					div1.appendChild(p1);
					div1.appendChild(p2);
					odiv.appendChild(div1);
					var span = document.createElement("span");
					span.innerHTML = "￥" + data[i][pro[3]];
					odiv.appendChild(span);
					var button = document.createElement("button");
					button.innerHTML = "立即购买";
					odiv.appendChild(button);
					
					myli.appendChild(odiv);
					document.querySelector(".liebiao").appendChild(myli);
				}
			}
		}
	}
}
for (var j=4; j < 6;j++) {
	dataGet(j);
}
var aa = document.querySelectorAll(".aa");
var good = document.querySelector(".user_good");
var edv = document.querySelector(".user_evu");
var shop = document.querySelector(".user_shop");
var ser = document.querySelector(".user_service");
aa[0].onclick = function(){
	good.style.display = "block";
	edv.style.display = "block";
	shop.style.display = "block";
	ser.style.display = "block";
}
aa[1].onclick = function(){
	good.style.display = "none";
	edv.style.display = "block";
	shop.style.display = "block";
	ser.style.display = "block";
}
aa[2].onclick = function(){
	good.style.display = "none";
	edv.style.display = "none";
	shop.style.display = "block";
	ser.style.display = "block";
}
aa[3].onclick = function(){
	good.style.display = "none";
	edv.style.display = "none";
	shop.style.display = "none";
	ser.style.display = "block";
}
window.suggest=function(dat){
	var daa = dat["result"]
	uls.style.display = "block";
	for (var k = 0;k < daa.length;k++) {
		var li = document.createElement("li");
		li.innerHTML = daa[k]['word'];
		console.log(daa[k]['word']);
		uls.appendChild(li);
	}
	
}
input.oninput = function(){
	var dom = document.createElement("script");
	dom.setAttribute("src","http://suggest.bang.360.cn/suggest?word="+inputs.value+"&encodein=utf-8&encodeout=utf-8&format=json&callback=window.suggest&t=0.3514809920297852");
			
			document.body.appendChild(dom);
}
input.onblur = function(){
	uls.style.display = "none";
}
}

