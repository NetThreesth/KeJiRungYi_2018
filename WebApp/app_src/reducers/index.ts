import { combineReducers } from 'redux';
import { DevPanelData } from '../models/DevPanelData';
import { ActionType } from '../actions';

const updateDevPanel = (
    state: DevPanelData = {} as DevPanelData,
    action: { type: ActionType, data: DevPanelData }
) => {
    switch (action.type) {
        case ActionType.updateDevPanelData:
            return { ...state, ...action.data };
        default:
            return state;
    };
};


const addLog = (
    state: string[] = [],
    action: { type: ActionType, content: string }
) => {
    switch (action.type) {
        case ActionType.addDevPanelLog:
            return state.push(action.content);
        default:
            return state
    };
};


export const rootReducer = combineReducers({
    devPanelData: updateDevPanel,
    log: addLog
});