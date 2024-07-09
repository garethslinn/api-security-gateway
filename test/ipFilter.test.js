const ipFilter = require('../src/ipFilter');

describe('IP Filter Middleware', () => {
    const requestInfoAllowed = { ip: '127.0.0.1' };
    const requestInfoBlocked = { ip: '192.168.1.1' };

    it('allows whitelisted IP', () => {
        const filter = ipFilter(['127.0.0.1'], []);
        expect(filter(requestInfoAllowed).status).toBe(200);
    });

    it('blocks blacklisted IP', () => {
        const filter = ipFilter([], ['192.168.1.1']);
        expect(filter(requestInfoBlocked).status).toBe(403);
    });
});
