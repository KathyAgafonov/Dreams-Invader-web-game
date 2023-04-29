var keyCode_set;

$(document).ready(function () {
    $("#random_btn_area").click(randomSetting);
    $("#upArrow").keydown(function (event) {
        keydownpressed(event, "#upArrow");
    }
    );
    $("#downArrow").keydown(function (event) {
        keydownpressed(event, "#downArrow");
    }
    );
    $("#leftArrow").keydown(function (event) {
        keydownpressed(event, "#leftArrow");
    }
    );
    $("#rightArrow").keydown(function (event) {
        keydownpressed(event, "#rightArrow");
    }
    );
    keyCode_set = { "#upArrow": 38, "#downArrow": 40, "#leftArrow": 37, "#rightArrow": 39 };
});

function settingSubmit() {
    var $inputs = $('#settingForm :input');
    var values = {};
    $inputs.each(function () {
        values[this.name] = $(this).val();
    });
    // reciveSettings(keyCode_set["#upArrow"], keyCode_set["#downArrow"], keyCode_set["#leftArrow"], keyCode_set["#rightArrow"],values["gameTime"]);

    console.log(keyCode_set);
    switchPage('game-page', backgroundWelcomePagePath);
}

function keydownpressed(event, arrowType) {

    $(arrowType).val(event.key);
    keyCode_set[arrowType] = event.keyCode;
}

function randomSetting() {
    $("#upArrow").val("ArrowUp");
    $("#downArrow").val("ArrowDown");
    $("#leftArrow").val("ArrowLeft");
    $("#rightArrow").val("ArrowRight");
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRndColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

function setDefaultValues() {
    $("#upArrow").val("ArrowUp");
    $("#downArrow").val("ArrowDown");
    $("#leftArrow").val("ArrowLeft");
    $("#rightArrow").val("ArrowRight");
}