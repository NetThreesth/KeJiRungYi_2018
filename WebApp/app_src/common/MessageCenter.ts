import { Roles, GlobalData } from './GlobalData';
import { Scene } from '../Scene';
import { CommonUtility } from './CommonUtility';
import { AddLogEvent } from '../DevPanel';

export enum ContentType {
    Text, Image
};

export interface Content {
    role: Roles;
    type: ContentType;
    content: string;
};

export class MessageCenter {

    static readonly eventName = 'addMessage';

    contents: Content[] = [];
    eventCenter: EventCenter = null;

    constructor(eventCenter: EventCenter) {
        this.eventCenter = eventCenter;
    };


    addText(role: Roles, text: string) {
        this.addMessage({ role: role, type: ContentType.Text, content: text });

        if (role !== Roles.User) return;
        CommonUtility.asyncPost(
            'apis/uploadText',
            { rid: GlobalData.chatRoomIndex, text: text }
        ).done(this.responseHandler.bind(this));
    };


    addImage(role: Roles, b64String: string) {
        this.addMessage({ role: role, type: ContentType.Image, content: b64String });

        CommonUtility.asyncPost(
            'apis/uploadImage',
            { rid: GlobalData.chatRoomIndex, base64Image: b64String }
        ).done(this.responseHandler.bind(this));
    };

    private addMessage(content: Content) {
        this.contents.push(content);
        this.eventCenter.trigger(MessageCenter.eventName);
    };

    private responseHandler(resp: ChatBotResponse) {
        this.eventCenter.trigger(Event.AfterSubmitMessage, resp);
        this.eventCenter.trigger(AddLogEvent, resp);

        this.addText(Roles.ChatBot, resp.chatbotResponse);
        setTimeout(() => this.addText(Roles.Algae, resp.algaeResponse), 1000);
        setTimeout(() => this.addText(Roles.ChatBot, resp.chatbot2algaeResponse), 2000);
    };
};

export interface ChatBotResponse {
    active: string,
    algaeResponse: string,
    chatbot2algaeResponse: string,
    chatbotResponse: string,
    color: number[]
    density: number,
    led: number,
    pump: number
    roomId: number,
    text2cmd: TextToCmd
};


export interface TextToCmd { pumpValue: number, ledValue: number };



export class EventCenter {

    private eventCenter = $({});
    private registeredEventMap = {};

    on<T>(event: string, handler: (data: T) => void) {
        this.registeredEventMap[event] = true;
        console.log(`Event registered: ${event}`);
        this.eventCenter.on(event, (event, data) => handler(data));
    };
    trigger<T>(event: string, data?: T) {
        if (!this.registeredEventMap[event]) {
            console.log(`Event not registered: ${event}`);
            return;
        }
        this.eventCenter.trigger(event, data);
    };
};

export class Event {
    static readonly AfterLogin = 'AfterLogin';
    static readonly UpdateDevPanelData = 'UpdateDevPanelData';
    static readonly AfterWordCardsAnimation = 'AfterWordCardsAnimation';
    static readonly AfterSubmitMessage = 'AfterSubmitMessage';
    static readonly None = 'None';
};