# Racing Calendar

A single, mobile- and desktop-friendly calendar for motor racing events across:

- **Formula 1** — full 2026 season
- **MotoGP** — full 2026 season
- **Bathurst 12 Hour**
- **GT World Challenge Europe** (Endurance Cup)
- **IMSA WeatherTech SportsCar Championship**
- **Supercars Championship** — Repco Bathurst 1000

## Features

- List view (grouped by month) and full month calendar view
- Filter by series, with your selection remembered between visits
- "Next up" countdown to the soonest race
- Light/dark theme (follows system preference, with a manual toggle)
- No build step or dependencies — pure HTML/CSS/JS

## Running locally

Just serve the folder as static files, e.g.:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Updating the data

All events live in [`js/data.js`](js/data.js) as a plain array — add, remove, or
correct entries there. Dates reflect officially announced 2026 calendars at the
time of writing; motorsport schedules do change, so double check exact times
with the official series before travelling.
