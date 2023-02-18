const shikimori_api = 'https://shikimori.one/api/';

async function http<T>(url: string): Promise<T> {
  const response = await fetch(url);
  const body = await response.json();
  return body;
}

export { shikimori_api, http };
