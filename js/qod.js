(function($){

        let lastPage = '';

    $('#new-quote-button').on('click', function(event){
        event.preventDefault();

       lastPage = document.URL;
    
   
    //1: get request to grab random post and append to the DOM
    $.ajax({
        method: "GET",
        url: qod_vars.rest_url + '/wp/v2/posts?filter[orderby]=rand&filter[posts_per_page]=1'

    }).done(function(data){

        $('.source').empty();

        let postObject = data[0];
        console.log(postObject);

        $('.entry-content').html(postObject.content.rendered);
        $('.entry-title').html(postObject.title.rendered);

        function addsource() {
            const s = data[0]._qod_quote_source;
            if (s !== '') {
                $('.source').html(`<a href="${postObject._qod_quote_source_url}">${postObject._qod_quote_source}</a>`);
            } else {
            }
        }
        addsource();

        history.pushState(null, null, qod_vars.home_url + '/' + postObject.slug); //or (null, null, data[0].slug)
       // 1st value is an object which manages state
       // 2nd value is the url title browser tab
       // 3rd value is the url in the browser 

    }).fail(function(error){
        //TODO append a message to the DOM for user feedback
        console.log("an error occured", error);
    });  
        $(window).on('popstate', function(){
            window.location.replace(lastPage); 

        })
    })


});

    //update the page when we click the forward and back buttons
    //2: post a new quote using the post method
    (function($) {
        $('submit-form').on('click', function(event) {
          event.preventDefault();
          console.log('submit');
          $.ajax({
            method: 'post',
            url: window.qod_vars.rest_url + 'wp/v2/posts/',
            data: {
              title: $('#quote-author').val(),
              content: $('#quote-content').val(),
              _qod_quote_source: $('#quote-source').val(),
              _qod_quote_source_url: $('#quote-source-url').val()
            },
            beforeSend: function(xhr) {
              xhr.setRequestHeader('X-WP-Nonce', window.qod_vars.wpapi_nonce);
            }
          })
            .fail(function() {
              alert('fail');
            })
            .done(function(response) {
              alert('Success! Comments are closed for this post.');
            })

        });
})(jQuery);

