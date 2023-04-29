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

