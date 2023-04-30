$(document).ready(function(){
    $("#login_button").click(showLoginScreen);
    $("#login_menu").click(showLoginScreen);
    $("#subLogin").click(loginSubmit);
});



function showLoginScreen(){
    $("#loginForm")[0].reset();
    $("#login").show();
    $("#liveTheGameGifhy").hide();
    $("#welcome").hide();
    $("#register").hide();
    $("#settingScreen").hide();
}


function loginSubmit(){
    var $inputs = $('#loginForm :input');
    var values = {};
    $inputs.each(function() {
        values[this.name] = $(this).val();
    });
    if(onlineUser != null){
        alert("User already connected!");
    }
    else if(verifyUser(values["Username"],values["Password"])){
        onlineUser = values["Username"];
        showUsername();
        switchPage('settings-page', null);
        $("#nav_logout").show();
        $("#play").show();


        document.getElementById("loginForm").reset();
    }
    else {
        alert("Incorrect  username or password is incorrect");
    }
}

function showUsername(){
    $("#onlineUserText").show();
    $("#onlineUserText").append(onlineUser);
}


function logout() {
    onlineUser = null;
    $("#onlineUserText").hide();
    $("#nav_logout").hide();
    $("#play").hide();
    $("#onlineUserText").text("Hi: ");
    switchPage('welcome-page', backgroundWelcomePagePath);
}

