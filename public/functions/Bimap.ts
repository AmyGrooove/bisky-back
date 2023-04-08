interface IBiMap<T, U> {
  set(key: T, value: U): void
  getByKey(key: T): U | undefined
  getByValue(value: U): T | undefined
}

class BiMap<T, U> implements IBiMap<T, U> {
  private map: Map<T, U>
  private inverseMap: Map<U, T>

  constructor(data?: [T, U][]) {
    this.map = new Map<T, U>()
    this.inverseMap = new Map<U, T>()

    if (data) {
      data.forEach(([key, value]) => this.set(key, value))
    }
  }

  set(key: T, value: U): void {
    this.map.set(key, value)
    this.inverseMap.set(value, key)
  }

  getByKey(key: T): U | undefined {
    return this.map.get(key)
  }

  getByValue(value: U): T | undefined {
    return this.inverseMap.get(value)
  }
}

// const letters = new BiMap<string, string>([
//   ["q", "й"],
//   ["w", "ц"],
//   ["e", "у"],
//   ["r", "к"],
//   ["t", "е"],
//   ["y", "н"],
//   ["u", "г"],
//   ["i", "ш"],
//   ["o", "щ"],
//   ["p", "з"],
//   ["[", "х"],
//   ["]", "ъ"],
// ])

export default BiMap
export {}
