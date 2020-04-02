You'll need to have some environment variables set for Pushover.

```bash
cp .env-sample .env
```

Make changes to `.env`

```bash
source .env
```

If deploying to heroku you'll need these same environment variables set.

```bash
heroku config:set PUSHOVER_TOKEN=abc123
heroku config:set PUSHOVER_USER=def456
```

To get county counts and get notifications run with:

```bash
node index.js
```
