console.log( 'client.js sourced' );

$( document ).ready( onReady );

function onReady(){
    console.log( 'DOM ready' );
    refreshJokes();
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
        for( let i = 0; i < response.length; i++ ){
            $( '#outputDiv' ).append( `
                <h3>
                    ${response[ i ].whoseJoke}:
                    ${response[ i ].jokeQuestion}
                    ${response[ i ].punchLine}
                </h3>
            ` )
        } // end for
    } ).catch( function( errorInfo ){
        alert( 'Error in ajax GET!', errorInfo );
    } ); // end ajax GET
} // end refreshJokes

function onAddJoke(){
    let objectToSend = {
        whoseJoke: $( '#whoseJokeIn' ).val(),
        jokeQuestion: $( '#questionIn' ).val(),
        punchLine: $( '#punchlineIn' ).val()
    } // end objectToSend
    $.ajax( {
        url: '/jokes',
        method: 'POST',
        data: objectToSend
    } ).then( function( response ){
        console.log( 'We got a response in ajax POST!', response );
        refreshJokes();
    } ).catch( function (errorInfo){
        alert( 'Error in ajax POST!', errorInfo );
    } ) // end ajax POST
} // end onAddJoke
