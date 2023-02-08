import { ref } from "vue"
import { IStoreItem } from "../types/constant"
import House from "./house"
import mitt from "./mitt"

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