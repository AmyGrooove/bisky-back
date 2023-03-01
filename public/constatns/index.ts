const shikimori_api = 'https://shikimori.one/api/';

const newTitlesUrl = '?season=2023&status=ongoing&order=ranked&limit=15';

const loginValidate = /^[a-zA-Z][a-zA-Z0-9-_\.]{3,20}$/;
const emailValidate = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/;
const passwordValidate = /^.*(?=.{8,})(?=.*[a-zA-Z!#$%&?])(?=.*\d).*$/;

const seasonalTitlesString = 'shiki_id label image score screenshots genres';
const bestTitlesString = 'shiki_id label image';
const searchTitleString = 'shiki_id label image kind status aired_on genres';

export {
  shikimori_api,
  newTitlesUrl,
  loginValidate,
  emailValidate,
  passwordValidate,
  seasonalTitlesString,
  bestTitlesString,
  searchTitleString,
};
