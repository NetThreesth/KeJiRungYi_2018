!function () {

    var floatRight = '<div class="uk-flex uk-flex-right">@content</div>';
    var userInputTmp = floatRight.replace('@content', '<div class="uk-card uk-card-default uk-card-small uk-card-body uk-margin-small uk-margin-small-right uk-width-2-5@s">@message</div>');

    var image = '<img class="uk-border-rounded" src="https://getuikit.com/v2/docs/images/placeholder_200x200.svg" width="30" height="30">';
    var responseTmp = '<div class="uk-card uk-card-default uk-card-small uk-card-body uk-margin-small uk-margin-small-left uk-width-2-5@s">@image   @message</div>'.replace('@image', image);


    $('.js-sent').on('click', function () {
        var $input = $('.js-input');
        var text = $input.val();
        if (!text) return;

        $input.val('').focus();

        var $dialog = $('.dialog-box');
        $dialog.append(userInputTmp.replace('@message', text))
            .animate({ scrollTop: $dialog.height() }, 1000);

        window.setTimeout(function () {
            insertResponse(text + '! ' + text + '! ' + text + '!!!');
        }, 700);
    });

    var insertResponse = function (message) {
        var $dialog = $('.dialog-box');
        $dialog.append(responseTmp.replace('@message', message));
        $dialog.animate({ scrollTop: $dialog.height() }, 1000);
    };

    UIkit.offcanvas(document.getElementById('offcanvas-nav')).show();
}();
