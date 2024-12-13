import { $, $doc } from './_utility';

function initPluginImagesLoaded() {
    $doc.imagesLoaded().done( () => {
        $doc.trigger( 'images.loaded' );
    } );
}

export { initPluginImagesLoaded };
