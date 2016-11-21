var myList = null;
var total_results = 0;
var index = 0; 
var tempindex = 0;
var displaycount = 0;
var MAXdisplaycount = 20;
var viewId= '';
var session = null;
var sysregion = '台北';
const path = 'http://powersupply.taipower.com.tw:8080/Example/app/Query';


var did="";

$(document).bind("mobileinit", function(){
	$.mobile.pushStateEnabled = false;
});

function storevalue(value){
    myList = value;
    total_results = value.length;
    genPagenavs();
    sessionkey();
};
function sessionkey(){
    session = sessionStorage.getItem("key");
}

function getData(){
	$('#spinDiv').show();
	
    var allparams = $.url.paramAll();
    updateSysRegion()
    $.each(allparams, function(k,v){
    	if (k.match(/keyword/)) allparams[k] = decodeURIComponent(v).replace(/[|;$%@"<>()+,]/g, "");
    });

    allparams.region = decodeURIComponent(allparams.region);
    allparams.location = decodeURIComponent(allparams.location);
    allparams.line = decodeURIComponent(allparams.line);
    var typeparam = $.url.param('type');
    var selectparam = $.url.param('sid');
    var jparams = JSON.stringify(allparams);
    
    var paramStr = "{'table':"+typeparam+"," +
            "'selects':"+selectparam+"," +
            "'conditions':"+jparams.toString()+","+
            "'system_region':" + sysregion + "}";
    
    if (selectparam.length) viewId = selectparam;
    
    var cancel = false;
	setTimeout(function(){
		if (!cancel){
			returnPage('搜尋時間過長,請縮小搜尋範圍');
		}
	},60000);

    $.ajax({
        url: path,
        data: {"criteria":paramStr,"did":did},
        type: 'POST',
        success: function(result){
            storevalue(result);
            nodeProcess();
            
            $('#spinDiv').hide();
            cancel = true;
        },
        statusCode: {
        	403: function() {
        	    SessionStorage.clear;
                navigator.notification.alert('使用者未登入');
        	    window.plugins.nativepagetransitions.slide({"href" : "index.html"});      
        	},
            404: function() {
              returnPage('搜尋錯誤');
            },
            500: function() {
              returnPage('搜尋錯誤');
            }
        }

    });
    
}

function returnPage(txt){
	var typeparam = $.url.param('type');
	var sid = $.url.param('sid');
	var searchparam = $.url.param('tid');
	var pt = "querytest.html?"+"type="+typeparam+"&search="+searchparam+"&sid="+sid;
	
	navigator.notification.confirm(
	    '',
		function(){
		    $('#spinDiv').hide();
		},
		txt,
		['取消']);
}

function nodedata(currentdocument){

    for (var keys in myList[index]){
    var text = document.createTextNode(keys + " : " + myList[index][keys]);
    currentdocument.appendChild(text);
    currentdocument.appendChild(document.createElement("br"));
    };

}

function nodeProcess() {
    $.template('n001','<div><h2 class="tp-result-unit-name">訊息類型 : ${message_type}</h2><ul class="tp-result-unit-pool"><li><span class="tp-result-item">發生時間</span><span class="tp-result-conten">${ae_date}</span></li><li><span class="tp-result-item">位置</span><span class="tp-result-conten">${ae_grp_name}</span></li>{{if voltage === ""}}{{else}}<li><span class="tp-result-item">電壓等級</span><span class="tp-result-conten">${voltage}</span></li>{{/if}}<li><span class="tp-result-item">設備</span><span class="tp-result-conten">${equipment}</span></li><li><span class="tp-result-item">敘述</span><span class="tp-result-conten">${ae_alm_text}</span></li></ul></div>');
    
    $.template('p001','<div><h2 class="tp-result-unit-name">${title} ${equipment}</h2><ul class="tp-result-unit-pool"><li><span class="tp-result-item">設備編號</span><span class="tp-result-conten">${equipment}</span></li><li><span class="tp-result-item">日期時間</span><span class="tp-result-conten">${timeDate}</span></li><li><span class="tp-result-item">運轉值</span><span class="tp-result-conten"><font color = "${color}">${value}</font></span></li><li><span class="tp-result-item">狀態</span><span class="tp-result-conten"><font color = "${color}">${status}</font></span></li><li><span class="tp-result-item">基準值上限/下限</span><span class="tp-result-conten">${max} / ${min}</span></li></ul></div>');
    $.template('c001','<div><h2 class="tp-result-unit-name">變電所/裝置 : ${Place}</h2><ul class="tp-result-unit-pool"><li><span class="tp-result-item">日期時間</span><span class="tp-result-conten">${Date}</span></li><li><span class="tp-result-item">類型</span><span class="tp-result-conten">${Type}</span></li><li><span class="tp-result-item">動作時間</span><span class="tp-result-conten"><font color ="${color}">${dur} ms</font></span></li><li><span class="tp-result-item">基準值/偏差值</span><span class="tp-result-conten">${base} ms/<font color ="${color}"> ${bias} ms</font></span></li></ul></div>');
	
    
	var tnodes = $.tmpl(viewId,myList);

    while(index < total_results && displaycount < MAXdisplaycount){ 
        var para = document.createElement("li");
        var name = 'result'+index;
        para.id = name;

        para.appendChild(tnodes[index]);
        var results = document.getElementById("results");
        results.appendChild(para);
        
        displaycount++;
        index++;
        tempindex = index-1;
    };
	if(total_results == 0){
        var results = document.getElementById("results");
        results.innerHTML = "<center><font size= '10'>查無資料</font></center>";
    }

}
function remove(){
    while(displaycount > 0){
        var name = 'result' + tempindex;
        var para = document.getElementById(name);
            para.parentNode.removeChild(para);
            displaycount--;
            tempindex--;
    }
}

function redirto(page){
	try{
		window.plugins.nativepagetransitions.slide({"href" : page });
	} catch(err) {
		window.location = page;
	}
}
function redirback(){
	try{
		window.plugins.nativepagetransitions.slide(history.back());
	} catch(err) {
		history.back();
	}
}
function Previous(){
    if(index >MAXdisplaycount){
        index = index - (MAXdisplaycount + displaycount);
        remove();
        nodeProcess();
    }
}
function Next(){
    if(index < total_results){
        remove();
        nodeProcess();
    }
}


function genPagenavs(){
	$('#navLinks').html('');
	
	console.log('div: '+total_results);
	console.log('mod: '+total_results % 20);
	
	if (total_results >= 20){
		if (total_results / 20 >= 0)
		   	 $('#navLinks').append($('<li class="tp-result-page-item" onclick="First()"><span class="tp-result-page-link" title="第一頁">1</span></li>'));
		if (total_results / 20 > 1)
		   	 $('#navLinks').append($('<li class="tp-result-page-item" onclick="Second()"><span class="tp-result-page-link" title="第二頁">2</span></li>'));
		if (total_results / 20 > 2)
		   	 $('#navLinks').append($('<li class="tp-result-page-item" onclick="Third()"><span class="tp-result-page-link" title="第三頁">3</span></li>'));
		if (total_results / 20 > 3)
		   	 $('#navLinks').append($('<li class="tp-result-page-item" onclick="Fourth()"><span class="tp-result-page-link" title="第四頁">4</span></li>'));
		if (total_results / 20 > 4)
		   	 $('#navLinks').append($('<li class="tp-result-page-item" onclick="Fifth()"><span class="tp-result-page-link" title="第五頁">5</span></li>'));
	}
}

function page(ind){
	remove();
	index = ind;
	nodeProcess();
}

function Fifth(){
    remove();
    index = 80;
    nodeProcess();
}

function Fourth(){
    remove();
    index = 60;
    nodeProcess();
}

function Third(){
    remove();
    index = 40;
    nodeProcess();
}

function Second(){
    remove();
    index = 20;
    nodeProcess();
}

function First(){
    remove();
    index = 0;
    nodeProcess();
}

function updateSysRegion(){
    var def = sessionStorage.getItem("sys_region");
    
    if (def) {
        sysregion = def;
    }
}
