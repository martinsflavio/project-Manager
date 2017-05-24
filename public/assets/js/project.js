'use strict';






(() => {
  $('document').ready(() => {

    // like
    $('.like').on('click', function(e) {
      e.preventDefault();

      let userId = $(this).attr('data-userid'),
          projId = $(this).attr('data-projid'),
          propId = $(this).attr('data-propid');

      return request('like',userId,propId,projId);
    });

    // dislike
    $('.dislike').on('click', function(e) {
      e.preventDefault();

      let userId = $(this).attr('data-userid'),
          projId = $(this).attr('data-projid'),
          propId = $(this).attr('data-propid');

      return request('dislike',userId,propId,projId);
    });


    // request

    let request = (vote,user,prop,proj) => {
      let url;

      url = `${window.location.origin}/user/proposal/vote/${vote}/${user}/${prop}/${proj}`;

      $.post(url, (err, data) => {
        if (err) throw err;
        console.log(' vote sent');
      });
    };

  });
})();