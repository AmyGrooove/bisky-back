const shikimori_api = 'https://shikimori.one/api/';

const newTitlesUrl = '?season=2023&status=ongoing&order=ranked&limit=10';

async function http<T>(url: string): Promise<T> {
  const response = await fetch(url);
  const body = await response.json();
  return body;
}

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function removeKeyFromArrObj(array: any[], element: string) {
  array.forEach((el) => {
    delete el._doc[element];
  });

  return array;
}

function compareArrays(arr1: any[], arr2: any[]) {
  try {
    arr1.forEach((el, index) => {
      if (JSON.stringify(el) !== JSON.stringify(arr2[index])) {
        throw false;
      }
    });
  } catch (e) {
    return false;
  }

  return true;
}

export {
  shikimori_api,
  newTitlesUrl,
  http,
  shuffleArray,
  compareArrays,
  removeKeyFromArrObj,
};
