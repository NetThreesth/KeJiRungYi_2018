import { Roles } from './AppSetting';
import { Scene } from './Scene';
import { CommonUtility } from './CommonUtility';
import { AddLogEvent } from './DevPanel';

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
        this.contents.push({ role: role, type: ContentType.Text, content: text });
        this.eventCenter.trigger(MessageCenter.eventName);

        if (role !== Roles.User) return;
        CommonUtility.asyncPost('apis/uploadText', { rid: Scene.chatRoomIndex, text: text })
            .done((resp: ChatBotResponse) => {
                this.eventCenter.trigger(AddLogEvent, resp);
                this.addText(Roles.Algae, resp.algaeResponse);
                this.addText(Roles.ChatBot, resp.chatbotResponse);
                this.eventCenter.trigger(Event.AfterSubmitMessage, resp.text2cmd);
            });
    };


    addImage(role: Roles, b64String: string) {
        this.contents.push({ role: role, type: ContentType.Image, content: b64String });
        this.eventCenter.trigger(MessageCenter.eventName);

        CommonUtility.asyncPost('apis/uploadImage', { rid: Scene.chatRoomIndex, base64Image: b64String })
            .done((resp: ChatBotResponse) => {
                this.eventCenter.trigger(AddLogEvent, resp);
                this.addText(Roles.ChatBot, resp.chatbotResponse);
                this.addText(Roles.Algae, resp.algaeResponse);
                this.addText(Roles.ChatBot, resp.chatbot2algaeResponse);
                this.addText(Roles.Algae, JSON.stringify(resp));
                this.eventCenter.trigger(Event.AfterSubmitMessage, resp.text2cmd);
            });
    };
};

interface ChatBotResponse extends AlgaeInfo {
    active: string,
    algaeResponse: string,
    chatbot2algaeResponse: string,
    chatbotResponse: string,
    inputMsg: string,
    text2cmd: TextToCmd
};

interface AlgaeInfo {
    roomId: number,
    led: number,
    pump: number
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