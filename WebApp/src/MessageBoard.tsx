import * as React from "react";


export class MessageBoard extends React.Component<MessageBoardProps, {}> {

    render() {
        return <h1>Len: {this.props.contents.length}</h1>;
    }
};


export enum ContentType {
    Text, Image
};

export interface Content {
    type: ContentType;
    content: string;
};

interface MessageBoardProps {
    contents: Content[];
};