
import * as $ from 'jquery';
import { CommonUtility } from './CommonUtility';

export class Panel {

    private addText: (text: string, x: number, y: number, z: number) => void = null;
    private addImage: (image: string, x: number, y: number, z: number) => void = null;



    initPanel(addText: (text: string, x: number, y: number, z: number) => void, addImage: (image: string, x: number, y: number, z: number) => void) {
        this.addText = addText;
        this.addImage = addImage;
        $('#js-sent').on('click', this.handleText.bind(this));
        $('#js-upload').on('change', this.handleFiles.bind(this));
    };


    private handleText() {
        var $input = $('.js-input');
        var text = String($input.val());
        if (!text) return;

        $input.val('').focus();

        this.addText(
            text,
            CommonUtility.getRandomInt() * 2,
            CommonUtility.getRandomInt(),
            -3 + CommonUtility.getRandomNegativeInt()
        );

        const $mask = $('.mask');
        $mask.addClass('flash');
        setTimeout(() => {
            $mask.removeClass('flash');
        }, 500);

        // mock response
        window.setTimeout(() => {
            this.addText(text + '! ' + text + '! ' + text + '!!!',
                CommonUtility.getRandomInt() * 2,
                CommonUtility.getRandomInt(),
                -3 + CommonUtility.getRandomNegativeInt()
            );
        }, 700);
    };


    private handleFiles($ele) {
        const image: Blob = $ele.currentTarget.files[0];
        if (!image) return;

        var FR = new FileReader();

        FR.addEventListener("load", e => {
            const base64Image: string = e.target['result'];
            this.addImage(
                base64Image,
                CommonUtility.getRandomInt() * 2,
                CommonUtility.getRandomInt(), -3 + CommonUtility.getRandomNegativeInt()
            );
        });

        FR.readAsDataURL(image);


        $.get('apis/uploadImage').done(function (resp) {
            console.log(resp);
        }).fail(function (err) {
            console.log(err);
        });
    };
};