import { $, $doc } from './_utility';

function initPluginIsotope() {
    if ( 'undefined' === typeof $.fn.isotope ) {
        return;
    }

    $( '.isotope' ).each( function () {
        const $this = $( this );
        const curIsotopeOptions = $this.find( '.isotope-options' );
        const dataMode = $this.attr( 'data-isotope-mode' );
        const conf = {};

        conf.itemSelector = '.isotope-item';

        if ( dataMode ) {
            conf.layoutMode = dataMode;
        }

        // init items
        const $grid = $this.find( '.isotope-grid' ).isotope( conf );

        // refresh for isotope images position
        if ( $grid.imagesLoaded ) {
            $grid.imagesLoaded().progress( () => {
                $grid.isotope( 'layout' );
            } );
        }

        // click on filter button
        curIsotopeOptions.on( 'click', '> :not(.active) > a ', function ( e ) {
            const $thisLink = $( this );
            $thisLink.parent().addClass( 'active' ).siblings().removeClass( 'active' );
            const curFilter = $thisLink.attr( 'data-filter' );

            e.preventDefault();

            // Added event when changing the filter.
            $doc.trigger( 'isotopeChangeFilter' );

            $grid.isotope( {
                filter() {
                    if ( 'all' === curFilter ) {
                        return true;
                    }

                    let itemFilters = $( this ).attr( 'data-filters' );

                    if ( itemFilters ) {
                        itemFilters = itemFilters.split( ',' );
                        // eslint-disable-next-line
                        for (const k in itemFilters) {
                            if ( itemFilters[k].replace( /\s/g, '' ) === curFilter ) {
                                return true;
                            }
                        }
                    }
                    return false;
                },
            } );
        } );
    } );
}

export { initPluginIsotope };
