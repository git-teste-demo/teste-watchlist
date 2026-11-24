"use strict;"

function injectLayoutProtection() {
  if ($("#screenly-layout-protection")) return;

  const style = document.createElement("style");
  style.id = "screenly-layout-protection";
  style.textContent = `
    .watchlist-category .poster-grid,
    .collection-titles-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(145px, 185px));
      align-items: start;
      gap: 24px;
    }

    .watchlist-category .poster-card,
    .collection-titles-grid .poster-card {
      width: 100%;
      min-width: 0;
      max-width: 185px;
    }

    .watchlist-category .poster-visual,
    .collection-titles-grid .poster-visual {
      position: relative;
      width: 100%;
      aspect-ratio: 2 / 3;
      overflow: hidden;
    }

    .watchlist-category .poster-image,
    .collection-titles-grid .poster-image {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .profile-avatar-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
    }

    .profile-cover {
      background-size: cover;
      background-position: center;
    }

    .profile-upload-preview {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .profile-upload-avatar-preview {
      width: 76px;
      height: 76px;
      border-radius: 50%;
      object-fit: cover;
    }

    .collection-art img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  `;

  document.head.appendChild(style);
}

// =========================================================
// PROFILE — HELPERS
// =========================================================

function getProfileInitials() {
  return state.profile.name.trim().split(/\s+/).slice(0, 2)
    .map(part => part.charAt(0).toUpperCase()).join("") || "CL";
}

function getAvatarMarkup() {
  if (state.profile.avatar) {
    return `<img class="profile-avatar-image" src="${state.profile.avatar}" alt="Foto de perfil">`;
  }

  return escapeHTML(getProfileInitials());
}

function getProfileStats() {
  return {
    watchlist: state.watchlist.length,
    movies: movies.length,
    shows: tvShows.length,
    collections: state.collections.length
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
