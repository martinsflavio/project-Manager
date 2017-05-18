
//////////////////////////////////////////

 $('#login').on('click', e =>{
   e.preventDefault();
   var username= $("#username").val();
   var  email= $("#email").val();
   var  password= $("#password").val();
   var phone= $("#phone").val();
    var city=$("#city").val();
    var state=$("#state").val();
   var  zipcode=$('#zipcode').val();
   var cpassword = $("#cpassword").val();

    var newUser = {
    username: username,
    email: email,
    password: password,
    phone:phone,
    city:city,
    state:state,
    zipcode:zipcode
  };

  if (username == '' || email == '' || password== '' || cpassword == '' || phone=='' 
     ||city==''||  zipcode == ''){
   alert("Please fill all fields...!!!!!!");
  } else if (username == ''){
    alert("please enter username ");
  }
  else if(email == ''){
    alert("please enter email");
  }
  else if(password == ''){
    alert("please enter password ");
  }
  else if(cpassword == ''){
    alert("please re-enter password");
  }
  else if(phone == ''){
    alert("please enter phone number");
  }
  else if(city == ''){
    alert("please enter city");
  }
  else if(zipcode == ''){
    alert("please enter zipcode");
  }
  else if ((password.length) < 8) {
  alert("Password should atleast 8 character in length...!!!!!!");
} else if (!(password).match(cpassword)) {
alert("Your passwords don't match. Try again?");
} else {
  console.log(newUser);
 $.post("/test", newUser)
    // On success, run the following code
    .done(function(data) {
      // Log the data we found
      console.log(data);
    });
  }


  // Empty each input box by replacing the value with an empty string
  $("#username").val("");
  $("#email").val("");
  $("#password").val("");
  $("#cpassword").val("");
  $("#phone").val("");
  $("#city").val("");
  $("#state").val("");
  $("#zipcode").val("");

});
