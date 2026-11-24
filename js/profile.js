"use strict;"

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

      <div class="profile-cover" ${profile.cover ? `style="background-image:linear-gradient(90deg,rgba(10,12,16,.72),rgba(10,12,16,.18)),url('${profile.cover}')"` : ""}>
        <div class="profile-cover-shade"></div>
        <div class="profile-cover-label">SCREENLY / MEMBER PROFILE</div>
        <button class="profile-edit-button" data-edit-profile>
          <span>✎</span> Edit profile
        </button>
      </div>

      <div class="profile-identity">
        <div class="profile-avatar">${getAvatarMarkup()}</div>

        <div class="profile-identity-info">
          <span class="section-kicker">YOUR SCREENLY SPACE</span>
          <h1>${escapeHTML(profile.name)}</h1>
          <span class="profile-username">@${escapeHTML(profile.username)}</span>
          <p>${escapeHTML(profile.bio)}</p>
          <span class="profile-member-since">
            <span>✦</span> Membro desde ${formatMemberDate(profile.createdAt)}
          </span>
        </div>
      </div>

      <div class="profile-stats">
        <div class="profile-stat"><strong>${stats.watchlist}</strong><span>WATCHLIST</span></div>
        <div class="profile-stat"><strong>${stats.movies}</strong><span>MOVIES</span></div>
        <div class="profile-stat"><strong>${stats.shows}</strong><span>SERIES</span></div>
        <div class="profile-stat"><strong>${stats.collections}</strong><span>COLLECTIONS</span></div>
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

            ${currentShows.length ? `
              <div class="profile-activity-list">
                ${currentShows.map(entry => `
                  <article class="profile-activity-item" data-detail="${escapeHTML(entry.show.title)}">
                    <img src="${escapeHTML(entry.image)}" alt="${escapeHTML(entry.show.title)}">
                    <div class="profile-activity-info">
                      <strong>${escapeHTML(entry.show.title)}</strong>
                      <span>${escapeHTML(entry.title.split(":").slice(1).join(":").trim())}</span>
                      <div class="profile-progress"><i style="width:${entry.progress}%"></i></div>
                      <small>${entry.progress}% watched</small>
                    </div>
                    <span class="profile-activity-arrow">›</span>
                  </article>
                `).join("")}
              </div>
            ` : `<div class="profile-empty">Nenhum título em andamento.</div>`}
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
            <button data-view="watchlist">Open watchlist <span>→</span></button>
            <button data-view="collections">Explore collections <span>→</span></button>
          </section>

          <section class="profile-member-card">
            <span class="section-kicker">SCREENLY MEMBER</span>
            <strong>${formatMemberDate(profile.createdAt)}</strong>
            <p>Um espaço dedicado às histórias que fazem parte da sua coleção.</p>
          </section>
        </aside>
      </div>
    </section>
  `;
}

// =========================================================
// PROFILE — IMAGE PROCESSING
// =========================================================

function compressImage(file, maxWidth, maxHeight, quality = 0.82) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith("image/")) {
      reject(new Error("Selecione um arquivo de imagem válido."));
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const image = new Image();

      image.onload = () => {
        const ratio = Math.min(
          maxWidth / image.width,
          maxHeight / image.height,
          1
        );

        const canvas = document.createElement("canvas");
        canvas.width = Math.round(image.width * ratio);
        canvas.height = Math.round(image.height * ratio);

        const context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, canvas.width, canvas.height);

        resolve(canvas.toDataURL("image/jpeg", quality));
      };

      image.onerror = () => reject(new Error("Não foi possível processar a imagem."));
      image.src = reader.result;
    };

    reader.onerror = () => reject(new Error("Não foi possível ler o arquivo."));
    reader.readAsDataURL(file);
  });
}

// =========================================================
// PROFILE — EDITOR
// =========================================================

function openProfileEditor() {
  if (!modal) return;

  const profile = state.profile;

  const titleElement = $("#modal-title");
  const metaElement = $("#modal-meta");
  const descriptionElement = $("#modal-description");
  const artElement = $("#modal-art");
  const addButton = $("#modal-add");

  if (titleElement) titleElement.textContent = "Edit profile";
  if (metaElement) metaElement.textContent = "PERSONALIZE YOUR SCREENLY IDENTITY";
  if (descriptionElement) descriptionElement.textContent = "";
  if (artElement) artElement.style.backgroundImage = "none";
  if (addButton) addButton.style.display = "none";

  $("#profile-editor")?.remove();

  const editor = document.createElement("div");
  editor.id = "profile-editor";
  editor.className = "profile-editor";

  editor.innerHTML = `
    <form id="profile-form" class="profile-edit-form">

      <div class="profile-image-editor">
        <div class="profile-image-field">
          <div class="profile-upload-cover" id="cover-preview"
            style="${profile.cover ? `background-image:url('${profile.cover}')` : ""}">
            ${profile.cover ? "" : "<span>CAPA DO PERFIL</span>"}
          </div>
          <label class="profile-upload-button">
            Alterar foto de capa
            <input type="file" id="profile-cover-file" accept="image/*" hidden>
          </label>
        </div>

        <div class="profile-image-field profile-avatar-field">
          <div class="profile-upload-avatar" id="avatar-preview">
            ${profile.avatar
              ? `<img class="profile-upload-avatar-preview" src="${profile.avatar}" alt="Prévia da foto">`
              : escapeHTML(getProfileInitials())}
          </div>
          <label class="profile-upload-button">
            Alterar foto de perfil
            <input type="file" id="profile-avatar-file" accept="image/*" hidden>
          </label>
        </div>
      </div>

      <label>
        Display name
        <input type="text" id="profile-name" maxlength="40"
          value="${escapeHTML(profile.name)}" required>
      </label>

      <label>
        Username
        <div class="profile-username-input">
          <span>@</span>
          <input type="text" id="profile-username" maxlength="24"
            value="${escapeHTML(profile.username)}"
            pattern="[a-zA-Z0-9_.]+" required>
        </div>
      </label>

      <label>
        Biography
        <textarea id="profile-bio" maxlength="180" rows="3">${escapeHTML(profile.bio)}</textarea>
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
              <option value="${genre}" ${genre === profile.favoriteGenre ? "selected" : ""}>
                ${genre}
              </option>
            `).join("")}
        </select>
      </label>

      <div class="profile-form-actions">
        <button type="button" class="profile-cancel-button" data-close-profile>Cancel</button>
        <button type="submit" class="profile-save-button">Save changes</button>
      </div>
    </form>
  `;

  modal.appendChild(editor);
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  editor.style.display = "block";
}

