/**
 * Motor racing calendar data.
 * Dates are ISO (YYYY-MM-DD), inclusive of the full event weekend.
 * Sourced from official series calendars as published; racing schedules
 * change, so treat this as best-known information and update as needed.
 *
 * `sessions`, where present, holds officially confirmed session start
 * times as ISO 8601 datetimes with the circuit's local UTC offset baked
 * in (so they convert correctly to any timezone, DST included). Only
 * confirmed times are included — most series don't publish exact session
 * times until closer to the event, so many events simply have no
 * `sessions` field yet and the site shows "Time TBC" for them.
 */

const SERIES = {
  f1: {
    key: "f1",
    name: "Formula 1",
    short: "F1",
    color: "#e10600",
    url: "https://www.formula1.com/",
  },
  motogp: {
    key: "motogp",
    name: "MotoGP",
    short: "MotoGP",
    color: "#f97316",
    url: "https://www.motogp.com/",
  },
  bathurst12h: {
    key: "bathurst12h",
    name: "Bathurst 12 Hour",
    short: "B12H",
    color: "#0d9488",
    url: "https://www.bathurst12hour.com.au/",
  },
  gtwc: {
    key: "gtwc",
    name: "GT World Challenge Europe",
    short: "GTWC",
    color: "#2563eb",
    url: "https://www.gt-world-challenge-europe.com/",
  },
  imsa: {
    key: "imsa",
    name: "IMSA WeatherTech SportsCar Championship",
    short: "IMSA",
    color: "#059669",
    url: "https://www.imsa.com/",
  },
  supercars: {
    key: "supercars",
    name: "Supercars Championship",
    short: "Supercars",
    color: "#ca8a04",
    url: "https://www.supercars.com/",
  },
};

