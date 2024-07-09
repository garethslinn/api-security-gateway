const rateLimit = (maxRequests, windowMs) => {
    const requestCounts = new Map();

    return (requestInfo) => {
        const user = requestInfo.ip;

        if (!requestCounts.has(user)) {
            requestCounts.set(user, { count: 1, startTime: Date.now() });
        } else {
            const userData = requestCounts.get(user);
            if (Date.now() - userData.startTime < windowMs) {
                if (userData.count >= maxRequests) {
                    return { status: 429, message: 'Too many requests' };
                }
                userData.count += 1;
            } else {
                userData.count = 1;
                userData.startTime = Date.now();
            }
        }
        return { status: 200 };
    };
};

module.exports = rateLimit;
