"use strict;"

const state = {
  watchlist: readStorage(CONFIG.storage.watchlist, []),
  collections: readStorage(CONFIG.storage.collections, []),
  profile: normalizeProfile(readStorage(CONFIG.storage.profile, defaultProfile)),
  currentView: "discover",
  activeCollection: null,
  toastTimer: null,
  movieFilters: { genre: "all", year: "all", rating: "all", sort: "popular", search: "" },
  showFilters: { genre: "all", year: "all", rating: "all", sort: "popular", status: "all", search: "" }
};

if (!Array.isArray(state.watchlist)) state.watchlist = [];
if (!Array.isArray(state.collections)) state.collections = [];

// Migra automaticamente os títulos antigos para chaves estáveis (tipo:id).
// O usuário não perde os dados já salvos no navegador.
state.watchlist = normalizeMediaReferences(state.watchlist);
