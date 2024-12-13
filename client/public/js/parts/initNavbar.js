import {
    $doc, $body, $wnd, throttleScroll, debounceResize,
} from './_utility';

function initNavbar() {
    const scrollClass = 'navbar-scroll';
    const showClass = 'navbar-show';
    const hideClass = 'navbar-hide';
    const endClass = 'navbar-end';

    throttleScroll( ( type, scroll ) => {
        // show / hide
        if ( 'down' === type && 500 < scroll ) {
            $body.removeClass( showClass ).addClass( hideClass );
        } else if ( 'up' === type || 'end' === type || 'start' === type ) {
            $body.removeClass( hideClass ).addClass( showClass );
        }
        if ( 'end' === type ) {
            $body.addClass( endClass );
        } else {
            $body.removeClass( endClass );
        }

        // scroll class
        if ( 'down' === type && 100 < scroll ) {
            $body.addClass( scrollClass );
        }
        if ( 'start' === type ) {
            $body.removeClass( scrollClass );
        }
    } );

    // show and hide the menu with focus
    function toggleShow() {
        const $thisDropdown = $( this ).parents( '.navbar-dropdown' );
        const $thisDropdownMenu = $thisDropdown.children( '.dropdown-menu' );

        if ( !$thisDropdown.hasClass( 'focus' ) ) {
            $thisDropdown.addClass( 'focus' );
            $thisDropdownMenu.addClass( 'focus' );
        } else {
            $thisDropdown.removeClass( 'focus' );
            $thisDropdownMenu.removeClass( 'focus' );
        }
    }

    $doc.on( 'focus', '.navbar-top a', toggleShow );
    $doc.on( 'blur', '.navbar-top a', toggleShow );

    // update position
    debounceResize( () => {
        $( '.navbar-dropdown > .dropdown-menu' ).each( function () {
            const $thisDropdown = $( this );
            const rect = $thisDropdown[0].getBoundingClientRect();
            const rectLeft = rect.left;
            const rectRight = rect.right;
            const rectWidth = rect.width;
            const wndW = $wnd.width();

            if ( 0 > wndW - rectRight ) {
                $thisDropdown.addClass( 'dropdown-menu-drop-left' );

                if ( wndW - rectRight === rectWidth + 10 ) {
                    $thisDropdown.removeClass( 'dropdown-menu-drop-left' );
                }
            }

            if ( 0 > rectLeft ) {
                $thisDropdown.addClass( 'dropdown-menu-drop-right' );

                if ( rectLeft === rectWidth + 10 ) {
                    $thisDropdown.removeClass( 'dropdown-menu-drop-right' );
                }
            }
        } );
    } );
}

export { initNavbar };
