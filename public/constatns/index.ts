const shikimori_api = 'https://shikimori.one/api/';

const newTitlesUrl = '?season=2023&status=ongoing&order=ranked&limit=15';

const validationRegex = {
  login: /^[a-zA-Z]\w{2,20}$/,
  email: /^[-\w.]+@[a-zA-Z\d][-a-zA-Z\d.]*\.[a-zA-Z]{2,4}$/,
  password: /^(?=.*\p{L})(?=.*\p{N})(?=.*[@$!%*?&]).{8,}$/u,
};

const seasonalTitlesString = 'shiki_id label image score screenshots genres';
const posterTitleString = 'shiki_id label image score kind status aired_on';

const posterTitleObj = {
  shiki_id: 1,
  label: 1,
  image: 1,
  score: 1,
  kind: 1,
  status: 1,
  aired_on: 1,
};

export {
  shikimori_api,
  newTitlesUrl,
  validationRegex,
  seasonalTitlesString,
  posterTitleString,
  posterTitleObj,
};
