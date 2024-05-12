const compareDates = (
  valueA?: string | Date | null,
  valueB?: string | Date | null,
) => {
  if (!valueA || !valueB) return false

  const convertedValueA = new Date(valueA)
  const convertedValueB = new Date(valueB)

  convertedValueA.setHours(0, 0, 0, 0)
  convertedValueB.setHours(0, 0, 0, 0)

  return convertedValueA.toISOString() === convertedValueB.toISOString()
}

export { compareDates }
