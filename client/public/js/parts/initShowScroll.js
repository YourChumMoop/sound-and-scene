import {
    $, $doc, isInViewport, throttleScroll,
} from './_utility';

function initShowScroll() {
    let delay = 0;

    function shsShow( item ) {
        item.style.opacity = 1;
        item.style.transform = 'translateY(0)';
        item.classList.add( 'show-on-scroll-ready' );
    }

    $( '.show-on-scroll' ).each( function () {
        const self = this;
        const origin = self.getAttribute( 'data-show-origin' );
        let translate = 'translateY(';

        if ( 'left' === origin ) {
            translate = 'translateX(-';
        }
        if ( 'top' === origin ) {
            translate = 'translateY(-';
        }
        if ( 'right' === origin ) {
            translate = 'translateX(';
        }
        if ( 'bottom' === origin ) {
            translate = 'translateY(';
        }

        self.style.transform = `${translate}${self.getAttribute( 'data-show-distance' )}px)`;
    } );


    throttleScroll( () => {
        $( '.show-on-scroll:not(.show-on-scroll-ready)' ).each( function () {
            const self = this;
            const $this = $( self );

            delay = parseInt( self.getAttribute( 'data-show-delay' ), 10 );
            self.style.transitionDuration = `${self.getAttribute( 'data-show-duration' )}ms`;

            if ( 0 < isInViewport( $this ) && !$this.hasClass( 'show-on-scroll-ready' ) ) {
                setTimeout( () => {
                    shsShow( self );
                }, delay );
            }
        } );
    } );

    // Fix when changing the filter to Isotope.
    $doc.on( 'isotopeChangeFilter', () => {
        $( '.show-on-scroll' ).each( function () {
            const self = this;

            if ( !$( self ).hasClass( 'show-on-scroll-ready' ) ) {
                shsShow( self );
            }
        } );
    } );
}

export { initShowScroll };
