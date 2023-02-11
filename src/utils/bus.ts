import { ref, watch } from "vue"
import { IHouseBaseInfo, IHouseFullInfo } from "../types/constant"
import House from "./house"
import mitt from "./mitt"
import store from "./store"
import SQL from "./sql"
import { BUS_EVENT, STORE_HOUSE } from "./dict"

export const form = ref<IHouseBaseInfo>({
  id: "21321323",
  originPrice: 0,
  price: 512,
  verifyUnitPrice: 5.45,
  area: 81.59,
  isNew: false,
  isCollected: false,
  isFive: true,
  isOnly: true,
  isRelocation: true,
  isFirstRelocation: true,
  age: 2006,
  businessLoanRate: 0.043,
  providentFundLoanRate: 0.031,
})

export const house = ref<House>()

export const bus = mitt()

export const history = new SQL()

watch(
  () => history.list,
  () => store.set(STORE_HOUSE, history.list.value),
  { deep: true }
)

const submit = () => {
  const options = form.value
  house.value = new House(options)
}

const collect = (item: IHouseFullInfo) => {
  history.update(JSON.parse(JSON.stringify(item)))
}

bus.on(BUS_EVENT.SUBMIT, submit)
bus.on(BUS_EVENT.COLLECT, (item) => collect(item as IHouseFullInfo))
bus.on(BUS_EVENT.HISTORY_INIT, () => history.init(store.get(STORE_HOUSE)))