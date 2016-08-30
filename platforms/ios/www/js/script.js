var myList = null;
var total_results = 0;
var index = 0; 
var tempindex = 0;
var displaycount = 0;

function storevalue(value){
    myList = value;
    total_results = value.length;
}
function getData(){
                $.ajax({
                type: "POST",
                url: "http://172.20.10.12:8080/Example/Demo",
                data: null,
                cache: false,
                success: function(result){
                storevalue(JSON.parse(result));
              //  loadresults();
                test();
                }
                });
            }

function nodedat(currentdocument){

    for (var keys in myList[index]){
    var text = document.createTextNode(keys + " : " + myList[index][keys]);
    currentdocument.appendChild(text);
    currentdocument.appendChild(document.createElement("br"));
    };

}

function test(){
    while(index < total_results && displaycount < 5){ 
        var para = document.createElement("div");
        para.className = "blocks";
        var name = 'result'+index;
        nodedat(para);
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
    if(index >5){
        index = index - (5 + displaycount);
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
function buildHtmlTable(selector) {
    var columns = addAllColumnHeaders(myList, selector);
    for (var i = 0 ; i < myList.length ; i++) {
        var row$ = $('<tr/>');
        for (var colIndex = 0 ; colIndex < columns.length ; colIndex++) {
            var cellValue = myList[i][columns[colIndex]];

            if (cellValue == null) { cellValue = ""; }

            row$.append($('<td/>').html(cellValue));
        }
        $(selector).append(row$);
    }
};
function addAllColumnHeaders(myList, selector)
{
    var columnSet = [];
    var headerTr$ = $('<tr/>');

    for (var i = 0 ; i < myList.length ; i++) {
        var rowHash = myList[i];
        for (var key in rowHash) {
            if ($.inArray(key, columnSet) == -1){
                columnSet.push(key);
                headerTr$.append($('<th/>').html(key));
            }
        }
    }
    $(selector).append(headerTr$);

    return columnSet;
}