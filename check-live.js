const https = require('https');

https.get('https://ngoekprayassfrontend.vercel.app/', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    const match = data.match(/src="\/assets\/(index-[^"]*\.js)"/);
    if (match) {
      https.get('https://ngoekprayassfrontend.vercel.app/assets/' + match[1], (res2) => {
        let jsData = '';
        res2.on('data', (chunk) => jsData += chunk);
        res2.on('end', () => {
          if (jsData.includes('http://localhost:8000')) {
            console.log('LOCALHOST FOUND IN BUNDLE');
          }
          if (jsData.includes('ngoekprayass.vercel.app')) {
            console.log('VERCEL API URL FOUND IN BUNDLE');
          }
        });
      });
    } else {
      console.log("no match");
    }
  });
});
