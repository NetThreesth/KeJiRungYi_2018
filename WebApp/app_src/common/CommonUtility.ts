export class CommonUtility {

    static getRandomBoolean() {
        return Math.random() >= 0.5;
    };


    static getRandomNumberInRange(min: number, max: number, digits: number) {
        const rate = Math.pow(10, digits);
        return CommonUtility.getRandomIntInRange(min * rate, max * rate) / rate;
    };

    static getRandomIntInRange(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
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

    static shuffle<T>(array: T[]) {
        let currentIndex = array.length;
        let temporaryValue;
        let randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    };

    static createArray<T>(length: number) {
        const array = Array.apply(null, { length: length });
        return array as T[];
    };

    static getQueryString = function () {
        const cache: any = {};
        return (field: string, url?: string) => {
            const href = url ? url : window.location.href;
            const key = `${href}-${field}`;
            if (cache.hasOwnProperty(key)) return cache[key];
            console.log(`try get Query String: ${field}`)
            const reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
            const string = reg.exec(href);
            const result = cache[key] = string ? decodeURIComponent(string[1]) : undefined;
            return result;
        };
    }();

    static deepMerge<T>(from: T, to: T, propName?): T {
        if (from instanceof Object && !(from instanceof Date)) {
            if (from instanceof Array)
                to = to || [] as any;
            to = to || {} as any;
            var fromKeys = Object.keys(from);
            if (fromKeys) {
                fromKeys.forEach((prop) => {
                    to[prop] = CommonUtility.deepMerge(from[prop], to[prop], prop);
                });
            }
        } else to = from;
        return to;
    };

    static deepClone<T>(obj: T): T {
        return CommonUtility.deepMerge(obj, {} as T);
    };


    static asyncPost(url: string, data: any) {
        return $.ajax({
            url: url,
            type: "post",
            contentType: "application/json",
            data: JSON.stringify(data)
        });
    };

    static loop(count: number, func: (finishedTimes: number) => void) {
        let finished = 0;
        while (finished < count) {
            func(finished);
            finished++;
        };
    };

    static getCookie(name: string) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length == 2) return parts.pop().split(";").shift();
    };

    /**
     * Set cookie.
     * @param name - Cookie name.
     * @param value - Cookie value.
     * @param days - Expire days.
     */
    static setCookie(name: string, value: string, days: number) {
        let expires = '';
        if (days) {
            const date: any = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = `; expires=${date.toGMTString()}`;
        }
        document.cookie = `${name}=${value}${expires}; path=/`;
    };
};