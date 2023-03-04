async function http<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const body = await response.json();
    return body;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function shuffleArray(array: any[]) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

function removeKeyFromArrObj(array: any[], element: string) {
  return array.map((el) => {
    const { _doc, ...rest } = el;
    delete _doc[element];
    return { ...rest, _doc };
  });
}

function compareArrays(arr1: any[], arr2: any[]): boolean {
  return arr1.length === arr2.length && arr1.every((el, i) => el === arr2[i]);
}

const findDuplicates = (arr: any[]): any[] => {
  const seen = new Set();
  const duplicates = new Set();

  arr.forEach((el) => {
    if (seen.has(el)) {
      duplicates.add(el);
    } else {
      seen.add(el);
    }
  });

  return Array.from(duplicates);
};

export {
  http,
  shuffleArray,
  compareArrays,
  removeKeyFromArrObj,
  findDuplicates,
};
