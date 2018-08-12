import { DevPanelData } from '../models/DevPanelData';

export enum ActionType {
    addDevPanelLog = 'addDevPanelLog',
    updateDevPanelData = 'updateDevPanelData',
    sceneEvent = 'sceneEvent'
};

export enum SceneEventName {
    none = 'none',
    afterWordCardsAnimation = 'afterWordCardsAnimation',
    afterLogin = 'afterLogin',
    afterSubmitMessage = 'afterSubmitMessage'
};


export interface AddLogAction {
    type: ActionType.addDevPanelLog,
    content: string
};
export function addLogAction(content: string): AddLogAction {
    return {
        type: ActionType.addDevPanelLog,
        content
    };
};


export interface UpdateDevPanelAction {
    type: ActionType.updateDevPanelData,
    data: DevPanelData
};
export function updateDevPanelAction(
    data: DevPanelData
): UpdateDevPanelAction {
    return {
        type: ActionType.updateDevPanelData,
        data
    };
};


export interface SceneEventAction {
    type: ActionType.sceneEvent,
    sceneEventName: SceneEventName,
    data?: any
};
export function sceneEventAction(
    sceneEventName: SceneEventName, data?: any
): SceneEventAction {
    return {
        type: ActionType.sceneEvent,
        sceneEventName,
        data
    };
};