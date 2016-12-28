function ajax(){
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
var map;
var map_patt = document.querySelector(".map_patt");
var map11 = document.querySelector("#map11");
var close = document.querySelector(".close");
var fenye = document.querySelector(".fenye");
var fena = fenye.querySelectorAll("a");
function dataGet(x){
	var xhr = createXHR();
	xhr.open('get',baseUrl+"/"+(x+1));
	xhr.send(null);
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4){
			if(xhr.status == 200 || xhr.status == 304){
				var data = JSON.parse(xhr.responseText)["shop_data"];
				for (var i = 0; i < data.length;i++) {
					var pro = ["shop_name","main","addr_detail","shop_visit","shop_ico"]
					var myli = document.createElement("li");
					myli.className = "myli";
					var img = document.createElement("img");
					img.src = data[i][pro[4]];
					img.className = "dian1";
					myli.appendChild(img);
					var div = document.createElement("div");
					div.className = "meg"
					var div1 = document.createElement("div");
					div1.className = "meg_l";
					var p1 = document.createElement("p");
					p1.innerHTML = data[i][pro[0]];
					div1.appendChild(p1);
					var p2 = document.createElement("p");
					p2.innerHTML = data[i][pro[1]];
					div1.appendChild(p2);
					var p3 = document.createElement("p");
					p3.innerHTML = data[i][pro[2]];
					div1.appendChild(p3);
					div.appendChild(div1);
					var div2 = document.createElement("div");
					div2.className = "meg_r";
					var p4 = document.createElement("p");
					p4.innerHTML = "先行赔付";
					div2.appendChild(p4);
					var p5 = document.createElement("p");
					p5.innerHTML = "同城帮认证";
					div2.appendChild(p5);
					var p6 = document.createElement("p");
					p6.innerHTML = "人气："+data[i][pro[3]]+"次浏览";
					div2.appendChild(p6);
					div.appendChild(div2);
					var a = document.createElement("a");
					a.innerHTML = "进入店铺";
					a.setAttribute("href","dianpu.html");
					div.appendChild(a);
					myli.appendChild(div);
					document.querySelector(".left_s").appendChild(myli);
					(function(i){
						map_patt.onclick = function(){
						document.querySelector(".bdiv").style.display = 'flex';
						map = new AMap.Map('container',{
						center:[data[i]['map_longitude'],data[i]['map_latitude']],
						zoom:10
					});
					map.plugin(['AMap.ToolBar'],function(){
						map.addControl(new AMap.ToolBar());
					})
					for (var k = 0;k < data.length;k++) {
						var divImg = document.createElement("div");
						divImg.className = "divs";
						var imgg = document.createElement("img");
						imgg.src="images/map.png";
						imgg.className = "imgg";
						divImg.appendChild(imgg);
						var content = document.createElement("div");
						content.className = "content";
						var p1 = document.createElement("p");
						p1.innerHTML = data[k]['shop_name'];
						p1.className = "shopn";
						var span1 = document.createElement("span");
						span1.className = "close1";
						span1.innerHTML = "×";
						p1.appendChild(span1);
						var p2 = document.createElement("p");
						p2.innerHTML = '主营:' + data[k]['main'];	
						p2.className = "mainz";
						var p3 = document.createElement("p");
						p3.innerHTML = "地址："+data[k]['addr'];
						p3.className = "addr";
						var a = document.querySelector("a");
						a.innerHTML = "进入店铺";
						a.className = "enter";
						a.setAttribute("href","dianpu.html");
						content.appendChild(p1);
						content.appendChild(p2);
						content.appendChild(p3);
						content.appendChild(a);
						divImg.appendChild(content);
					marker = new AMap.Marker({
						position:[data[k]['map_longitude'],data[k]['map_latitude']],
						title:'',
						content:divImg,
						map:map
					});
					imgg.onclick = function(){
						this.nextElementSibling.style.display = "block";
					}
					span1.onclick = function(){
						this.parentNode.parentNode.style.display = 'none';
					}
					close.onclick = function(){
						document.querySelector(".bdiv").style.display = 'none';
					}
					}
				}
					})(i);
					
			}
			}
		}
	}
}
dataGet(0);
for (var j = 0;j < 3;j++) {
	(function(x){
		fena[x].onclick = function(){
			var mylis = document.querySelectorAll(".myli");
			for (var n = 0;n < mylis.length;n++) {
				document.querySelector(".left_s").removeChild(mylis[n]);
			}
			dataGet(x);
		}
	})(j)
	
}
}
	
