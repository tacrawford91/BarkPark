// make connection
var socket = io.connect("http://localhost:3000");

socket.on("test1", function(data){
    console.log(data);
})