# Draft Compass

A static Dota 2 counterpick assistant for GitHub Pages. Choose your role, add enemy heroes, and inspect recommendations based only on manually researched counter relationships.

## Features

- Instant ranking for one to five selected enemies.
- Role pools, source selection, per-matchup evidence and original research links.
- Optional worst-case mode: three hypothetical remaining counters with two enemies picked, or one with four picked.
- Handwritten dotacounterpick research and DotaFuel's explicitly hand-picked sections. No win rates, match statistics, statistical matchup tables, or Draft Helper data.
- Saved browser preferences, keyboard hero search and responsive layout.

## Hosting and cost

This version contains only static HTML, CSS, JavaScript and JSON. It does not provision a database, Cloudflare Worker, R2 bucket, paid runner, subscription or custom domain. The workflow uses standard GitHub-hosted Ubuntu runners for a public repository and deploys to the included github.io address. Free plans remain subject to GitHub's current limits and policies; availability forever is not guaranteed.

## Data updates

The Pages workflow runs on pushes, manual workflow dispatches, and approximately every six hours. Scheduled and manually dispatched runs fetch both source websites, validate the manual counter datasets, save them in this repository, and publish the site in the same workflow. Source-specific failures preserve that source's previous valid dataset and display its refresh error. No access token is placed in the website.

**Check now loads the latest already-published datasets. It does not start a source scrape.** Repository owners can use Actions → Refresh research and publish Pages → Run workflow to request an immediate source update. GitHub may delay scheduled jobs or disable inactive scheduled workflows; inspect Actions and the in-app source timestamps if data seems stale. A changed check timestamp is not itself evidence that counter relationships changed.

## GitHub Pages setup

In this repository, open Settings → Pages → Build and deployment → Source and choose **GitHub Actions**. The included `.github/workflows/pages.yml` builds and deploys `public/` through `_site/`. The workflow publishes after a successful test run. Keep this repository public to use GitHub Free Pages and free public-repository standard runners. Do not enable paid runners or paid services.

## Local development

Requires Node.js 24 or later. No npm dependencies need installing.

```sh
npm start
```

Open http://127.0.0.1:3000. Run `npm test` for meaningful ranking, UI state and refresh safety tests. `npm run build` creates `_site/`. `npm run update:data` fetches fresh research; it needs curl and internet access.

## Scoring

For each directed counter pair: Best = 4, Strong = 3, Good = 2, Mediocre or untiered = 1. In-game points count fully and lane points count half. Add favorable points and subtract unfavorable points across selected enemies. Duplicate entries for the same directed pair and phase use the strongest tier once; references from both selected sources are retained without a consensus bonus. DotaFuel picks are untiered general in-game counters; their display order and statistical values do not affect scoring. Unknown relationships score zero, not a proven even matchup. Ties use favorable coverage, fewer adverse matchups and hero name.

Worst-case mode independently evaluates the remaining unpicked heroes for each candidate, excluding that candidate and already selected enemies. It adds the three most negative remaining net matchups with two selected enemies, or one with four selected. Each hypothetical enemy is distinct; ties at the cutoff are alphabetical and alternatives are shown separately. Fewer documented negative matchups means the empty hypothetical slots add zero. Unchecking restores baseline ranking.

## Sources and attribution

- https://dotacounterpick.com/browse — manual lane/game counters and displayed role labels.
- https://dotafuel.com/heroes — only the labeled **Our counter picks** section on hero counter pages.

The parsers store factual hero relationships, tiers and linked ability names, rather than copying original explanatory prose. Read the linked source for complete explanations and conditional interactions. Dota 2 and hero artwork belong to Valve. This is an unofficial fan tool, unaffiliated with Valve or either research source. Third-party material remains subject to its owners' rights.
