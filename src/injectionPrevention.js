const sqlEscape = require('./sqlEscape');
const xssFilter = require('./xssFilter');

const sanitizeInput = (input) => {
    if (typeof input === 'string') {
        return xssFilter(sqlEscape(input));
    }
    if (typeof input === 'object') {
        for (const key in input) {
            input[key] = sanitizeInput(input[key]);
        }
    }
    return input;
};

const sanitizeRequest = (requestInfo) => {
    requestInfo.body = sanitizeInput(requestInfo.body);
    requestInfo.query = sanitizeInput(requestInfo.query);
    requestInfo.params = sanitizeInput(requestInfo.params);
    return { status: 200 };
};

module.exports = sanitizeRequest;
