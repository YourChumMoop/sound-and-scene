import {
    $, $doc, $body, isMobile,
} from './_utility';

const START_POSITION = -100;

function initCursor() {
    if ( !$( '[data-cursor-style]' ).length || isMobile ) {
        return;
    }

    let clientX = START_POSITION;
    let clientY = START_POSITION;
    let xPos = START_POSITION;
    let yPos = START_POSITION;
    let dX = START_POSITION;
    let dY = START_POSITION;
    let lastRunTime = Date.now();
    const tickPos = 2;
    const fps = 1000 / 60;

    const $cursor = $( '<div class="cursor"></div>' );

    $body.append( $cursor ).addClass( 'cursor-enabled' );

    $doc.on( 'mousemove', ( e ) => {
        clientX = e.clientX;
        clientY = e.clientY;
    } );

    $doc.on( 'swiperTouchMove', ( event, cltX, cltY ) => {
        clientX = cltX;
        clientY = cltY;
    } );

    // Hover on Item
    let resolution;

    $doc.on( 'mouseenter', '[data-cursor-style]', function () {
        const $this = $( this );

        $cursor.text( $this.attr( 'data-cursor-text' ) );
        $cursor.addClass( $this.attr( 'data-cursor-style' ) );
        $cursor.addClass( 'cursor-hover' );

        resolution = false;
    } ).on( 'mouseleave', '[data-cursor-style]', () => {
        $cursor.removeClass( 'cursor-hover' );

        resolution = true;
    } );

    $doc.on( 'transitionend webkitTransitionEnd oTransitionEnd', '.cursor-circle', () => {
        if ( resolution ) {
            $cursor.removeClass( 'cursor-circle' );
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

        $cursor.css( 'transform', `matrix(1, 0, 0, 1, ${xPos}, ${yPos}) translate3d(0,0,0)` );

        requestAnimationFrame( moveCursor );
    };

    requestAnimationFrame( moveCursor );
}

export { initCursor };
