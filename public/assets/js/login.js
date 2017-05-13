$('#login-btn').on('click', e =>{
  e.preventDefault();
  console.log('login page');

    let url = window.location.origin;
    let user = {
      username: $('#username').val().trim()
    };

  $.post( "/user/login", ( data )=> {
    location.reload(data);
  });



 /*   $.ajax({
      type: "POST",
      url:"/user/login",
      processData: false,
      contentType: 'application/json',
      data: JSON.stringify(user),
    }).done((res,err)=>{

    });*/

});