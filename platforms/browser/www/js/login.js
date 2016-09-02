
function login(){
var datastream = 'Username=' + document.getElementById('lg_username').value + '&Password=' + document.getElementById('lg_password').value;
var username = document.getElementById('lg_username').value;
		  $.ajax({
            type: "POST",
            url: "http://172.20.10.12:8080/Example/Login",
            data: datastream,
            cache: false,
            success: function(result){
              if(result != "incorrect"){
                window.location = "index_mod.html";
                window.localStorage.setItem("key", result);
                return true;
              }
            }
          });

};
function logout(){
  if(confirm('是否要登出？')){
      window.location = "index.html";
      window.localStorage.removeItem("key");
  }else{
    //nothing
  }
}
