const ipFilter = (whitelist = [], blacklist = []) => {
    return (requestInfo) => {
        const userIp = requestInfo.ip;

        if (whitelist.length && !whitelist.includes(userIp)) {
            return { status: 403, message: 'IP not allowed' };
        }

        if (blacklist.length && blacklist.includes(userIp)) {
            return { status: 403, message: 'IP blocked' };
        }

        return { status: 200 };
    };
};

module.exports = ipFilter;
