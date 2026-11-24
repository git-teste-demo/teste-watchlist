"use strict;"

function showsPage() {
  state.showFilters.search = "";
  const featured = findShow("Breaking Bad");

  content.innerHTML = `
    <section class="movies-page shows-page">
      <div class="movies-intro">
        <div>
          <span class="section-kicker">THE SERIES COLLECTION</span>
          <h1>Explore series<span>.</span></h1>
          <p>Descubra histórias que merecem sua próxima maratona.</p>
        </div>
        <div class="movies-total"><strong>${tvShows.length}</strong><span>SERIES IN LIBRARY</span></div>
      </div>

      <div class="shows-featured">
        <img src="${escapeHTML(featured.image)}" alt="${escapeHTML(featured.title)}" class="shows-featured-image">
        <div class="shows-featured-overlay"></div>
        <div class="shows-featured-content">
          <span class="section-kicker">SCREENLY FEATURED SERIES</span>
          <h2>${escapeHTML(featured.title)}</h2>
          <div class="shows-featured-meta">${featured.year} · ${featured.seasons} temporadas · ★ ${featured.rating.toFixed(1)}</div>
          <p>${escapeHTML(featured.description)}</p>
          <div class="shows-featured-actions">
            <button class="featured-detail-button" data-detail="${escapeHTML(featured.title)}">View details</button>
            <button class="featured-save-button" data-add="${escapeHTML(featured.title)}">+ Add to Watchlist</button>
          </div>
        </div>
      </div>

      <div class="movies-toolbar">
        <label class="movie-search"><span>⌕</span>
          <input id="show-search" type="search" placeholder="Buscar séries..." autocomplete="off">
        </label>
        <div class="filter-group">
          <select id="show-genre-filter">
            <option value="all">Todos os gêneros</option>
            ${["Action", "Animation", "Comedy", "Crime", "Drama", "Fantasy", "Sci-Fi"].map(value => `<option value="${value}">${value}</option>`).join("")}
          </select>
          <select id="show-year-filter">
            <option value="all">Todos os anos</option>
            ${[2023, 2022, 2021, 2019, 2018, 2017, 2016, 2013, 2011, 2008, 2005].map(year => `<option value="${year}">${year}</option>`).join("")}
          </select>
          <select id="show-rating-filter">
            <option value="all">Todas as notas</option>
            <option value="7">7.0+ estrelas</option><option value="8">8.0+ estrelas</option>
            <option value="8.5">8.5+ estrelas</option><option value="9">9.0+ estrelas</option>
          </select>
          <select id="show-status-filter">
            <option value="all">Todas as situações</option>
            <option value="Ended">Finalizadas</option><option value="Returning Series">Em andamento</option>
          </select>
          <select id="show-sort-filter">
            <option value="popular">Mais populares</option><option value="rating">Melhor avaliação</option>
            <option value="newest">Mais recentes</option><option value="oldest">Mais antigas</option>
            <option value="seasons">Mais temporadas</option>
          </select>
        </div>
        <button class="clear-filters" data-clear-show-filters>Limpar filtros</button>
      </div>

      <div class="catalog-info">
        <span id="shows-results"></span><span class="catalog-label">DISCOVER YOUR NEXT SERIES</span>
      </div>
      <div class="poster-grid movies-grid" id="shows-grid"></div>
    </section>
  `;

  renderShows();
}
