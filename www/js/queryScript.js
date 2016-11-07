var typeparam = $.url.param('type');
var searchparam = $.url.param('search');
var htitle = $.url.param('title');
var sid = $.url.param('sid');
var keycount = 0;
var did="";

var selects;

$(document).bind("mobileinit", function(){
	$.mobile.pushStateEnabled = false;
});

if (typeparam.length){
	$('#dtp_input0').val(typeparam);
}
if (searchparam.length){
	$('.'+searchparam).each(function(){
		$(this).show();});
	$('#dtp_input11').val(searchparam);
}
if (sid.length){
	$('#dtp_input10').val(sid);
}


//custom
$("#dtp_confirm").bind("click",function(){
	
	$('[name^=dummykey]').each(function(){
		var temp = $(this).parent().next();
		$(temp).val(encodeURIComponent(this.value));
	});
});
$("#dtp_cancel").bind("click",function(){
	redirback();
});
$("[name^=region]").bind("change",function(){
	$('[name=location]').val('');
	$('[name=location]').children().each(function(){
		if (this.value !== '') this.remove();
	});
	updateLocList(this.value);

	$('[name=line]').val('');
	$('[name=line]').children().each(function(){
		if (this.value !== '') this.remove();
	});
	updateLineList(this.value);
	
});

$(document).bind("deviceready", onDeviceReady);

function onDeviceReady() {
	init();
}	

function init(){
	updateSysRegion();
	var qt = $.url.param('qt');
	
	try{
		did = device.uuid;
	}catch(err){}
	
	$("#sysRegion").html(sysregion);
	
	var jt = '{"N000C":"複合式搜尋","N000D":"依起訖時間搜尋","P000A":"變電所名稱歷史查詢","P000B":"線路名稱歷史查詢","L000A":"線路負載率查詢","L000B":"變壓器負載率查詢","C000A":"複合式查詢","C000B":"三日內69kV以上異常查詢"}';
	var qto = JSON.parse(jt);
	$("#qt").html(qto[searchparam]);
	
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
    $('[name=line]').val('');
    $('[name=msgId]').val('');
    $('[name=dummykey]').val('');
    
    $(document).scrollTop();
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

function updateLineList(selected) {
	var locs = selects.line;
	
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
		        				var k1 = key;
		        				var k2 = value;
		        				
			        			optit.value = encodeURIComponent(value);
			        			optit.innerHTML = value;
		        			});
		        			if (typeof optj != 'undefined')
		            		$(optit).appendTo($('[name=line]'));
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
	
	$(cloneEl).find('[name^=dummykey]').val("");
	$(cloneEl).find('[name^=keyword]').val("");
	
	$(cloneEl).find('[name^=dummykey]')[0].name = "dummykey"+keycount;
	$(cloneEl).find('[name^=keyword]')[0].name = "keyword"+keycount;
	$(cloneEl).insertAfter(parent1);
}

function keywordRemove(el){
	var prevNode = $(el).parent().prev().prev();
	if($(prevNode).is('li') && $(prevNode).hasClass("key")) $(el).parent().prev().remove();
}

