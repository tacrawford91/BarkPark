
  var socket = io.connect("http://localhost:3000");

  socket.on("test1", function(data){
      console.log(data);
  })

  socket.on("grabData", function(data){
    console.log(data);
})

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
      socket.emit("addedForm", {message: "this should trigger oters to update"})
      // location.reload();
    }
  )
});





