$('#register-btn').on('click', e =>{
  e.preventDefault();
  console.log('register btn clicked');

  let url = window.location.origin;

  let user = {
    userName: $('#user-name').val().trim(),
    email: $('#user-email').val().trim(),
    password: $('#user-password').val().trim(),
    password2: $('#password-match').val().trim(),
    zipCode: $('#zip-code').val().trim()
  };

  $.post(url + "/api/user/register", user, (err, data) => {
   if (err) throw err;
   console.log(data);
  });

});