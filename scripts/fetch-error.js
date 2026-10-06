const https = require('https');
const fs = require('fs');

https.get('https://cdkwb-diskan.vercel.app/api/artikel', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    fs.writeFileSync('error-output.txt', `Status: ${res.statusCode}\n\n${data}`);
    console.log('Done');
  });
}).on('error', (e) => {
  console.error(e);
});
