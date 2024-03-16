const getSortQueryAggregate = (itemObject: Record<string, any> | null) => {
  if (!itemObject) return []

  const newObject = {}

  Object.keys(itemObject).forEach((key) => {
    if (itemObject[key] !== null)
      newObject[key.replace("_", ".")] = itemObject[key] ? -1 : 1
  })

  return Object.keys(newObject).length === 0 ? [] : [{ $sort: newObject }]
}

export { getSortQueryAggregate }
