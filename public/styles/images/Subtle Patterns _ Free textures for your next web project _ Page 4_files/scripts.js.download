$(function () {

    /*
     *
     */
    if ($('.preview-box').length == 0 && $('#preview-box').length == 0) {
        $('.plugin-wrapper').hide();
    };

    $('.preview').each(function () {
        $(this).bind('click', function (e) {
            var default_background = 'url("/designers/subtlepatterns/wp-content/themes/tweaker7/images/transp_bg.png")';
            var preview_background = $(e.target).closest('.entry-content').find('.patternpreview').css('background-image');

            // Turn on preview
            if ($(this).text() == 'Preview') {
                $('.preview').text('Preview')
                $(this).text('Stop preview')
                $('body').css('background', preview_background)

                // Turn off preview
            } else if ($(this).text() == 'Stop preview') {
                console.log("Disable");
                $(this).text('Preview');
                $('body').css('background', default_background);
            }

            return false;
        });
    });

    /*
     * Popup logic
     */
    var $overlay = $('#overlay');
    var storage = localStorage.getItem('overlay') || false;
    var storage = false;
    var clickedTimes = parseInt(localStorage.getItem('overlayTimes') || 0, 10);
    var overlayHide = localStorage.getItem('overlayHide') || false;
    var timer;
    var formTimeout;
    var href = document.location.href;
    var downloading = false;
    // window.showOverlay = (Math.round(Math.exp(Math.random()*Math.log(100-1+1)))+1) % 4 === 0;
    window.showOverlay = true;


    $(document).on('keydown click', function (ev) {
            if (ev.which === 27 || ev.which === 1) {
                    clearTimeout(timer);
                    $('.overlay').removeClass('show');
            }
    });

    $('.overlay .close-overlay').on('click', function () {
            if (downloading) document.location.href = href;
            $('.overlay').removeClass('show');
    });

    $('.overlay .box').click(function(ev){
        ev.stopPropagation();
    });


    $('.overlay-hide').on('click', function () {
            overlayHide = true;
            localStorage.setItem('overlayHide', true);
            clearTimeout(timer);
            $('.overlay').removeClass('show');
            if (downloading) document.location.href = href;
    });

    /*
     * Submit your pattern form
     */
    function validateFrom() {
        var error = false;
        if ($('#name').val() == '') {
            $('#name').addClass('error');
            $('.error.name').slideDown();
            error = true;
        }
        if ($('#patterntitle').val() == '') {
            $('#patterntitle').addClass('error');
            $('.error.patterntitle').slideDown();
            error = true;
        }

        if ($('#file').val() == '') {
            $('#file').addClass('error');
            $('.error.file').html('You have to choose a file');
            $('.error.file').slideDown();
            error = true;
        }
        return error;
    }
    $('#submit-pattern-form').on('submit', function(e){

        var error = validateFrom();

        if (error) {
            e.preventDefault();
            return false;
        }

        return true;
    });

    $('#submit-pattern-form input[type=text], #submit-pattern-form input[type=file]').on('click keyup change', function(e){
        if (e.keyCode == 13) {
            // Do nothing
            return;
        }
        $(this).removeClass('error');
        $(this).parent().find('div.error').slideUp();

        if ($('#name').val() != '' &&
            $('#patterntitle').val() != '' &&
            $('#file').val() != '') {
            $('#submit-pattern-form .submit input').removeClass('disabled');
        } else {
            $('#submit-pattern-form .submit input').addClass('disabled');
        }

    });
    $('#submit-pattern-form input.submit').on('click', function(e){
        var error = validateFrom();
    });

});
