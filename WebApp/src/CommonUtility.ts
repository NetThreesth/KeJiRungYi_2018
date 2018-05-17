
export const CommonUtility = new class CommonUtility {
    getRandomInt() {
        const r = this.getRandomNegativeInt() > 4 ? 1 : -1;
        return this.getRandomNegativeInt() * r;
    };

    getRandomIntInRange(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    getRandomNegativeInt() {
        return Math.round(Math.random() * 10);
    };

    distanceVector(v1: { x: number, y: number, z: number }, v2: { x: number, y: number, z: number }) {
        var dx = v1.x - v2.x;
        var dy = v1.y - v2.y;
        var dz = v1.z - v2.z;

        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    }
}();