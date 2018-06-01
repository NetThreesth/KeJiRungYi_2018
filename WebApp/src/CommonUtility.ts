
export class CommonUtility {

    static getRandomBoolean() {
        return Math.random() >= 0.5;
    };


    static getRandomNumberInRange(min: number, max: number, digits: number) {
        const rate = Math.pow(10, digits);
        return CommonUtility.getRandomIntInRange(min * rate, max * rate) / rate;
    };

    static getRandomIntInRange(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min) + min;
    };

    static getRandomInt(digits?: number) {
        const r = CommonUtility.getRandomBoolean() ? 1 : -1;
        return CommonUtility.getRandomNegativeInt(digits) * r;
    };

    static getRandomNegativeInt(digits?: number) {
        return CommonUtility.getRandomNegativeNumber(digits);
    };

    static getRandomNumber(digitsOnInt?: number, digitsOnFloat?: number) {
        const r = CommonUtility.getRandomBoolean() ? 1 : -1;
        return CommonUtility.getRandomNegativeNumber(digitsOnInt, digitsOnFloat) * r;
    };

    static getRandomNegativeNumber(digitsOnInt?: number, digitsOnFloat?: number) {
        digitsOnInt = digitsOnInt || 1;
        digitsOnFloat = digitsOnFloat || 0
        let result = Math.round(Math.random() * Math.pow(10, digitsOnInt + digitsOnFloat));
        if (digitsOnFloat !== 0) result = result / Math.pow(10, digitsOnFloat);
        return result;
    };


    static sort<T>(array: T[], func: (e: T) => number) {
        array.sort((a, b) => {
            return func(a) - func(b);
        });
        return array;
    };
};