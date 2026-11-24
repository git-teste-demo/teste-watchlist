"use strict;"

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
    case "movies": moviesPage(); break;
    case "shows": showsPage(); break;
    case "watchlist": watchlistPage(); break;
    case "collections": collectionsPage(); break;
    case "profile": profilePage(); break;
  }

  closeModal();
}

function refreshCurrentView() {
  switch (state.currentView) {
    case "discover": renderDashboard(); break;
    case "movies": renderMovies(); break;
    case "shows": renderShows(); break;
    case "watchlist": watchlistPage(); break;
    case "collections":
      state.activeCollection ? renderActiveCollection() : collectionsPage();
      break;
    case "profile": profilePage(); break;
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

  if (target.closest("[data-toggle-add-title]")) {
    const panel = $("#collection-add-panel");
    if (panel) panel.hidden = !panel.hidden;
    return;
  }

  if (target.closest("[data-confirm-add-title]")) {
    const select = $("#collection-title-select");
    if (select?.value) addTitleToCollection(state.activeCollection, select.value);
    else toast("Selecione um título primeiro.");
    return;
  }

  const removeCollectionTitle = target.closest("[data-remove-collection-title]");
  if (removeCollectionTitle) {
    removeTitleFromCollection(state.activeCollection, removeCollectionTitle.dataset.removeCollectionTitle);
    return;
  }

  const poster = target.closest(".poster-card");
  if (poster && poster.dataset.title) openDetail(poster.dataset.title);
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
  createCollection(
    $("#collection-name")?.value || "",
    $("#collection-description")?.value || ""
  );
});

// =========================================================
// PROFILE IMAGE INPUTS
// =========================================================

document.addEventListener("change", event => {
  if (event.target.id === "profile-avatar-file") {
    handleProfileImageChange(event, "avatar");
  }

  if (event.target.id === "profile-cover-file") {
    handleProfileImageChange(event, "cover");
  }
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

$("#modal-close")?.addEventListener("click", () => {
  if ($("#profile-editor")) closeProfileEditor();
  else closeModal();
});

$("#modal-close-secondary")?.addEventListener("click", () => {
  if ($("#profile-editor")) closeProfileEditor();
  else closeModal();
});

$("#modal-add")?.addEventListener("click", event => {
  const title = event.currentTarget.dataset.add;
  if (title) addToWatchlist(title);
});

modal?.addEventListener("click", event => {
  if (event.target === modal) {
    if ($("#profile-editor")) closeProfileEditor();
    else closeModal();
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

  const match = getAllTitles().find(item => item.title.toLowerCase().includes(query));

  if (match) openDetail(match.title);
  else toast("Nenhum título encontrado. Tente outra pesquisa.");
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
    if ($("#profile-editor")) closeProfileEditor();
    else closeModal();
  }
});

// =========================================================
// INITIALIZATION
// =========================================================

function initialize() {
  injectProfileNavigation();
  injectLayoutProtection();

  updateWatchlistCount();
  renderDashboard();

  // Persiste as migrações sem alterar os dados visíveis do usuário.
  saveWatchlist();
  saveCollections();
  saveProfile();
}

initialize();
