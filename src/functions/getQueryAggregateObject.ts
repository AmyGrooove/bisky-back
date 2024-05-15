import { Types } from "mongoose"

interface ItemRange {
  from: string | null
  to: string | null
}

const getBetweenMatch = ({ from, to }: ItemRange) => {
  const match: Record<string, any> = {}

  if (from !== null) match.$gte = from
  if (to !== null) match.$lte = to

  return match
}

const getQueryAggregateObject = (
  itemObject: Record<string, any> | null,
  isReverse = false,
): { $match: Record<string, any> }[] => {
  if (!itemObject) return []

  const query: { $match: Record<string, any> }[] = []

  Object.entries(itemObject).forEach(([key, value]) => {
    if (!value) return

    try {
      const isIDOnly = key.includes("_ID_ONLY")
      const isID = key.includes("_ID")

      const operator = isReverse ? "$nin" : isIDOnly ? "$all" : "$in"

      let newValue: any

      if (isIDOnly || isID)
        newValue = {
          [operator]: [value]
            .flat()
            .map((el: string) => new Types.ObjectId(el)),
        }
      else if (
        value.from === null ||
        value.to === null ||
        value.from ||
        value.to
      )
        newValue = getBetweenMatch(value)
      else newValue = { [operator]: [value].flat() }

      const newMatchKey = key
        .replace("_ID_ONLY", "")
        .replace("_ID", "")
        .replace("_", ".")
        .replace(".id", "_id")

      const newMatch: { $match: Record<string, any> } = {
        $match: { [newMatchKey]: newValue },
      }

      if (Object.keys(newValue).length !== 0) query.push(newMatch)
    } catch (error) {
      console.error(error)

      return
    }
  })

  return query
}

export { getQueryAggregateObject }