const RACING_EVENTS = [
  // ---- Bathurst 12 Hour ----
  {
    series: "bathurst12h",
    name: "Bathurst 12 Hour",
    circuit: "Mount Panorama Circuit",
    location: "Bathurst, Australia",
    start: "2026-02-13",
    end: "2026-02-15",
    sessions: [{ label: "Race", localISO: "2026-02-15T05:45:00+11:00" }],
  },

  // ---- MotoGP 2026 (22 rounds) ----
  { series: "motogp", name: "Thai Grand Prix", circuit: "Chang International Circuit", location: "Buriram, Thailand", start: "2026-02-27", end: "2026-03-01" },
  {
    series: "motogp", name: "Grande Prêmio de Brasil", circuit: "Autódromo Internacional Ayrton Senna", location: "Goiânia, Brazil", start: "2026-03-20", end: "2026-03-22",
    sessions: [{ label: "Sprint", localISO: "2026-03-21T16:20:00-03:00" }],
  },
  {
    series: "motogp", name: "Grand Prix of the Americas", circuit: "Circuit of the Americas", location: "Austin, USA", start: "2026-03-27", end: "2026-03-29",
    sessions: [
      { label: "Sprint", localISO: "2026-03-28T15:00:00-05:00" },
      { label: "Race", localISO: "2026-03-29T15:00:00-05:00" },
    ],
  },
  { series: "motogp", name: "Qatar Grand Prix", circuit: "Lusail International Circuit", location: "Lusail, Qatar", start: "2026-04-10", end: "2026-04-12" },
  { series: "motogp", name: "Spanish Grand Prix", circuit: "Circuito de Jerez", location: "Jerez, Spain", start: "2026-04-24", end: "2026-04-26" },
  { series: "motogp", name: "French Grand Prix", circuit: "Le Mans", location: "Le Mans, France", start: "2026-05-08", end: "2026-05-10" },
  { series: "motogp", name: "Catalan Grand Prix", circuit: "Circuit de Barcelona-Catalunya", location: "Barcelona, Spain", start: "2026-05-15", end: "2026-05-17" },
  { series: "motogp", name: "Italian Grand Prix", circuit: "Mugello Circuit", location: "Mugello, Italy", start: "2026-05-29", end: "2026-05-31" },
  { series: "motogp", name: "Hungarian Grand Prix", circuit: "Balaton Park Circuit", location: "Balatonfőkajár, Hungary", start: "2026-06-05", end: "2026-06-07" },
  { series: "motogp", name: "Czech Grand Prix", circuit: "Brno Circuit", location: "Brno, Czechia", start: "2026-06-19", end: "2026-06-21" },
  { series: "motogp", name: "Dutch TT", circuit: "TT Circuit Assen", location: "Assen, Netherlands", start: "2026-06-26", end: "2026-06-28" },
  { series: "motogp", name: "German Grand Prix", circuit: "Sachsenring", location: "Hohenstein-Ernstthal, Germany", start: "2026-07-10", end: "2026-07-12" },
  {
    series: "motogp", name: "British Grand Prix", circuit: "Silverstone Circuit", location: "Silverstone, UK", start: "2026-08-07", end: "2026-08-09",
    sessions: [
      { label: "Sprint", localISO: "2026-08-08T16:00:00+01:00" },
      { label: "Race", localISO: "2026-08-09T13:00:00+01:00" },
    ],
  },
  {
    series: "motogp", name: "Aragon Grand Prix", circuit: "MotorLand Aragón", location: "Alcañiz, Spain", start: "2026-08-28", end: "2026-08-30",
    sessions: [
      { label: "Sprint", localISO: "2026-08-29T15:00:00+02:00" },
      { label: "Race", localISO: "2026-08-30T14:00:00+02:00" },
    ],
  },
  { series: "motogp", name: "San Marino Grand Prix", circuit: "Misano World Circuit", location: "Misano Adriatico, Italy", start: "2026-09-11", end: "2026-09-13" },
  { series: "motogp", name: "Austrian Grand Prix", circuit: "Red Bull Ring", location: "Spielberg, Austria", start: "2026-09-18", end: "2026-09-20" },
  { series: "motogp", name: "Japanese Grand Prix", circuit: "Mobility Resort Motegi", location: "Motegi, Japan", start: "2026-10-02", end: "2026-10-04" },
  { series: "motogp", name: "Indonesian Grand Prix", circuit: "Pertamina Mandalika Circuit", location: "Lombok, Indonesia", start: "2026-10-09", end: "2026-10-11" },
  { series: "motogp", name: "Australian Motorcycle Grand Prix", circuit: "Phillip Island Grand Prix Circuit", location: "Phillip Island, Australia", start: "2026-10-23", end: "2026-10-25" },
  { series: "motogp", name: "Malaysian Grand Prix", circuit: "Petronas Sepang International Circuit", location: "Sepang, Malaysia", start: "2026-10-30", end: "2026-11-01" },
  { series: "motogp", name: "Portuguese Grand Prix", circuit: "Autódromo Internacional do Algarve", location: "Portimão, Portugal", start: "2026-11-13", end: "2026-11-15" },
  { series: "motogp", name: "Valencia Grand Prix (Season Finale)", circuit: "Circuit Ricardo Tormo", location: "Valencia, Spain", start: "2026-11-20", end: "2026-11-22" },

  // ---- Formula 1 2026 (22 races — Bahrain & Saudi Arabia GPs cancelled) ----
  // Race start times are officially confirmed; local UTC offsets account for
  // each circuit's DST rules on that specific date.
  {
    series: "f1", name: "Australian Grand Prix", circuit: "Albert Park Circuit", location: "Melbourne, Australia", start: "2026-03-06", end: "2026-03-08",
    sessions: [{ label: "Race", localISO: "2026-03-08T15:00:00+11:00" }],
  },
  {
    series: "f1", name: "Chinese Grand Prix", circuit: "Shanghai International Circuit", location: "Shanghai, China", start: "2026-03-13", end: "2026-03-15", note: "Sprint",
    sessions: [{ label: "Race", localISO: "2026-03-15T15:00:00+08:00" }],
  },
  {
    series: "f1", name: "Japanese Grand Prix", circuit: "Suzuka Circuit", location: "Suzuka, Japan", start: "2026-03-27", end: "2026-03-29",
    sessions: [{ label: "Race", localISO: "2026-03-29T14:00:00+09:00" }],
  },
  {
    series: "f1", name: "Miami Grand Prix", circuit: "Miami International Autodrome", location: "Miami, USA", start: "2026-05-01", end: "2026-05-03", note: "Sprint",
    sessions: [{ label: "Race", localISO: "2026-05-03T16:00:00-04:00" }],
  },
  {
    series: "f1", name: "Canadian Grand Prix", circuit: "Circuit Gilles Villeneuve", location: "Montreal, Canada", start: "2026-05-22", end: "2026-05-24", note: "Sprint",
    sessions: [{ label: "Race", localISO: "2026-05-24T16:00:00-04:00" }],
  },
  {
    series: "f1", name: "Monaco Grand Prix", circuit: "Circuit de Monaco", location: "Monte Carlo, Monaco", start: "2026-06-05", end: "2026-06-07",
    sessions: [{ label: "Race", localISO: "2026-06-07T15:00:00+02:00" }],
  },
  {
    series: "f1", name: "Spanish Grand Prix", circuit: "Circuit de Barcelona-Catalunya", location: "Barcelona, Spain", start: "2026-06-12", end: "2026-06-14",
    sessions: [{ label: "Race", localISO: "2026-06-14T15:00:00+02:00" }],
  },
  {
    series: "f1", name: "Austrian Grand Prix", circuit: "Red Bull Ring", location: "Spielberg, Austria", start: "2026-06-26", end: "2026-06-28",
    sessions: [{ label: "Race", localISO: "2026-06-28T15:00:00+02:00" }],
  },
  {
    series: "f1", name: "British Grand Prix", circuit: "Silverstone Circuit", location: "Silverstone, UK", start: "2026-07-03", end: "2026-07-05", note: "Sprint",
    sessions: [{ label: "Race", localISO: "2026-07-05T15:00:00+01:00" }],
  },
  {
    series: "f1", name: "Belgian Grand Prix", circuit: "Circuit de Spa-Francorchamps", location: "Spa, Belgium", start: "2026-07-17", end: "2026-07-19",
    sessions: [{ label: "Race", localISO: "2026-07-19T15:00:00+02:00" }],
  },
  {
    series: "f1", name: "Hungarian Grand Prix", circuit: "Hungaroring", location: "Budapest, Hungary", start: "2026-07-24", end: "2026-07-26",
    sessions: [{ label: "Race", localISO: "2026-07-26T15:00:00+02:00" }],
  },
  {
    series: "f1", name: "Dutch Grand Prix", circuit: "Circuit Zandvoort", location: "Zandvoort, Netherlands", start: "2026-08-21", end: "2026-08-23", note: "Sprint",
    sessions: [
      { label: "Sprint", localISO: "2026-08-22T12:00:00+02:00" },
      { label: "Race", localISO: "2026-08-23T15:00:00+02:00" },
    ],
  },
  {
    series: "f1", name: "Italian Grand Prix", circuit: "Autodromo Nazionale Monza", location: "Monza, Italy", start: "2026-09-04", end: "2026-09-06",
    sessions: [{ label: "Race", localISO: "2026-09-06T15:00:00+02:00" }],
  },
  {
    series: "f1", name: "Spanish Grand Prix (Madrid)", circuit: "Madring", location: "Madrid, Spain", start: "2026-09-11", end: "2026-09-13",
    sessions: [{ label: "Race", localISO: "2026-09-13T15:00:00+02:00" }],
  },
  {
    series: "f1", name: "Azerbaijan Grand Prix", circuit: "Baku City Circuit", location: "Baku, Azerbaijan", start: "2026-09-25", end: "2026-09-27",
    sessions: [{ label: "Race", localISO: "2026-09-27T15:00:00+04:00" }],
  },
  {
    series: "f1", name: "Singapore Grand Prix", circuit: "Marina Bay Street Circuit", location: "Singapore", start: "2026-10-09", end: "2026-10-11", note: "Sprint",
    sessions: [{ label: "Race", localISO: "2026-10-11T20:00:00+08:00" }],
  },
  {
    series: "f1", name: "United States Grand Prix", circuit: "Circuit of the Americas", location: "Austin, USA", start: "2026-10-23", end: "2026-10-25",
    sessions: [{ label: "Race", localISO: "2026-10-25T15:00:00-05:00" }],
  },
  {
    series: "f1", name: "Mexico City Grand Prix", circuit: "Autódromo Hermanos Rodríguez", location: "Mexico City, Mexico", start: "2026-10-30", end: "2026-11-01",
    sessions: [{ label: "Race", localISO: "2026-11-01T14:00:00-06:00" }],
  },
  {
    series: "f1", name: "São Paulo Grand Prix", circuit: "Autódromo José Carlos Pace (Interlagos)", location: "São Paulo, Brazil", start: "2026-11-06", end: "2026-11-08",
    sessions: [{ label: "Race", localISO: "2026-11-08T14:00:00-03:00" }],
  },
  {
    series: "f1", name: "Las Vegas Grand Prix", circuit: "Las Vegas Strip Circuit", location: "Las Vegas, USA", start: "2026-11-19", end: "2026-11-21",
    sessions: [{ label: "Race", localISO: "2026-11-21T20:00:00-08:00" }],
  },
  {
    series: "f1", name: "Qatar Grand Prix", circuit: "Lusail International Circuit", location: "Lusail, Qatar", start: "2026-11-27", end: "2026-11-29",
    sessions: [{ label: "Race", localISO: "2026-11-29T19:00:00+03:00" }],
  },
  {
    series: "f1", name: "Abu Dhabi Grand Prix (Season Finale)", circuit: "Yas Marina Circuit", location: "Abu Dhabi, UAE", start: "2026-12-04", end: "2026-12-06",
    sessions: [{ label: "Race", localISO: "2026-12-06T17:00:00+04:00" }],
  },

  // ---- IMSA WeatherTech SportsCar Championship 2026 (11 rounds) ----
  { series: "imsa", name: "Rolex 24 At Daytona", circuit: "Daytona International Speedway", location: "Daytona Beach, USA", start: "2026-01-21", end: "2026-01-25" },
  { series: "imsa", name: "Mobil 1 Twelve Hours of Sebring", circuit: "Sebring International Raceway", location: "Sebring, USA", start: "2026-03-18", end: "2026-03-21" },
  { series: "imsa", name: "Acura Grand Prix of Long Beach", circuit: "Long Beach Street Circuit", location: "Long Beach, USA", start: "2026-04-17", end: "2026-04-19" },
  { series: "imsa", name: "IMSA at Laguna Seca", circuit: "WeatherTech Raceway Laguna Seca", location: "Monterey, USA", start: "2026-05-01", end: "2026-05-03" },
  { series: "imsa", name: "Chevrolet Detroit Grand Prix", circuit: "Detroit Street Circuit", location: "Detroit, USA", start: "2026-05-29", end: "2026-05-30" },
  { series: "imsa", name: "Sahlen's Six Hours of the Glen", circuit: "Watkins Glen International", location: "Watkins Glen, USA", start: "2026-06-25", end: "2026-06-28" },
  { series: "imsa", name: "Chevrolet Sports Car Classic", circuit: "Canadian Tire Motorsport Park", location: "Bowmanville, Canada", start: "2026-07-10", end: "2026-07-12" },
  { series: "imsa", name: "Road America (Six Hours)", circuit: "Road America", location: "Elkhart Lake, USA", start: "2026-07-30", end: "2026-08-02" },
  { series: "imsa", name: "Michelin GT Challenge at VIR", circuit: "Virginia International Raceway", location: "Alton, USA", start: "2026-08-21", end: "2026-08-23" },
  { series: "imsa", name: "IMSA Battle on the Bricks", circuit: "Indianapolis Motor Speedway", location: "Indianapolis, USA", start: "2026-09-18", end: "2026-09-20" },
  { series: "imsa", name: "Motul Petit Le Mans", circuit: "Michelin Raceway Road Atlanta", location: "Braselton, USA", start: "2026-09-30", end: "2026-10-03" },

  // ---- Supercars Championship — Repco Bathurst 1000 ----
  {
    series: "supercars",
    name: "Repco Bathurst 1000",
    circuit: "Mount Panorama Circuit",
    location: "Bathurst, Australia",
    start: "2026-10-08",
    end: "2026-10-11",
  },

  // ---- GT World Challenge Europe Endurance Cup 2026 (5 rounds) ----
  { series: "gtwc", name: "6 Hours of Paul Ricard", circuit: "Circuit Paul Ricard", location: "Le Castellet, France", start: "2026-04-11", end: "2026-04-12" },
  { series: "gtwc", name: "3 Hours of Monza", circuit: "Autodromo Nazionale Monza", location: "Monza, Italy", start: "2026-05-30", end: "2026-05-31" },
  { series: "gtwc", name: "CrowdStrike 24 Hours of Spa", circuit: "Circuit de Spa-Francorchamps", location: "Stavelot, Belgium", start: "2026-06-25", end: "2026-06-28" },
  { series: "gtwc", name: "3 Hours of Nürburgring", circuit: "Nürburgring", location: "Nürburg, Germany", start: "2026-08-29", end: "2026-08-30" },
  { series: "gtwc", name: "3 Hours of Portimão", circuit: "Algarve International Circuit", location: "Portimão, Portugal", start: "2026-10-17", end: "2026-10-18" },
];

// Assign a stable id and sort chronologically.
RACING_EVENTS.forEach((e, i) => (e.id = `${e.series}-${e.start}-${i}`));
RACING_EVENTS.sort((a, b) => a.start.localeCompare(b.start));
