import { ref, watch } from "vue"
import { IEventBusParam, IHouseBaseInfo, IHouseFullInfo, IStoreItem } from "../types/constant"
import House, { DICT } from "./house"
import mitt from "./mitt"
import store from "./store"
// import { uuid } from 'uuidv4';
import history from "./history"

export const form = ref<IHouseBaseInfo>({
  uuid: "21321323",
  // mark: "House",
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

watch(() => form.value.uuid, (newVal) => {
  form.value.isCollected = !!history.read(newVal)
})

export const house = ref<House>()

// export const history = ref<IStoreItem[]>([])

export const bus = mitt()

export enum BUS_EVENT {
  SUBMIT = "SUBMIT",
  COLLECT = "COLLECT",
  UN_COLLECT = "UN_COLLECT",
  STORE_UPDATE = "STORE_UPDATE",
  HISTORY_INIT = "HISTORY_INIT",
  HISTORY_SHOW = "HISTORY_SHOW"
}

export const STORE_HOUSE = "STORE_HOUSE"

const submit = () => {
  const options = form.value
  house.value = new House(options)
  console.warn(form.value)
  // store.set(form.value.mark, {
  //   value: form.value,
  //   display: formatKey()
  // })
  // getAll()
  // bus.emit(BUS_EVENT.HISTORY_UPDATE)
}

const collect = (param: IEventBusParam) => {
  const { uuid, val } = param
  console.warn(888, param)
  history.update(uuid, val)
  console.log(history.list.value)
}

const unCollect = (uuid: string) => {
  console.warn(999, uuid)
  history.del(uuid)
  console.log(history.list.value)
}

bus.on(BUS_EVENT.SUBMIT, submit)
bus.on(BUS_EVENT.COLLECT, (param) => collect(param as IEventBusParam))
bus.on(BUS_EVENT.UN_COLLECT, (param) => unCollect(param as string))
bus.on(BUS_EVENT.STORE_UPDATE, () => {
  console.log(BUS_EVENT.STORE_UPDATE, history.list.value)
  store.set(STORE_HOUSE, history.list.value)
})

bus.on(BUS_EVENT.HISTORY_INIT, () => history.init(store.get(STORE_HOUSE)))
bus.on(BUS_EVENT.HISTORY_INIT, () => history.init(store.get(STORE_HOUSE)))