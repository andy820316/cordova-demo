
function login(){
var datastream = 'Username=' + document.getElementById('lg_username').value + '&Password=' + document.getElementById('lg_password').value;
		  $.ajax({
            type: "POST",
            url: "http://172.20.10.3:8080/Example/Login",
            data: datastream,
            cache: false,
            success: function(result){
            	alert(result);
              if(result == "correct"){
                window.location = "test.html";
              }
            }
          });

};