import { CommonUtility } from './common/CommonUtility';
import { BabylonUtility } from './common/BabylonUtility';

self.onmessage = function (message) {
    const textNodes: BABYLON.Vector3[] = message.data
    const lines = BabylonUtility.getLineToEachOther(textNodes);
    let linesToSelect = lines.filter(l => l.distance > 0.2);
    linesToSelect = CommonUtility
        .sort(linesToSelect, l => l.distance)
        .slice(0, 1200);

    const linesToDraw = linesToSelect.map(l => [l.from, l.to]);
    //.shuffle(linesToSelect)
    //.slice(0, 900)

    postMessage(linesToDraw, undefined);
};