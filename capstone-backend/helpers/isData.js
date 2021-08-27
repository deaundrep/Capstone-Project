const moment = require("moment");

const isDate = (value, { req, location, path }) => {
    if (!value) {
        return false;
    }
    const fetch = moment(value);
    if (fetch.isValid()) {
        return true;
    } else {
        return false;
    }
};
module.exports = {
    isDate,
};