function closeProfileEditor() {
  $("#profile-editor")?.remove();

  const addButton = $("#modal-add");
  if (addButton) addButton.style.display = "";

  closeModal();
}

async function handleProfileImageChange(event, type) {
  const file = event.target.files?.[0];
  if (!file) return;

  try {
    const isCover = type === "cover";
    const data = await compressImage(
      file,
      isCover ? 1600 : 700,
      isCover ? 700 : 700,
      0.82
    );

    if (isCover) {
      state.profile.cover = data;
      const preview = $("#cover-preview");

      if (preview) {
        preview.style.backgroundImage = `url("${data}")`;
        preview.innerHTML = "";
      }
    } else {
      state.profile.avatar = data;
      const preview = $("#avatar-preview");

      if (preview) {
        preview.innerHTML = `<img class="profile-upload-avatar-preview" src="${data}" alt="Prévia da foto">`;
      }
    }

    toast("Imagem atualizada. Salve as alterações do perfil.");
  } catch (error) {
    console.error(error);
    toast(error.message || "Erro ao carregar imagem.");
  }
}

function submitProfile(event) {
  event.preventDefault();

  const name = $("#profile-name")?.value.trim();
  const username = $("#profile-username")?.value.trim().replace(/^@/, "");
  const bio = $("#profile-bio")?.value.trim();

  if (!name || !username) {
    toast("Preencha seu nome e username.");
    return;
  }

  if (!/^[a-zA-Z0-9_.]+$/.test(username)) {
    toast("O username contém caracteres inválidos.");
    return;
  }

  state.profile = {
    ...state.profile,
    name,
    username,
    bio,
    favoriteMovie: $("#profile-favorite-movie")?.value,
    favoriteShow: $("#profile-favorite-show")?.value,
    favoriteGenre: $("#profile-favorite-genre")?.value
  };

  if (!saveProfile()) return;

  closeProfileEditor();
  profilePage();
  toast("Perfil atualizado com sucesso.");
}

// =========================================================
// PROFILE — NAVIGATION
// =========================================================

function injectProfileNavigation() {
  if ($('[data-view="profile"]')) return;

  const collectionsItem = $('[data-view="collections"]');
  if (!collectionsItem) return;

  const navItem = document.createElement("button");
  navItem.type = "button";
  navItem.className = "nav-item";
  navItem.dataset.view = "profile";
  navItem.innerHTML = `<span class="nav-icon">◉</span><span>My Profile</span>`;

  collectionsItem.insertAdjacentElement("afterend", navItem);
}
