var typeparam = $.url.param('type');
var searchparam = $.url.param('search');
var htitle = $.url.param('title');
var sid = $.url.param('sid');
var keycount = 0;
var did="";

var selects;

if (typeparam.length){
	$('#dtp_input0').val(typeparam);
}
if (searchparam.length){
	if(searchparam == 'N000C') {
		$('.groupitemCustom').each(function(){
			$(this).show();});
	} else {
		$('.'+searchparam).each(function(){
			$(this).show();});
	}
	$('#dtp_input11').val(searchparam);
}
if (sid.length){
	$('#dtp_input10').val(sid);
}


//custom
$("#dtp_confirm").bind("click",function(){

	$('[name^=keyword]').each(function(){
		$(this).val(encodeURIComponent(this.value));
	});
	
});
$("#dtp_cancel").bind("click",function(){
	history.back();
});
$("[name^=region]").bind("change",function(){
	$('[name=location]').val('');
	$('[name=location]').children().each(function(){
		if (this.value !== '') this.remove();
	});
	updateLocList(this.value);
});

//$(window).bind("load",function(){
//	init();
//});

$(document).bind("deviceready", onDeviceReady);

function onDeviceReady() {
	init();
}	

function init(){
	updateSysRegion();

	try{
		did = device.uuid;
	}catch(err){}
	
	$("#sysRegion").html(sysregion);
	menuUpdate();
}

function updateSysRegion(){
	var def = sessionStorage.getItem("sys_region");
	
	if (def) {
		sysregion = def;
	}
}

function menuUpdate(){
	var paramStr = "{table:'qm',system_region:'"+sysregion+"'}";
	
    $.ajax({
        url: path,
        data: {"criteria":paramStr,"did":did},
        type: 'POST',
        success: function(result){
        	selects = result;
        	
        	var keys = Object.keys(selects);
        	for (var key in keys) {
        		if (keys[key] !== 'location') {
        			
	        		var values = selects[keys[key]];
	        		
	        		
	        		for (var value in values){
	        			var opt = document.createElement('option');
	        			var optj = JSON.parse(JSON.stringify(values[value]));
	        			$.each(optj,function(key,value){
		        			opt.value = encodeURIComponent(value);
		        			opt.innerHTML = key;
	        			});
	            		$(opt).appendTo($('[name='+keys[key]+']'));
	        		}
        		
        		}
        	}
        }

    });

    $('[name=region]').val('');
    $('[name=location]').val('');
}

function updateLocList(selected) {
	var locs = selects.location;
	
	if (locs) {
		for (var loc in locs) {
			Object.keys(locs[loc]).forEach(function(key){
				
				if (encodeURIComponent(key) === selected) {
					var opts = locs[loc][key];
					for (var opt in opts){
						if (opt){
		        			var optit = document.createElement('option');
		        			var optj = opts[opt][0];
		        			$.each(optj,function(key,value){
			        			optit.value = encodeURIComponent(value);
			        			optit.innerHTML = key;
		        			});
		        			if (typeof optj != 'undefined')
		            		$(optit).appendTo($('[name=location]'));
						}
					}
				}
			});
		}
	}
}

function keywordAdd(el){
	keycount = keycount+1;
	var parent1 = $(el).parent().prev();
	var cloneEl = parent1.clone();

	console.log(keycount);
	
	$(cloneEl).find('[name^=keyword]').val("");
	
	$(cloneEl).find('[name^=keyword]')[0].name = "keyword"+keycount;
	$(cloneEl).insertAfter(parent1);
}

function keywordRemove(el){
	var prevNode = $(el).parent().prev().prev();
	if($(prevNode).is('li') && $(prevNode).hasClass("key")) $(prevNode).remove();
}
