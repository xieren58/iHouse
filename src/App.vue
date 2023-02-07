<script setup lang="ts">
import { onMounted, ref } from "vue"
import House, { DICT } from "./utils/house"
import store from "./utils/store"

interface IStoreItem {
  key: string
  val: any
}

const form = ref({
    name: "美林",
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

const history = ref<IStoreItem[]>([])

const submit = () => {
  const options = form.value
  const house = new House(options)
  const output = house.log()
  document.getElementById("output")!.innerHTML = output
  console.warn(form.value)
  store.set(form.value.name, {
    value: form.value,
    display: formatKey()
  })
  getAll()
}

const formatKey = () => {
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

const onHistoryClk = (item: IStoreItem) => {
  console.log(item)
  form.value = item.val.value
  submit()
}

const getAll = () => {
  history.value = store.getAll()
}

const clearAll = () => {
  store.clear()
  getAll()
}

onMounted(() => {
  getAll()
})
</script>

<template>
  <div class="layout">
    <h1>输入</h1>
    <div>
      <label>{{ DICT.name }}</label>
      <input type="text" v-model="form.name" />
    </div>
    <div>
      <label>{{ DICT.originPrice }} </label>
      <input type="text" v-model="form.originPrice" />
    </div>
    <div>
      <label>{{ DICT.price }} </label>
      <input type="text" v-model="form.price" />
    </div>
    <div>
      <label>{{ DICT.verifyPrice }} </label>
      <input type="text" v-model="form.verifyPrice" />
    </div>
    <div><label>{{ DICT.area }} </label> <input type="text" v-model="form.area" /></div>
    <div><label>{{ DICT.isFive }} </label> <input type="checkbox" v-model="form.isFive" /></div>
    <div><label>{{ DICT.isOnly }} </label> <input type="checkbox" v-model="form.isOnly" /></div>
    <div><label>{{ DICT.isRelocation }} </label> <input type="checkbox" v-model="form.isRelocation" /></div>
    <div><label>{{ DICT.isFirstRelocation }}  </label> <input type="checkbox" v-model="form.isFirstRelocation" /></div>
    <div><label>{{ DICT.age }}  </label> <input type="text" v-model="form.age" /></div>
    <div><label>{{ DICT.businessLoanRate }}  </label> <input type="text" v-model="form.businessLoanRate" /></div>
    <div><label>{{ DICT.providentFundLoanRate }}  </label> <input type="text" v-model="form.providentFundLoanRate" /></div>
    <button @click="submit">计算</button>
    <button @click="clearAll">清空记录</button>
    <h1>输出</h1>
    <div id="output"></div>
    <h1>历史</h1>
    <table>
      <th>名称</th>
      <th>信息</th>
      <tr v-for="item in history" @click="onHistoryClk(item)">
        <td>{{ item.key }}</td>
        <td>{{ item.val.display }}</td>
      </tr>
    </table>
  </div>
</template>

<style scoped lang="scss">
.layout {
  text-align: left;
}
#output {
  white-space: pre-wrap;
}
</style>
