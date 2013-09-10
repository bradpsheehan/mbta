;(function ($) {

    if (!$('body').hasClass('subpage')) {
        Slider.initialize();
        Grid.initialize();
        Nav.initialize();
    }

    Forms.initialize();

}) (jQuery);