<script setup lang="ts">
import { onMounted, ref } from "vue"
import IHeader from "./components/header.vue"
import IInput from "./components/input.vue"
import House, { DICT } from "./utils/house"
import store from "./utils/store"
import { bus, form, house } from './utils/bus'

// const history = ref<IStoreItem[]>([])

// const getAll = () => {
//   history.value = store.getAll()
// }

// const clearAll = () => {
//   store.clear()
//   getAll()
// }

onMounted(() => {
  bus.emit("GET_HISTORY")
})
</script>

<template>
  <div class="layout">
    <i-header></i-header>
    <main class="main">
      <i-input></i-input>
    </main>
  </div>

  <!-- <div class="layout">
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
  </div> -->
</template>

<style scoped lang="scss">
.layout {
  width: 750px;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  background: #444C60;
  text-align: left;
  margin: 0 auto;
}

.main {
  flex: 1;
  width: 750px;
  background: #EDEDED;
  box-shadow: 0px 0px 29px 0px rgba(0,0,0,0.3);
  border-radius: 56px 56px 0 0;
}
</style>
