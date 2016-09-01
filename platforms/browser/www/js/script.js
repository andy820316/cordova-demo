var myList = null;
var total_results = 0;
var index = 0; 
var tempindex = 0;
var displaycount = 0;
var MAXdisplaycount = 100;
function storevalue(value){
    myList = value;
    total_results = value.length;
}
function getData(){
                $.ajax({
                type: "POST",
                url: "http://localhost:8080/Example/Demo",
                data: null,
                cache: false,
                success: function(result){
                storevalue(JSON.parse(result));
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
    document.getElementById("footertext").innerHTML = "Displaying results " + (index-displaycount+1) + " to " + (index) +" , total results: " +total_results; 
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
