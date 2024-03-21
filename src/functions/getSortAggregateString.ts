const getSortAggregateString = (
  query: string,
): [{ $sort: Record<string, -1 | 1> }] => {
  const normalQuery = query.split("_descending")

  return [
    { $sort: { [normalQuery[0]]: normalQuery?.[1] !== undefined ? -1 : 1 } },
  ]
}

export { getSortAggregateString }
