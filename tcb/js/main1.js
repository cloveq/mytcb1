require.config({
	paths:{
		'xiangqing':'app/xiangqing'
	},
	shim:{
		'xiangqing':{
			exports:'detail'
		}
	}
})


define(["xiangqing"],function(a){
	a();
})