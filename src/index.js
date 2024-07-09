const rateLimiter = require('./rateLimiter');
const ipFilter = require('./ipFilter');
const injectionPrevention = require('./injectionPrevention');

const createSecurityGateway = (options) => {
    const rateLimit = rateLimiter(options.rateLimit.maxRequests, options.rateLimit.windowMs);
    const ipFiltering = ipFilter(options.ipFilter.whitelist, options.ipFilter.blacklist);
    const sanitizeInput = injectionPrevention;

    return (requestInfo) => {
        let result;

        result = rateLimit(requestInfo);
        if (result.status !== 200) return result;

        result = ipFiltering(requestInfo);
        if (result.status !== 200) return result;

        result = sanitizeInput(requestInfo);
        return result;
    };
};

module.exports = createSecurityGateway;
