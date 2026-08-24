(function () {
  "use strict";

  const STORAGE_KEYS = {
    theme: "racing-cal.theme",
    filters: "racing-cal.filters",
    view: "racing-cal.view",
    hidePast: "racing-cal.hidePast",
  };

  const MONTH_NAMES = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  const WEEKDAY_SHORT = ["S", "M", "T", "W", "T", "F", "S"];

  // Australia/Brisbane stays at UTC+10 year-round (no daylight saving), so it
  // reliably represents AEST rather than drifting into AEDT part of the year.
  const DISPLAY_TIMEZONE = "Australia/Brisbane";

  function aestTodayISO() {
    // en-CA formats as YYYY-MM-DD, which is what the rest of the app expects.
    return new Intl.DateTimeFormat("en-CA", {
      timeZone: DISPLAY_TIMEZONE,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date());
  }

  const todayISO = aestTodayISO();
  const today = parseISO(todayISO);

  function parseISO(iso) {
    const [y, m, d] = iso.split("-").map(Number);
    return new Date(y, m - 1, d);
  }

  function daysBetween(a, b) {
    const ms = parseISO(b) - parseISO(a);
    return Math.round(ms / 86400000);
  }

  function fmtDay(iso) {
    return parseISO(iso).getDate();
  }

  function fmtMonAbbr(iso) {
    return MONTH_NAMES[parseISO(iso).getMonth()].slice(0, 3);
  }

  function fmtRange(startISO, endISO) {
    const s = parseISO(startISO);
    const e = parseISO(endISO);
    const sameMonth = s.getMonth() === e.getMonth() && s.getFullYear() === e.getFullYear();
    const startStr = `${MONTH_NAMES[s.getMonth()]} ${s.getDate()}`;
    let range;
    if (startISO === endISO) range = `${startStr}, ${s.getFullYear()}`;
    else if (sameMonth) range = `${MONTH_NAMES[s.getMonth()]} ${s.getDate()}–${e.getDate()}, ${s.getFullYear()}`;
    else range = `${startStr} – ${MONTH_NAMES[e.getMonth()]} ${e.getDate()}, ${e.getFullYear()}`;
    return `${range} AEST`;
  }

  function eventStatus(ev) {
    if (todayISO > ev.end) return "past";
    if (todayISO >= ev.start && todayISO <= ev.end) return "live";
    return "upcoming";
  }

  // ---------------- State ----------------

  let activeFilters = loadFilters();
  let currentView = localStorage.getItem(STORAGE_KEYS.view) || "list";
  let hidePast = localStorage.getItem(STORAGE_KEYS.hidePast) === "1";
  let calCursor = new Date(today.getFullYear(), today.getMonth(), 1);

  function loadFilters() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.filters);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length) return new Set(parsed);
      }
    } catch (e) { /* ignore */ }
    return new Set(Object.keys(SERIES));
  }

  function saveFilters() {
    localStorage.setItem(STORAGE_KEYS.filters, JSON.stringify([...activeFilters]));
  }

  function visibleEvents() {
    return RACING_EVENTS.filter((e) => {
      if (!activeFilters.has(e.series)) return false;
      if (hidePast && eventStatus(e) === "past") return false;
      return true;
    });
  }

  // ---------------- Theme ----------------

  function initTheme() {
    const saved = localStorage.getItem(STORAGE_KEYS.theme);
    if (saved) document.documentElement.setAttribute("data-theme", saved);
    updateThemeIcon();
  }

  function updateThemeIcon() {
    const saved = localStorage.getItem(STORAGE_KEYS.theme);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = saved ? saved === "dark" : prefersDark;
    document.querySelector(".theme-icon").textContent = isDark ? "☀️" : "🌙";
  }

  document.getElementById("theme-toggle").addEventListener("click", () => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const current = document.documentElement.getAttribute("data-theme") || (prefersDark ? "dark" : "light");
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem(STORAGE_KEYS.theme, next);
    updateThemeIcon();
  });

  // ---------------- Filters UI ----------------

  function renderFilters() {
    const wrap = document.getElementById("series-filters");
    wrap.innerHTML = "";
    Object.values(SERIES).forEach((s) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "chip" + (activeFilters.has(s.key) ? " is-active" : "");
      btn.style.setProperty("--dot-color", s.color);
      btn.innerHTML = `<span class="dot"></span>${s.short}`;
      btn.addEventListener("click", () => {
        if (activeFilters.has(s.key)) {
          if (activeFilters.size === 1) return; // keep at least one active
          activeFilters.delete(s.key);
        } else {
          activeFilters.add(s.key);
        }
        saveFilters();
        renderFilters();
        renderAll();
      });
      wrap.appendChild(btn);
    });
  }

  document.getElementById("filters-all").addEventListener("click", () => {
    activeFilters = new Set(Object.keys(SERIES));
    saveFilters();
    renderFilters();
    renderAll();
  });

  document.getElementById("filters-none").addEventListener("click", () => {
    activeFilters = new Set();
    saveFilters();
    renderFilters();
    renderAll();
  });

  // ---------------- Hide past events ----------------

  function renderHidePastToggle() {
    const btn = document.getElementById("hide-past-toggle");
    btn.classList.toggle("is-active", hidePast);
    btn.setAttribute("aria-pressed", String(hidePast));
  }

  document.getElementById("hide-past-toggle").addEventListener("click", () => {
    hidePast = !hidePast;
    localStorage.setItem(STORAGE_KEYS.hidePast, hidePast ? "1" : "0");
    renderHidePastToggle();
    renderAll();
  });

  // ---------------- View toggle ----------------

  function renderViewToggle() {
    document.querySelectorAll(".view-btn").forEach((b) => {
      b.classList.toggle("is-active", b.dataset.view === currentView);
    });
    document.getElementById("list-view").hidden = currentView !== "list";
    document.getElementById("calendar-view").hidden = currentView !== "calendar";
  }

  document.querySelectorAll(".view-btn").forEach((b) => {
    b.addEventListener("click", () => {
      currentView = b.dataset.view;
      localStorage.setItem(STORAGE_KEYS.view, currentView);
      renderViewToggle();
      renderAll();
    });
  });

  // ---------------- Next up ----------------

  function renderNextUp() {
    const el = document.getElementById("next-up");
    const upcoming = visibleEvents()
      .filter((e) => eventStatus(e) !== "past")
      .sort((a, b) => a.start.localeCompare(b.start));

    if (!upcoming.length) {
      el.innerHTML = "";
      return;
    }

    const ev = upcoming[0];
    const series = SERIES[ev.series];
    const status = eventStatus(ev);
    const daysToStart = daysBetween(todayISO, ev.start);

    let countdownHtml;
    if (status === "live") {
      countdownHtml = `<div class="num">LIVE</div><div class="unit">this weekend</div>`;
    } else {
      countdownHtml = `<div class="num">${daysToStart}</div><div class="unit">day${daysToStart === 1 ? "" : "s"} to go</div>`;
    }

    el.innerHTML = `
      <div class="next-up-card" style="--card-color:${series.color}">
        <div>
          <div class="next-up-label">${status === "live" ? "Happening now" : "Next up"} · ${series.name}</div>
          <div class="next-up-title">${ev.name}</div>
          <div class="next-up-sub">${ev.circuit} — ${ev.location} · ${fmtRange(ev.start, ev.end)}</div>
        </div>
        <div class="next-up-countdown">${countdownHtml}</div>
      </div>
    `;
  }

  // ---------------- List view ----------------

  function renderListView() {
    const container = document.getElementById("list-view");
    const events = visibleEvents().slice().sort((a, b) => a.start.localeCompare(b.start));

    if (!events.length) {
      container.innerHTML = `<div class="empty-state">No series selected. Pick at least one series above.</div>`;
      return;
    }

    const groups = new Map();
    events.forEach((ev) => {
      const d = parseISO(ev.start);
      const key = `${d.getFullYear()}-${d.getMonth()}`;
      if (!groups.has(key)) groups.set(key, { label: `${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`, items: [] });
      groups.get(key).items.push(ev);
    });

    let html = "";
    groups.forEach((group) => {
      html += `<div class="month-group"><h2 class="month-heading">${group.label}</h2>`;
      group.items.forEach((ev) => {
        const series = SERIES[ev.series];
        const status = eventStatus(ev);
        const daysToStart = daysBetween(todayISO, ev.start);
        let sideHtml = "";
        if (status === "upcoming") {
          sideHtml = `<span class="countdown-num">${daysToStart}d</span><span class="countdown-unit">to go</span>`;
        } else if (status === "live") {
          sideHtml = `<span class="countdown-num" style="color:${series.color}">LIVE</span>`;
        } else {
          sideHtml = `<span class="countdown-num">✓</span><span class="countdown-unit">done</span>`;
        }

        html += `
          <article class="event-card ${status === "past" ? "is-past" : ""} ${status === "live" ? "is-live" : ""}" style="--card-color:${series.color}">
            <div class="event-date-block">
              <span class="day">${fmtDay(ev.start)}</span>
              <span class="mon">${fmtMonAbbr(ev.start)}</span>
            </div>
            <div class="event-main">
              <div class="event-top-row">
                <span class="series-badge">${series.short}</span>
                ${ev.note ? `<span class="event-note">${ev.note}</span>` : ""}
                ${status === "live" ? `<span class="status-tag live">● LIVE NOW</span>` : ""}
              </div>
              <div class="event-name">${ev.name}</div>
              <div class="event-meta">${ev.circuit} — ${ev.location} · ${fmtRange(ev.start, ev.end)}</div>
            </div>
            <div class="event-side">${sideHtml}</div>
          </article>
        `;
      });
      html += `</div>`;
    });

    container.innerHTML = html;
  }

  // ---------------- Calendar view ----------------

  function renderCalendarView() {
    document.getElementById("cal-month-label").textContent =
      `${MONTH_NAMES[calCursor.getMonth()]} ${calCursor.getFullYear()}`;

    const weekdaysEl = document.getElementById("cal-weekdays");
    weekdaysEl.innerHTML = WEEKDAY_SHORT.map((w) => `<span>${w}</span>`).join("");

    const grid = document.getElementById("cal-grid");
    grid.innerHTML = "";

    const firstOfMonth = new Date(calCursor.getFullYear(), calCursor.getMonth(), 1);
    const startOffset = firstOfMonth.getDay();
    const gridStart = new Date(firstOfMonth);
    gridStart.setDate(gridStart.getDate() - startOffset);

    const events = visibleEvents();

    for (let i = 0; i < 42; i++) {
      const cellDate = new Date(gridStart);
      cellDate.setDate(gridStart.getDate() + i);
      const cellISO = toISO(cellDate);
      const isOutside = cellDate.getMonth() !== calCursor.getMonth();
      const isToday = cellISO === todayISO;

      const dayEvents = events.filter((e) => cellISO >= e.start && cellISO <= e.end);

      const cell = document.createElement("div");
      cell.className = `cal-cell ${isOutside ? "outside" : ""} ${isToday ? "is-today" : ""} ${dayEvents.length ? "has-event" : ""}`;
      if (dayEvents.length) cell.style.setProperty("--pill-color", SERIES[dayEvents[0].series].color);

      const maxShown = 2;
      const pills = dayEvents.slice(0, maxShown).map((e) => {
        const series = SERIES[e.series];
        const isStart = cellISO === e.start;
        const label = isStart ? e.name : series.short;
        return `<span class="cal-event-pill" style="--pill-color:${series.color}" data-event-id="${e.id}">${label}</span>`;
      }).join("");
      const more = dayEvents.length > maxShown ? `<span class="cal-event-more">+${dayEvents.length - maxShown} more</span>` : "";

      cell.innerHTML = `<span class="cell-date">${cellDate.getDate()}</span>${pills}${more}`;
      if (dayEvents.length) {
        cell.addEventListener("click", () => showDayDetail(cellISO, dayEvents));
        cell.style.cursor = "pointer";
      }
      grid.appendChild(cell);
    }
  }

  function toISO(d) {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  }

  function showDayDetail(iso, events) {
    const el = document.getElementById("cal-day-detail");
    const d = parseISO(iso);
    const heading = `${MONTH_NAMES[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
    const items = events.map((e) => {
      const series = SERIES[e.series];
      return `
        <article class="event-card" style="--card-color:${series.color}">
          <div class="event-main">
            <div class="event-top-row"><span class="series-badge">${series.short}</span></div>
            <div class="event-name">${e.name}</div>
            <div class="event-meta">${e.circuit} — ${e.location} · ${fmtRange(e.start, e.end)}</div>
          </div>
        </article>
      `;
    }).join("");
    el.innerHTML = `<h3>${heading}</h3>${items}`;
    el.hidden = false;
    el.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  document.getElementById("cal-prev").addEventListener("click", () => {
    calCursor.setMonth(calCursor.getMonth() - 1);
    renderCalendarView();
  });
  document.getElementById("cal-next").addEventListener("click", () => {
    calCursor.setMonth(calCursor.getMonth() + 1);
    renderCalendarView();
  });
  document.getElementById("cal-today").addEventListener("click", () => {
    calCursor = new Date(today.getFullYear(), today.getMonth(), 1);
    renderCalendarView();
  });

  // ---------------- Render orchestration ----------------

  function renderAll() {
    renderNextUp();
    if (currentView === "list") renderListView();
    else renderCalendarView();
  }

  initTheme();
  renderFilters();
  renderViewToggle();
  renderHidePastToggle();
  renderAll();

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", updateThemeIcon);
})();
