import { ref } from "vue"
import { IStoreItem } from "../types/constant"
import House, { DICT } from "./house"
import mitt from "./mitt"
import store from "./store"

export const form = ref({
  name: "House",
  originPrice: 0,
  price: 512,
  verifyPrice: 445,
  area: 81.59,
  isFive: true,
  isOnly: true,
  isRelocation: true,
  isFirstRelocation: true,
  age: 2006,
  businessLoanRate: 0.043,
  providentFundLoanRate: 0.031,
})

export const house = ref<House>()

export const history = ref<IStoreItem[]>([])

export const bus = mitt()

export enum BUS_EVENT {
  SUBMIT = "SUBMIT",
  HISTORY_UPDATE = "HISTORY_UPDATE"
}

const submit = () => {
  const options = form.value
  house.value = new House(options)
  console.warn(form.value)
  store.set(form.value.name, {
    value: form.value,
    display: formatKey()
  })
  // getAll()
  bus.emit(BUS_EVENT.HISTORY_UPDATE)
}

function formatKey() {
  const data = form.value
  const obj: Record<string, string> = {}
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      // @ts-ignore
      obj[DICT[key]] = data[key]
    }
  }
  return obj
}

bus.on(BUS_EVENT.SUBMIT, submit)
