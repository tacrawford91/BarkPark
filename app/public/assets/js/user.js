
  var socket = io.connect("http://localhost:3000");

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


//check in button goes here
$(".parkCheckIn").on("click", function(event){
  event.preventDefault();
      var dogCountUpdate = {
                      parkID: Number($(".parkID").val()),
                      dog_count: Number($(".numDogs").val())
                    };

      $.ajax({
        url:`/api/park/newDog/${dogCountUpdate.parkID}`,
        method: "PUT",
        data: dogCountUpdate
    }).then( (data) => {
      console.log(`updated park id${dogCountUpdate.parkID} with ${dogCountUpdate.dog_count}`);
      socket.emit("dogCountUpdate", {dogCountUpdate});

    })

});

//Magic Below 
socket.on("dogCountUpdate", function(data){
  console.log(data.data.dogCountUpdate.parkID);
    $.ajax({
      url:`/api/park/${data.data.dogCountUpdate.parkID}`,
      method: "GET"
  }).then( (data) => {
    console.log(data);
  //update marker on screen
  })
})







