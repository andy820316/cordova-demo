/**
 * temp
 */
//var curpath = "http://172.20.10.12:8080/Example/";
var curpath = "http://localhost:8080/Example/";

$(window).bind("load",function(){
	init();
});

function init(){
	$('#curRegion').html(sessionStorage.getItem("sys_region"));
	
	var user = sessionStorage.getItem("key");
}

function init_1(){
	$('#curRegion').html(sessionStorage.getItem("sys_region"));
	
	var user = sessionStorage.getItem("key");
	var p = "{userName:"+user+",req:'district'}";
	$.ajax({
	  type: "POST",
	  url: curpath+"User",
	  data: {userinfo:p},
	  cache: false,
	  success: function(result){
		var selects = result;
      	var keys = Object.keys(result);
      	for (var key in keys){
    		if (keys[key] !== 'dist') {
        		var values = selects[keys[key]];
        		for (var value in values){
        			var opt = document.createElement('option');
        			$.each(function(){
	        			opt.value = values[value];
	        			opt.innerHTML = values[value];
        			});
            		$(opt).appendTo($('#newRegion'));
        		}
    		}
      	} 
	  }
	});	
}

function saveCurRegion() {
	var selected = $('#newRegion').val();
    sessionStorage.setItem("sys_region", selected);
	$('#curRegion').html(sessionStorage.getItem("sys_region"));
}
