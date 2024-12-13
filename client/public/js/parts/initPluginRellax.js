import { $doc, isMobile } from './_utility';

function initPluginRellax() {
    if ( 'undefined' === typeof Rellax || !$( '.shape' ).length || isMobile ) {
        return;
    }

    const rellax = new window.Rellax( '.shape svg', {
        center: true,
    } );

    $doc.on( 'images.loaded', () => {
        rellax.refresh();
    } );
}

export { initPluginRellax };
