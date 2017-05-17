$('#login-btn').on('click', e =>{
  e.preventDefault();
  console.log('login page');

    let url = window.location.origin;

    let user = {
      email: $('#user-email').val().trim(),
      password: $('#user-password').val().trim()
    };

  $.post(url + "/api/user/login", user, (err, data) => {
    if (err) throw err;
    console.log(data);
  });

});