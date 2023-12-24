// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
var http = require('http');

export default function handler(req, res) {
  const { method } = req;

  if (method === "GET") {

    let options = {
      host: 'localhost',
      port: 5000,
      method: 'GET'
    }
    let httpreq = http.request(options, function(response) {
      response.setEncoding('utf8');
      response.on('data', function(chunk) {
        console.log("body: " + chunk);
      });
      response.on('end', function() {
        res.send('ok');
      })

      httpreq.write(data);
      httpreq.end();
    })

    res.status(200).json({ action: 'Contact Python API' });
  }

  if (method === "POST") {
    const { body } = req;
    return res.status(200).json({ action: 'contacted...' });
  }
}
