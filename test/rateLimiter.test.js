const rateLimit = require('../src/rateLimiter');

describe('Rate Limiting Middleware', () => {
    const requestInfo = { ip: '127.0.0.1' };

    it('allows requests within limit', () => {
        const rateLimiter = rateLimit(2, 1000);
        expect(rateLimiter(requestInfo).status).toBe(200);
        expect(rateLimiter(requestInfo).status).toBe(200);
    });

    it('blocks requests exceeding limit', () => {
        const rateLimiter = rateLimit(2, 1000);
        rateLimiter(requestInfo);
        rateLimiter(requestInfo);
        expect(rateLimiter(requestInfo).status).toBe(429);
    });
});
