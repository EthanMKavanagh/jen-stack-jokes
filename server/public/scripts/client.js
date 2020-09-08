console.log( 'client.js sourced' );

$( document ).ready( onReady );

function onReady(){
    console.log( 'DOM ready' );
    $( document ).on( 'click', '#addJokeButton', onAddJoke );
} // end onReady

function onAddJoke(){
    let objectToSend = {
        whoseJoke: $( '#whoseJokeIn' ).val(),
        jokeQuestion: $( '#questionIn' ).val(),
        punchline: $( '#punchlineIn' ).val()
    } // end objectToSend
    $.ajax( {
        url: '/jokes',
        method: 'POST',
        data: objectToSend
    } ).then( function( response ){
        console.log( 'We got a response in ajax POST!', response );
        //refreshJokes();
    } ).catch( function (errorInfo){
        alert( 'Error in ajax POST!', errorInfo );
    } ) // end POST ajax
} // end onAddJoke
