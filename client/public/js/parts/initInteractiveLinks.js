import {
    $, $doc, isMobile,
} from './_utility';

const START_POSITION = 0;

function initInteractiveLinks() {
    if ( isMobile ) {
        return;
    }

    let clientX = START_POSITION;
    let clientY = START_POSITION;
    let xPos = START_POSITION;
    let yPos = START_POSITION;
    let dX = START_POSITION;
    let dY = START_POSITION;
    let lastRunTime = Date.now();
    const tickPos = 5;
    const fps = 1000 / 60;

    let $image;

    $doc.on( 'images.loaded', () => {
        $( '.interactive-links:not(.interactive-links-style-2) .interactive-links-image' ).each( function () {
            const $this = $( this );

            $this.css( {
                'margin-top': $this.innerHeight() / -2,
                'margin-left': $this.innerWidth() / -2,
            } );
        } );
    } );

    $doc.on( 'mouseenter', '.interactive-links a', function ( e ) {
        const $this = $( this );
        const $parent = $this.parents( '.interactive-links' );

        $image = $this.siblings( 'img' );
        $image.addClass( 'hover' ).removeClass( 'transition-end' );

        if ( $parent.hasClass( 'interactive-links-style-2' ) ) {
            clientX = e.clientX / 12;
            clientY = e.clientY / 12;
        } else if ( $parent.hasClass( 'interactive-links-style-3' ) ) {
            clientX = e.clientX / 10;
            clientY = e.clientY / 10;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }
    } );

    $doc.on( 'mouseleave', '.interactive-links a', function () {
        $( this ).siblings( 'img' ).removeClass( 'hover' ).addClass( 'transition-end' );
    } );

    $doc.on( 'mousemove', '.interactive-links a', function ( e ) {
        const $parent = $( this ).parents( '.interactive-links' );

        if ( $parent.hasClass( 'interactive-links-style-2' ) ) {
            clientX = e.clientX / 12;
            clientY = e.clientY / 12;
        } else if ( $parent.hasClass( 'interactive-links-style-3' ) ) {
            clientX = e.clientX / 10;
            clientY = e.clientY / 10;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }
    } );

    $doc.on( 'transitionend webkitTransitionEnd oTransitionEnd', '.interactive-links-image', function () {
        const $images = $( this ).parents( '.interactive-links' ).find( '.interactive-links-image' );

        // Cleaning
        if ( $image.length && $image.hasClass( 'transition-end' ) ) {
            $images.removeClass( 'transition-end' );
            $images.css( 'transform', '' );
            $image = '';
        }
    } );


    // Move cursor.
    const moveCursor = () => {
        const now = Date.now();
        const delay = now - lastRunTime;
        lastRunTime = now;

        // First run.
        if ( xPos === START_POSITION ) {
            dX = clientX;
            dY = clientY;
            xPos = clientX;
            yPos = clientY;
        } else {
            dX = clientX - xPos;
            dY = clientY - yPos;
            xPos += dX / ( tickPos * fps / delay );
            yPos += dY / ( tickPos * fps / delay );
        }

        if ( $image ) {
            $image.css( 'transform', `matrix(1, 0, 0, 1, ${xPos}, ${yPos}) translate3d(0,0,0)` );
        }

        requestAnimationFrame( moveCursor );
    };

    requestAnimationFrame( moveCursor );
}

export { initInteractiveLinks };
