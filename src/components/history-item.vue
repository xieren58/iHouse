<template>
  <div class="tr" :id="`tr-${value?.uuid}`" @click="">
    <div class="tr-operation"><span class="tr-operation-left">编辑</span><span class="tr-operation-right">删除</span></div>
    <div class="tr-content">
      <div class="tr-top">
        <div class="td">{{ value?.price }}<span>万</span></div>
        <div class="td">{{ value?.area }}<span>m²</span></div>
        <div class="td alert">{{ parseInt(value?.taxWithDownPayment || "0") }}({{ parseInt(value?.tax || "0") }})<span>万</span></div>
        <div class="td">{{ parseInt(value?.totalLoan.wayOfPI || "0") }}<span>元</span></div>
      </div>
      <div class="tr-bottom">
        <div class="tr-bottom-left">{{ value?.id }}</div>
        <div class="tr-bottom-right">
          <strong>{{ parseInt(value?.unitPrice || "0") }}</strong
          >元/m²
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, PropType } from "vue"
import { IHouseFullInfo } from "../types/constant"
import SwipeDelete from "../utils/swiper"
import { history, bus, form } from "../utils/bus";
import { BUS_EVENT } from "../utils/dict";

const props = defineProps({
  value: Object as PropType<IHouseFullInfo>,
})
let item: SwipeDelete | null

const remove = () => {
  item = null
  if (props.value?.uuid) history.del(props.value)
}

const edit = () => {
  item = null
  if (props.value?.uuid) form.value = props.value
  bus.emit(BUS_EVENT.HISTORY_SHOW)
}

onMounted(() => {
  const dom = document.querySelector(`#tr-${props.value?.uuid}`) as HTMLElement
  if (dom) item = new SwipeDelete(dom, remove, edit)
})
</script>
<style lang="scss" scoped src="../assets/css/history-item.scss"></style>
