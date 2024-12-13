import { throttle } from 'throttle-debounce';
import rafl from 'rafl';

const $ = window.jQuery;
const tween = window.TweenMax;
const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/g.test( navigator.userAgent || navigator.vendor || window.opera );

const $wnd = $( window );
const $doc = $( document );
const $body = $( 'body' );
const $html = $( 'html' );
let wndW;
let wndH;
let docH;
function getWndSize() {
    wndW = $wnd.width();
    wndH = $wnd.height();
    docH = $doc.height();
}
getWndSize();
$wnd.on( 'resize load orientationchange', getWndSize );

/**
 * Debounce resize
 */
const resizeArr = [];
function debounceResized() {
    if ( resizeArr.length ) {
        for ( let k = 0; k < resizeArr.length; k += 1 ) {
            resizeArr[k]();
        }
    }
}
$wnd.on( 'ready load resize orientationchange', throttle( 200, () => {
    rafl( debounceResized );
} ) );
debounceResized();

function debounceResize( func ) {
    if ( 'function' === typeof func ) {
        resizeArr.push( func );
    } else {
        window.dispatchEvent( new Event( 'resize' ) );
    }
}

/**
 * Throttle scroll
 */
const hideOnScrollList = [];
let lastST = 0;

function hasScrolled() {
    const ST = $wnd.scrollTop();

    let type = ''; // [up, down, end, start]

    if ( ST > lastST ) {
        type = 'down';
    } else if ( ST < lastST ) {
        type = 'up';
    } else {
        type = 'none';
    }

    if ( 0 === ST ) {
        type = 'start';
    } else if ( ST >= document.documentElement.offsetHeight - window.innerHeight ) {
        type = 'end';
    }

    hideOnScrollList.forEach( ( value ) => {
        if ( 'function' === typeof value ) {
            value( type, ST, lastST, $wnd );
        }
    } );

    lastST = ST;
}

$wnd.on( 'scroll ready load resize orientationchange', throttle( 200, () => {
    if ( hideOnScrollList.length ) {
        rafl( hasScrolled );
    }
} ) );

function throttleScroll( callback ) {
    hideOnScrollList.push( callback );
}

/**
 * Body Overflow
 * Thanks https://jsfiddle.net/mariusc23/s6mLJ/31/
 * Usage:
 *    // enable
 *    bodyOverflow(1);
 *
 *    // disable
 *    bodyOverflow(0);
 */
let bodyOverflowEnabled;
let isBodyOverflowing;
let scrollbarWidth;
let originalBodyStyle;

function bodyGetScrollbarWidth() {
    // thx d.walsh
    const scrollDiv = document.createElement( 'div' );
    scrollDiv.className = 'body-scrollbar-measure';
    $body[0].appendChild( scrollDiv );
    const result = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    $body[0].removeChild( scrollDiv );
    return result;
}
function bodyCheckScrollbar() {
    let fullWindowWidth = window.innerWidth;
    if ( !fullWindowWidth ) {
        const documentElementRect = document.documentElement.getBoundingClientRect();
        fullWindowWidth = documentElementRect.right - Math.abs( documentElementRect.left );
    }
    isBodyOverflowing = $body[0].clientWidth < fullWindowWidth;
    scrollbarWidth = bodyGetScrollbarWidth();
}

function bodySetScrollbar() {
    if ( 'undefined' === typeof originalBodyStyle ) {
        originalBodyStyle = $body.attr( 'style' ) || '';
    }

    const originalBodyPadding = parseFloat( parseInt( document.documentElement.style.getPropertyValue( '--tmb-scrollbar-width' ), 10 ) ) || 0;

    if ( 0 < scrollbarWidth ) {
        document.documentElement.style.setProperty( '--tmb-scrollbar-width', `${scrollbarWidth + originalBodyPadding}px` );
    }
}
function bodyResetScrollbar() {
    $body.attr( 'style', originalBodyStyle );
    document.documentElement.style.setProperty( '--tmb-scrollbar-width', '0px' );
}
function bodyOverflow( enable ) {
    if ( enable && !bodyOverflowEnabled ) {
        bodyOverflowEnabled = 1;
        bodyCheckScrollbar();
        bodySetScrollbar();
        $body.css( 'overflow', 'hidden' );
    } else if ( !enable && bodyOverflowEnabled ) {
        bodyOverflowEnabled = 0;
        $body.css( 'overflow', '' );
        bodyResetScrollbar();
    }
}


/**
 * In Viewport checker
 * return visible percent from 0 to 1
 */
function isInViewport( $item, returnRect ) {
    const rect = $item[0].getBoundingClientRect();
    let result = 1;

    if ( 0 >= rect.right || rect.left >= wndW ) {
        result = 0;
    } else if ( 0 > rect.bottom && rect.top <= wndH ) {
        result = 0;
    } else {
        const beforeTopEnd = Math.max( 0, rect.height + rect.top );
        const beforeBottomEnd = Math.max( 0, rect.height - ( rect.top + rect.height - wndH ) );
        const afterTop = Math.max( 0, -rect.top );
        const beforeBottom = Math.max( 0, rect.top + rect.height - wndH );
        if ( rect.height < wndH ) {
            result = 1 - ( afterTop || beforeBottom ) / rect.height;
        } else if ( beforeTopEnd <= wndH ) {
            result = beforeTopEnd / wndH;
        } else if ( beforeBottomEnd <= wndH ) {
            result = beforeBottomEnd / wndH;
        }
        result = 0 > result ? 0 : result;
    }
    if ( returnRect ) {
        return [result, rect];
    }
    return result;
}

export {
    $, tween, isMobile, $wnd, $doc, $html, $body, wndW, wndH, docH, debounceResize, throttleScroll, bodyOverflow, bodyGetScrollbarWidth, isInViewport,
};
