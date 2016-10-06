var typeparam = $.url.param('type');
var searchparam = $.url.param('search');
var htitle = $.url.param('title');
var sid = $.url.param('sid');
var keycount = 0;

var selects;


$(function () {

	$("#dtp_input2").bind("click",function(){
		$(this).next().click();
	});
    $('#datetimepicker1').datetimepicker({
    	format: 'YYYY-MM-DD',
    	showClose: true,
        toolbarPlacement: 'bottom',
        ignoreReadonly: true,
        focusOnShow: false
    });
    
	$("#dtp_input4").bind("click",function(){
		$(this).next().click();
	});
	$('#datetimepicker2').datetimepicker({
    	format: 'YYYY-MM-DD',
    	showClose: true,
        toolbarPlacement: 'bottom',
        ignoreReadonly: true,
        focusOnShow: false
    });
	
	$('#dtp_input3').datetimepicker({
        format: 'HH:mm',
        showClose: true,
        toolbarPlacement: 'bottom',
        ignoreReadonly: true,
        focusOnShow: false
    });
	
    $('#dtp_input5').datetimepicker({
        format: 'HH:mm',
        showClose: true,
        toolbarPlacement: 'bottom',
        ignoreReadonly: true,
        focusOnShow: false
    });
});

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
	
	//
});
$("#dtp_cancel").bind("click",function(){
	console.log("cancel clicked");
	history.back();
});
$("[name^=region]").bind("change",function(){
	$('[name=location]').val('');
	$('[name=location]').children().each(function(){
		if (this.value !== '') this.remove();
	});
	updateLocList(this.value);
});

//

$(window).bind("load",function(){
	init();
});

function init(){
	$("#sysRegion").html(sysregion);
	menuUpdate();
}

function menuUpdate(){
	var paramStr = "{table:'qm',system_region:'"+sysregion+"'}";
	
    $.ajax({
        url: path,
        data: {"criteria":paramStr},
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
	var parent = $(el).parent().parent();
	var cloneEl = parent.clone();

	cloneEl.find('[name^=keyword]')[0].value = "";
	cloneEl.find('[name^=keyword]')[0].name = "keyword"+keycount;
	$(cloneEl).appendTo(parent.parent());
}

function keywordRemove(el){
	var prevNode = $(el).parent().parent().prev()[0];
	if($(prevNode).is('div')) $(el).parent().parent().remove();
}
