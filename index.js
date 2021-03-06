const fetch = require('node-fetch');
const counties = require('./counties');
const { URLSearchParams } = require('url');

async function main() {
  const tasks = counties.map(county => {
    return new Promise(async (resolve, reject) => {
      const { fips } = county;
      const url = `https://services1.arcgis.com/0MSEUqKaxRlEPj5g/ArcGIS/rest/services/ncov_cases_US/FeatureServer/0/query?where=FIPS%3D${fips}&outFields=*&f=geojson&token=`;
      const response = await fetch(url);
      const json = await response.json();
      const { Confirmed: cases, Deaths: deaths } = json.features[0].properties;

      county.cases = cases;
      county.deaths = deaths;

      resolve(county);
    });
  });

  const results = await Promise.all(tasks);

  const message = results
    .map(({ name, cases, deaths }) => `${name} - Cases: ${cases}, Deaths: ${deaths}`)
    .join('\n');

  console.log('---------- Pushover Message -----------')
  console.log(message);

  const result = await sendPushoverMessage(message);

  console.log('---------- Pushover Result -----------')
  console.log(result);
}

async function sendPushoverMessage(message) {
  const title = 'County Coronavirus Update';
  const sound = 'classical';
  const url = 'https://api.pushover.net/1/messages.json';
  const { PUSHOVER_TOKEN: token, PUSHOVER_USER: user } = process.env;
  const params = { token, user, title, message, sound };
  const body = new URLSearchParams(params);
  const fetchOptions = { method: 'POST', body };

  const response = await fetch(url, fetchOptions);
  const json = await response.json();

  return json;
}

main();
