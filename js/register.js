

$(document).ready(function(){
    $("#register_button").click(showRegisterScreen);
    $("#register_menu").click(showRegisterScreen);

    $(document).on('click', '.toggle-password', function() {

        $(this).toggleClass("fa-eye fa-eye-slash");
        
        var input = $("#pass_reg");
        input.attr('type') === 'password' ? input.attr('type','text') : input.attr('type','password')
    });
});


function showRegisterScreen(){
    $("#registerForm")[0].reset();
    $("#register").show();
    $("#liveTheGameGifhy").hide();
    $("#welcome").hide();
    $("#login").hide();
    $("#settingScreen").hide();
}

function registerSubmit(){
    var $inputs = $('#registerForm :input');
    console.log(inputs)
    var values = {};
    $inputs.each(function() {
        values[this.name] = $(this).val();
    });

    addToDB(values["Username"],values["Password"],values["Fullname"],values["Email"],values["DateOfBirth"]);
    showLoginScreen();
}