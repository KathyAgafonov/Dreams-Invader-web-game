//DB
const SavedUsers =
    [
        {
            username: "p",
            password: "testuser",
            fullName: "",
            email: "",
            birthDate: ""
        },
    ];


//Valid Functions


$.validator.addMethod("userNameExist", function(value) {
    return !checkIfUserExists(value);
});

//login
$.validator.addMethod("fullnamecheck", function(value) {
    return /^[a-zA-Z ]+$/.test(value);
});

$.validator.addMethod("pwcheck", function(value) {
    return /^[A-Za-z0-9\d=!\-@._*]*$/.test(value) // consists of only these
        && /[a-z]/.test(value) // has a lowercase letter
        && /\d/.test(value) // has a digit
});


$.validator.addMethod("passwordMatch", function() {
    let uname1 = $('#uname').val();
    let pass1 = $('#pass').val();

    return LoginValid(uname1,pass1);
});

// Jquery Validation
$(document).ready(function() {

    //register
    $('#RegisterDivForm').validate({

        rules: {
            userName: {
                required: true,
                userNameExist: true
            },
            psw: {
                required: true,
                minlength: 6,
                pwcheck: true,
            },
            fullname: {
                required: true,
                fullnamecheck: true,
            },
            email: {
                required: true,
                email: true,
            },
        },


        messages: {
            userName: {
                required: "Enter your username.",
                userNameExist: "User name exist.",
            },
            psw: {
                required: "Enter your password.",
                minlength: "Password must consist at least 6 characters.",
                pwcheck: "Password must include at least one character and least one digit."
            },
            fullname: {
                required: "Enter your full name.",
                fullnamecheck: "Name can only consist alphabetic chars."
            },
            email: {
                required: "Enter your Email.",
                email: "Enter valid Email. ( example@gmail.com )",
            },
        },

        submitHandler: function() {
            registerInfo();
            changeDivs('LoginDiv');
            $('#RegisterDivForm')[0].reset();

        }
    });

    $("#LoginDivForm").validate({
        rules: {
            uname: {
                required: true
            },
            pass: {
                required: true,
                //  passwordMatch: true, //liad
            },
        },

        messages: {
            uname: "Enter your username.",
            pass: {
                required: "Enter your password.",
            },
        },

        submitHandler: function() {
            Login();
            // userNameInGame = $('#uname').val();
            // changeDivs('SettingsDiv');
            // $('#loginForm')[0].reset();

        }
    });
});


//Login Functions
function Login(){
    let uname1= document.getElementById('uname').value;
    let pass1= document.getElementById('pass').value;
    if (LoginValid(uname1,pass1))
    {
        changeUserLoginTrue();
        WelcomeUser(uname1);
        changeDivs('SettingsDiv');
        //randomSettings();
        $('#LoginDivForm')[0].reset();
    }
    else {
        alert("Incorrect username or password!");
    }
}

function LoginValid(uname, pass)
{
    return SavedUsers.some((user) => user.username === uname && user.password === pass);
}

function WelcomeUser(name){
    document.getElementById('welcomeUser').innerText = "Welcome back, " + name + "!!";
}


//Register Functions
function checkIfUserExists(uname)
{
    return SavedUsers.some((user) => user.username === uname);
}


function registerInfo(){
    let userName = document.getElementById('usernameRegiser').value;
    //check if exists
    let pass = document.getElementById('passwordRegiser').value;
    let fullname = document.getElementById('nameRegiser').value;
    let email = document.getElementById('emailRegiser').value;
    let birthdate = document.getElementById('birthdayRegiser').value;


    SavedUsers.push({
        username: userName,
        password: pass,
        fullName: fullname,
        email: email,
        birthDate: birthdate,
    });
    if (confirm('Ready to go! Want to Login?'))
    {
        changeDivs("LoginDiv");
    }
    else
    {
        changeDivs("WelcomeDiv");
    }

}


