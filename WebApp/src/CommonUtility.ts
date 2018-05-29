
export const CommonUtility = new class CommonUtility {

    getRandomBoolean() {
        return Math.random() >= 0.5;
    };

    getRandomIntInRange(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min) + min;
    };

    getRandomInt(digits?: number) {
        const r = this.getRandomBoolean() ? 1 : -1;
        return this.getRandomNegativeInt(digits) * r;
    };

    getRandomNegativeInt(digits?: number) {
        return this.getRandomNegativeNumber(digits);
    };

    getRandomNumber(digitsOnInt?: number, digitsOnFloat?: number) {
        const r = this.getRandomBoolean() ? 1 : -1;
        return this.getRandomNegativeNumber(digitsOnInt, digitsOnFloat) * r;
    };

    getRandomNegativeNumber(digitsOnInt?: number, digitsOnFloat?: number) {
        digitsOnInt = digitsOnInt || 1;
        digitsOnFloat = digitsOnFloat || 0
        let result = Math.round(Math.random() * Math.pow(10, digitsOnInt + digitsOnFloat));
        if (digitsOnFloat !== 0) result = result / Math.pow(10, digitsOnFloat);
        return result;
    };

    distanceVector(v1: { x: number, y: number, z: number }, v2: { x: number, y: number, z: number }) {
        var dx = v1.x - v2.x;
        var dy = v1.y - v2.y;
        var dz = v1.z - v2.z;

        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    };

    positionToString(position: BABYLON.Vector3) {
        const positions = ['x', 'y', 'z'].map(k => {
            return position[k].toFixed(2);
        });
        return positions.join(', ');
    };
}();