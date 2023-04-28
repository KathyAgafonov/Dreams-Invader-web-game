$().ready(function() {
    $("#registerForm").validate({
        rules: {
            Username: "required",
            Password: { 
                required: true,
                minlength: 6,
                pwcheck: true
            },
            Fullname: {
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
                minlength: "Minimum 6 characters",
                pwcheck: "Must contain letters and numbers"
            },
            Fullname: {
                required: "Missing",
                fncheck: "Can't contain numbers"
            },
            Email: {
                required:"Missing",
                email: "Email is not valid"
            },
            DateOfBirth: "Missing"
        },
        errorPlacement: function(label, element) {
            label.addClass('errorMessage');
            label.insertAfter(element);
          },
          wrapper: 'span',

          submitHandler: function(event){
            registerSubmit();
        }

    });
});

$.validator.addMethod("pwcheck",function(value) {
    return /^[A-z0-9\d=!\-@._*]*$/.test(value) && /[A-z]/.test(value) && /\d/.test(value);
});

$.validator.addMethod("fncheck",function(value) {
    return !(/[0-9]/.test(value));
});

