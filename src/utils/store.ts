/**
 * 自定义存储器，基于 LocalStorage
 */
export default {
  get(key: string) {
    const value = parse(localStorage.getItem(key) || "null")

    if (value && value.timestamp && Date.now() <= value.timestamp) {
      return value.payload
    } else if (value && value.timestamp) {
      return this.remove(key)
    } else if (value) {
      return value.payload
    } else {
      return null
    }
  },
  set(key: string, value: any, expire?: string) {
    try {
      const val = expire
        ? {
            payload: value,
            timestamp: Date.now() + toSecond(expire),
          }
        : {
            payload: value,
          }

      localStorage.setItem(key, JSON.stringify(val))
    } catch (err) {
      throw err
    }
  },
  remove(key: string) {
    localStorage.removeItem(key)
  },
  clear() {
    localStorage.clear()
  },
  getAll() {
    const len = localStorage.length
    const arr = []
    for (let i = 0; i < len; i++) {
      const key = localStorage.key(i)!
      const val = this.get(key!)
      arr[i] = {
        key,
        val,
      }
    }
    return arr
  },
}

function toSecond(val: string) {
  const [unit, ...tail] = val.trim().split("").reverse()
  const number = parseInt(tail.reverse().join(""), 10)

  switch (unit.toUpperCase()) {
    case "S":
      return number * 1000
    case "M":
      return number * 60000
    case "H":
      return number * 3600000
    case "D":
      return number * 86400000
    default:
      throw new Error("Invalid argument format.")
  }
}

function parse(text: string) {
  try {
    return JSON.parse(text)
  } catch (err) {
    return null
  }
}
