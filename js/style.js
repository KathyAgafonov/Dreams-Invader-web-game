// ----------------------------------- initialization -----------------------------------
let shootKey = ' '
let timerDuration = 120000;  //in seconds
let logesUser;
let isUserLoggedIn = false;
var muteSound =true;

let backgroundWelcomePagePath = 'src/images/screens/scary-welcome-cover.png';
let backgroundOtherPagesPath = 'src/images/screens/second_background.png';
let backgroundGamePagesPath = 'src/images/screens/background-canvas.png';

switchPage('settings-page', null);

$(document).ready(function() {
    switchPage('welcome-page', backgroundWelcomePagePath);
    // addEventListenerAlerts();
});




// ----------------------------------- switchPages -----------------------------------

function switchPage(pageName, backgroundImagePath) {
    console.log(pageName)
    let pageToShow = document.getElementById(pageName);
    pageToShow.classList.remove("hide");

    if(backgroundImagePath != null)  {
        setBackgroundImage(backgroundImagePath);
    }

    let pages = document.getElementsByClassName("page");
    for (let i = 0; i < pages.length; i++) {
        if (pages[i].id !== pageName) { // remove quotes around pageName variable
            pages[i].classList.add("hide");
        }
    }
}


// ----------------------------------- change background image -----------------------------------
function setBackgroundImage(src) {
    let image = new Image();
    image.addEventListener('load', () => {
        let body = document.getElementsByTagName("body")[0];
        body.style.backgroundImage = `url(${src})`;
        body.style.backgroundSize = "cover";
        body.style.backgroundRepeat = "no-repeat";
        body.style.backgroundPosition = "center";
    });
    image.src = src;
}



// ----------------------------------- about popup -----------------------------------
function aboutPopup_show() {
    let aboutPopup = document.getElementById("about-popup");
    aboutPopup.style.display = "block";

    // add event listeners to close the popup
    document.addEventListener("keydown", aboutPopup_close_onEscape);
    aboutPopup.addEventListener("click", aboutPopup_close_onClickOutside);
}

function aboutPopup_close() {
    let aboutPopup = document.getElementById("about-popup");
    aboutPopup.style.display = "none";

    // remove event listeners to close the popup
    document.removeEventListener("keydown", aboutPopup_close_onEscape);
    aboutPopup.removeEventListener("click", aboutPopup_close_onClickOutside);
}

function aboutPopup_close_onEscape(event) {
    if (event.key === "Escape") {
        aboutPopup_close();
    }
}

function aboutPopup_close_onClickOutside(event) {
    if (event.target === document.getElementById("about-popup")) {
        aboutPopup_close();
    }
}



  
  


// ----------------------------------- register page -----------------------------------
// $().ready(function() {
//     $("#registerForm").validate({
//         rules: {
//             Username: "required",
//             Password: { 
//                 required: true,
//                 minlength: 6,
//                 pwcheck: true
//             },
//             Fullname: {
//                 required: true,
//                 fncheck: true
//             },
     
//             Email: {
//                 required: true,
//                 email: true
//             },
//             DateOfBirth: "required"
//         },
//         messages: {
//             Username: "Missing",
//             Password: {
//                 required: "Missing",
//                 minlength: "Minimum 6 characters",
//                 pwcheck: "Must contain letters and numbers"
//             },
//             Fullname: {
//                 required: "Missing",
//                 fncheck: "Can't contain numbers"
//             },
//             Email: {
//                 required:"Missing",
//                 email: "Email is not valid"
//             },
//             DateOfBirth: "Missing"
//         },
//         errorPlacement: function(label, element) {
//             label.addClass('errorMessage');
//             label.insertAfter(element);
//           },
//           wrapper: 'span',

//           submitHandler: function(event){
//             registerSubmit();
//         }

//     });
// });

// $.validator.addMethod("pwcheck",function(value) {
//     return /^[A-z0-9\d=!\-@._*]*$/.test(value) && /[A-z]/.test(value) && /\d/.test(value);
// });

// $.validator.addMethod("fncheck",function(value) {
//     return !(/[0-9]/.test(value));
// });






