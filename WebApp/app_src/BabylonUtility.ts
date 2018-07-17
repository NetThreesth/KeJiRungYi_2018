import { CommonUtility } from './CommonUtility';

export class BabylonUtility {


    static distance(v1: BABYLON.Vector3, v2: BABYLON.Vector3) {
        var dx = v1.x - v2.x;
        var dy = v1.y - v2.y;
        var dz = v1.z - v2.z;

        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    };

    static addVector(v1: BABYLON.Vector3, v2: BABYLON.Vector3) {
        return new BABYLON.Vector3(
            v1.x + v2.x,
            v1.y + v2.y,
            v1.z + v2.z
        );
    };

    static subtractVector(v1: BABYLON.Vector3, v2: BABYLON.Vector3) {
        return new BABYLON.Vector3(
            v1.x - v2.x,
            v1.y - v2.y,
            v1.z - v2.z
        );
    };
    
    static getRandomVector3(randomOnX = true, randomOnY = true, randomOnZ = true) {
        return new BABYLON.Vector3(
            randomOnX ? CommonUtility.getRandomInt() : 0,
            randomOnY ? CommonUtility.getRandomInt() : 0,
            randomOnZ ? CommonUtility.getRandomInt() : 0
        ).normalize();
    };


    static updatePosition(position: BABYLON.Vector3, translateVector: BABYLON.Vector3, scale: number) {
        position.x += (translateVector.x * scale);
        position.y += (translateVector.y * scale);
        position.z += (translateVector.z * scale);
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
                    const distance = BabylonUtility.distance(from, to);
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