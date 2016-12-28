require.config({
	paths:{
		'shouye':'app/shouye',
		'dianpu':'app/dianpu'
	},
	shim:{
		'shouye':{
			exports:'move'
			
		},
		'dianpu':{
			exports:'ajax'
		}
	}
})


define(["shouye",'dianpu'],function(lunbo,a){
//	console.log(a);
	lunbo();
	a();
})