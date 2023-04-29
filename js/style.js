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
    if(pageName === "game-page"){
		document.body.style.backgroundImage = "none";
		document.body.style.backgroundColor = "black";
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