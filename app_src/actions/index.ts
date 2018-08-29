import { DevPanelData } from '../models/DevPanelData';

export enum ActionType {
    addDevPanelLog, updateDevPanelData
};

export function updateDevPanelData(
    data: DevPanelData
): {
        type: ActionType,
        data: DevPanelData
    } {

    return {
        type: ActionType.updateDevPanelData,
        data: data
    };
};