var Nav = {

    initialize: function () {

        this.makeMainNavSticky();

        this.scrollToSection();

    },

    makeMainNavSticky: function () {

        if (!$('.main-navigation').hasClass('subpage-header')) {
            $('nav.main-navigation').waypoint('sticky', {
                stuckClass: 'sticky'
            });
        }

    },

    scrollToSection: function () {

        $('body').on('click', 'a', function (e) {
            var $link = $(this).attr('href');

            if ($link.toLowerCase().indexOf('#') >= 0) {
                e.preventDefault();
                $('html, body').animate({
                    scrollTop: $($link).offset().top - 60
                }, 600);
            }
        });

    }

};