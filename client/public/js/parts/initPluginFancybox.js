import {
    $, $doc, $body, bodyOverflow,
} from './_utility';


function initPluginFancybox() {
    // fix scrollbar in the fancybox
    $doc.on( 'beforeShow.fb', () => {
        bodyOverflow( 1 );

        setTimeout( () => {
            $body.addClass( 'fancybox-open' );
        }, 10 );
    } );

    $doc.on( 'beforeClose.fb', () => {
        $body.removeClass( 'fancybox-open' );
    } );

    $doc.on( 'afterClose.fb', () => {
        bodyOverflow( 0 );
    } );


    $doc.on( 'keyup', ( e ) => {
        if ( 27 === e.keyCode ) {
            $.fancybox.close();
        }
    } );
}

export { initPluginFancybox };

