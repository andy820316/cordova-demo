var modal = 0;
var span =0;

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
                sessionStorage.setItem("key", result);
                return true;
              }
            }
          });

};
function logout(){
  if(confirm('是否要登出？')){
      window.location = "index.html";
      SessionStorage.clear;
  }else{
    //nothing
  }
}

function resetpass(){
var oldpass = document.getElementById('oldpass').value;
var newpass = document.getElementById('newpass').value;
var confirmation = document.getElementById('confirmation').value;
var pass_stream = 'oldpass=' + oldpass + '&newpass=' + newpass +'&username=' + sessionStorage.getItem("key");
    if ( newpass == confirmation){
      if (oldpass == newpass) {
        alert('新輸入密碼與舊密碼相同');
      }else{
        $.ajax({
              type:"POST",
              url: "http://172.20.10.12:8080/Example/ChangePass",
              data: pass_stream,
              cache: false,
              success: function(result){
                alert(result);
                return true;
              }
        });
      }
    }else{
      alert('請確認新密碼正確');
    }
}