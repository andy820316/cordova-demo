var myList = null;
var total_results = 0;
var index = 0; 
var tempindex = 0;
var displaycount = 0;
var MAXdisplaycount = 100;
var session = null;
const path = 'http://172.20.10.12:8080/Example/Query';
//const path = 'http://172.20.10.3:8080/Example/Demo',

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
    
    $.ajax({
        url: path,
        data: {"criteria":paramStr},
        type: 'POST',
        success: function(result){
            storevalue(result);
          //  loadresults();
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

function test(){
    while(index < total_results && displaycount < MAXdisplaycount){ 
        var para = document.createElement("div");
        para.className = "well";
        var name = 'result'+index;
        nodedata(para);
        para.id = name;
        var results = document.getElementById("results");
        results.appendChild(para);
        displaycount++;
        index++;
        tempindex = index-1;
    };
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
