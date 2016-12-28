function move(){
function $(obj){
	return document.querySelector(obj);
}
var banner = $(".banner");
var imgs = $(".imgs");
var dian = $(".dian");
var lis = dian.querySelectorAll("li");
var a = 0;
var num = 0;
var timer,timer1,timer2;
function autoMove(){
	imgs.style.transition="all"+" 0s"+" linear";
	timer = setInterval(function(){
		a-=5;
	if(a <= -500){
		a = 0;
		num = 0;
		clearInterval(timer);
	}
	if(a%100 == 0){
		num = -a/100;
		clearInterval(timer);
		timer = setTimeout(autoMove,1000);
	}
		imgs.style.marginLeft = a + "%";
		changeColor(num);
	},30);
	
}
autoMove()
function changeColor(num){
	for (var i = 0;i< lis.length;i++) {
		lis[i].style.background = "#ccc";
	}
	lis[num].style.background = "#666";
}
changeColor(0);
	for(var k = 0;k < lis.length;k++){
		lis[k].index = k;
		lis[k].onclick = function(){
			clearInterval(timer);
			imgs.style.transition="all"+" 1s"+" linear";
			num = this.index;
			console.log(num);
			a=-num*100;
			imgs.style.marginLeft = a + "%";
			changeColor(num);
			timer = setTimeout(autoMove,2000);
			
		}
	}
}
