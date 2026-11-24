"use strict;"

function moviesPage() {
  state.movieFilters.search = "";

  content.innerHTML = `
    <section class="movies-page">
      <div class="movies-intro">
        <div>
          <span class="section-kicker">THE CINEMA COLLECTION</span>
          <h1>Explore movies<span>.</span></h1>
          <p>Encontre sua próxima grande história.</p>
        </div>
        <div class="movies-total"><strong>${movies.length}</strong><span>TITLES IN LIBRARY</span></div>
      </div>

      <div class="movies-toolbar">
        <label class="movie-search"><span>⌕</span>
          <input id="movie-search" type="search" placeholder="Buscar por título..." autocomplete="off">
        </label>

        <div class="filter-group">
          <select id="genre-filter">
            <option value="all">Todos os gêneros</option>
            ${["Action", "Adventure", "Animation", "Comedy", "Drama", "Fantasy", "Horror", "Romance", "Sci-Fi", "Thriller"].map(value => `<option value="${value}">${value}</option>`).join("")}
          </select>
          <select id="year-filter">
            <option value="all">Todos os anos</option>
            ${[2023, 2022, 2021, 2019, 2017, 2016, 2015, 2014, 2013, 2010, 2008, 2000, 1994].map(year => `<option value="${year}">${year}</option>`).join("")}
          </select>
          <select id="rating-filter">
            <option value="all">Todas as notas</option>
            <option value="7">7.0+ estrelas</option><option value="8">8.0+ estrelas</option>
            <option value="8.5">8.5+ estrelas</option><option value="9">9.0+ estrelas</option>
          </select>
          <select id="sort-filter">
            <option value="popular">Mais populares</option><option value="rating">Melhor avaliação</option>
            <option value="newest">Mais recentes</option><option value="oldest">Mais antigos</option>
          </select>
        </div>
        <button class="clear-filters" data-clear-filters>Limpar filtros</button>
      </div>
      <div class="catalog-info">
        <span id="movies-results"></span><span class="catalog-label">DISCOVER SOMETHING NEW</span>
      </div>
      <div class="poster-grid movies-grid" id="movies-grid"></div>
    </section>
  `;

  renderMovies();
}
