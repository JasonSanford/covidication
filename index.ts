import { config } from "https://deno.land/x/dotenv/mod.ts";

import counties, { County } from './counties.ts';

const { PUSHOVER_TOKEN, PUSHOVER_USER } = config();

async function main() {
  const tasks: Array<Promise<County>> = counties.map((county) => {
    return new Promise(async (resolve, reject) => {
      const { fips } = county;
      const params = {
        where: `FIPS=${fips}`,
        outFields: '*',
        f: 'geojson',
      };
      const url = `https://services1.arcgis.com/0MSEUqKaxRlEPj5g/ArcGIS/rest/services/ncov_cases_US/FeatureServer/0/query?${(new URLSearchParams(params)).toString()}`;

      try {
        const response = await fetch(url);
        const json = await response.json();
        const { Confirmed: cases, Deaths: deaths } = json.features[0].properties;

        county.cases = cases;
        county.deaths = deaths;

        resolve(county);
      } catch (error) {
        reject(error);
      }
    });
  });

  try {
    const results = await Promise.all(tasks);
    const message = results
      .map(({ name, cases, deaths }) => `${name} - Cases: ${cases}, Deaths: ${deaths}`)
      .join('\n');

    console.log('---------- Pushover Message -----------')
    console.log(message);

    const result = await sendPushoverMessage(message);

    console.log('---------- Pushover Result -----------')
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

async function sendPushoverMessage(message: string) {
  const title = 'County Coronavirus Update';
  const sound = 'classical';
  const url = 'https://api.pushover.net/1/messages.json';
  const params = { token: PUSHOVER_TOKEN, user: PUSHOVER_USER, title, message, sound };
  const body = new URLSearchParams(params);
  const fetchOptions = { method: 'POST', body };

  const response = await fetch(url, fetchOptions);
  const json = await response.json();

  return json;
}

main();
