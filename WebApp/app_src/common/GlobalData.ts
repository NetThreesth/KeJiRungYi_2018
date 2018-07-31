import { CommonUtility } from './CommonUtility';

export class GlobalData {
    static userName: string = null;
    static signInTime: Date = null;
    static chatRoomIndex: number = Number(CommonUtility.getQueryString('chatRoomIndex'));;
};

export enum Roles {
    User,
    ChatBot,
    Algae,
    AI,
};