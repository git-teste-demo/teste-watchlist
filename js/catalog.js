"use strict;"

function createPosterCard(item, options = {}) {
  const mediaKey = getMediaKey(item);
  const saved = state.watchlist.includes(mediaKey);
  const removable = options.removable === true;

  return `
    <article class="poster-card ${isShow(item) ? "show-card" : ""}"
      data-title="${escapeHTML(item.title)}">

      <div class="poster-visual">
        ${imageMarkup(item)}
        <span class="poster-badge">★ ${Number(item.rating).toFixed(1)}</span>

        ${removable
          ? `<button class="poster-save saved" data-remove="${escapeHTML(item.title)}"
              title="Remover da Watchlist" aria-label="Remover da Watchlist">×</button>`
          : `<button class="poster-save ${saved ? "saved" : ""}"
              data-add="${escapeHTML(item.title)}"
              title="${saved ? "Já está na Watchlist" : "Adicionar à Watchlist"}"
              aria-label="Adicionar à Watchlist">${saved ? "✓" : "+"}</button>`
        }
      </div>

      <div class="poster-title-row">
        <span class="poster-title">${escapeHTML(item.title)}</span>
        <span class="poster-rating">★ ${Number(item.rating).toFixed(1)}</span>
      </div>

      <div class="poster-year">${item.year} · ${escapeHTML(item.genre)}</div>
    </article>
  `;
}

const createMovieCard = (item, options = {}) => createPosterCard(item, options);
const createShowCard = (item, options = {}) => createPosterCard(item, options);

// =========================================================
// WATCHLIST
// =========================================================

function addToWatchlist(identifier) {
  const media = findTitle(identifier);
  if (!media) return;

  const mediaKey = getMediaKey(media);
  if (state.watchlist.includes(mediaKey)) {
    toast("Este título já está na sua Watchlist.");
    return;
  }

  state.watchlist.push(mediaKey);
  saveWatchlist();
  toast(`${media.title} adicionado à Watchlist.`);
  refreshCurrentView();
  updateModalButton(media.title);
}

function removeFromWatchlist(identifier) {
  const media = findTitle(identifier);
  if (!media) return;

  const mediaKey = getMediaKey(media);
  state.watchlist = state.watchlist.filter(item => item !== mediaKey);
  saveWatchlist();
  toast("Título removido da Watchlist.");
  refreshCurrentView();
  updateModalButton(media.title);
}

function watchlistPage() {
  const savedTitles = state.watchlist.map(findTitle).filter(Boolean);
  const savedMovies = savedTitles.filter(item => !isShow(item));
  const savedShows = savedTitles.filter(isShow);

  const body = savedTitles.length ? `
    ${savedMovies.length ? `
      <div class="watchlist-category">
        <div class="watchlist-category-heading">
          <h2>Movies <span>${savedMovies.length}</span></h2>
        </div>
        <div class="poster-grid movies-grid">
          ${savedMovies.map(item => createMovieCard(item, { removable: true })).join("")}
        </div>
      </div>
    ` : ""}

    ${savedShows.length ? `
      <div class="watchlist-category">
        <div class="watchlist-category-heading">
          <h2>TV Shows <span>${savedShows.length}</span></h2>
        </div>
        <div class="poster-grid movies-grid">
          ${savedShows.map(item => createShowCard(item, { removable: true })).join("")}
        </div>
      </div>
    ` : ""}
  ` : `
    <div class="empty-state">
      <strong>Sua Watchlist está vazia.</strong>
      Explore o catálogo e salve os títulos que deseja assistir.
      <button class="clear-filters" data-view="movies">Explorar filmes</button>
      <button class="clear-filters" data-view="shows">Explorar séries</button>
    </div>
  `;

  content.innerHTML = `
    <section class="movies-page watchlist-page">
      <div class="movies-intro">
        <div>
          <span class="section-kicker">YOUR PERSONAL LIBRARY</span>
          <h1>My Watchlist<span>.</span></h1>
          <p>Todos os títulos que você deseja assistir.</p>
        </div>
        <div class="movies-total">
          <strong>${savedTitles.length}</strong>
          <span>SAVED TITLES</span>
        </div>
      </div>
      ${body}
    </section>
  `;
}

// =========================================================
// FILTER ENGINE
// =========================================================

function applyFilters(items, filters) {
  let result = [...items];

  if (filters.genre !== "all") result = result.filter(item => item.genre === filters.genre);
  if (filters.year !== "all") result = result.filter(item => item.year === Number(filters.year));
  if (filters.rating !== "all") result = result.filter(item => item.rating >= Number(filters.rating));
  if (filters.status && filters.status !== "all") result = result.filter(item => item.status === filters.status);

  if (filters.search) {
    result = result.filter(item => item.title.toLowerCase().includes(filters.search));
  }

  switch (filters.sort) {
    case "rating": result.sort((a, b) => b.rating - a.rating); break;
    case "newest": result.sort((a, b) => b.year - a.year); break;
    case "oldest": result.sort((a, b) => a.year - b.year); break;
    case "seasons": result.sort((a, b) => (b.seasons || 0) - (a.seasons || 0)); break;
    default: result.sort((a, b) => b.popularity - a.popularity);
  }

  return result;
}

function renderMovies() {
  const grid = $("#movies-grid");
  const counter = $("#movies-results");
  if (!grid || !counter) return;

  const result = applyFilters(movies, state.movieFilters);
  counter.textContent = `${result.length} ${result.length === 1 ? "filme encontrado" : "filmes encontrados"}`;

  grid.innerHTML = result.length
    ? result.map(createMovieCard).join("")
    : `<div class="empty-state movie-empty"><strong>Nenhum filme encontrado</strong>
        Tente alterar os filtros ou pesquisar outro título.
        <button class="clear-filters" data-clear-filters>Limpar filtros</button></div>`;
}

function renderShows() {
  const grid = $("#shows-grid");
  const counter = $("#shows-results");
  if (!grid || !counter) return;

  const result = applyFilters(tvShows, state.showFilters);
  counter.textContent = `${result.length} ${result.length === 1 ? "série encontrada" : "séries encontradas"}`;

  grid.innerHTML = result.length
    ? result.map(createShowCard).join("")
    : `<div class="empty-state movie-empty"><strong>Nenhuma série encontrada</strong>
        Tente alterar os filtros ou pesquisar outro título.
        <button class="clear-filters" data-clear-show-filters>Limpar filtros</button></div>`;
}

function resetMovieFilters() {
  state.movieFilters = { genre: "all", year: "all", rating: "all", sort: "popular", search: "" };

  const fields = {
    "movie-search": "", "genre-filter": "all", "year-filter": "all",
    "rating-filter": "all", "sort-filter": "popular"
  };

  Object.entries(fields).forEach(([id, value]) => {
    const element = document.getElementById(id);
    if (element) element.value = value;
  });

  renderMovies();
}

function resetShowFilters() {
  state.showFilters = {
    genre: "all", year: "all", rating: "all", sort: "popular", status: "all", search: ""
  };

  const fields = {
    "show-search": "", "show-genre-filter": "all", "show-year-filter": "all",
    "show-rating-filter": "all", "show-sort-filter": "popular", "show-status-filter": "all"
  };

  Object.entries(fields).forEach(([id, value]) => {
    const element = document.getElementById(id);
    if (element) element.value = value;
  });

  renderShows();
}
