import { socketClient } from './SocketClient';
import { Roles, GlobalData } from './GlobalData';
import { CommonUtility } from './CommonUtility';
import { AddLogEvent } from '../components/DevPanel';

export enum ContentType { Text, Image, Algae };

export interface Content {
    role: Roles;
    to?: Roles;
    type: ContentType;
    content?: string;
    algaeCount?: number;
};

export class MessageCenter {

    static readonly eventName = 'addMessage';

    contents: Content[] = [];

    constructor(
        private eventCenter: EventCenter
    ) {
        socketClient.on('uploadAlgaeImage', data => {
            this.eventCenter.trigger(AddLogEvent, data);
            if (GlobalData.chatRoomIndex === Number(data.chatroomId)) {
                const base64image = data.base64image.replace(/b'/g, '').replace(/'/g, '');
                this.addMessage({ role: Roles.Algae, type: ContentType.Image, content: `data:image/png;base64,${base64image}` });
            }
        });
        socketClient.on('uploadDeepAlMessage', data => {
            this.eventCenter.trigger(AddLogEvent, data);
            if (GlobalData.chatRoomIndex === data.rid)
                this.addMessage({ role: Roles.ChatBot, type: ContentType.Text, content: data.message });
        });
    };


    addText(role: Roles, text: string) {
        this.addMessage({ role: role, type: ContentType.Text, content: text });

        if (role !== Roles.User) return;
        CommonUtility.asyncPost(
            'apis/uploadText',
            {
                userName: GlobalData.userName,
                rid: GlobalData.chatRoomIndex,
                text: text
            }
        ).done(this.responseHandler.bind(this));
    };


    addImage(role: Roles, base64Image: string) {
        this.addMessage({ role: role, type: ContentType.Image, content: base64Image });
        CommonUtility.asyncPost(
            'apis/uploadImage',
            {
                userName: GlobalData.userName,
                rid: GlobalData.chatRoomIndex,
                base64Image: base64Image
            }
        ).done(this.responseHandler.bind(this));
    };

    private addMessage(content: Content, delay: number = 0) {
        setTimeout(() => {
            this.contents.push(content);
            this.eventCenter.trigger(MessageCenter.eventName);
        }, delay)
    };

    private responseHandler(resp: ChatBotResponse) {
        this.eventCenter.trigger(AddLogEvent, resp);
        this.eventCenter.trigger(Event.AfterSubmitMessage, resp);

        this.addMessage(
            { role: Roles.ChatBot, to: Roles.User, type: ContentType.Text, content: resp.chatbotResponse });

        if (resp.density) {
            this.addMessage(
                { role: Roles.Algae, type: ContentType.Algae, algaeCount: resp.density / 10 }
                , 3000);
        }
        if (resp.algaeResponse) {
            this.addMessage(
                { role: Roles.Algae, type: ContentType.Text, content: resp.algaeResponse }
                , 6000);
        }
        if (resp.chatbot2algaeResponse) {
            this.addMessage(
                { role: Roles.ChatBot, to: Roles.Algae, type: ContentType.Text, content: resp.chatbot2algaeResponse }
                , 7000);
        }
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