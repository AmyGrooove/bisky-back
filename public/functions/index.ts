async function http<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const body = await response.json()
    return body
  } catch (error) {
    console.error(error)
    throw error
  }
}

const getUsedAnimeString = (usedAnimes: string) => {
  return usedAnimes !== undefined
    ? JSON.parse(
        usedAnimes.includes("[") && usedAnimes.endsWith("]")
          ? usedAnimes
          : `[${usedAnimes}]`,
      )
    : []
}

export { http, getUsedAnimeString }
