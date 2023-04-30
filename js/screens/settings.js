import { startGame } from '../game/theGame.js';
import { getShootingKey } from '../game/Player.js';
import { getGameTime } from '../game/theGame.js';

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

    getShootingKey(values["shootKey"]);
    getGameTime(values["gameTime"]);
    
    switchPage('game-page', null);

}



function keydownpressed(event, arrowType) {
    if (event.keyCode === 32) {
        $(arrowType).val("Space");
    } else {
        $(arrowType).val(event.key);
    }
    console.log(keyCode_set[arrowType]);
    keyCode_set[arrowType] = event.keyCode;
}


function setDefaultValues() {
    $("#shootKey").val("Space");
    $("#gameTime").val("2");
}