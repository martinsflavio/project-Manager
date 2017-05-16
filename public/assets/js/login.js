$('#login-btn').on('click', e =>{
  e.preventDefault();
  console.log('login page');

    let url = window.location.origin;
    let user = {
      email: $('#email').val().trim(),
      password: $('#user-password').val().trim()
    };


    console.log(user);




    $.ajax({
      type: "POST",
      url:"/api/user/login",
      processData: false,
      contentType: 'application/json',
      data: JSON.stringify(user),
    }).done((res,err)=>{
        if (err) throw err;
        console.log(res);
    });

});