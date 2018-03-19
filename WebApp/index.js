'use strict';
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

        addMessage(text);

        window.setTimeout(function () {
            insertResponse(text + '! ' + text + '! ' + text + '!!!');
        }, 700);
    });

    var insertResponse = function (message) {
        var $dialog = $('.dialog-box');
        $dialog.append(responseTmp.replace('@message', message));
        $dialog.animate({ scrollTop: $dialog.height() }, 1000);
    };

    var addMessage = function (text) {
        var $dialog = $('.dialog-box');
        $dialog.append(userInputTmp.replace('@message', text))
            .animate({ scrollTop: $dialog.height() }, 1000);
    };

    UIkit.offcanvas(document.getElementById('offcanvas-nav')).show();


    $('.js-webrtc').on('click', recordAudio);

    var webRtcRunning = false;
    var audioStream = null;

    function runWebRtc() {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            alert('your divice not support "WebRtc".');
            return;
        };
        webRtcRunning = true;

        var constraints = {
            audio: true,
            video: false
        };

        var handleSuccess = function (stream) {
            audioStream = stream;
            var audioTracks = stream.getAudioTracks();
            console.log('Got stream with constraints:', constraints);
            console.log('Using audio device: ' + audioTracks[0].label);
            stream.oninactive = function () { console.log('Stream ended'); };
            recordAudio();
        };

        var handleError = function (error) {
            console.log('navigator.getUserMedia error: ', error);
        };

        navigator.mediaDevices
            .getUserMedia(constraints)
            .then(handleSuccess)
            .catch(handleError);
    };

    var audioRecording = false;
    function recordAudio() {
        if (!webRtcRunning) { runWebRtc(); }
        if (!audioStream || audioRecording) return;

        audioRecording = true;
        addMessage('audio recording.');
        var audioChunks = [];
        var mediaRecorder = new MediaRecorder(audioStream);
        mediaRecorder.addEventListener("dataavailable", function (event) {
            audioChunks.push(event.data);
        });
        mediaRecorder.addEventListener("stop", function () {
            var audioBlob = new Blob(audioChunks);
            var audioUrl = URL.createObjectURL(audioBlob);
            var audio = new Audio(audioUrl);
            audio.play();
            addMessage('audio playing.');
        });

        mediaRecorder.start();
        $('.js-webrtc').prop('disabled', true);
        setTimeout(function () {
            mediaRecorder.stop();
            audioRecording = false;
            addMessage('audio recording end.');
            $('.js-webrtc').prop('disabled', false);
        }, 3000);
    };

    $('#js-upload').on('change', handleFiles);

    function handleFiles($ele) {
        var image = $ele.currentTarget.files[0];
        if (!image) return;

        var $imgContainer = $(userInputTmp.replace('@message', '<img>'));
        var img = $imgContainer.find('img').get(0);
        img.src = window.URL.createObjectURL(image);
        img.width = 260;
        img.onload = function () {
            window.URL.revokeObjectURL(img.src);
        };
        var $dialog = $('.dialog-box');
        $dialog.append($imgContainer).animate({ scrollTop: $dialog.height() }, 1000);


        $.get('/uploadImage').done(function (resp) {
            console.log(resp);
            var $dialog = $('.dialog-box');
            var messages = resp.map(function (data) {
                return '<li>' + data.description + ': ' + data.score + '</li>'
            });
            var $html = $(userInputTmp.replace('@message', '<ul>' + messages.join('') + '</ul>'));
            $dialog.append($html).animate({ scrollTop: $dialog.height() }, 1000);
        }).fail(function () {
            console.log("error");
        });
    };
}();
