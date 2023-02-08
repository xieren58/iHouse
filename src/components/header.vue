<template>
  <header class="header">
    <h1 class="title">
      {{ DICT.downPayment }}含税共 <span class="alert">{{ house?.getTaxWithDownPayment() || 0 }}</span> 万
    </h1>
    <figure class="icon-history" @click="onHistoryClk"></figure>
    <div class="board">
      <div class="board-item">
        <p class="board-title">
          税费总计 <span class="alert">{{ house?.getTax() || 0 }}</span> 万
        </p>
        <p class="board-sub">{{ DICT.VAT }} {{ house?.VAT || 0 }}万</p>
        <p class="board-sub">{{ DICT.PIT }} {{ house?.PIT || 0 }}万</p>
        <p class="board-sub">{{ DICT.DT }} {{ house?.DT || 0 }}万</p>
      </div>
      <div class="board-item">
        <p class="board-title">
          房款{{ DICT.downPayment }} <span class="alert">{{ house?.downPayment || 0 }}</span> 万
        </p>
        <p class="board-sub icon-wrapper">月供&nbsp;<span class="icon-tip">i</span></p>
        <p class="board-sub alert">等额本息 {{ house?.getTotalLoan().wayOfPI || 0 }}元</p>
        <p class="board-sub">等额本金 {{ house?.getTotalLoan().wayOfP || 0 }}元</p>
      </div>
    </div>
  </header>
</template>
<script lang="ts" setup>
import type { PropType } from "vue"
import House, { DICT } from "../utils/house"
import { house } from "../utils/bus"

const onHistoryClk = () => {
  // console.log(item)
  // form.value = item.val.value
  // submit()
}
</script>
<style lang="scss" scoped>
.header {
  position: relative;
  padding: 70px 52px 53px;
}
.icon {
  &-wrapper {
    display: flex;
    align-items: center;
  }

  &-history {
    position: absolute;
    top: 67px;
    right: 49px;
    width: 55px;
    height: 55px;
    background: url(../assets/history.png) no-repeat center / 55px 55px;
  }
  &-tip {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    background: #bfbfbf;
    border-radius: 50%;
    font-size: 18px;
    font-weight: bold;
    color: #444c60;
    line-height: 26px;
  }
}
.title {
  padding-bottom: 27px;
  margin-bottom: 28px;
  font-size: 52px;
  font-weight: 500;
  color: #ededed;
  line-height: 1;
  border-bottom: 2px solid #d1d1d1;
}

.alert {
  color: var(--color-primary) !important;
}

.board {
  display: flex;
  font-size: 26px;
  font-weight: 500;
  color: #ededed;
  line-height: 36px;
  white-space: pre-line;

  &-item {
    flex: 1;
  }

  &-sub {
    font-size: 22px;
    font-weight: 500;
    color: #bfbfbf;
    line-height: 28px;
  }
}
</style>
