(function($){

    $('body').append('hello world');
    //your code goes here

    //1: get request to grab random post and append to the DOM

    //add a click event for the "Show Me Another" btn and then run the AJAX code below
    $.ajax({
        method: "GET",
        url: //qod_vars.rest.url = /wp/v2/posts

    }).done(function(data){
        console.log(data);
        //append the quote to the DOM
    }).fail(function(error){
        console.log("an error occured", error);
    })
    //2: post a new quote using the post method

    //using a for m to submit a quote so a .submit event
    
}) (jQuery)

//IIFE Immediately Invoked Function Expression
// Invoked also means calling a function or just running a function