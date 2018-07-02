import * as React from "react";

import { MessageCenter, Content, ContentType } from './main';


export class MessageBoard
    extends React.Component<{ messageCenter: MessageCenter }, { contents: Content[] }>
{

    constructor(props) {
        super(props);
        const messageCenter = this.props.messageCenter;
        this.state = { contents: messageCenter.contents.slice() };
        this.props.messageCenter.observable.on('add', this.refresh.bind(this));
    };

    render() {
        const contents = this.state.contents;
        const contentElements = contents.map(this.createContent.bind(this));
        return <div className="untouchable">{contentElements}</div>;
    };

    private createContent(content: Content) {
        if (content.type === ContentType.Text)
            return this.createTextMessage(content.content);
        else if (content.type === ContentType.Image)
            return this.createImageMessage(content.content);
    };

    private createTextMessage(text: string) {
        return <div>{text}</div>;
    };

    private createImageMessage(base64string: string) {
        const style = {
            width: '60%',
            maxWidth: '600px'
        };
        return <div><img src={base64string} style={style} /></div>;
        /* 
                const style = {
                    width: "500px",
                    backgroundImage: `url(${base64string})`
                };
                return <div style={style}></div>; */
    };

    private refresh() {
        this.setState({ contents: this.props.messageCenter.contents.slice() });
    };
};