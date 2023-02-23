const shikimori_api = 'https://shikimori.one/api/';

const newTitlesUrl = '?season=2023&status=ongoing&order=ranked&limit=15';

const loginValidate = /^[a-zA-Z][a-zA-Z0-9-_\.]{3,20}$/;
const emailValidate = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/;
const passwordValidate = /^.*(?=.{8,})(?=.*[a-zA-Z!#$%&?])(?=.*\d).*$/;

export {
  shikimori_api,
  newTitlesUrl,
  loginValidate,
  emailValidate,
  passwordValidate,
};
