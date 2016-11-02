var Identifier;
function login(){
console.log("logging in")
$(document).bind("deviceready",onDeviceReady);
console.log(" UUID IS : " + device.uuid);
Identifier = device.uuid;
var datastream = 'Username=' + document.getElementById('lg_username').value + '&Password=' + document.getElementById('lg_password').value + '&identifier=' +Identifier;
var username = document.getElementById('lg_username').value;
		  $.ajax({
            type: "POST",
            url: "http://powersupply.taipower.com.tw:8080/Example/Login",
            data: datastream,
            cache: false,
            success: function(result){
              if(result != "incorrect"){
                window.location = "index_mod.html";
                obj = JSON.parse(result);
                obj.region
                sessionStorage.setItem("sys_region", obj.region);
                sessionStorage.setItem("Access", obj.Access);
                return true;
              }else {
                navigator.notification.alert("登入失敗",function(){},"登入資料有誤","OK");
              }
            }
          });
};
function logout(){
  navigator.notification.confirm(
    '是否要登出？',
    function(){

    window.plugins.nativepagetransitions.slide({"href" : "index.html"});      
    SessionStorage.clear;
    },
    'Log Out?',
    ['登出','取消']);
}

function onDeviceReady(){
    Identifier = device.uuid;
    console.log(" UUID IS : " + Identifier);
}

function resetpass(){
var oldpass = document.getElementById('oldpass').value;
var newpass = document.getElementById('newpass').value;
var confirmation = document.getElementById('confirmation').value;
var pass_stream = 'oldpass=' + oldpass + '&newpass=' + newpass +'&username=' + sessionStorage.getItem("Username");
    if ( newpass == confirmation){
      if (oldpass == newpass) {
        navigator.notification.alert('新輸入密碼與舊密碼相同');
      }else{
        $.ajax({
              type:"POST",
              url: "http://powersupply.taipower.com.tw:8080/Example/app/ChangePass",
              data: pass_stream,
              cache: false,
              success: function(result){
                navigator.notification.alert(result);
                return true;
              }
        });
      }
    }else{
      navigator.notification.alert('請再次確認新密碼');
    }
}