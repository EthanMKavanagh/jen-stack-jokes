console.log( 'client.js sourced' );

$( document ).ready( onReady );

function onReady(){
    console.log( 'DOM ready' );
    refreshJokes();
    $( document ).on( 'click', '#addJokeButton', onAddJoke );
    $( document ).on( 'click', '#clearInputs', onClearInputs );
    $( document ).on( 'click', '#clearJokes', onClearJokes );
} // end onReady

function onClearJokes(){
    let el = $( '#outputDiv' )
    el.empty();
    // Clears on click, but when a new joke is added, previous jokes reappear
    $( '#outputDiv' ).append( `` ); // end append
} // end onClearJokes

function onClearInputs(){
    objectToSend = {
        whoseJoke: $( '#whoseJokeIn' ).val( '' ),
        jokeQuestion: $( '#questionIn' ).val( '' ),
        punchLine: $( '#punchlineIn' ).val( '' )
    } // end objectToSend
} // end onClear

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
                <p>
                    ${response[ i ].whoseJoke}:
                    ${response[ i ].jokeQuestion}
                    ${response[ i ].punchLine}
                </p>
            ` ) // end append
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
