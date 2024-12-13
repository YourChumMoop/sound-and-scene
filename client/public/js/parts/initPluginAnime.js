import { $doc } from './_utility';

const { anime } = window;

function initPluginAnime() {
    if ( 'undefined' === typeof anime ) {
        return;
    }

    // Slider fullscreen vertical
    anime( {
        opacity: [0, 1],
        easing: 'cubicBezier(.2, 1, .2, 1)',
        duration: 700,
        targets: '.swiper-fullscreen-vertical .swiper-slide-active .card-fullscreen ~ .card-social-container li',
        translateY: [20, 0],
        autoplay: true,
        delay: anime.stagger( 100, { start: 550 } ),
    } );

    $doc.on( 'swiperSlideChangeTransitionStart', () => {
        anime( {
            opacity: [0, 1],
            easing: 'cubicBezier(.2, 1, .2, 1)',
            duration: 700,
            targets: '.swiper-fullscreen-vertical .swiper-slide-active .card-fullscreen ~ .card-social-container li',
            translateY: [20, 0],
            autoplay: true,
            delay: anime.stagger( 100, { start: 550 } ),
        } );
    } );


    // Button Ball
    let animeButtonBall;
    const $btnBall = $( '.btn-with-ball' );

    if ( !$btnBall.children( '.btn-ball' ).length ) {
        $btnBall.append( '<span class="btn-ball"></span>' );
    }

    $doc.on( 'mouseenter', '.btn-with-ball', function () {
        animeButtonBall = anime( {
            easing: 'cubicBezier(.44, 1, .165, .84)',
            targets: $( this ).children( '.btn-ball' )[0],
            duration: 250,
            direction: 'alternate',
            translateY: [0, -14],
            autoplay: true,
            loop: true,
        } );
    } );

    $doc.on( 'mouseleave', '.btn-with-ball', function () {
        animeButtonBall.pause();

        animeButtonBall = anime( {
            easing: 'cubicBezier(.44, 1, .165, .84)',
            targets: $( this ).children( '.btn-ball' )[0],
            duration: 300,
            direction: 'normal',
            translateY: 0,
            autoplay: true,
            loop: false,
        } );
    } );


    // Card person social effect
    $doc.on( 'mouseenter', '.card-person', function () {
        anime( {
            opacity: [0, 1],
            easing: 'cubicBezier(.2, 1, .2, 1)',
            duration: 600,
            targets: $( this ).find( '.card-social > ul' )[0].querySelectorAll( 'li' ),
            translateY: [10, 0],
            autoplay: true,
            delay: anime.stagger( 80, { start: 100 } ),
        } );
    } );
}

export { initPluginAnime };
