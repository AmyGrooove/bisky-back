const getQueryObject = (
  object: Record<string, any> | null,
): Record<string, any> => {
  if (!object) return {}

  const items = Object.keys(object)

  if (items.length === 0) return {}

  const query = { $or: [] }
  items.forEach((value) => {
    if (object[value])
      query.$or.push({
        [value.replace("_", ".").replace(".id", "_id")]: {
          $in: object[value],
        },
      })
  })

  if (query.$or.length === 0) return {}

  return query
}

export { getQueryObject }
