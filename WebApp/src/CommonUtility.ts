
export const CommonUtility = new class CommonUtility {
    getRandomInt() {
        const r = this.getRandomNegativeInt() > 4 ? 1 : -1;
        return this.getRandomNegativeInt() * r;
    };

    getRandomNegativeInt() {
        return Math.round(Math.random() * 10);
    };
}();