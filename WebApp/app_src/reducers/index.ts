import { combineReducers } from 'redux';
import { DevPanelData } from '../models/DevPanelData';
import * as actions from '../actions';

const updateDevPanel = (
    state: DevPanelData = {} as DevPanelData,
    action: actions.UpdateDevPanelAction
): DevPanelData => {
    switch (action.type) {
        case actions.ActionType.updateDevPanelData:
            return { ...state, ...action.data };
        default:
            return state;
    };
};


const addLog = (
    state: string[] = [],
    action: actions.AddLogAction
): string[] => {
    switch (action.type) {
        case actions.ActionType.addDevPanelLog:
            state.push(action.content);
    };
    return state;
};


const triggerSceneEvent = (
    state: actions.SceneEventAction = {
        type: actions.ActionType.sceneEvent,
        sceneEventName: actions.SceneEventName.none,
    },
    action: actions.SceneEventAction
): actions.SceneEventAction => {
    switch (action.type) {
        case actions.ActionType.sceneEvent:
            return action;
    };
    return state;
};


export const rootReducer = combineReducers<State>({
    devPanelData: updateDevPanel,
    log: addLog,
    sceneEvent: triggerSceneEvent
});


export interface State {
    devPanelData: DevPanelData,
    log: string[],
    sceneEvent
};