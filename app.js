
(() => {
  "use strict";

  // =========================================================
  // SCREENLY — APPLICATION CORE
  // =========================================================

  const CONFIG = {
    storage: {
      watchlist: "screenly-watchlist",
      collections: "screenly-collections",
      profile: "screenly-profile"
    },
    views: ["discover", "movies", "shows", "watchlist", "collections", "profile"],
    toastDuration: 2500
  };

  // =========================================================
  // DATABASE — MOVIES
  // =========================================================

  const movies = [
    { title: "Interstellar", year: 2014, rating: 8.6, genre: "Sci-Fi", popularity: 98, image: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxdXBaqh.jpg", description: "Uma equipe de exploradores viaja além desta galáxia para descobrir se a humanidade tem um futuro entre as estrelas." },
    { title: "Oppenheimer", year: 2023, rating: 8.8, genre: "Drama", popularity: 99, image: "https://image.tmdb.org/t/p/w500/ptpr0kGAckfQkJeJIt8st5dglvd.jpg", description: "A história de J. Robert Oppenheimer e seu papel no desenvolvimento da bomba atômica." },
    { title: "Blade Runner 2049", year: 2017, rating: 8.0, genre: "Sci-Fi", popularity: 88, image: "https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg", description: "Um novo blade runner descobre um segredo capaz de mergulhar o que resta da sociedade no caos." },
    { title: "The Batman", year: 2022, rating: 7.8, genre: "Action", popularity: 93, image: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg", description: "Batman investiga a corrupção de Gotham enquanto persegue um assassino que deixa pistas misteriosas." },
    { title: "Poor Things", year: 2023, rating: 8.4, genre: "Fantasy", popularity: 82, image: "https://image.tmdb.org/t/p/w500/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg", description: "A extraordinária história de Bella Baxter, uma jovem trazida de volta à vida e em busca de descobrir o mundo." },
    { title: "Arrival", year: 2016, rating: 7.9, genre: "Sci-Fi", popularity: 85, image: "https://image.tmdb.org/t/p/w500/x2FJsf1ElAgr63Y3PNPtJrcmpoe.jpg", description: "Uma linguista tenta estabelecer comunicação com misteriosas formas de vida extraterrestre." },
    { title: "Dune", year: 2021, rating: 8.0, genre: "Adventure", popularity: 94, image: "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg", description: "Paul Atreides chega a Arrakis, um planeta desértico que guarda o recurso mais valioso do universo." },
    { title: "John Wick: Chapter 4", year: 2023, rating: 7.7, genre: "Action", popularity: 91, image: "https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHv5lv8.jpg", description: "John Wick descobre um caminho para derrotar a Alta Cúpula, mas novos inimigos estão em seu caminho." },
    { title: "Spider-Man: Across the Spider-Verse", year: 2023, rating: 8.6, genre: "Animation", popularity: 96, image: "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xjbu.jpg", description: "Miles Morales atravessa o multiverso e encontra uma equipe de pessoas-aranha." },
    { title: "The Dark Knight", year: 2008, rating: 9.0, genre: "Action", popularity: 97, image: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg", description: "Batman enfrenta o Coringa, um criminoso que ameaça mergulhar Gotham no caos." },
    { title: "Whiplash", year: 2014, rating: 8.5, genre: "Drama", popularity: 87, image: "https://image.tmdb.org/t/p/w500/7fn624j5lj3xTme2SgiLCeuedmO.jpg", description: "Um jovem baterista enfrenta os métodos extremos de um professor de música exigente." },
    { title: "Parasite", year: 2019, rating: 8.5, genre: "Thriller", popularity: 92, image: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg", description: "Duas famílias de realidades muito diferentes se envolvem em uma relação inesperada." },
    { title: "Everything Everywhere All at Once", year: 2022, rating: 7.8, genre: "Fantasy", popularity: 86, image: "https://image.tmdb.org/t/p/w500/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg", description: "Uma mulher comum precisa salvar o multiverso enquanto enfrenta diferentes versões de sua própria vida." },
    { title: "The Grand Budapest Hotel", year: 2014, rating: 8.1, genre: "Comedy", popularity: 80, image: "https://image.tmdb.org/t/p/w500/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg", description: "As aventuras de um concierge e seu jovem protegido em um famoso hotel europeu." },
    { title: "Mad Max: Fury Road", year: 2015, rating: 8.1, genre: "Action", popularity: 89, image: "https://image.tmdb.org/t/p/w500/hA2ple9q4qnwxp3hKVNhroipsir.jpg", description: "Em um mundo pós-apocalíptico, Max se une a Furiosa em uma fuga desesperada." },
    { title: "The Shawshank Redemption", year: 1994, rating: 9.3, genre: "Drama", popularity: 95, image: "https://image.tmdb.org/t/p/w500/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg", description: "Dois homens desenvolvem uma amizade improvável durante décadas em uma prisão." },
    { title: "Inception", year: 2010, rating: 8.8, genre: "Sci-Fi", popularity: 94, image: "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg", description: "Um especialista em espionagem corporativa invade sonhos para realizar uma missão impossível." },
    { title: "La La Land", year: 2016, rating: 7.9, genre: "Romance", popularity: 84, image: "https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg", description: "Uma atriz e um músico tentam construir suas carreiras enquanto vivem um romance em Los Angeles." },
    { title: "The Conjuring", year: 2013, rating: 7.5, genre: "Horror", popularity: 83, image: "https://image.tmdb.org/t/p/w500/wVYREutTvI2tmxr6ujrHT704wGF.jpg", description: "Dois investigadores paranormais ajudam uma família aterrorizada por uma presença sobrenatural." },
    { title: "Gladiator", year: 2000, rating: 8.2, genre: "Adventure", popularity: 90, image: "https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg", description: "Um general romano é traído e precisa lutar como gladiador para buscar justiça." }
  ];

  // =========================================================
  // DATABASE — TV SHOWS
  // =========================================================

  const tvShows = [
    { title: "Breaking Bad", year: 2008, rating: 9.5, genre: "Crime", popularity: 99, seasons: 5, episodes: 62, status: "Ended", image: "https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg", description: "Um professor de química diagnosticado com câncer passa a produzir metanfetamina para garantir o futuro financeiro de sua família." },
    { title: "The Last of Us", year: 2023, rating: 8.6, genre: "Drama", popularity: 98, seasons: 2, episodes: 16, status: "Returning Series", image: "https://image.tmdb.org/t/p/w500/uKvVjHNqB5VmOrnxq4Li5Q8eokI.jpg", description: "Em um mundo devastado por uma pandemia, Joel precisa escoltar Ellie através de uma América transformada." },
    { title: "Succession", year: 2018, rating: 8.9, genre: "Drama", popularity: 96, seasons: 4, episodes: 39, status: "Ended", image: "https://image.tmdb.org/t/p/w500/7HW47XbkNQ5fiwQFYGWdw9gs143.jpg", description: "Os membros da poderosa família Roy disputam o controle de um império global de mídia." },
    { title: "The Bear", year: 2022, rating: 8.5, genre: "Drama", popularity: 94, seasons: 4, episodes: 38, status: "Returning Series", image: "https://image.tmdb.org/t/p/w500/sHFlbKS3WLqMzy7sWVxuj1g7Szk.jpg", description: "Um jovem chef retorna a Chicago para administrar o restaurante da família e enfrentar seus próprios conflitos." },
    { title: "Dark", year: 2017, rating: 8.7, genre: "Sci-Fi", popularity: 91, seasons: 3, episodes: 26, status: "Ended", image: "https://image.tmdb.org/t/p/w500/apbrbWs8M9lyOpJYU5WXrpFbk1Z.jpg", description: "O desaparecimento de duas crianças revela segredos profundos e uma conexão entre quatro famílias ao longo de gerações." },
    { title: "Stranger Things", year: 2016, rating: 8.6, genre: "Sci-Fi", popularity: 97, seasons: 5, episodes: 42, status: "Ended", image: "https://image.tmdb.org/t/p/w500/uOOtwVbSr4QDjAGIifLDwpb2Pdl.jpg", description: "Um grupo de amigos descobre forças sobrenaturais e experimentos secretos em uma pequena cidade americana." },
    { title: "Game of Thrones", year: 2011, rating: 9.2, genre: "Fantasy", popularity: 99, seasons: 8, episodes: 73, status: "Ended", image: "https://image.tmdb.org/t/p/w500/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg", description: "Famílias poderosas disputam o controle dos Sete Reinos enquanto uma ameaça antiga se aproxima." },
    { title: "Severance", year: 2022, rating: 8.7, genre: "Sci-Fi", popularity: 95, seasons: 2, episodes: 19, status: "Returning Series", image: "https://image.tmdb.org/t/p/w500/pPHpeI2X1qEd1CS1SeyrdhZ4qnT.jpg", description: "Funcionários de uma empresa passam por um procedimento que separa completamente suas memórias profissionais e pessoais." },
    { title: "The Office", year: 2005, rating: 9.0, genre: "Comedy", popularity: 93, seasons: 9, episodes: 201, status: "Ended", image: "https://image.tmdb.org/t/p/w500/qWnJzyZhyy74gjpSjIXWmuk0ifX.jpg", description: "O cotidiano dos funcionários de uma empresa de papel é registrado em formato de falso documentário." },
    { title: "Chernobyl", year: 2019, rating: 9.3, genre: "Drama", popularity: 90, seasons: 1, episodes: 5, status: "Ended", image: "https://image.tmdb.org/t/p/w500/hlLXt2tOPT6RRnjiUmoxyG1LTFi.jpg", description: "A minissérie retrata o desastre nuclear de Chernobyl e os esforços para conter suas consequências." },
    { title: "Peaky Blinders", year: 2013, rating: 8.7, genre: "Crime", popularity: 92, seasons: 6, episodes: 36, status: "Ended", image: "https://image.tmdb.org/t/p/w500/vUUqzWa2LnHIVqkaKVlVGkVcZIW.jpg", description: "Uma família criminosa liderada por Tommy Shelby expande seu poder na Inglaterra do período pós-guerra." },
    { title: "Arcane", year: 2021, rating: 9.0, genre: "Animation", popularity: 96, seasons: 2, episodes: 18, status: "Ended", image: "https://image.tmdb.org/t/p/w500/fqldf2t8ztc9aiwn3k6mlX3tvRT.jpg", description: "Duas irmãs são separadas por conflitos entre as cidades de Piltover e Zaun, em uma história de poder, tecnologia e família." }
  ];

  const continueWatching = [
    { title: "Succession: Season 4", progress: 78, image: "https://image.tmdb.org/t/p/w500/7HW47XbkNQ5fiwQFYGWdw9gs143.jpg" },
    { title: "The Last of Us: Season 1", progress: 54, image: "https://image.tmdb.org/t/p/w500/uKvVjHNqB5VmOrnxq4Li5Q8eokI.jpg" },
    { title: "The Bear: Season 2", progress: 32, image: "https://image.tmdb.org/t/p/w500/sHFlbKS3WLqMzy7sWVxuj1g7Szk.jpg" }
  ];

  // =========================================================
  // DOM
  // =========================================================

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const content = $("#content");
  const modal = $("#modal");
  const toastElement = $("#toast");
  const originalDashboard = content?.innerHTML || "";

  if (!content) {
    console.error("Screenly: elemento #content não encontrado.");
    return;
  }

  // =========================================================
  // STORAGE
  // =========================================================

  function readStorage(key, fallback) {
    try {
      const value = JSON.parse(localStorage.getItem(key));
      return value === null ? fallback : value;
    } catch {
      return fallback;
    }
  }

  function writeStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Screenly: falha ao salvar ${key}.`, error);
      toast("Não foi possível salvar as alterações.");
      return false;
    }
  }

  const defaultProfile = {
    name: "Cinema Lover",
    username: "cinema_lover",
    bio: "Explorando histórias, universos e grandes obras do cinema.",
    favoriteMovie: "Interstellar",
    favoriteShow: "Breaking Bad",
    favoriteGenre: "Sci-Fi"
  };

  function normalizeProfile(profile) {
    const source = profile && typeof profile === "object" ? profile : {};

    return {
      name: String(source.name || defaultProfile.name).slice(0, 40),
      username: String(source.username || defaultProfile.username)
        .replace(/^@/, "")
        .replace(/[^a-zA-Z0-9_.]/g, "")
        .slice(0, 24),
      bio: String(source.bio || defaultProfile.bio).slice(0, 180),
      favoriteMovie: findMovie(source.favoriteMovie)
        ? source.favoriteMovie
        : defaultProfile.favoriteMovie,
      favoriteShow: findShow(source.favoriteShow)
        ? source.favoriteShow
        : defaultProfile.favoriteShow,
      favoriteGenre: String(source.favoriteGenre || defaultProfile.favoriteGenre)
    };
  }

  const state = {
    watchlist: readStorage(CONFIG.storage.watchlist, []),
    collections: readStorage(CONFIG.storage.collections, []),
    profile: normalizeProfile(readStorage(CONFIG.storage.profile, defaultProfile)),
    currentView: "discover",
    activeCollection: null,
    toastTimer: null,

    movieFilters: {
      genre: "all",
      year: "all",
      rating: "all",
      sort: "popular",
      search: ""
    },

    showFilters: {
      genre: "all",
      year: "all",
      rating: "all",
      sort: "popular",
      status: "all",
      search: ""
    }
  };

  if (!Array.isArray(state.watchlist)) state.watchlist = [];
  if (!Array.isArray(state.collections)) state.collections = [];

  // =========================================================
  // UTILITIES
  // =========================================================

  function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    })[char]);
  }

  function toast(message) {
    if (!toastElement) return;

    toastElement.textContent = message;
    toastElement.classList.add("show");

    clearTimeout(state.toastTimer);

    state.toastTimer = setTimeout(() => {
      toastElement.classList.remove("show");
    }, CONFIG.toastDuration);
  }

  function saveWatchlist() {
    writeStorage(CONFIG.storage.watchlist, state.watchlist);
    updateWatchlistCount();
  }

  function saveCollections() {
    writeStorage(CONFIG.storage.collections, state.collections);
  }

  function saveProfile() {
    return writeStorage(CONFIG.storage.profile, state.profile);
  }

  function updateWatchlistCount() {
    const counter = $("#watch-count");
    if (counter) counter.textContent = state.watchlist.length;
  }

  function getAllTitles() {
    return [...movies, ...tvShows];
  }

  function findMovie(title) {
    return movies.find(item =>
      item.title.toLowerCase() === String(title).toLowerCase()
    );
  }

  function findShow(title) {
    return tvShows.find(item =>
      item.title.toLowerCase() === String(title).toLowerCase()
    );
  }

  function findTitle(title) {
    return findMovie(title) || findShow(title);
  }

  function isShow(item) {
    return tvShows.includes(item);
  }

  function getTitleType(title) {
    return findShow(title) ? "show" : "movie";
  }

  function imageMarkup(item, className = "poster-image") {
    return `
      <img
        class="${className}"
        src="${escapeHTML(item.image)}"
        alt="Pôster de ${escapeHTML(item.title)}"
        loading="lazy"
        onerror="this.removeAttribute('src');this.classList.add('image-fallback')"
      >
    `;
  }

  // =========================================================
  // PROFILE — HELPERS
  // =========================================================

  function getProfileInitials() {
    return state.profile.name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map(part => part.charAt(0).toUpperCase())
      .join("") || "CL";
  }

  function getProfileStats() {
    return {
      watchlist: state.watchlist.length,
      movies: movies.length,
      shows: tvShows.length,
      collections: state.collections.length,
      watching: continueWatching.length
    };
  }

  function getProfileFavorite(item) {
    if (!item) return "";

    return `
      <article class="profile-favorite-card" data-detail="${escapeHTML(item.title)}">
        ${imageMarkup(item, "profile-favorite-image")}
        <div class="profile-favorite-info">
          <span>${isShow(item) ? "FAVORITE SERIES" : "FAVORITE MOVIE"}</span>
          <strong>${escapeHTML(item.title)}</strong>
          <small>${item.year} · ★ ${item.rating.toFixed(1)}</small>
        </div>
      </article>
    `;
  }

  // =========================================================
  // PROFILE — PAGE
  // =========================================================

  function profilePage() {
    const profile = state.profile;
    const stats = getProfileStats();
    const favoriteMovie = findMovie(profile.favoriteMovie);
    const favoriteShow = findShow(profile.favoriteShow);

    const currentShows = continueWatching.map(entry => {
      const title = entry.title.split(":")[0];
      const show = findShow(title);

      return show ? { ...entry, show } : null;
    }).filter(Boolean);

    content.innerHTML = `
      <section class="profile-page">

        <div class="profile-cover">
          <div class="profile-cover-shade"></div>
          <div class="profile-cover-label">SCREENLY / MEMBER PROFILE</div>
          <button class="profile-edit-button" data-edit-profile>
            <span>✎</span> Edit profile
          </button>
        </div>

        <div class="profile-identity">
          <div class="profile-avatar">${escapeHTML(getProfileInitials())}</div>

          <div class="profile-identity-info">
            <span class="section-kicker">YOUR SCREENLY SPACE</span>
            <h1>${escapeHTML(profile.name)}</h1>
            <span class="profile-username">@${escapeHTML(profile.username)}</span>
            <p>${escapeHTML(profile.bio)}</p>
          </div>
        </div>

        <div class="profile-stats">
          <div class="profile-stat">
            <strong>${stats.watchlist}</strong>
            <span>WATCHLIST</span>
          </div>
          <div class="profile-stat">
            <strong>${stats.movies}</strong>
            <span>MOVIES</span>
          </div>
          <div class="profile-stat">
            <strong>${stats.shows}</strong>
            <span>SERIES</span>
          </div>
          <div class="profile-stat">
            <strong>${stats.collections}</strong>
            <span>COLLECTIONS</span>
          </div>
        </div>

        <div class="profile-content-grid">

          <div class="profile-main-column">

            <section class="profile-section">
              <div class="profile-section-heading">
                <div>
                  <span class="section-kicker">PERSONAL TASTE</span>
                  <h2>Favorites</h2>
                </div>
                <span class="profile-section-count">02 TITLES</span>
              </div>

              <div class="profile-favorites">
                ${getProfileFavorite(favoriteMovie)}
                ${getProfileFavorite(favoriteShow)}
              </div>
            </section>

            <section class="profile-section">
              <div class="profile-section-heading">
                <div>
                  <span class="section-kicker">PICK UP WHERE YOU LEFT OFF</span>
                  <h2>Currently watching</h2>
                </div>
                <span class="profile-section-count">${currentShows.length} IN PROGRESS</span>
              </div>

              ${
                currentShows.length
                  ? `
                    <div class="profile-activity-list">
                      ${currentShows.map(entry => `
                        <article class="profile-activity-item"
                          data-detail="${escapeHTML(entry.show.title)}">

                          <img src="${escapeHTML(entry.image)}"
                            alt="${escapeHTML(entry.show.title)}">

                          <div class="profile-activity-info">
                            <strong>${escapeHTML(entry.show.title)}</strong>
                            <span>${escapeHTML(entry.title.split(":").slice(1).join(":").trim())}</span>
                            <div class="profile-progress">
                              <i style="width:${entry.progress}%"></i>
                            </div>
                            <small>${entry.progress}% watched</small>
                          </div>

                          <span class="profile-activity-arrow">›</span>
                        </article>
                      `).join("")}
                    </div>
                  `
                  : `<div class="profile-empty">Nenhum título em andamento.</div>`
              }
            </section>

          </div>

          <aside class="profile-side-column">

            <section class="profile-preferences">
              <span class="section-kicker">YOUR CINEMA DNA</span>
              <h2>Personal taste</h2>

              <div class="profile-preference-row">
                <span>Favorite genre</span>
                <strong>${escapeHTML(profile.favoriteGenre)}</strong>
              </div>

              <div class="profile-preference-row">
                <span>Favorite movie</span>
                <strong>${escapeHTML(profile.favoriteMovie)}</strong>
              </div>

              <div class="profile-preference-row">
                <span>Favorite series</span>
                <strong>${escapeHTML(profile.favoriteShow)}</strong>
              </div>
            </section>

            <section class="profile-library-card">
              <div class="profile-library-icon">▤</div>
              <span class="section-kicker">YOUR COLLECTION</span>
              <h3>Personal library</h3>
              <p>Seus títulos salvos e suas seleções pessoais em um só lugar.</p>

              <button data-view="watchlist">
                Open watchlist <span>→</span>
              </button>

              <button data-view="collections">
                Explore collections <span>→</span>
              </button>
            </section>

            <section class="profile-member-card">
              <span class="section-kicker">SCREENLY MEMBER</span>
              <strong>01</strong>
              <p>Um espaço dedicado às histórias que fazem parte da sua coleção.</p>
            </section>

          </aside>

        </div>
      </section>
    `;
  }

  // =========================================================
  // PROFILE — EDITOR
  // =========================================================

  function openProfileEditor() {
    const profile = state.profile;

    if (!modal) return;

    const titleElement = $("#modal-title");
    const metaElement = $("#modal-meta");
    const descriptionElement = $("#modal-description");
    const artElement = $("#modal-art");
    const addButton = $("#modal-add");

    if (titleElement) titleElement.textContent = "Edit profile";
    if (metaElement) metaElement.textContent = "PERSONALIZE YOUR SCREENLY IDENTITY";
    if (descriptionElement) descriptionElement.textContent = "";
    if (artElement) artElement.style.backgroundImage = "none";

    if (addButton) {
      addButton.style.display = "none";
    }

    let editor = $("#profile-editor");

    if (!editor) {
      editor = document.createElement("div");
      editor.id = "profile-editor";
      editor.className = "profile-editor";
      modal.appendChild(editor);
    }

    editor.innerHTML = `
      <form id="profile-form" class="profile-edit-form">

        <label>
          Display name
          <input type="text" id="profile-name"
            maxlength="40" value="${escapeHTML(profile.name)}" required>
        </label>

        <label>
          Username
          <div class="profile-username-input">
            <span>@</span>
            <input type="text" id="profile-username"
              maxlength="24" value="${escapeHTML(profile.username)}"
              pattern="[a-zA-Z0-9_.]+" required>
          </div>
        </label>

        <label>
          Biography
          <textarea id="profile-bio" maxlength="180"
            rows="3">${escapeHTML(profile.bio)}</textarea>
        </label>

        <label>
          Favorite movie
          <select id="profile-favorite-movie">
            ${movies.map(item => `
              <option value="${escapeHTML(item.title)}"
                ${item.title === profile.favoriteMovie ? "selected" : ""}>
                ${escapeHTML(item.title)}
              </option>
            `).join("")}
          </select>
        </label>

        <label>
          Favorite series
          <select id="profile-favorite-show">
            ${tvShows.map(item => `
              <option value="${escapeHTML(item.title)}"
                ${item.title === profile.favoriteShow ? "selected" : ""}>
                ${escapeHTML(item.title)}
              </option>
            `).join("")}
          </select>
        </label>

        <label>
          Favorite genre
          <select id="profile-favorite-genre">
            ${["Action", "Adventure", "Animation", "Comedy", "Crime", "Drama", "Fantasy", "Horror", "Romance", "Sci-Fi", "Thriller"]
              .map(genre => `
                <option value="${genre}"
                  ${genre === profile.favoriteGenre ? "selected" : ""}>
                  ${genre}
                </option>
              `).join("")}
          </select>
        </label>

        <div class="profile-form-actions">
          <button type="button" class="profile-cancel-button" data-close-profile>
            Cancel
          </button>
          <button type="submit" class="profile-save-button">
            Save changes
          </button>
        </div>

      </form>
    `;

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    editor.style.display = "block";

    if (addButton) addButton.style.display = "none";
  }

  function closeProfileEditor() {
    const editor = $("#profile-editor");
    if (editor) editor.remove();

    const addButton = $("#modal-add");
    if (addButton) addButton.style.display = "";

    closeModal();
  }

  function submitProfile(event) {
    event.preventDefault();

    const name = $("#profile-name")?.value.trim();
    const username = $("#profile-username")?.value.trim().replace(/^@/, "");
    const bio = $("#profile-bio")?.value.trim();
    const favoriteMovie = $("#profile-favorite-movie")?.value;
    const favoriteShow = $("#profile-favorite-show")?.value;
    const favoriteGenre = $("#profile-favorite-genre")?.value;

    if (!name || !username) {
      toast("Preencha seu nome e username.");
      return;
    }

    if (!/^[a-zA-Z0-9_.]+$/.test(username)) {
      toast("O username contém caracteres inválidos.");
      return;
    }

    state.profile = {
      name,
      username,
      bio,
      favoriteMovie,
      favoriteShow,
      favoriteGenre
    };

    if (!saveProfile()) return;

    closeProfileEditor();
    profilePage();
    toast("Perfil atualizado com sucesso.");
  }

  // =========================================================
  // PROFILE — NAVIGATION INJECTION
  // =========================================================

  function injectProfileNavigation() {
    const existing = $('[data-view="profile"]');
    if (existing) return;

    const collectionsItem = $('[data-view="collections"]');
    if (!collectionsItem) {
      console.warn("Screenly: item Collections não encontrado na navegação.");
      return;
    }

    const navItem = document.createElement("button");
    navItem.type = "button";
    navItem.className = "nav-item";
    navItem.dataset.view = "profile";
    navItem.innerHTML = `
      <span class="nav-icon">◉</span>
      <span>My Profile</span>
    `;

    collectionsItem.insertAdjacentElement("afterend", navItem);
  }

  // =========================================================
  // WATCHLIST
  // =========================================================

  function addToWatchlist(title) {
    if (!findTitle(title)) return;

    if (state.watchlist.includes(title)) {
      toast("Este título já está na sua Watchlist.");
      return;
    }

    state.watchlist.push(title);
    saveWatchlist();
    toast(`${title} adicionado à Watchlist.`);

    refreshCurrentView();
    updateModalButton(title);
  }

  function removeFromWatchlist(title) {
    state.watchlist = state.watchlist.filter(item => item !== title);
    saveWatchlist();

    toast("Título removido da Watchlist.");
    refreshCurrentView();
    updateModalButton(title);
  }

  // =========================================================
  // POSTER CARDS
  // =========================================================

  function createPosterCard(item, options = {}) {
    const saved = state.watchlist.includes(item.title);
    const removable = options.removable === true;

    return `
      <article class="poster-card ${isShow(item) ? "show-card" : ""}"
        data-title="${escapeHTML(item.title)}">

        <div class="poster-visual">
          ${imageMarkup(item)}

          <span class="poster-badge">★ ${Number(item.rating).toFixed(1)}</span>

          ${
            removable
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

        <div class="poster-year">
          ${item.year} · ${escapeHTML(item.genre)}
        </div>
      </article>
    `;
  }

  function createMovieCard(movie, options = {}) {
    return createPosterCard(movie, options);
  }

  function createShowCard(show, options = {}) {
    return createPosterCard(show, options);
  }

  // =========================================================
  // DASHBOARD
  // =========================================================

  function renderDashboard() {
    const trending = $("#trending-grid");
    const recommendations = $("#recommend-grid");
    const continueGrid = $("#continue-grid");

    if (trending) {
      trending.innerHTML = movies.slice(0, 5).map(createMovieCard).join("");
    }

    if (recommendations) {
      const selected = [
        movies[5], movies[6], movies[7], movies[1], movies[8]
      ];

      recommendations.innerHTML = selected.map(createMovieCard).join("");
    }

    if (continueGrid) {
      continueGrid.innerHTML = continueWatching.map(item => `
        <article class="continue-card">
          <img class="continue-thumb"
            src="${escapeHTML(item.image)}"
            alt="${escapeHTML(item.title)}"
            loading="lazy">

          <div class="continue-info">
            <strong>${escapeHTML(item.title)}</strong>
            <span>${item.progress}% watched</span>
            <div class="progress">
              <i style="width:${item.progress}%"></i>
            </div>
          </div>

          <span class="continue-arrow">›</span>
        </article>
      `).join("");
    }

    updateWatchlistCount();
  }

  // =========================================================
  // FILTER ENGINE
  // =========================================================

  function applyFilters(items, filters) {
    let result = [...items];

    if (filters.genre !== "all") {
      result = result.filter(item => item.genre === filters.genre);
    }

    if (filters.year !== "all") {
      result = result.filter(item => item.year === Number(filters.year));
    }

    if (filters.rating !== "all") {
      result = result.filter(item => item.rating >= Number(filters.rating));
    }

    if (filters.status && filters.status !== "all") {
      result = result.filter(item => item.status === filters.status);
    }

    if (filters.search) {
      result = result.filter(item =>
        item.title.toLowerCase().includes(filters.search)
      );
    }

    switch (filters.sort) {
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.sort((a, b) => b.year - a.year);
        break;
      case "oldest":
        result.sort((a, b) => a.year - b.year);
        break;
      case "seasons":
        result.sort((a, b) => (b.seasons || 0) - (a.seasons || 0));
        break;
      default:
        result.sort((a, b) => b.popularity - a.popularity);
    }

    return result;
  }

  function getFilteredMovies() {
    return applyFilters(movies, state.movieFilters);
  }

  function getFilteredShows() {
    return applyFilters(tvShows, state.showFilters);
  }

  // =========================================================
  // MOVIES PAGE
  // =========================================================

  function renderMovies() {
    const grid = $("#movies-grid");
    const counter = $("#movies-results");

    if (!grid || !counter) return;

    const result = getFilteredMovies();

    counter.textContent =
      `${result.length} ${result.length === 1 ? "filme encontrado" : "filmes encontrados"}`;

    grid.innerHTML = result.length
      ? result.map(createMovieCard).join("")
      : `
        <div class="empty-state movie-empty">
          <strong>Nenhum filme encontrado</strong>
          Tente alterar os filtros ou pesquisar outro título.
          <button class="clear-filters" data-clear-filters>Limpar filtros</button>
        </div>
      `;
  }

  function resetMovieFilters() {
    state.movieFilters = {
      genre: "all",
      year: "all",
      rating: "all",
      sort: "popular",
      search: ""
    };

    const fields = {
      "movie-search": "",
      "genre-filter": "all",
      "year-filter": "all",
      "rating-filter": "all",
      "sort-filter": "popular"
    };

    Object.entries(fields).forEach(([id, value]) => {
      const element = document.getElementById(id);
      if (element) element.value = value;
    });

    renderMovies();
  }

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

          <div class="movies-total">
            <strong>${movies.length}</strong>
            <span>TITLES IN LIBRARY</span>
          </div>
        </div>

        <div class="movies-toolbar">
          <label class="movie-search">
            <span>⌕</span>
            <input id="movie-search" type="search"
              placeholder="Buscar por título..." autocomplete="off">
          </label>

          <div class="filter-group">
            <select id="genre-filter" aria-label="Filtrar por gênero">
              <option value="all">Todos os gêneros</option>
              ${["Action", "Adventure", "Animation", "Comedy", "Drama", "Fantasy", "Horror", "Romance", "Sci-Fi", "Thriller"]
                .map(value => `<option value="${value}">${value}</option>`).join("")}
            </select>

            <select id="year-filter" aria-label="Filtrar por ano">
              <option value="all">Todos os anos</option>
              ${[2023, 2022, 2021, 2019, 2017, 2016, 2015, 2014, 2013, 2010, 2008, 2000, 1994]
                .map(year => `<option value="${year}">${year}</option>`).join("")}
            </select>

            <select id="rating-filter" aria-label="Filtrar por avaliação">
              <option value="all">Todas as notas</option>
              <option value="7">7.0+ estrelas</option>
              <option value="8">8.0+ estrelas</option>
              <option value="8.5">8.5+ estrelas</option>
              <option value="9">9.0+ estrelas</option>
            </select>

            <select id="sort-filter" aria-label="Ordenar filmes">
              <option value="popular">Mais populares</option>
              <option value="rating">Melhor avaliação</option>
              <option value="newest">Mais recentes</option>
              <option value="oldest">Mais antigos</option>
            </select>
          </div>

          <button class="clear-filters" data-clear-filters>Limpar filtros</button>
        </div>

        <div class="catalog-info">
          <span id="movies-results"></span>
          <span class="catalog-label">DISCOVER SOMETHING NEW</span>
        </div>

        <div class="poster-grid movies-grid" id="movies-grid"></div>
      </section>
    `;

    renderMovies();
  }

  // =========================================================
  // SHOWS PAGE
  // =========================================================

  function renderShows() {
    const grid = $("#shows-grid");
    const counter = $("#shows-results");

    if (!grid || !counter) return;

    const result = getFilteredShows();

    counter.textContent =
      `${result.length} ${result.length === 1 ? "série encontrada" : "séries encontradas"}`;

    grid.innerHTML = result.length
      ? result.map(createShowCard).join("")
      : `
        <div class="empty-state movie-empty">
          <strong>Nenhuma série encontrada</strong>
          Tente alterar os filtros ou pesquisar outro título.
          <button class="clear-filters" data-clear-show-filters>Limpar filtros</button>
        </div>
      `;
  }

  function resetShowFilters() {
    state.showFilters = {
      genre: "all",
      year: "all",
      rating: "all",
      sort: "popular",
      status: "all",
      search: ""
    };

    const fields = {
      "show-search": "",
      "show-genre-filter": "all",
      "show-year-filter": "all",
      "show-rating-filter": "all",
      "show-sort-filter": "popular",
      "show-status-filter": "all"
    };

    Object.entries(fields).forEach(([id, value]) => {
      const element = document.getElementById(id);
      if (element) element.value = value;
    });

    renderShows();
  }

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

          <div class="movies-total">
            <strong>${tvShows.length}</strong>
            <span>SERIES IN LIBRARY</span>
          </div>
        </div>

        <div class="shows-featured">
          <img src="${escapeHTML(featured.image)}"
            alt="${escapeHTML(featured.title)}"
            class="shows-featured-image">

          <div class="shows-featured-overlay"></div>

          <div class="shows-featured-content">
            <span class="section-kicker">SCREENLY FEATURED SERIES</span>
            <h2>${escapeHTML(featured.title)}</h2>

            <div class="shows-featured-meta">
              ${featured.year} <span>·</span>
              ${featured.seasons} temporadas <span>·</span>
              ★ ${featured.rating.toFixed(1)}
            </div>

            <p>${escapeHTML(featured.description)}</p>

            <div class="shows-featured-actions">
              <button class="featured-detail-button"
                data-detail="${escapeHTML(featured.title)}">View details</button>

              <button class="featured-save-button"
                data-add="${escapeHTML(featured.title)}">+ Add to Watchlist</button>
            </div>
          </div>
        </div>

        <div class="movies-toolbar">
          <label class="movie-search">
            <span>⌕</span>
            <input id="show-search" type="search"
              placeholder="Buscar séries..." autocomplete="off">
          </label>

          <div class="filter-group">
            <select id="show-genre-filter">
              <option value="all">Todos os gêneros</option>
              ${["Action", "Animation", "Comedy", "Crime", "Drama", "Fantasy", "Sci-Fi"]
                .map(value => `<option value="${value}">${value}</option>`).join("")}
            </select>

            <select id="show-year-filter">
              <option value="all">Todos os anos</option>
              ${[2023, 2022, 2021, 2019, 2018, 2017, 2016, 2013, 2011, 2008, 2005]
                .map(year => `<option value="${year}">${year}</option>`).join("")}
            </select>

            <select id="show-rating-filter">
              <option value="all">Todas as notas</option>
              <option value="7">7.0+ estrelas</option>
              <option value="8">8.0+ estrelas</option>
              <option value="8.5">8.5+ estrelas</option>
              <option value="9">9.0+ estrelas</option>
            </select>

            <select id="show-status-filter">
              <option value="all">Todas as situações</option>
              <option value="Ended">Finalizadas</option>
              <option value="Returning Series">Em andamento</option>
            </select>

            <select id="show-sort-filter">
              <option value="popular">Mais populares</option>
              <option value="rating">Melhor avaliação</option>
              <option value="newest">Mais recentes</option>
              <option value="oldest">Mais antigas</option>
              <option value="seasons">Mais temporadas</option>
            </select>
          </div>

          <button class="clear-filters" data-clear-show-filters>Limpar filtros</button>
        </div>

        <div class="catalog-info">
          <span id="shows-results"></span>
          <span class="catalog-label">DISCOVER YOUR NEXT SERIES</span>
        </div>

        <div class="poster-grid movies-grid" id="shows-grid"></div>
      </section>
    `;

    renderShows();
  }

  // =========================================================
  // DETAIL MODAL
  // =========================================================

  function updateModalButton(title) {
    const button = $("#modal-add");

    if (!button || !modal?.classList.contains("open")) return;
    if (button.dataset.add !== title) return;

    const saved = state.watchlist.includes(title);

    button.textContent = saved
      ? "✓ Já está na Watchlist"
      : "＋ Add to watchlist";
  }

  function openDetail(title) {
    const item = findTitle(title);
    if (!item || !modal) return;

    $("#profile-editor")?.remove();

    const titleElement = $("#modal-title");
    const metaElement = $("#modal-meta");
    const descriptionElement = $("#modal-description");
    const artElement = $("#modal-art");
    const addButton = $("#modal-add");

    if (titleElement) titleElement.textContent = item.title;

    if (metaElement) {
      metaElement.textContent = isShow(item)
        ? `${item.year} · ${item.genre} · ${item.seasons} temporadas · ${item.episodes} episódios · ★ ${item.rating.toFixed(1)}`
        : `${item.year} · ${item.genre} · ★ ${item.rating.toFixed(1)}`;
    }

    if (descriptionElement) {
      descriptionElement.textContent = item.description;
    }

    if (artElement) {
      artElement.style.backgroundImage = `url("${item.image}")`;
    }

    if (addButton) {
      addButton.style.display = "";
      addButton.dataset.add = item.title;
      updateModalButton(item.title);
    }

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  }

  function closeModal() {
    if (!modal) return;

    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  }

  // =========================================================
  // WATCHLIST PAGE
  // =========================================================

  function watchlistPage() {
    const savedTitles = state.watchlist
      .map(title => findTitle(title))
      .filter(Boolean);

    const savedMovies = savedTitles.filter(item => !isShow(item));
    const savedShows = savedTitles.filter(item => isShow(item));

    const body = savedTitles.length
      ? `
        ${savedMovies.length ? `
          <div class="watchlist-category">
            <h2>Movies <span>${savedMovies.length}</span></h2>
            <div class="poster-grid movies-grid">
              ${savedMovies.map(item => createMovieCard(item, { removable: true })).join("")}
            </div>
          </div>
        ` : ""}

        ${savedShows.length ? `
          <div class="watchlist-category">
            <h2>TV Shows <span>${savedShows.length}</span></h2>
            <div class="poster-grid movies-grid">
              ${savedShows.map(item => createShowCard(item, { removable: true })).join("")}
            </div>
          </div>
        ` : ""}
      `
      : `
        <div class="empty-state">
          <strong>Sua Watchlist está vazia.</strong>
          Explore o catálogo e salve os títulos que deseja assistir.
          <button class="clear-filters" data-view="movies">Explorar filmes</button>
          <button class="clear-filters" data-view="shows">Explorar séries</button>
        </div>
      `;

    content.innerHTML = `
      <section class="movies-page">
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
  // COLLECTIONS — DATA MANAGEMENT
  // =========================================================

  function normalizeCollection(collection) {
    return {
      id: String(collection.id || `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`),
      name: String(collection.name || "Nova coleção"),
      description: String(collection.description || ""),
      titles: Array.isArray(collection.titles)
        ? [...new Set(collection.titles.filter(title => !!findTitle(title)))]
        : [],
      createdAt: collection.createdAt || new Date().toISOString()
    };
  }

  state.collections = state.collections.map(normalizeCollection);

  function getCollection(id) {
    return state.collections.find(item => item.id === id);
  }

  function createCollection(name, description = "") {
    const cleanName = String(name || "").trim();
    const cleanDescription = String(description || "").trim();

    if (!cleanName) {
      toast("Digite um nome para sua coleção.");
      return;
    }

    const exists = state.collections.some(item =>
      item.name.toLowerCase() === cleanName.toLowerCase()
    );

    if (exists) {
      toast("Já existe uma coleção com esse nome.");
      return;
    }

    const collection = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name: cleanName,
      description: cleanDescription,
      titles: [],
      createdAt: new Date().toISOString()
    };

    state.collections.unshift(collection);
    saveCollections();
    collectionsPage();

    toast("Coleção criada com sucesso.");
  }

  function deleteCollection(id) {
    const collection = getCollection(id);
    if (!collection) return;

    if (!confirm(`Excluir a coleção "${collection.name}"?`)) return;

    state.collections = state.collections.filter(item => item.id !== id);
    state.activeCollection = null;

    saveCollections();
    collectionsPage();

    toast("Coleção excluída.");
  }

  function addTitleToCollection(collectionId, title) {
    const collection = getCollection(collectionId);

    if (!collection || !findTitle(title)) return;

    if (collection.titles.includes(title)) {
      toast("Este título já está na coleção.");
      return;
    }

    collection.titles.push(title);
    saveCollections();
    renderActiveCollection();

    toast("Título adicionado à coleção.");
  }

  function removeTitleFromCollection(collectionId, title) {
    const collection = getCollection(collectionId);
    if (!collection) return;

    collection.titles = collection.titles.filter(item => item !== title);

    saveCollections();
    renderActiveCollection();

    toast("Título removido da coleção.");
  }

  // =========================================================
  // COLLECTIONS — ARTWORK
  // =========================================================

  function collectionArtwork(collection) {
    const items = collection.titles
      .map(title => findTitle(title))
      .filter(Boolean)
      .slice(0, 4);

    if (!items.length) {
      return `<div class="collection-art collection-art-empty"><span>✦</span></div>`;
    }

    return `
      <div class="collection-art">
        ${items.map(item => `
          <img src="${escapeHTML(item.image)}"
            alt="${escapeHTML(item.title)}"
            loading="lazy"
            onerror="this.removeAttribute('src')">
        `).join("")}
      </div>
    `;
  }

  // =========================================================
  // COLLECTIONS — MAIN PAGE
  // =========================================================

  function collectionsPage() {
    state.activeCollection = null;

    const collections = state.collections;

    content.innerHTML = `
      <section class="movies-page collections-page">

        <div class="movies-intro">
          <div>
            <span class="section-kicker">YOUR PERSONAL LIBRARY</span>
            <h1>Collections<span>.</span></h1>
            <p>Suas histórias favoritas, organizadas do seu jeito.</p>
          </div>

          <div class="movies-total">
            <strong>${collections.length}</strong>
            <span>YOUR COLLECTIONS</span>
          </div>
        </div>

        <div class="collections-heading">
          <div>
            <span class="section-kicker">PERSONAL LIBRARY</span>
            <h2>Suas coleções</h2>
          </div>

          <button class="collection-create-button" data-create-collection>
            + Nova coleção
          </button>
        </div>

        <form class="collection-create-form" id="collection-form" hidden>
          <div class="collection-form-heading">
            <strong>Criar nova coleção</strong>
            <button type="button" class="collection-form-close"
              data-close-collection-form>×</button>
          </div>

          <label>
            Nome da coleção
            <input type="text" id="collection-name"
              placeholder="Ex.: Obras-primas do cinema"
              maxlength="50" required>
          </label>

          <label>
            Descrição
            <textarea id="collection-description"
              placeholder="Descreva o que reúne esta coleção..."
              maxlength="180" rows="3"></textarea>
          </label>

          <button type="submit" class="collection-submit">
            Criar coleção
          </button>
        </form>

        ${
          collections.length
            ? `
              <div class="collections-grid">
                ${collections.map(collection => `
                  <article class="collection-card">

                    <button class="collection-card-open"
                      data-open-collection="${escapeHTML(collection.id)}"
                      aria-label="Abrir ${escapeHTML(collection.name)}">

                      ${collectionArtwork(collection)}

                      <div class="collection-card-info">
                        <div>
                          <h3>${escapeHTML(collection.name)}</h3>
                          <p>${escapeHTML(collection.description || "Coleção pessoal")}</p>
                        </div>

                        <span class="collection-count">
                          ${collection.titles.length}
                          ${collection.titles.length === 1 ? "TÍTULO" : "TÍTULOS"}
                        </span>
                      </div>
                    </button>

                    <button class="collection-delete"
                      data-delete-collection="${escapeHTML(collection.id)}"
                      title="Excluir coleção"
                      aria-label="Excluir coleção ${escapeHTML(collection.name)}">×</button>

                  </article>
                `).join("")}
              </div>
            `
            : `
              <div class="collections-empty">
                <div class="collections-empty-icon">✦</div>
                <span class="section-kicker">A NEW WAY TO ORGANIZE</span>
                <h2>Sua biblioteca começa aqui.</h2>
                <p>
                  Crie coleções para reunir seus filmes e séries favoritos.
                  Separe por gênero, diretor, universo ou qualquer tema que imaginar.
                </p>
                <button class="collection-create-button" data-create-collection>
                  + Criar minha primeira coleção
                </button>
              </div>
            `
        }

      </section>
    `;
  }

  // =========================================================
  // COLLECTIONS — DETAIL PAGE
  // =========================================================

  function renderActiveCollection() {
    const collection = getCollection(state.activeCollection);

    if (!collection) {
      collectionsPage();
      return;
    }

    const titles = collection.titles
      .map(title => findTitle(title))
      .filter(Boolean);

    const availableTitles = getAllTitles().filter(item =>
      !collection.titles.includes(item.title)
    );

    content.innerHTML = `
      <section class="movies-page collections-page">

        <button class="collection-back" data-back-collections>
          ← Todas as coleções
        </button>

        <div class="movies-intro">
          <div>
            <span class="section-kicker">YOUR PERSONAL COLLECTION</span>
            <h1>${escapeHTML(collection.name)}<span>.</span></h1>
            <p>${escapeHTML(collection.description || "Sua seleção pessoal de títulos.")}</p>
          </div>

          <div class="movies-total">
            <strong>${titles.length}</strong>
            <span>COLLECTED TITLES</span>
          </div>
        </div>

        <div class="collection-detail-toolbar">
          <div>
            <h2>Títulos da coleção</h2>
            <span>${titles.length} itens organizados</span>
          </div>

          <button class="collection-create-button" data-toggle-add-title>
            + Adicionar títulos
          </button>
        </div>

        <div class="collection-add-panel" id="collection-add-panel" hidden>
          <label for="collection-title-select">
            Escolha um filme ou série
          </label>

          <div class="collection-add-controls">
            <select id="collection-title-select">
              <option value="">Selecionar título...</option>
              ${availableTitles.map(item => `
                <option value="${escapeHTML(item.title)}">
                  ${escapeHTML(item.title)} (${isShow(item) ? "Série" : "Filme"})
                </option>
              `).join("")}
            </select>

            <button class="collection-submit" data-confirm-add-title>
              Adicionar
            </button>
          </div>

          ${availableTitles.length
            ? ""
            : "<p>Todos os títulos do catálogo já estão nesta coleção.</p>"}
        </div>

        ${
          titles.length
            ? `
              <div class="poster-grid movies-grid collection-titles-grid">
                ${titles.map(item => `
                  <div class="collection-title-item">
                    ${createPosterCard(item)}

                    <button class="collection-remove-title"
                      data-remove-collection-title="${escapeHTML(item.title)}"
                      title="Remover da coleção">
                      Remover da coleção
                    </button>
                  </div>
                `).join("")}
              </div>
            `
            : `
              <div class="collections-empty collection-detail-empty">
                <div class="collections-empty-icon">＋</div>
                <h2>Esta coleção ainda está vazia.</h2>
                <p>
                  Adicione filmes e séries do catálogo para começar
                  a montar sua seleção.
                </p>
                <button class="collection-create-button" data-toggle-add-title>
                  Adicionar primeiro título
                </button>
              </div>
            `
        }

      </section>
    `;
  }

  // =========================================================
  // NAVIGATION
  // =========================================================

  function navigate(view) {
    if (!CONFIG.views.includes(view)) return;

    state.currentView = view;
    state.activeCollection = null;

    $$(".nav-item").forEach(item => {
      item.classList.toggle("active", item.dataset.view === view);
    });

    $("#sidebar")?.classList.remove("open");

    switch (view) {
      case "discover":
        content.innerHTML = originalDashboard;
        renderDashboard();
        break;
      case "movies":
        moviesPage();
        break;
      case "shows":
        showsPage();
        break;
      case "watchlist":
        watchlistPage();
        break;
      case "collections":
        collectionsPage();
        break;
      case "profile":
        profilePage();
        break;
    }

    closeModal();
  }

  function refreshCurrentView() {
    switch (state.currentView) {
      case "discover":
        renderDashboard();
        break;
      case "movies":
        renderMovies();
        break;
      case "shows":
        renderShows();
        break;
      case "watchlist":
        watchlistPage();
        break;
      case "collections":
        if (state.activeCollection) {
          renderActiveCollection();
        } else {
          collectionsPage();
        }
        break;
      case "profile":
        profilePage();
        break;
    }
  }

  // =========================================================
  // GLOBAL CLICK HANDLER
  // =========================================================

  document.addEventListener("click", event => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const viewButton = target.closest("[data-view]");
    if (viewButton) {
      navigate(viewButton.dataset.view);
      return;
    }

    if (target.closest("[data-edit-profile]")) {
      openProfileEditor();
      return;
    }

    if (target.closest("[data-close-profile]")) {
      closeProfileEditor();
      return;
    }

    if (target.closest("[data-clear-filters]")) {
      resetMovieFilters();
      return;
    }

    if (target.closest("[data-clear-show-filters]")) {
      resetShowFilters();
      return;
    }

    const removeButton = target.closest("[data-remove]");
    if (removeButton) {
      removeFromWatchlist(removeButton.dataset.remove);
      return;
    }

    const addButton = target.closest("[data-add]");
    if (addButton) {
      addToWatchlist(addButton.dataset.add);
      return;
    }

    const detailButton = target.closest("[data-detail]");
    if (detailButton) {
      openDetail(detailButton.dataset.detail);
      return;
    }

    // COLLECTION CREATION

    if (target.closest("[data-create-collection]")) {
      const form = $("#collection-form");

      if (form) {
        form.hidden = false;
        $("#collection-name")?.focus();
      }

      return;
    }

    if (target.closest("[data-close-collection-form]")) {
      const form = $("#collection-form");
      if (form) form.hidden = true;
      return;
    }

    // COLLECTION NAVIGATION

    const openButton = target.closest("[data-open-collection]");
    if (openButton) {
      state.activeCollection = openButton.dataset.openCollection;
      renderActiveCollection();
      return;
    }

    if (target.closest("[data-back-collections]")) {
      collectionsPage();
      return;
    }

    const deleteButton = target.closest("[data-delete-collection]");
    if (deleteButton) {
      deleteCollection(deleteButton.dataset.deleteCollection);
      return;
    }

    // ADD TITLES

    if (target.closest("[data-toggle-add-title]")) {
      const panel = $("#collection-add-panel");
      if (panel) panel.hidden = !panel.hidden;
      return;
    }

    if (target.closest("[data-confirm-add-title]")) {
      const select = $("#collection-title-select");

      if (select?.value) {
        addTitleToCollection(state.activeCollection, select.value);
      } else {
        toast("Selecione um título primeiro.");
      }

      return;
    }

    const removeCollectionTitle = target.closest("[data-remove-collection-title]");
    if (removeCollectionTitle) {
      removeTitleFromCollection(
        state.activeCollection,
        removeCollectionTitle.dataset.removeCollectionTitle
      );
      return;
    }

    // POSTER DETAIL

    const poster = target.closest(".poster-card");
    if (poster && poster.dataset.title) {
      openDetail(poster.dataset.title);
    }
  });

  // =========================================================
  // FORM SUBMISSIONS
  // =========================================================

  document.addEventListener("submit", event => {
    if (event.target.id === "profile-form") {
      submitProfile(event);
      return;
    }

    if (event.target.id !== "collection-form") return;

    event.preventDefault();

    const name = $("#collection-name");
    const description = $("#collection-description");

    createCollection(
      name?.value || "",
      description?.value || ""
    );
  });

  // =========================================================
  // LIVE SEARCH
  // =========================================================

  document.addEventListener("input", event => {
    const id = event.target.id;

    if (id === "movie-search") {
      state.movieFilters.search = event.target.value.trim().toLowerCase();
      renderMovies();
    }

    if (id === "show-search") {
      state.showFilters.search = event.target.value.trim().toLowerCase();
      renderShows();
    }
  });

  // =========================================================
  // FILTER EVENTS
  // =========================================================

  const movieFilterMap = {
    "genre-filter": "genre",
    "year-filter": "year",
    "rating-filter": "rating",
    "sort-filter": "sort"
  };

  const showFilterMap = {
    "show-genre-filter": "genre",
    "show-year-filter": "year",
    "show-rating-filter": "rating",
    "show-sort-filter": "sort",
    "show-status-filter": "status"
  };

  document.addEventListener("change", event => {
    const id = event.target.id;

    if (movieFilterMap[id]) {
      state.movieFilters[movieFilterMap[id]] = event.target.value;
      renderMovies();
      return;
    }

    if (showFilterMap[id]) {
      state.showFilters[showFilterMap[id]] = event.target.value;
      renderShows();
    }
  });

  // =========================================================
  // MOBILE MENU
  // =========================================================

  $("#mobile-menu")?.addEventListener("click", () => {
    $("#sidebar")?.classList.toggle("open");
  });

  // =========================================================
  // NOTIFICATIONS
  // =========================================================

  $("#notifications")?.addEventListener("click", () => {
    toast("Você está em dia com suas notificações.");
  });

  // =========================================================
  // MODAL EVENTS
  // =========================================================

  $("#modal-close")?.addEventListener("click", closeModal);
  $("#modal-close-secondary")?.addEventListener("click", closeModal);

  $("#modal-add")?.addEventListener("click", event => {
    const title = event.currentTarget.dataset.add;
    if (title) addToWatchlist(title);
  });

  modal?.addEventListener("click", event => {
    if (event.target === modal) {
      closeProfileEditor();
    }
  });

  // =========================================================
  // GLOBAL SEARCH
  // =========================================================

  const globalSearch = $("#global-search");

  globalSearch?.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      event.target.value = "";
      return;
    }

    if (event.key !== "Enter") return;

    const query = event.target.value.trim().toLowerCase();
    if (!query) return;

    const match = getAllTitles().find(item =>
      item.title.toLowerCase().includes(query)
    );

    if (match) {
      openDetail(match.title);
    } else {
      toast("Nenhum título encontrado. Tente outra pesquisa.");
    }
  });

  // =========================================================
  // KEYBOARD SHORTCUTS
  // =========================================================

  document.addEventListener("keydown", event => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      globalSearch?.focus();
    }

    if (event.key === "Escape") {
      if ($("#profile-editor")) {
        closeProfileEditor();
      } else {
        closeModal();
      }
    }
  });

  // =========================================================
  // INITIALIZATION
  // =========================================================

  function initialize() {
    injectProfileNavigation();

    updateWatchlistCount();
    renderDashboard();

    // Normaliza dados antigos e persiste a estrutura atual.
    saveCollections();
    saveProfile();
  }

  initialize();

})();
