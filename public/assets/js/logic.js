1.index page (first page + logo)
2.user register (regidter page +add user to database  + validation)
// add bootstap image like profile 
3. user login (login page + authentication)
4.add new project by authenticate user (add-project page +add project to database)
5.user-home page (show all projects + join button in front of each project)
6. search project page (search page)


,
            comment: {
                validators: {
                      stringLength: {
                        min: 10,
                        max: 200,
                        message:'Please enter at least 10 characters and no more than 200'
                    },
                    notEmpty: {
                        message: 'Please supply a description of your project'
                    }
                    }
                }
 //use for logout button http://codepen.io/gregvanbrug/pen/dqika
 $('document').ready(function(){
  
  $('[data-login-button], [data-logout-button]').click(function(){
    $('[data-login-form], [data-login-user]').toggleClass('state-hidden');
    $('[data-header]').toggleClass('state-logged-in');
  });
  
});