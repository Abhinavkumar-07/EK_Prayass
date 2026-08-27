const https = require('https');

const options = {
  hostname: 'ngoekprayass.vercel.app',
  port: 443,
  path: '/api/admin/attendance',
  method: 'OPTIONS',
  headers: {
    'Origin': 'https://ngoekprayassfrontend.vercel.app',
    'Access-Control-Request-Method': 'GET'
  }
};

const req = https.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers, null, 2)}`);
});

req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

req.end();
