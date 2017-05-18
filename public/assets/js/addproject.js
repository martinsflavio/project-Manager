// The code in add.js handles what happens when the user clicks the "Add a book" button.

// When user clicks add-btn
$("#add-btn").on("click", function(event) {
  event.preventDefault();

 var title =  $("#title").val().trim();
  var desc=  $("#desc").val().trim();
    var category= $("#category").val();
    var zipcode= $("#zipcode").val().trim();
    if (title == '' || desc == '' || category == '' || zipcode == '')
    {
     alert("Please fill all fields...!!!!!!");
    }




  // Make a newProject object
  var newProject = {
    project_subject: $("#title").val().trim(),
    project_description: $("#desc").val().trim(),
    category: $("#category").val(),
    zipcode: $("#zipcode").val().trim()
  };



  // Send an AJAX POST-request with jQuery
  $.post("/test", newProject)
    // On success, run the following code
    .done(function(data) {
      // Log the data we found
      console.log(data);
    });

  // Empty each input box by replacing the value with an empty string
  $("#title").val("");
  $("#desc").val("");
  $("#category").val("");
  $("#zipcode").val("");

});
