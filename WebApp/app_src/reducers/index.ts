import { combineReducers } from 'redux';
import { DevPanelData } from '../components/DevPanel';


export enum ActionTypes {
    ADD_LOG, UPDATE_DATA
};

const updateDevPanel = (
    state: DevPanelData = {} as DevPanelData,
    action: { type: ActionTypes, data: DevPanelData }
) => {
    switch (action.type) {
        case ActionTypes.UPDATE_DATA:
            return { ...state, ...action.data };
        default:
            return state;
    };
};


const addLog = (
    state: string[] = [],
    action: { type: ActionTypes, content: string }
) => {
    switch (action.type) {
        case ActionTypes.ADD_LOG:
            return state.push(action.content);
        default:
            return state
    };
};


export const rootReducer = combineReducers({
    devPanelData: updateDevPanel,
    log: addLog
});