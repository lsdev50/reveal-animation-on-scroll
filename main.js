// replace .lsreveal, .reveal_posts article with your selector
jQuery(document).ready(function($) {
    let rafId = null;
    const DELAY = 400;
    let lastTime = 0;

    function scroll() {
        const scrollTop = $(window).scrollTop();
        const windowHeight = $(window).height();
        const visibleTop = scrollTop + windowHeight;

        $('.lsreveal, .reveal_posts article').each(function() {
            const $element = $(this);
            if ($element.hasClass('reveal_visible')) return;

            const elementTop = $element.offset().top;
            const elementBottom = elementTop + $element.height();
            if (elementBottom >= scrollTop && elementTop <= visibleTop) {
                $element.addClass('reveal_pending');
                if (!rafId) requestAnimationFrame(reveal);
            }
        });
    }

    function reveal() {
        rafId = null; 
        const now = performance.now();

        // Check if the delay has passed
        if (now - lastTime > DELAY) {
            lastTime = now;
            const $pendingElements = $('.reveal_pending');
            if ($pendingElements.length > 0) {
                $($pendingElements.get(0)).removeClass('reveal_pending').addClass('reveal_visible');
            }
        }

        if ($('.reveal_pending').length > 0) {
            rafId = requestAnimationFrame(reveal);
        }
    }
    
    // Initially remove the 'reveal_visible' class if it's there
    $('.lsreveal, .reveal_posts article').removeClass('reveal_visible');
    
    scroll();

    // Attach the scroll event
    $(window).on('scroll', scroll);
});
