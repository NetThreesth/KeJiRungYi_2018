import { CommonUtility } from './CommonUtility';
import { BabylonUtility, Line } from './BabylonUtility';

self.onmessage = function (message) {
    const textNodes = message.data
    const lines = BabylonUtility.getLineToEachOther(textNodes);
    const linesToSelect = CommonUtility
        .sort(lines, l => l.distance)
        .filter(l => l.distance > 0.2)
        .slice(0, 1200);

    const linesToDraw = linesToSelect.map(l => [l.from, l.to]);
    //.shuffle(linesToSelect)
    //.slice(0, 900)

    postMessage(linesToDraw, undefined);
};