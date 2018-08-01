import * as React from "react";
import { EventCenter } from './MessageCenter';
import { AddLogEvent } from '../DevPanel';

export class Scrollbar
    extends React.Component<{ syncTarget: string, eventCenter: EventCenter }>{

    static readonly ScrollEvent = 'scroll';
    static readonly UpdateEvent = 'update';

    private $syncTarget: JQuery<HTMLElement> = null;

    render() {
        return <div className="scrollbarContainer"><div className="scrollbar" /></div>;
    };

    componentDidMount() {
        this.$syncTarget = $(this.props.syncTarget);
        this.initScrollbar();
    };


    private initScrollbar() {
        const eventCenter = this.props.eventCenter;

        let isDragging = false;
        const origin = { pageY: 0, scrollbarOffset: 0 };
        const $scrollbarContainer = $('.scrollbarContainer');
        const $scrollbar = $scrollbarContainer.find('.scrollbar');
        $(document)
            .on('mousedown touchstart', '.scrollbarContainer', e => {
                e.preventDefault();
                const pageY = (e.type === 'touchstart') ? (e.originalEvent as TouchEvent).touches[0].pageY : e.pageY;
                eventCenter.trigger(AddLogEvent, `${e.type}: pageY- ${pageY}`);
                isDragging = true;
                origin.pageY = pageY;

                const scrollbarOffset = Number($scrollbar.css('top').replace('px', ''));
                origin.scrollbarOffset = scrollbarOffset;
            })
            .on('mousemove touchmove', '.scrollbarContainer', e => {
                e.preventDefault();
                if (!isDragging) return;
                const offsetY = ((e.type === 'touchmove') ? (e.originalEvent as TouchEvent).touches[0].pageY : e.pageY) - origin.pageY;
                eventCenter.trigger(AddLogEvent, `${e.type}: offsetY- ${offsetY}`);
                const maxOffset = $scrollbarContainer.height() - $scrollbar.height();
                let scrollbarOffset = origin.scrollbarOffset + offsetY;
                if (scrollbarOffset > maxOffset) scrollbarOffset = maxOffset;
                else if (scrollbarOffset < 0) scrollbarOffset = 0;
                $scrollbar.css('top', scrollbarOffset);

                eventCenter.trigger(Scrollbar.ScrollEvent, scrollbarOffset / maxOffset);
            }).on('mouseup touchend', e => {
                if (!isDragging) return;
                isDragging = false;
                eventCenter.trigger(AddLogEvent, `${e.type}`);
            });

        eventCenter.on(Scrollbar.UpdateEvent, () => {
            this.adjustScrollbarH();
            this.adjustScrollbarOffset();
        });
    };

    private adjustScrollbarH() {
        const $scrollTarget = this.$syncTarget;
        const targetTotalH = $scrollTarget.prop('scrollHeight');
        const targetViewH = $scrollTarget.height();

        const $scrollbarContainer = $('.scrollbarContainer');
        const scrollbarContainerH = $scrollbarContainer.height();

        const scrollbarH = scrollbarContainerH * (targetViewH / targetTotalH);
        $scrollbarContainer.find('.scrollbar').height(scrollbarH);
    };

    private adjustScrollbarOffset() {
        const $scrollTarget = this.$syncTarget;
        const targetTotalH = $scrollTarget.prop('scrollHeight');
        const targetScrollTop = $scrollTarget.scrollTop();

        const $scrollbarContainer = $('.scrollbarContainer');
        const scrollbarContainerH = $scrollbarContainer.height();
        const offset = scrollbarContainerH * targetScrollTop / targetTotalH;
        $scrollbarContainer.find('.scrollbar').css('top', offset);
    };
};