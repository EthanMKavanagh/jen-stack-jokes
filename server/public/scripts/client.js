console.log( 'client.js sourced' );

$( document ).ready( onReady );

function onReady(){
    console.log( 'DOM ready' );
    $( document ).on( 'click', '#addJokeButton', onAddJoke );
} // end onReady

function refreshJokes(){
    $.ajax( {
        url: '/jokes',
        method: 'GET'
    } ).then( function( response ){
        console.log( 'Inside of ajax GET! Response is:', response );
        let el = $( '#outputDiv' );
        el.empty();
        for( let joke of jokes ){
            $( '#outputDiv' ).append( `
                <h3>
                    ${joke.whoseJokeIn}:
                    ${joke.questionIn}
                    ${joke.punchlineIn}
                </h3>
            ` )
        } // end if
    } ).catch( function( errorInfo ){
        alert( 'Error in ajax GET!', errorInfo );
    } ); // end ajax GET
} // end refreshJokes

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
    } ) // end ajax POST
} // end onAddJoke
