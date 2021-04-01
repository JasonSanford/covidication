The `counties.ts` file contains an array of county's names and [fips code](https://github.com/kjhealy/fips-codes/blob/master/county_fips_master.csv). You should change these to the counties you are interested in.

You'll need to have some environment variables set for Pushover.

```bash
cp .env-sample .env
```

Make changes to `.env`

To get county counts and get notifications run with:

```bash
deno run --allow-net --allow-read --allow-env index.ts
```

If you plan to use GitHub actions to check counts and send notifications you'll need to set valid `PUSHOVER_TOKEN` and `PUSHOVER_USER` tokens set in your repository secrets for your fork of this repo.
