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
	startView: 1,
	minView: 0,
	maxView: 1,
	forceParse: 0
});


//custom
$("#dtp_confirm").bind("click",function(){
	//
});