<script setup lang="ts">
import { onMounted, ref } from "vue"
import IHeader from "./components/header.vue"
import IInput from "./components/input.vue"
import IHistory from "./components/history.vue"
import House, { DICT } from "./utils/house"
import store from "./utils/store"
import { BUS_EVENT, bus, form, house } from './utils/bus'
const showHistory = ref(false)

bus.on(BUS_EVENT.HISTORY_SHOW, () => {
  showHistory.value = !showHistory.value
})

onMounted(() => {
  bus.emit(BUS_EVENT.SUBMIT)
})
</script>

<template>
  <div class="layout" :class="{ active: showHistory }">
    <i-header></i-header>
    <main class="main">
      <i-input></i-input>
    </main>
    <i-history></i-history>
  </div>
</template>

<style scoped lang="scss">
.layout {
  position: relative;
  width: 750px;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  background: #444C60;
  text-align: left;
  margin: 0 auto;
  transition: all .3s;

  &.active {
    transform: translate3d(-750px, 0, 0);
  }
}

.main {
  flex: 1;
  width: 750px;
  background: #EDEDED;
  box-shadow: 0px 0px 29px 0px rgba(0,0,0,0.3);
  border-radius: 56px 56px 0 0;
}
</style>
