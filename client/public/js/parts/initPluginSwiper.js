import { $, $doc } from './_utility';

function initPluginSwiper() {
    if ( 'undefined' === typeof Swiper ) {
        return;
    }

    $( '.swiper' ).each( function () {
        const $this = $( this );
        const dataLoop = $this.attr( 'data-swiper-loop' );
        const dataFreeMode = $this.attr( 'data-swiper-freeMode' );
        const dataGrabCursor = $this.attr( 'data-swiper-grabCursor' );
        const dataAutoHeight = $this.attr( 'data-swiper-autoHeight' );
        const dataBreakpoints = $this.attr( 'data-swiper-breakpoints' );
        const dataSlides = $this.attr( 'data-swiper-slides' );
        const dataParallax = $this.attr( 'data-swiper-parallax' );
        const dataCenter = $this.attr( 'data-swiper-center' );
        const dataVertical = $this.attr( 'data-swiper-vertical' );
        const dataAutoplay = parseInt( $this.attr( 'data-swiper-autoplay' ), 10 );
        const dataSpeed = parseInt( $this.attr( 'data-swiper-speed' ), 10 );
        const dataGap = parseInt( $this.attr( 'data-swiper-gap' ), 10 );
        const conf = {};

        const $container = $this.find( '.swiper-container' );
        const $btnPrev = $this.find( '.swiper-button-prev' );
        const $btnNext = $this.find( '.swiper-button-next' );
        const $pagination = $this.find( '.swiper-pagination' );
        const $scrollbar = $this.find( '.swiper-scrollbar' );

        if ( dataParallax ) {
            conf.parallax = true;
        }

        if ( $btnPrev.length && $btnNext.length ) {
            conf.navigation = {
                nextEl: $btnNext[0],
                prevEl: $btnPrev[0],
            };
        }

        if ( $pagination.length ) {
            conf.pagination = {
                el: $pagination[0],
                totalClass: '.swiper-pagination-total',
                renderBullet( index, className ) {
                    let number = '';

                    if ( 10 > number ) {
                        number = `0${index + 1}`;
                    }
                    if ( 9 < number ) {
                        number = index + 1;
                    }

                    return `<span class="${className}">${( number )}</span>`;
                },
            };
        }

        if ( $scrollbar.length ) {
            $container.append( '<div class="swiper-scrollbar"></div>' );

            conf.scrollbar = {
                el: $container.children( '.swiper-scrollbar' )[0],
                hide: false,
                draggable: true,
            };
        }

        if ( dataVertical ) {
            conf.direction = 'vertical';
            conf.mousewheel = true;
            conf.effect = 'coverflow';
            conf.coverflowEffect = {
                rotate: 0,
                stretch: -10,
                depth: 100,
                modifier: 3,
                slideShadows: false,
            };
        }

        if ( dataLoop ) {
            conf.loop = true;
        }

        if ( dataCenter ) {
            conf.centeredSlides = true;
        }

        if ( dataFreeMode ) {
            conf.freeMode = true;
        }

        if ( dataGrabCursor ) {
            conf.grabCursor = true;
        }

        if ( dataAutoHeight ) {
            conf.autoHeight = true;
        }

        if ( dataAutoplay ) {
            conf.autoplay = {
                delay: dataAutoplay,
            };
        }

        if ( dataSpeed ) {
            conf.speed = dataSpeed;
        }

        if ( 'auto' === dataSlides ) {
            conf.slidesPerView = 'auto';
        } else {
            conf.slidesPerView = parseInt( dataSlides, 10 );
        }

        if ( dataGap ) {
            conf.spaceBetween = dataGap;
        }

        if ( dataBreakpoints ) {
            let i = 0;
            const breaks = {};
            const points = dataBreakpoints.split( ',' );
            while ( i < dataBreakpoints.split( ',' ).length ) {
                breaks[parseInt( points[i].split( ':' )[0], 10 )] = {
                    slidesPerView: 'auto' === points[i].split( ':' )[1] ? 'auto' : parseInt( points[i].split( ':' )[1], 10 ),
                };
                i++;
            }
            conf.breakpoints = breaks;
        }

        // eslint-disable-next-line
        const swiper = new Swiper ( $container[0], conf );

        if ( $pagination.length ) {
            let number = swiper.pagination.bullets.length;

            if ( 10 > number ) {
                number = `0${number}`;
            }

            $pagination.attr( 'data-swiper-total', number );
        }

        swiper.on( 'slideChangeTransitionStart', () => {
            $doc.trigger( 'swiperSlideChangeTransitionStart' );
        } );
        swiper.on( 'touchMove', ( event ) => {
            $doc.trigger( 'swiperTouchMove', [event.clientX, event.clientY] );
        } );
    } );
}

export { initPluginSwiper };
