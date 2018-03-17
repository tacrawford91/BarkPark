
  
    $(".create-form").on("submit", function(event) {
      event.preventDefault();
  
      var newUser = {
        user_name: $("#uN").val().trim(),
        password: $("#password").val().trim(),
        email: $("#email").val().trim(),
        dog_name: $("#dog_name").val().trim(),
      };
  
      // Send the POST request.
      $.ajax("http://localhost:3000/api/user", {
        type: "POST",
        data: newUser
      }).then(
        function() {
          console.log("created new user");
          location.reload();
        }
      );
    });


