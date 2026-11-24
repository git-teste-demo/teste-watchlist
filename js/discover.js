"use strict;"

function renderDashboard() {
  const trending = $("#trending-grid");
  const recommendations = $("#recommend-grid");
  const continueGrid = $("#continue-grid");

  if (trending) trending.innerHTML = movies.slice(0, 5).map(createMovieCard).join("");

  if (recommendations) {
    recommendations.innerHTML = [movies[5], movies[6], movies[7], movies[1], movies[8]]
      .map(createMovieCard).join("");
  }

  if (continueGrid) {
    continueGrid.innerHTML = continueWatching.map(item => `
      <article class="continue-card">
        <img class="continue-thumb" src="${escapeHTML(item.image)}" alt="${escapeHTML(item.title)}" loading="lazy">
        <div class="continue-info">
          <strong>${escapeHTML(item.title)}</strong>
          <span>${item.progress}% watched</span>
          <div class="progress"><i style="width:${item.progress}%"></i></div>
        </div>
        <span class="continue-arrow">›</span>
      </article>
    `).join("");
  }

  updateWatchlistCount();
}

// =========================================================
// DETAIL MODAL
// =========================================================

function updateModalButton(identifier) {
  const button = $("#modal-add");
  const media = findTitle(identifier);
  if (!button || !media || !modal?.classList.contains("open") || button.dataset.add !== media.title) return;

  button.textContent = state.watchlist.includes(getMediaKey(media))
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

  if (descriptionElement) descriptionElement.textContent = item.description;
  if (artElement) artElement.style.backgroundImage = `url("${item.image}")`;

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
