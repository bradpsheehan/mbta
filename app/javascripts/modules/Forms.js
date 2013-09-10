var Forms = {
    
    initialize: function () {

        this.addPasswordValidation();

    },

    addPasswordValidation: function () {

        $('.password-field input').complexify({}, function (valid, complexity){
            console.log("Password complexity: " + complexity);

            var $input = $(this),
                $indicator = $('.strength-indicator'),
                $label = $('.strength-indicator .label');

            switch (true) {
                case (complexity <= 49 && complexity > 25):
                    $indicator.prop('class', 'strength-indicator slightly-weak');
                    $indicator.find('.weak, .slightly-weak').addClass('active');
                    $label.text('weak');
                    break;
                case (complexity >= 50 && complexity < 75):
                    $indicator.prop('class', 'strength-indicator average');
                    $indicator.find('.weak, .slightly-weak, .average').addClass('active');
                    $label.text('average');
                    break;
                case (complexity >= 75):
                    $indicator.prop('class', 'strength-indicator strong');
                    $indicator.find('.weak, .slightly-weak, .average, .strong').addClass('active');
                    $label.text('strong');
                    break;
                default:
                    $indicator.prop('class', 'strength-indicator weak');
                    $indicator.find('.weak').addClass('active');
                    $label.text('weak');
            }
        });

    }

};