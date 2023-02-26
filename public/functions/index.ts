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

function compareArrays(arr1: any[], arr2: any[]): boolean {
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

const findDuplicates = (arr: any[]) => {
  const results = [];

  arr.sort().forEach((el, index, sortArray) => {
    if (sortArray[index + 1] !== undefined && el === sortArray[index + 1]) {
      results.push(el);
    }
  });

  return results;
};

export {
  http,
  shuffleArray,
  compareArrays,
  removeKeyFromArrObj,
  findDuplicates,
};
