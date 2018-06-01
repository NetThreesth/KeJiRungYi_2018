
export class BabylonUtility {


    static distanceVector(v1: BABYLON.Vector3, v2: BABYLON.Vector3) {
        var dx = v1.x - v2.x;
        var dy = v1.y - v2.y;
        var dz = v1.z - v2.z;

        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    };


    static positionToString(position: BABYLON.Vector3) {
        const positions = ['x', 'y', 'z'].map(k => {
            return position[k].toFixed(2);
        });
        return positions.join(', ');
    };


    static getLineToEachOther(points: BABYLON.Vector3[]) {

        const lines: Line[] = [];
        points.forEach((from, iOfFrom) => {
            points.forEach((to, iOfTo) => {
                if (iOfFrom < iOfTo) {
                    const distance = BabylonUtility.distanceVector(from, to);
                    const key = `${iOfFrom}-${iOfTo}`;
                    lines.push({
                        key: key,
                        from: from,
                        to: to,
                        distance: distance
                    });
                }
            });
        });
        return lines;
    };
};


export interface Line {
    key: string,
    from: BABYLON.Vector3,
    to: BABYLON.Vector3,
    distance: number
};