<template>
  <header class="header">
    <h1 class="title">
      {{ DICT.downPayment }}含税共 <span class="alert">{{ house?.getTaxWithDownPayment() || 0 }}</span> 万
    </h1>
    <div class="history" @click="onHistoryClk">
      <figure class="icon-history"></figure>
      <figure class="icon-back"></figure>
    </div>
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
        <p class="board-sub icon-wrapper">
          月供
          <!-- &nbsp;<span class="icon-tip">i</span> -->
        </p>
        <p class="board-sub">
          等额本息 <span class="alert">{{ house?.getTotalLoan().wayOfPI || 0 }}</span
          >元
        </p>
        <p class="board-sub">等额本金 {{ house?.getTotalLoan().wayOfP || 0 }}元</p>
      </div>
    </div>

    <div class="loan">
      <div>
        商贷利率: <strong>{{ House.f2S(form.businessLoanRate * 100) }}%｜标准利率</strong>（总额 <span class="">{{ house?.businessLoan.amount || 0 }}</span
        >万｜年限 <span class="">{{ house?.businessLoan.years || 0 }}</span
        >年）
      </div>
      <div>
        公积金利率: <strong>{{ House.f2S(form.providentFundLoanRate * 100) }}%｜基准利率</strong>（总额 <span class="">{{ house?.providentFundLoan.amount || 0 }}</span
        >万｜年限 <span class="alert">{{ house?.providentFundLoan.years || 0 }}</span
        >年）
      </div>
    </div>
  </header>
</template>
<script lang="ts" setup>
import House from "../utils/house"
import { bus, form, house } from "../utils/bus"
import { BUS_EVENT, DICT } from "../utils/dict";

const onHistoryClk = () => {
  bus.emit(BUS_EVENT.HISTORY_INIT)
  bus.emit(BUS_EVENT.HISTORY_SHOW)
}
</script>
<style lang="scss" scoped src="../assets/css/header.scss"></style>
