var typeparam = $.url.param('type');
var searchparam = $.url.param('search');
var htitle = $.url.param('title');
var sid = $.url.param('sid');
var keycount = 0;

$('.form_datetime').datetimepicker({
  //  language:  'zh-TW',
    weekStart: 1,
    todayBtn:  1,
	autoclose: 1,
	todayHighlight: 1,
	startView: 2,
	forceParse: 0,
    showMeridian: 1
});
$('.form_date').datetimepicker({
    weekStart: 1,
    todayBtn:  1,
	autoclose: 1,
	todayHighlight: 1,
	startView: 2,
	minView: 2,
	forceParse: 0
});
$('.form_time').datetimepicker({

	weekStart: 1,
	todayBtn:  1,
	autoclose: 1,
	todayHighlight: 1,
	startView: 0,
	minView: 0,
	maxView: 0,
	forceParse: 0        	
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
	//
});
$("#dtp_cancel").bind("click",function(){
	history.back();
});

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
