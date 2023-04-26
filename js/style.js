// ----------------------------------- change background image -----------------------------------
function setBackgroundImage(src) {
    let body = document.getElementsByTagName("body")[0];
    body.style.backgroundImage = `url(${src})`;
    body.style.backgroundSize = "cover";
    body.style.backgroundRepeat = "no-repeat";
    body.style.backgroundPosition = "center";

}

// ----------------------------------- Welcome page -----------------------------------
function welcomePage_show() {
    let welcomePage = document.getElementById("welcome-page");
    welcomePage.classList.remove("hide");

    setBackgroundImage('src/images/screens/scary-welcome-cover.png');

    let pages = document.getElementsByClassName("page");
    for (let i = 0; i < pages.length; i++) {
        if (pages[i].id !== "welcome-page") {
            pages[i].classList.add("hide");
        }
        else {
            pages[i].classList.remove("hide");
        }
    }
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


// ----------------------------------- settings page -----------------------------------
function settingPage_show() {
    let settingsPage = document.getElementById("settings-page");
    settingsPage.classList.remove("hide");
    // setBackgroundImage('src/images/Screen-design-images/log-reg-back.png');

    let pages = document.getElementsByClassName("page");
    for (let i = 0; i < pages.length; i++) {
        if (pages[i].id !== "settings-page") {
            pages[i].classList.add("hide");
        }
        else {
            pages[i].classList.remove("hide");
        }
    }
}

// ----------------------------------- login page -----------------------------------
function loginPage_show() {
    let loginPage = document.getElementById("login-page");
    // loginPage.classList.remove("hide");
    // setBackgroundImage('src/images/screens/log-reg-back.png');

    let pages = document.getElementsByClassName("page");
    for (let i = 0; i < pages.length; i++) {
        if (pages[i].id !== "login-page") {
            pages[i].classList.add("hide");
        }
        else {
            pages[i].classList.remove("hide");
        }
    }
}


// ----------------------------------- register page -----------------------------------
function registerPage_show() {
    let registerPage = document.getElementById("register-page");
    registerPage.classList.remove("hide");

    setBackgroundImage('src/images/screens/log-reg-back.png');

    let pages = document.getElementsByClassName("page");
    for (let i = 0; i < pages.length; i++) {
        if (pages[i].id !== "register-page") {
            pages[i].classList.add("hide");
        }
        else {
            pages[i].classList.remove("hide");
        }
    }
}


// ----------------------------------- game page -----------------------------------
function game_show() {
    let gamePage = document.getElementById("game-page");
    gamePage.classList.remove("hide");

    let body = document.getElementsByTagName("body")[0];
    body.style.backgroundImage = null;
    body.style.background = "black";

    let pages = document.getElementsByClassName("page");
    for (let i = 0; i < pages.length; i++) {
        if (pages[i].id !== "game-page") {
            pages[i].classList.add("hide");
        }
        else {
            pages[i].classList.remove("hide");
        }
    }
}





