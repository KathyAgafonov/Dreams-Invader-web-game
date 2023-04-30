import { startGame } from '../game/theGame.js';

var keyCode_set;

$(document).ready(function () {
    $("#shootKey").keydown(function (event) {
        keydownpressed(event, "#shootKey");
    }
    );
    keyCode_set = { "#shootKey": 38 };
});

$().ready(function () {
    $("#settingForm").validate({
        rules: {
            gameTime: {
                range: [1200, Infinity]
            }
        },
        messages: {
            gameTime:
                "Min=1200"
        },
        errorPlacement: function (label, element) {
            label.addClass('errorSettingMessage');
            label.insertAfter(element);
        },
        wrapper: 'span',

        submitHandler: function (event) {
            settingSubmit();
        }

    });
});



function settingSubmit() {
    var $inputs = $('#settingForm :input');
    var values = {};
    $inputs.each(function () {
        values[this.name] = $(this).val();
    });

    startGame(); // Add this line to start the game

    // getSettings(values["shootingKey"], values["gameTime"]);

    console.log(keyCode_set);
    console.log(values);
    switchPage('game-page', null);

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