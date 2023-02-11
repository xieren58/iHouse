import { Ref, ref } from "vue"
import { IHouseFullInfo } from "../types/constant"
import { v4 as uuid } from "uuid"

class SQL {
  list: Ref<IHouseFullInfo[]>

  constructor() {
    this.list = ref<IHouseFullInfo[]>([])
  }
  init(data: IHouseFullInfo[]) {
    this.list.value = data || []
  }
  read(key: number) {
    return this.list.value[key]
  }
  del(item: IHouseFullInfo) {
    const index = this.list.value.findIndex(i => i.id === item.id)
    if (index !== -1) this.list.value.splice(index, 1)
  }
  update(item: IHouseFullInfo) {
    if (!item.uuid) item.uuid = uuid()
    const index = this.list.value.findIndex(i => i.id === item.id)
    index === -1 ? this.list.value.unshift(item) : this.list.value[index] = item
  }
  delAll() {
    this.list.value = []
  }
}

export default SQL