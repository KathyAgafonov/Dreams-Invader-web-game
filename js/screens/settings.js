var keyCode_set;

$(document).ready(function () {
    $("#shootKey").keydown(function (event) {
        keydownpressed(event, "#shootKey");
    }
    );
    keyCode_set = { "#shootKey": 38 };
});

function settingSubmit() {
    var $inputs = $('#settingForm :input');
    var values = {};
    $inputs.each(function () {
        values[this.name] = $(this).val();
    });
    // reciveSettings(keyCode_set["#upArrow"], keyCode_set["#downArrow"], keyCode_set["#leftArrow"], keyCode_set["#rightArrow"],values["gameTime"]);
    
    console.log(keyCode_set);
    console.log(values);
    switchPage('game-page', backgroundWelcomePagePath);
}

function keydownpressed(event, arrowType) {
    $(arrowType).val(event.key);
    console.log(keyCode_set[arrowType]);
    if (event.keyCode == "32") {
        keyCode_set[arrowType] = "Space";
    }
    else {
        keyCode_set[arrowType] = event.keyCode;
    }
}

function setDefaultValues() {
    $("#shootKey").val("Space");
    $("#gameTime").val("2");
}