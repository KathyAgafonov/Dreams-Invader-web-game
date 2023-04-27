$(document).ready(function(){
    // $("#login").hide();
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
        welcomePage_show();
        $("#register_menu").hide();
        // $("#login_menu").hide();
        $("#nav_logout").show();
        onlineUserText.show();
    }
    else {
        alert("Incorrect  username or password is incorrect");
    }
}

function showUsername(){
    $("#onlineUserText").show();
    $("#onlineUserText").append(onlineUser);
}


