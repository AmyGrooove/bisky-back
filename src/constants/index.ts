const shikimori_api = 'https://shikimori.one/api/';

function api<T>(url: string): Promise<T> {
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}

export { shikimori_api, api };
