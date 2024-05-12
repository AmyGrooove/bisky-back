const genresGetQuery = (type: "Anime" | "Manga" = "Anime") => `{
  genres(entryType: ${type}) {
    entryType
    id
    kind
    name
    russian
  }
}`

export { genresGetQuery }
