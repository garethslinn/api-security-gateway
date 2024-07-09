# api-security-gateway

A security gateway for APIs with features such as rate limiting, IP whitelisting, and injection prevention. This library helps you secure your APIs by controlling access and preventing common attack vectors.

## Features

- **Rate Limiting**: Control the number of requests a user can make within a specified timeframe.
- **IP Whitelisting/Blacklisting**: Allow or deny requests based on IP addresses.
- **Injection Prevention**: Sanitize inputs to prevent SQL injection, XSS, and other injection attacks.

## Installation

```bash
git clone https://github.com/yourusername/api-security-gateway.git
cd api-security-gateway
npm install
```

### Using with Express

Here's an example of how to use the api-security-gateway library in an Express application:

```javascript
const express = require("express");
const apiSecurityGateway = require("api-security-gateway");

const app = express();
app.use(express.json());

const securityOptions = {
  rateLimit: {
    maxRequests: 100,
    windowMs: 15 * 60 * 1000, // 15 minutes
  },
  ipFilter: {
    whitelist: ["127.0.0.1"],
    blacklist: ["192.168.1.1"],
  },
};

const securityGateway = apiSecurityGateway(securityOptions);

app.use((req, res, next) => {
  const requestInfo = {
    ip: req.ip,
    body: req.body,
    query: req.query,
    params: req.params,
  };

  const result = securityGateway(requestInfo);
  if (result.status === 200) {
    next();
  } else {
    res.status(result.status).json({ message: result.message });
  }
});

app.get("/secure-endpoint", (req, res) => {
  res.send("This is a secure endpoint");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
