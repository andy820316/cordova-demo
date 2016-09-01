
function login(){
var datastream = 'Username=' + document.getElementById('lg_username').value + '&Password=' + document.getElementById('lg_password').value;
var username = document.getElementById('lg_username').value;
		  $.ajax({
            type: "POST",
            url: "http://172.20.10.3:8080/Example/Login",
            data: datastream,
            cache: false,
            success: function(result){
              if(result != "incorrect"){
                window.location = "test.html";
                window.localStorage.setItem("key", result);
                return true;
              }
            }
          });

};
var sessionId = localStorage.getItem('myCookieName');
 
// if there was no localStorage for the session id 
// the application is being run for the first time
// the session id must be created
if (!sessionId) {
    sessionId = uuid.v4();
    localStorage.setItem('myCookieName', sessionId);
}
 
$.ajaxPrefilter(function(options, originalOptions, jqXHR) {
 
    // if there is data being sent
    // add the sessionId to it
    if (options.data) {
        options.data += '&sessionId=' + sessionId;
    }
 
    // if there is no data being sent
    // create the data and add the sessionId
    else {
        options.data = 'sessionId=' + sessionId;
    }
 
});