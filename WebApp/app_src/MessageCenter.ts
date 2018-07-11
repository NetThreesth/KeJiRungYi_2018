import { Roles } from './AppSetting';

export enum ContentType {
    Text, Image
};

export interface Content {
    role: Roles;
    type: ContentType;
    content: string;
};

export class MessageCenter {

    contents: Content[] = [];
    observable = $({});


    addText(role: Roles, text: string) {
        this.contents.push({ role: role, type: ContentType.Text, content: text });
        this.observable.trigger('add');

        if (role !== Roles.User) return;
        $.ajax({
            url: 'apis/uploadText',
            type: "post",
            contentType: "application/json",
            data: JSON.stringify({ text: text })
        }).done(resp => {
            this.addText(Roles.Algae, resp.algaeResponse);
            this.addText(Roles.ChatBot, resp.chatbotResponse);
        });
    };
    addImage(role: Roles, b64String: string) {
        this.contents.push({ role: role, type: ContentType.Image, content: b64String });
        this.observable.trigger('add');

        $.ajax({
            url: 'apis/uploadImage',
            type: "post",
            contentType: "application/json",
            data: JSON.stringify({ base64Image: b64String })
        }).done(resp => {
            this.addText(Roles.ChatBot, JSON.stringify(resp));
        });
    };
};

export class EventCenter {
    private eventCenter = $({});
    on<T>(event: Event, handler: (data: T) => void) {
        this.eventCenter.on(String(event), (event, data) => handler(data));
    };
    trigger<T>(event: Event, data?: T) {
        this.eventCenter.trigger(String(event), data);
    };
};

export enum Event {
    updateDevPanelData,
    afterWordCardsAnimation,
    afterLogin,
}