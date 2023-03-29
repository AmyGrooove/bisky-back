const shikimori_api = 'https://shikimori.one/api/';

const newTitlesUrl = '?season=2023&status=ongoing&order=ranked&limit=15';

const validationRegex = {
  login: /^[a-zA-Z]\w{2,20}$/,
  email: /^[-\w.]+@[a-zA-Z\d][-a-zA-Z\d.]*\.[a-zA-Z]{2,4}$/,
  password: /^(?=.*\p{L})(?=.*\p{N})(?=.*[@$!%*?&]).{8,}$/u,
};

const posterTitleObj = {
  _id: 0,
  shiki_id: 1,
  labels: { $slice: ['$labels', 2] },
  poster: 1,
  scores: 1,
  kind: 1,
  status: 1,
  dates: 1,
};

export { shikimori_api, newTitlesUrl, validationRegex, posterTitleObj };
