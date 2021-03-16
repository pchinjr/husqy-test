const fetch = require('node-fetch');

exports.handler = async function http(req) {

  let url = `https://api.amc.husqvarna.dev/v1/mowers/${process.env.MOWER_ID}`

  let options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.AUTH_BEARER_TOKEN}`,
      'X-Api-Key': `${process.env.API_KEY}`,
      'Authorization-Provider': 'husqvarna'
    }
  }

  let data

  await fetch(url, options)
    .then(res => res.json())
    .then(json => response(json))
    .catch(err => console.error('error:' + err));

  async function response(json) {
    console.log(json.data)
    data = json.data
  }

  return {
    headers: {
      'content-type': 'text/html; charset=utf8',
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
    },
    statusCode: 200,
    body: JSON.stringify(data)
  }
}