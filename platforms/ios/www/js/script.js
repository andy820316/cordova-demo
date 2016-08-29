var myList = null;
var total_results = 0;
var index = 0; 

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
                load();
                }
                });
            }

function load(){
    document.getElementById("box_1").innerHTML = "NAME: " + myList[index].name;
    document.getElementById("box_2").innerHTML = "NAME: " + myList[index+1].name;
    document.getElementById("box_3").innerHTML = "NAME: " + myList[index+2].name;
    document.getElementById("box_4").innerHTML = "NAME: " + myList[index+3].name;
    document.getElementById("box_5").innerHTML = "NAME: " + myList[index+4].name;
    document.getElementById("footertext").innerHTML = "Displaying results " + (index+1) + " to " + (index+5) +" , total results: " +total_results; 
}

function Previous(){
    if(index >4){
        index = index - 5;
    }
   loadresults();
}
function Next(){
    if(index+5 < total_results){
        index = index +5;
    }
    loadresults();
}
function buildHtmlTable(selector) {
    var columns = addAllColumnHeaders(myList, selector);
ßß
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