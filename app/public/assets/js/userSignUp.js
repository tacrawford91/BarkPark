$(document).ready(function() {
    function getBase64(file, cb) {
        var signUpForm = $(".signup");
        var emailInput = $("#email-input");
        var passwordInput = $("#password-input");
        var userData = {
            email: emailInput.val().trim(),
            password: passwordInput.val().trim()
        };

        if (!userData.email || !userData.password) {
            alert("Please fill the form")
        } else {
            var reader = new FileReader();

            reader.readAsDataURL(file);

            reader.onload = function() {

                cb(reader.result);

            };

            reader.onerror = function(error) {

                console.log('Error: ', error);

            };
        }

    }

    function cb(data) {

        var base64 = data;

        var newUser = {

            email: $('#email-input').val().trim(),

            password: $('#password-input').val().trim(),

            owner_Name: $('#owners-name').val().trim(),

            dog_name: $('#dogsname').val().trim(),

            breed: $('#breed').val().trim(),

            weight: $('#weight').val().trim(),

            age: $('#age').val().trim(),

            picture: base64,

            currentParkID: 0

        };


        // Send the POST request.

        $.ajax("api/user", {

            type: "POST",

            data: newUser

        }).then(

            function(data) {

                window.location.replace(data);
                // If there's an error, handle it by throwing up a boostrap alert
            }).catch(handleLoginErr);


        $("#emailInput").val("");
        $("passwordInput").val("");
    }


    $(".signup").on("submit", function(event) {

        event.preventDefault();

        var file = document.querySelector('#dogspic').files[0];;

        getBase64(file, cb);


        // Getting references to our form and input


        // When the signup button is clicked, we validate the email and password are not blank


        // If we have an email and password, run the signUpUser function
        // signUpUser(userData.email, userData.password);



    });







})

// Does a post to the signup route. If succesful, we are redirected to the members page
// Otherwise we log any errors
// function signUpUser(email, password) {
//     $.post("api/signup", {
//         email: email,
//         password: password
//     }).then(function(data) {
//         window.location.replace(data);
//         // If there's an error, handle it by throwing up a boostrap alert
//     }).catch(handleLoginErr);
// }

function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
}