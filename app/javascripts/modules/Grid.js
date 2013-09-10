var Grid = {
  
    initialize: function () {

        this.openOverlay();

        this.closeOverlay();

    },

    closeOverlay: function () {

        $('body').on('click', 'a.close-btn', function(e) {
            
            e.preventDefault();

            $(this).closest('.block').removeClass('make-static');

            $(this).parent().removeClass('active');

            $(this).closest('.container').find('.content-header').removeClass('invisible');

        });

    },

    openOverlay: function () {

        $('.block').click( function () {

            $(this).addClass('make-static');

            $(this).find('.overlay').addClass('active');

            $(this).closest('.container').find('.content-header').addClass('invisible');

        });

    }

};