const sanitizeRequest = require('../src/injectionPrevention');

describe('Injection Prevention Middleware', () => {
  const requestInfo = { body: { data: '<script>alert("xss")</script>' }, query: {}, params: {} };

  it('sanitizes input', () => {
    const result = sanitizeRequest(requestInfo);
    expect(result.status).toBe(200);
    expect(requestInfo.body.data).toBe('&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;');
  });
});
