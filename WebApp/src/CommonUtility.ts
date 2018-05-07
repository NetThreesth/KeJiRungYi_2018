
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
}();