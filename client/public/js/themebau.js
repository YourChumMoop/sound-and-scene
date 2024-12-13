import { initShowScroll } from './parts/initShowScroll';
import { initCursor } from './parts/initCursor';
import { initNavbar } from './parts/initNavbar';
import { initInteractiveLinks } from './parts/initInteractiveLinks';

import { initPluginSwiper } from './parts/initPluginSwiper';
import { initPluginAnime } from './parts/initPluginAnime';
import { initPluginImagesLoaded } from './parts/initPluginImagesLoaded';
import { initPluginRellax } from './parts/initPluginRellax';
import { initPluginIsotope } from './parts/initPluginIsotope';
import { initPluginFancybox } from './parts/initPluginFancybox';
import { initPluginOFI } from './parts/initPluginOFI';

class THEMEBAU {
    init() {
        const self = this;
        self.initShowScroll();
        self.initCursor();
        self.initNavbar();
        self.initInteractiveLinks();

        self.initPluginSwiper();
        self.initPluginAnime();
        self.initPluginImagesLoaded();
        self.initPluginRellax();
        self.initPluginIsotope();
        self.initPluginFancybox();
        self.initPluginOFI();

        return self;
    }


    initShowScroll() {
        return initShowScroll.call( this );
    }

    initCursor() {
        return initCursor.call( this );
    }

    initNavbar() {
        return initNavbar.call( this );
    }

    initInteractiveLinks() {
        return initInteractiveLinks.call( this );
    }


    initPluginSwiper() {
        return initPluginSwiper.call( this );
    }

    initPluginAnime() {
        return initPluginAnime.call( this );
    }

    initPluginImagesLoaded() {
        return initPluginImagesLoaded.call( this );
    }

    initPluginRellax() {
        return initPluginRellax.call( this );
    }

    initPluginIsotope() {
        return initPluginIsotope.call( this );
    }

    initPluginFancybox() {
        return initPluginFancybox.call( this );
    }

    initPluginOFI() {
        return initPluginOFI.call( this );
    }
}

window.Themebau = new THEMEBAU().init();
