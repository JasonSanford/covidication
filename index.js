const fetch = require('node-fetch');
const { URLSearchParams } = require('url');

const url = 'https://services1.arcgis.com/0MSEUqKaxRlEPj5g/ArcGIS/rest/services/ncov_cases_US/FeatureServer/0/query?where=FIPS%3D37097&outFields=*&f=geojson&token=';

async function main() {
  const response = await fetch(url);
  const json = await response.json();

  const { Confirmed: confirmed, Deaths: deaths } = json.features[0].properties;
  const message = `${confirmed} cases, ${deaths} deaths.`;
  const outcome = await sendPushoverMessage(message);
  console.log(outcome);
}

async function sendPushoverMessage(message) {
  const title = 'Iredell County Coronavirus Update'
  const url = 'https://api.pushover.net/1/messages.json';
  const {PUSHOVER_TOKEN: token, PUSHOVER_USER: user } = process.env;
  const params = { token, user, title, message};
  const urlSearchParams = new URLSearchParams(params);

  const response = await fetch(url, { method: 'POST', body: urlSearchParams });
  const json = await response.json();

  return json;
}

main();
