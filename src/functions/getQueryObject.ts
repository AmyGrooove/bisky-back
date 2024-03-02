const getQueryObject = (object: Record<string, any>): Record<string, any> => {
  const items = Object.keys(object)

  if (items.length === 0) return {}

  const query = { $or: [] }
  items.forEach((value) => {
    query.$or.push({ [value]: { $in: object[value] } })
  })

  return query
}

export { getQueryObject }
