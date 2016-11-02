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
	
	var acc = sessionStorage.getItem("Access");
	if (acc && acc !== "TRUE") {
		$("#regionLink").remove();
		$("#modRegion").remove();
	}
	
}

function init_1(){
	$('#curRegion').html(sessionStorage.getItem("sys_region"));
		
}

function saveCurRegion() {
	var selected = $('#newRegion').val();
    sessionStorage.setItem("sys_region", selected);
	$('#curRegion').html(sessionStorage.getItem("sys_region"));
}
