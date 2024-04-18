import { Types } from "mongoose"

const getBetweenMatch = (item: Record<string, "from" | "to">) =>
  item?.from !== null
    ? item?.to !== null
      ? { $gte: item?.from, $lte: item?.to }
      : { $gte: item?.from }
    : item?.to !== null
    ? { $lte: item?.to }
    : {}

const getQueryAggregateObject = (
  itemObject: Record<string, any> | null,
): { $match: Record<string, any> }[] => {
  if (!itemObject) return []

  const items = Object.keys(itemObject)

  if (items.length === 0) return []

  const query = []
  items.forEach((value) => {
    if (itemObject[value]) {
      const newValue =
        value.indexOf("_ID_ONLY") !== -1 && !!itemObject[value]
          ? {
              $all: [itemObject[value]]
                .flat()
                .map((el) => new Types.ObjectId(el)),
            }
          : value.indexOf("_ID") !== -1 && !!itemObject[value]
          ? {
              $in: [itemObject[value]]
                .flat()
                .map((el) => new Types.ObjectId(el)),
            }
          : itemObject[value].from === null ||
            itemObject[value].to === null ||
            !!itemObject[value]?.from ||
            !!itemObject[value]?.to
          ? getBetweenMatch(itemObject[value])
          : { $in: [itemObject[value]].flat() }

      const newMatch = {
        $match: {
          [value
            .replace("_ID_ONLY", "")
            .replace("_ID", "")
            .replace("_", ".")
            .replace(".id", "_id")]: newValue,
        },
      }

      if (
        Object.keys(
          newMatch.$match[
            value
              .replace("_ID_ONLY", "")
              .replace("_ID", "")
              .replace("_", ".")
              .replace(".id", "_id")
          ],
        ).length !== 0
      )
        query.push(newMatch)
    }
  })

  return query
}

export { getQueryAggregateObject }
