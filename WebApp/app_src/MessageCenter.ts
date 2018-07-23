import { Roles } from './AppSetting';
import { Scene } from './Scene';

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
    observable: EventCenter = null;

    constructor(eventCenter: EventCenter) {
        this.observable = eventCenter;
    };


    addText(role: Roles, text: string) {
        this.contents.push({ role: role, type: ContentType.Text, content: text });
        this.observable.trigger(MessageCenter.eventName);

        if (role !== Roles.User) return;
        $.ajax({
            url: 'apis/uploadText',
            type: "post",
            contentType: "application/json",
            data: JSON.stringify({ text: text, rid: Scene.chatRoomIndex })
        }).done(resp => {
            this.addText(Roles.Algae, resp.algaeResponse);
            this.addText(Roles.ChatBot, resp.chatbotResponse);
            this.observable.trigger(Event.AfterSubmitMessage);
        });
    };


    addImage(role: Roles, b64String: string) {
        this.contents.push({ role: role, type: ContentType.Image, content: b64String });
        this.observable.trigger(MessageCenter.eventName);

        $.ajax({
            url: 'apis/uploadImage',
            type: "post",
            contentType: "application/json",
            data: JSON.stringify({ base64Image: b64String, rid: Scene.chatRoomIndex })
        }).done(resp => {
            this.addText(Roles.ChatBot, JSON.stringify(resp));
        });
    };
};

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