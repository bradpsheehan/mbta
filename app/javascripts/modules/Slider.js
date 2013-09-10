var Slider = {

    initialize: function () {

        var $this = this;

        this.activateProcessSlider();

        $(window).load( function() {
            $this.navigateToSlide();
            $this.activateTestimonialSlider();
            $this.controlTestimonialSlider();
        });

    },

    navigateToPageContent: function () {

        $('html, body').animate({
            scrollTop: 560
        }, 500);

    },

    navigateToSlide: function () {

        var $this = this,
            $url = window.location.hash,
            $sBlock = $('#section-solutions .blocks-container .block');

        if ($url.indexOf('#') < 0) {
            $this.activateContentSlider(0);
        } else {
            $this.navigateToPageContent();

            if ($url.toLowerCase().indexOf('#solution') > 0) {
                $this.activateContentSlider(1);
                
                $sBlock.each( function() {
                    var title = $(this).attr('data-title');

                    console.log(title);

                    if ($url.replace(/^.*#/, '') === title) {
                        $(this).addClass('make-static');
                        $(this).find('.overlay').addClass('active');
                        $(this).closest('.container').find('.content-header').addClass('invisible');
                    }
                });

            } else if ($url.toLowerCase().indexOf('#team') >= 0) {
                $this.activateContentSlider(2);
            } else if ($url.toLowerCase().indexOf('#testimonial') >= 0) {
                $this.activateContentSlider(3);
            } else {
                $this.activateContentSlider(0);
            }
        }

    },

    activateContentSlider: function (slideNum) {

        var $this = this;

        $('#page-content').flexslider({
            animation: 'slide',
            startAt: slideNum,
            slideshow: false,
            selector: '.main-slides > .main-slide-item',
            manualControls: '.main-navigation ul li',
            prevText: '<span class="icon icon-arrow-left"></span>',
            nextText: '<span class="icon icon-arrow-right"></span>'
        });

        $('.main-navigation ul li a').click( function() {
            $this.navigateToPageContent();
        });

    },

    activateProcessSlider: function () {

        $('#process-slider > .container').flexslider({
            animation: 'slide',
            namespace: 'plex-',
            selector: '.process-slides > li',
            slideshow: false,
            directionNav: false,
            start: function (slider) {
                $('#process-slider .button').click( function() {

                    var $button = $(this).attr('id');

                    switch ($button) {
                        case 'to-slide-2':
                            slider.flexAnimate(1);
                            break;
                        case 'to-slide-3':
                            slider.flexAnimate(2);
                            break;
                        default:
                            return true;
                    }
                });
            }
        });

    },

    activateTestimonialSlider: function () {

        $('.testimonials-container').flexslider({
            controlNav: false,
            slideshow: false,
            directionNav: false
        });

    },

    controlTestimonialSlider: function () {

        $('.testimonial-controls li').click( function () {

            var controlLink = $(this),
                controlNum = $(this).index();
                $slider = $(this).closest('.container').find('.testimonials-container').data('flexslider'),
                $indicator = controlLink.closest('.testimonial-controls').find('.indicator');

            $('.testimonial-controls li').removeClass('active');
            controlLink.addClass('active');

            $slider.flexslider(controlNum);

            switch (controlNum) {
                case 0:
                    $indicator.css('left', '16.66%');
                    break;
                case 1:
                    $indicator.css('left', '49.99%');
                    break;
                case 2:
                    $indicator.css('left', '83.33%');
                    break;
                default:
                    return false;
            }

        });

    }

};