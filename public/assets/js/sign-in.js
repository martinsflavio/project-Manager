$('#sign-in-btn').on('click', e =>{
  e.preventDefault();
  console.log('sign-in btn clicked');

  let url = window.location.origin;
  let user = {
    username: $('#username').val().trim()
  };



  $.ajax({
   type: "POST",
   url:"/user/sign-in",
   processData: false,
   contentType: 'application/json',
   data: JSON.stringify(user),
   }).done((res,err)=>{
      console.log(res.body);
   });

});