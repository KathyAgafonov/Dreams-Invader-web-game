$().ready(function () {
    $("#registerForm").validate({
        rules: {
            Username: "required",
            Password: {
                required: true,
                minlength: 8,
                pwcheck: true
            },
            Repeat_Password: {
                required: true,
                minlength: 8,
                pwcheck: true,
                passwordMatch: true // Add the new rule here
            },
            First_name: {
                required: true,
                fncheck: true
            },

            Last_name: {
                required: true,
                fncheck: true
            },
            Email: {
                required: true,
                email: true
            },
            DateOfBirth: "required"
        },
        messages: {
            Username: "Missing",
            Password: {
                required: "Missing",
                minlength: "Minimum 8 characters",
                pwcheck: "Must contain letters and numbers"
            },
            First_name: {
                required: "Missing",
                fncheck: "Can't contain numbers"
            },
            Last_name: {
                required: "Missing",
                fncheck: "Can't contain numbers"
            },
            Email: {
                required: "Missing",
                email: "Email is not valid"
            },
            DateOfBirth: "Missing"
        },
        errorPlacement: function (label, element) {
            label.addClass('errorMessage');
            label.insertAfter(element);
        },
        wrapper: 'span',

        submitHandler: function (event) {
            var password = $("#pass_reg").val();
            registerSubmit();
        }

    });
});
$.validator.addMethod("passwordMatch", function (value, element) {
    return value == $("#pass_reg").val();
}, "Passwords do not match");

$.validator.addMethod("pwcheck", function (value) {
    return /^[A-z0-9\d=!\-@._*]*$/.test(value) && /[A-z]/.test(value) && /\d/.test(value);
});

$.validator.addMethod("fncheck", function (value) {
    return !(/[0-9]/.test(value));
});

