
module.exports = {
    deserializeSafely: (data) => {
        const util = require("util")
        return util.inspect(data, { depth: null });
    }

}; 