import { Ref, ref, watch } from "vue"
import { IHouseFullInfo } from "../types/constant"
import { bus, BUS_EVENT } from "./bus"

class SQL {
  isInit = false
  list: Ref<Record<string, IHouseFullInfo>>

  constructor() {
    this.list = ref<Record<string, IHouseFullInfo>>({})
  }
  init(data: Record<string, IHouseFullInfo>) {
    console.warn("history init", data)
    this.list.value = data || {}
    setTimeout(() => (this.isInit = true), 500)
  }
  read(key: string) {
    return this.list.value[key]
  }
  del(key: string) {
    delete this.list.value[key]
  }
  update(key: string, val: IHouseFullInfo) {
    console.warn("SQL update", key, val)
    this.list.value[key] = val
  }
  delAll() {
    this.list.value = {}
  }
}

const history = new SQL()

watch(
  () => history.list,
  () => {
    if (history.isInit) bus.emit(BUS_EVENT.STORE_UPDATE)
  },
  { deep: true }
)

export default history
