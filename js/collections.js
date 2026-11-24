"use strict;"

function normalizeCollection(collection) {
  return {
    id: String(collection.id || `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`),
    name: String(collection.name || "Nova coleção"),
    description: String(collection.description || ""),
    titles: normalizeMediaReferences(collection.titles),
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

  if (state.collections.some(item => item.name.toLowerCase() === cleanName.toLowerCase())) {
    toast("Já existe uma coleção com esse nome.");
    return;
  }

  state.collections.unshift({
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: cleanName,
    description: cleanDescription,
    titles: [],
    createdAt: new Date().toISOString()
  });

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

function addTitleToCollection(collectionId, identifier) {
  const collection = getCollection(collectionId);
  const media = findTitle(identifier);
  if (!collection || !media) return;

  const mediaKey = getMediaKey(media);
  if (collection.titles.includes(mediaKey)) {
    toast("Este título já está na coleção.");
    return;
  }

  collection.titles.push(mediaKey);
  saveCollections();
  renderActiveCollection();
  toast("Título adicionado à coleção.");
}

function removeTitleFromCollection(collectionId, identifier) {
  const collection = getCollection(collectionId);
  const media = findTitle(identifier);
  if (!collection || !media) return;

  const mediaKey = getMediaKey(media);
  collection.titles = collection.titles.filter(item => item !== mediaKey);
  saveCollections();
  renderActiveCollection();
  toast("Título removido da coleção.");
}

// =========================================================
// COLLECTIONS — ARTWORK
// =========================================================

function collectionArtwork(collection) {
  const items = collection.titles.map(findTitle).filter(Boolean).slice(0, 4);

  if (!items.length) {
    return `<div class="collection-art collection-art-empty"><span>✦</span></div>`;
  }

  return `
    <div class="collection-art">
      ${items.map(item => `
        <img src="${escapeHTML(item.image)}" alt="${escapeHTML(item.title)}" loading="lazy"
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
        <div class="movies-total"><strong>${collections.length}</strong><span>YOUR COLLECTIONS</span></div>
      </div>

      <div class="collections-heading">
        <div>
          <span class="section-kicker">PERSONAL LIBRARY</span>
          <h2>Suas coleções</h2>
        </div>
        <button class="collection-create-button" data-create-collection>+ Nova coleção</button>
      </div>

      <form class="collection-create-form" id="collection-form" hidden>
        <div class="collection-form-heading">
          <strong>Criar nova coleção</strong>
          <button type="button" class="collection-form-close" data-close-collection-form>×</button>
        </div>
        <label>Nome da coleção
          <input type="text" id="collection-name" placeholder="Ex.: Obras-primas do cinema" maxlength="50" required>
        </label>
        <label>Descrição
          <textarea id="collection-description" placeholder="Descreva o que reúne esta coleção..." maxlength="180" rows="3"></textarea>
        </label>
        <button type="submit" class="collection-submit">Criar coleção</button>
      </form>

      ${collections.length ? `
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
                  <span class="collection-count">${collection.titles.length} ${collection.titles.length === 1 ? "TÍTULO" : "TÍTULOS"}</span>
                </div>
              </button>
              <button class="collection-delete" data-delete-collection="${escapeHTML(collection.id)}"
                title="Excluir coleção" aria-label="Excluir coleção ${escapeHTML(collection.name)}">×</button>
            </article>
          `).join("")}
        </div>
      ` : `
        <div class="collections-empty">
          <div class="collections-empty-icon">✦</div>
          <span class="section-kicker">A NEW WAY TO ORGANIZE</span>
          <h2>Sua biblioteca começa aqui.</h2>
          <p>Crie coleções para reunir seus filmes e séries favoritos. Separe por gênero, diretor, universo ou qualquer tema que imaginar.</p>
          <button class="collection-create-button" data-create-collection>+ Criar minha primeira coleção</button>
        </div>
      `}
    </section>
  `;
}

// =========================================================
// COLLECTIONS — DETAIL
// =========================================================

function renderActiveCollection() {
  const collection = getCollection(state.activeCollection);
  if (!collection) {
    collectionsPage();
    return;
  }

  const titles = collection.titles.map(findTitle).filter(Boolean);
  const availableTitles = getAllTitles().filter(item => !collection.titles.includes(getMediaKey(item)));

  content.innerHTML = `
    <section class="movies-page collections-page">
      <button class="collection-back" data-back-collections>← Todas as coleções</button>

      <div class="movies-intro">
        <div>
          <span class="section-kicker">YOUR PERSONAL COLLECTION</span>
          <h1>${escapeHTML(collection.name)}<span>.</span></h1>
          <p>${escapeHTML(collection.description || "Sua seleção pessoal de títulos.")}</p>
        </div>
        <div class="movies-total"><strong>${titles.length}</strong><span>COLLECTED TITLES</span></div>
      </div>

      <div class="collection-detail-toolbar">
        <div><h2>Títulos da coleção</h2><span>${titles.length} itens organizados</span></div>
        <button class="collection-create-button" data-toggle-add-title>+ Adicionar títulos</button>
      </div>

      <div class="collection-add-panel" id="collection-add-panel" hidden>
        <label for="collection-title-select">Escolha um filme ou série</label>
        <div class="collection-add-controls">
          <select id="collection-title-select">
            <option value="">Selecionar título...</option>
            ${availableTitles.map(item => `<option value="${escapeHTML(item.title)}">${escapeHTML(item.title)} (${isShow(item) ? "Série" : "Filme"})</option>`).join("")}
          </select>
          <button class="collection-submit" data-confirm-add-title>Adicionar</button>
        </div>
        ${availableTitles.length ? "" : "<p>Todos os títulos do catálogo já estão nesta coleção.</p>"}
      </div>

      ${titles.length ? `
        <div class="poster-grid movies-grid collection-titles-grid">
          ${titles.map(item => `
            <div class="collection-title-item">
              ${createPosterCard(item)}
              <button class="collection-remove-title"
                data-remove-collection-title="${escapeHTML(item.title)}"
                title="Remover da coleção">Remover da coleção</button>
            </div>
          `).join("")}
        </div>
      ` : `
        <div class="collections-empty collection-detail-empty">
          <div class="collections-empty-icon">＋</div>
          <h2>Esta coleção ainda está vazia.</h2>
          <p>Adicione filmes e séries do catálogo para começar a montar sua seleção.</p>
          <button class="collection-create-button" data-toggle-add-title>Adicionar primeiro título</button>
        </div>
      `}
    </section>
  `;
}
