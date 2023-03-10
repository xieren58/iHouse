import { ref, watch } from "vue"
import { IHouseBaseInfo, IHouseFullInfo } from "../types/constant"
import House from "./house"
import mitt from "./mitt"
import store from "./store"
import SQL from "./sql"
import { BUS_EVENT, STORE_HOUSE } from "./dict"

export const form = ref<IHouseBaseInfo>({
  id: "",
  originPrice: 200,
  price: 500,
  verifyUnitPrice: 4,
  area: 100,
  isNew: false,
  isFive: true,
  isOnly: true,
  isRelocation: false,
  isFirstRelocation: false,
  age: 2000,
  businessLoanRate: 0.0465,
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