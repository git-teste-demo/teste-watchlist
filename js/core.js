"use strict;"

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const content = $("#content");
const modal = $("#modal");
const toastElement = $("#toast");
const originalDashboard = content?.innerHTML || "";

if (!content) {
  console.error("Screenly: elemento #content não encontrado.");
}

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
    toast("Não foi possível salvar. A imagem pode ser muito grande.");
    return false;
  }
}

const defaultProfile = {
  name: "Cinema Lover",
  username: "cinema_lover",
  bio: "Explorando histórias, universos e grandes obras do cinema.",
  favoriteMovie: "Interstellar",
  favoriteShow: "Breaking Bad",
  favoriteGenre: "Sci-Fi",
  createdAt: new Date().toISOString(),
  avatar: "",
  cover: ""
};

function normalizeProfile(profile) {
  const source = profile && typeof profile === "object" ? profile : {};

  return {
    name: String(source.name || defaultProfile.name).slice(0, 40),
    username: String(source.username || defaultProfile.username)
      .replace(/^@/, "").replace(/[^a-zA-Z0-9_.]/g, "").slice(0, 24),
    bio: String(source.bio || defaultProfile.bio).slice(0, 180),
    favoriteMovie: findMovie(source.favoriteMovie) ? source.favoriteMovie : defaultProfile.favoriteMovie,
    favoriteShow: findShow(source.favoriteShow) ? source.favoriteShow : defaultProfile.favoriteShow,
    favoriteGenre: String(source.favoriteGenre || defaultProfile.favoriteGenre),
    createdAt: source.createdAt || new Date().toISOString(),
    avatar: typeof source.avatar === "string" ? source.avatar : "",
    cover: typeof source.cover === "string" ? source.cover : ""
  };
}

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  })[char]);
}

function toast(message) {
  if (!toastElement) return;
  toastElement.textContent = message;
  toastElement.classList.add("show");
  clearTimeout(state.toastTimer);
  state.toastTimer = setTimeout(() => toastElement.classList.remove("show"), CONFIG.toastDuration);
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
  return movies.find(item => item.title.toLowerCase() === String(title).toLowerCase());
}

function findShow(title) {
  return tvShows.find(item => item.title.toLowerCase() === String(title).toLowerCase());
}

function findTitle(identifier) {
  const value = String(identifier ?? "");
  if (!value) return null;

  if (value.includes(":")) {
    const [mediaType, ...parts] = value.split(":");
    const mediaId = parts.join(":");
    return getAllTitles().find(item =>
      item.mediaType === mediaType && String(item.providerId ?? item.id) === mediaId
    ) || null;
  }

  return findMovie(value) || findShow(value);
}

function isShow(item) {
  return item?.mediaType === CONFIG.mediaTypes.show || tvShows.includes(item);
}

function normalizeMediaReferences(values) {
  if (!Array.isArray(values)) return [];
  return [...new Set(values
    .map(value => findTitle(value))
    .filter(Boolean)
    .map(getMediaKey))];
}

function imageMarkup(item, className = "poster-image") {
  return `
    <img class="${className}"
      src="${escapeHTML(item.image)}"
      alt="Pôster de ${escapeHTML(item.title)}"
      loading="lazy"
      onerror="this.removeAttribute('src');this.classList.add('image-fallback')">
  `;
}

function formatMemberDate(date) {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "Data indisponível";

  return parsed.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });
}
