var myList = null;
var total_results = 0;
var index = 0; 
var tempindex = 0;
var displaycount = 0;
var MAXdisplaycount = 100;
var viewId= '';
var session = null;
//const path = 'http://localhost:8080/ExampleModded/Query';
const path = 'http://172.20.10.3:8080/Example/Query';

function storevalue(value){
    myList = value;
    total_results = value.length;
    sessionkey();
}
function sessionkey(){
    session = sessionStorage.getItem("key");
}
function showkey(){

}
function getData(){
    var allparams = $.url.paramAll();

    var typeparam = $.url.param('type');
    var selectparam = $.url.param('sid');
    var jparams = JSON.stringify(allparams);
    
    var paramStr = "{'table':"+typeparam+"," +
            "'selects':'"+selectparam+"'," +
            "'conditions':"+jparams.toString()+"}";
    
    if (selectparam.length) viewId = selectparam;
    
    $.ajax({
        url: path,
        data: {"criteria":paramStr},
        type: 'POST',
        success: function(result){
            storevalue(result);
            test();
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
	$.template('n001',"<table class='tableType1'><tr><th>訊息類型:</th><th> ${訊息類型}</th></tr><tr><td>發生時間:</td><td>${發生時間}</td></tr><tr><td>位置:</td><td>${位置}</td></tr><tr><td>敘述:</td><td>${敘述}</td></tr></table>");
	$.template('p001',"<table class='tableType1'><tr><th>訊息類型:</th><th>todo</th></tr><tr><td>發生時間:</td><td>${rd_date}</td></tr><tr><td>rd_max_val:</td><td>${rd_max_val}</td></tr><tr><td>max_time:</td><td>${max_time}</td></tr><tr><td>rd_min_val:</td><td>${rd_min_val}</td></tr><tr><td>min_time:</td><td>${min_time}</td></tr></table>");
	
	
	
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
	
    document.getElementById("footertext").innerHTML = "Displaying results " + (index-displaycount+1) + " to " + (index) +" , total results: " +total_results + "    USER :   " + session;  
}

function test(){
	nodeProcess();
}

//function test(){
//	while(index < total_results && displaycount < MAXdisplaycount){ 
//        var para = document.createElement("div");
//        para.className = "well";
//        var name = 'result'+index;
//        nodedata(para);
//        para.id = name;
//        var results = document.getElementById("results");
//        results.appendChild(para);
//        displaycount++;
//        index++;
//        tempindex = index-1;
//    };
//    document.getElementById("footertext").innerHTML = "Displaying results " + (index-displaycount+1) + " to " + (index) +" , total results: " +total_results + "    USER :   " + session;  
//}

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
    window.plugins.nativepagetransitions.slide({"href" : page });
}
function Previous(){
    if(index >MAXdisplaycount){
        index = index - (MAXdisplaycount + displaycount);
        remove();
        test();
    }
}
function Next(){
    if(index < total_results){
        remove();
        test();
    }
}
