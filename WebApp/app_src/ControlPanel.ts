

export class ControlPanel {

    private onTextAdd: (text: string) => void = null;
    private onImageAdd: (image: string) => void = null;



    initPanel(
        onTextAdd: (text: string) => void,
        onImageAdd: (image: string) => void
    ) {

        this.onTextAdd = onTextAdd;
        this.onImageAdd = onImageAdd;
        $('#textInputSwitch').on('click', this.switchTextInput.bind(this));
        $('#sent').on('click', this.handleText.bind(this));
        $('#fileUpload').on('change', this.handleFiles.bind(this));
    };


    private switchTextInput() {
        const $textInput = $('#textInput');
        $textInput.toggleClass('visible').toggleClass('invisible');
    };


    private handleText() {
        var $input = $('#textInput>input');
        var text = String($input.val());
        if (!text) return;

        $input.val('').focus();

        this.onTextAdd(text);

        const $mask = $('.flashMask');
        $mask.addClass('flash');
        setTimeout(() => {
            $mask.removeClass('flash');
        }, 500);

        // mock response
        window.setTimeout(() => {
            this.onTextAdd(text + '! ' + text + '! ' + text + '!!!');
        }, 700);
    };


    private handleFiles($ele) {
        const image: Blob = $ele.currentTarget.files[0];
        if (!image) return;

        var FR = new FileReader();

        FR.addEventListener("load", e => {
            const base64Image: string = e.target['result'];
            this.onImageAdd(base64Image);

            $.ajax({
                url: 'apis/uploadImage',
                type: "post",
                contentType: "application/json",
                data: JSON.stringify({ base64Image: base64Image })
            }).done(resp => {
                console.log(resp);
            }).fail(err => {
                console.log(err);
            });
        });
        FR.readAsDataURL(image);
    };
};