 $(".login-button").click(function(event) {
     event.preventDefault();

     $('form').fadeOut(500);
     $('.wrapper').addClass('form-success');
 });

 $('.signIn a').click(function() {
     // $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
     $(".form").fadeOut(600, function() {
         $('.register-form').fadeIn(800)
     })

 });

 $('.create a').click(function() {
     // $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
     $(".register-form").fadeOut(600, function() {
         $('.form').fadeIn(800)
     })

 });