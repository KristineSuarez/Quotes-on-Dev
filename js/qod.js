(function($){




        let lastPage = '';

    $('#new-quote-button').on('click', function(event){
        event.preventDefault();

       lastPage = document.URL;
    
   
    //1: get request to grab random post and append to the DOM

    //add a click event for the "Show Me Another" btn and then run the AJAX code below
    $.ajax({
        method: "GET",
        url: qod_vars.rest_url + "/wp/v2/posts?filter[orderby]=rand&filter[posts_per_page]=1"

    }).done(function(data){

        $(".source").empty();

        let postObject = data[0];
        console.log(postObject);

        $('.entry-content').html(postObject.content.rendered);
        $('.entry-title').html(postObject.title.rendered);

        function addsource() {
            const s = data[0]._qod_quote_source;
            if (s !== "") {
                $('.source').html(`<a href="${postObject._qod_quote_source_url}">${postObject._qod_quote_source}</a>`);
            } else {
            }
        }
        addsource();



        // const post = data [0];
        // console.log(post);

        history.pushState(null, null, qod_vars.home_url + '/' + postObject.slug); //or (null, null, data[0].slug)
       // 1st value is an object which manages state
       // 2nd value is the url title browser tab
       // 3rd value is the url in the browser 

    }).fail(function(error){
        //TODO append a message to the DOM for user feedback
        console.log("an error occured", error);
    }); //ajax 

});


    //update the page when we click the forward and back buttons
    //2: post a new quote using the post method
    
    //using a for m to submit a quote so a .submit event
        $(window).on('popstate', function(){
            //update the url
            window.location.replace(lastPage); 

        });

})(jQuery);


//IIFE Immediately Invoked Function Expression
// Invoked also means calling a function or just running a function


// use for 	wp_localize_script( 'qod-script', 'qod_vars' on functions.php ->console.log( api_vars.success );

