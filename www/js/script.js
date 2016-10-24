var myList = null;
var total_results = 0;
var index = 0; 
var tempindex = 0;
var displaycount = 0;
var MAXdisplaycount = 10;
var viewId= '';
var session = null;
var sysregion = '嘉南';
//const path = 'http://localhost:8080/Example/Demo';
const path = 'http://powersupply.taipower.com.tw:8080/Example/Query';
//const path = 'http://localhost:8080/Example/Query';

var did="";

function storevalue(value){
    myList = value;
    total_results = value.length;
    sessionkey();
};
function sessionkey(){
    session = sessionStorage.getItem("key");
}

function getData(){
    var allparams = $.url.paramAll();
    updateSysRegion()
    $.each(allparams, function(k,v){
    	if (k.match(/keyword/)) allparams[k] = decodeURIComponent(v);
    });

    allparams.region = decodeURIComponent(allparams.region);
    allparams.location = decodeURIComponent(allparams.location);
    var typeparam = $.url.param('type');
    var selectparam = $.url.param('sid');
    var jparams = JSON.stringify(allparams);
    
    var paramStr = "{'table':"+typeparam+"," +
            "'selects':"+selectparam+"," +
            "'conditions':"+jparams.toString()+","+
            "'system_region':" + sysregion + "}";
    
    if (selectparam.length) viewId = selectparam;
    
    $.ajax({
        url: path,
        data: {"criteria":paramStr,"did":did},
        type: 'POST',
        success: function(result){
            storevalue(result);
            nodeProcess();
        }

    });
}

function nodedata(currentdocument){

    for (var keys in myList[index]){
    var text = document.createTextNode(keys + " : " + myList[index][keys]);
    currentdocument.appendChild(text);
    currentdocument.appendChild(document.createElement("br"));
    };

}

function nodeProcess() {
    $.template('n001',"<table class='tableType1'><col width ='120'><tr><th>訊息類型 : </th><th>${message_type}</th></tr><tr><td>發生時間 : </td><td>${ae_date}</td></tr><tr><td>位置 : </td><td>${ae_grp_name}</td></tr><tr><td>電壓等級 : </td><td>${voltage}</td></tr><tr><td>設備 : </td><td>${equipment}</td></tr><tr><td>敘述 : </td><td>${ae_alm_text}</td></tr></table>");
    //$.template('n001',"<table class='tableType1'><col width ='100'><tr><th>訊息類型:</th><th> ${messageType}</th></tr><tr><td>發生時間:</td><td>${ae_date}</td></tr><tr><td>位置:</td><td>${ae_grp_name}</td></tr><tr><td>敘述:</td><td>${ae_alm_text}</td></tr></table>");
    $.template('p001',"<table class='tableType1'><col width ='130'><tr><th>${title} </th><th>${equipment}</th></tr><tr><td>設備編號 :</td><td>${equipment}</td></tr><tr><td>日期時間 : </td><td>${timeDate}</td></tr><tr><td> 運轉值: </td><td><font color = '${color}'>${value}</font></td></tr><tr><td> 狀態: </td><td><font color = '${color}'>${status}</font></td></tr><tr><td>基準值上限/下限 : </td><td>${max} / ${min} </td></tr></table>");
    $.template('c001',"<table class='tableType1'><col width ='120'><tr><th>變電所/裝置 : </th><th>${Place}</th></tr><tr><td>日期時間 : </td><td>${Date}</td></tr><tr><td>類型 : </td><td>${Type}</td></tr><tr><td>動作時間 : </td><td><font color ='${color}'>${dur} ms</font></td></tr><tr><td>基準值/偏差值 : </td><td>${base} ms/<font color ='${color}'> ${bias} ms</font></td></tr></table>");
	
	
	var tnodes = $.tmpl(viewId,myList);

    while(index < total_results && displaycount < MAXdisplaycount){ 
        var para = document.createElement("div");
        var name = 'result'+index;
        para.id = name;
        para.className = "well";

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

    document.getElementById("footertext").innerHTML = "Displaying results " + (index-displaycount+1) + " to " + (index) +" , total results: " +total_results + "    USER :   " + session;  
}
function remove(){
    while(displaycount > 0){
        console.log(tempindex);
        var name = 'result' + tempindex;
        var para = document.getElementById(name);
            para.parentNode.removeChild(para);
            displaycount--;
            tempindex--;
    }
}

function redirto(page){
	try{
        console.log(navigator.oscpu);
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
function updateSysRegion(){
    var def = sessionStorage.getItem("sys_region");
    
    if (def) {
        sysregion = def;
    }
}

