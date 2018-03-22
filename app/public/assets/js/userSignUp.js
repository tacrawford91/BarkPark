$(document).ready(function() {
    function getBase64(file, cb) {

        var reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = function() {

            cb(reader.result);

        };

        reader.onerror = function(error) {

            console.log('Error: ', error);

        };

    }

    function cb(data) {

        var base64 = data;

        var newUser = {

            email: $('#email-input').val().trim(),

            password: $('#password-input').val().trim(),

            //	ownersname: $('#owners-name').val().trim(),

            dog_name: $('#dogsname').val().trim(),

            //	breed: $('#breed').val().trim(),

            //	weight: $('#weight').val().trim(),

            //	age: $('#age').val().trim(),

            picture: base64,

            currentParkID: 1

        };

        // Send the POST request.

        $.ajax("api/user", {

            type: "POST",

            data: newUser

        }).then(

            function(data) {

                console.log("created new user");

                // socket.emit("addedForm", { message: "this should trigger oters to update" })

                // location.reload();

            }

        )

    }

    $("#suform-button").on("click", function(event) {

        event.preventDefault();
        console.log("hello")
        var file = document.querySelector('#dogspic').files[0];;

        getBase64(file, cb);



    });







})