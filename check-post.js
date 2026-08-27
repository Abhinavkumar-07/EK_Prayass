const https = require('https');

const data = JSON.stringify({
  username: 'abhinav',
  password: 'password'
});

const options = {
  hostname: 'ngoekprayass.vercel.app',
  port: 443,
  path: '/api/clubmember/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = https.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  let responseData = '';
  res.on('data', (d) => {
    responseData += d;
  });
  res.on('end', () => {
    console.log('RESPONSE:', responseData);
  });
});

req.on('error', (error) => {
  console.error(error);
});

req.write(data);
req.end();
