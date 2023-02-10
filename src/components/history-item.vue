<template>
  <div class="tr" :id="`tr-${value?.uuid}`">
    <div class="tr-del">删除</div>
    <div class="tr-content">
      <div class="tr-top">
        <div class="td">{{ value?.price }}<span>万</span></div>
        <div class="td">{{ value?.area }}<span>m²</span></div>
        <div class="td alert">{{ parseInt(value?.taxWithDownPayment || "") }}({{ parseInt(value?.tax || "") }})<span>万</span></div>
        <div class="td">{{ parseInt(value?.totalLoan.wayOfPI || "") }}<span>元</span></div>
      </div>
      <div class="tr-bottom">
        <div class="tr-bottom-left">{{ value?.uuid }}</div>
        <div class="tr-bottom-right"><strong>{{ parseInt(value?.unitPrice || "") }}</strong>元/m²</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, PropType } from "vue"
import history from "../utils/history"
import { IHouseFullInfo } from "../types/constant"
import SwipeDelete from "../utils/swiper"

const props = defineProps({
  value: Object as PropType<IHouseFullInfo>,
})
let item: SwipeDelete | null

onMounted(() => {
  item = new SwipeDelete(props.value?.uuid || "", document.querySelector(`#tr-${props.value?.uuid}`)!, () => {
    item = null
    if (props.value?.uuid) history.del(props.value.uuid)
  })
})
</script>
<style lang="scss" scoped>
.tr {
  position: relative;
  width: 703px;
  height: 156px;
  margin: 22px auto;
  background: #ededed;
  box-shadow: 0px 10px 21px 0px rgba(0, 0, 0, 0.15);
  border-radius: 32px;

  &-del {
    position: absolute;
    text-align: right;
    padding-right: 90px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
    background-color: #444c60;
    border-radius: 32px;
    font-size: 30px;
    font-weight: 500;
    color: #e0e1e5;

    &.active {
      background-color: red;
      color: #fff;
    }
  }

  &-content {
    position: relative;
    z-index: 1;
    border-radius: 32px;
    padding: 35px 20px 26px;
    background: #ededed;
  }

  &-top {
    display: flex;
  }

  &-bottom {
    width: 662px;
    height: 48px;
    display: flex;
    align-items: center;
    background: #e0e1e5;
    border-radius: 24px;
    margin: 22px auto 0;
    font-size: 26px;
    font-weight: 500;
    color: #a2a2a2;

    &-left {
      position: relative;
      flex: 1;
      padding-left: 20px;
      padding-right: 15px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      &::after {
        position: absolute;
        content: "";
        width: 2px;
        height: 28px;
        right: 0;
        top: 50%;
        transform: translate3d(0, -50%, 0);
        background-color: #a2a2a2;
      }
    }

    &-right {
      padding-left: 15px;
      flex-shrink: 0;
      flex-basis: 230px;
      strong {
        color: #5c5c5c;
      }
    }
  }
}

.td {
  font-size: 32px;
  font-weight: 600;
  color: #5c5c5c;
  text-align: center;

  span {
    margin-left: 4px;
    font-size: 22px;
    font-weight: 600;
    color: #afafaf;
  }
}
</style>
