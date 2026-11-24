"use strict;"

// =========================================================
// SCREENLY — APPLICATION CORE
// =========================================================

// Os dados locais usam chaves no formato "tipo:id".
// Quando TMDB/Jikan forem conectados, providerId receberá o ID original da API.
const CONFIG = {
  storage: {
    watchlist: "screenly-watchlist",
    collections: "screenly-collections",
    profile: "screenly-profile"
  },
  views: ["discover", "movies", "shows", "watchlist", "collections", "profile"],
  mediaTypes: { movie: "movie", show: "tv", anime: "anime" },
  storageVersion: 2,
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
  { title: "Succession: Season 4", progress: 78, image: tvShows[2].image },
  { title: "The Last of Us: Season 1", progress: 54, image: tvShows[1].image },
  { title: "The Bear: Season 2", progress: 32, image: tvShows[3].image }
];

// =========================================================
// MEDIA IDENTITY — API-READY CATALOG CONTRACT
// =========================================================

function createLocalMediaId(title) {
  return String(title || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function prepareCatalog(items, mediaType) {
  items.forEach(item => {
    item.mediaType = mediaType;
    item.id = item.id || createLocalMediaId(item.title);
    item.provider = item.provider || "local";
  });
}

prepareCatalog(movies, CONFIG.mediaTypes.movie);
prepareCatalog(tvShows, CONFIG.mediaTypes.show);

function getMediaKey(item) {
  if (!item) return "";
  const identifier = item.providerId ?? item.id ?? createLocalMediaId(item.title);
  return `${item.mediaType || (isShow(item) ? CONFIG.mediaTypes.show : CONFIG.mediaTypes.movie)}:${identifier}`;
}
