const getSortQueryAggregate = (
  itemObject: Record<string, any> | null,
  isPaginationOff = false,
) => {
  if (!itemObject) return []

  const newObject = {}

  Object.keys(itemObject).forEach((key) => {
    if (itemObject[key] !== null)
      newObject[key.replace("_", ".")] = itemObject[key] ? -1 : 1
  })

  if (!isPaginationOff) newObject["shikiId"] = 1

  return Object.keys(newObject).length === 0 ? [] : [{ $sort: newObject }]
}

export { getSortQueryAggregate }
