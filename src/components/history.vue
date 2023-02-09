<template>
  <div class="table">
    <div class="th-wrapper">
      <div class="th">总价</div>
      <div class="th">面积</div>
      <div class="th">首付（含税）</div>
      <div class="th">月供</div>
    </div>
    <div class="tr" v-for="(value, key) in list">
      <div class="tr-top">
        <div class="td">{{ value.price }}<span>万</span></div>
        <div class="td">{{ value.area }}<span>m²</span></div>
        <div class="td alert">{{ parseInt(value.taxWithDownPayment) }}({{ parseInt(value.tax) }})<span>万</span></div>
        <div class="td">{{ parseInt(value.totalLoan.wayOfPI) }}<span>元</span></div>
      </div>
      <div class="tr-bottom">
        <div class="tr-bottom-left">{{ value.uuid }}</div>
        <div class="tr-bottom-right"><strong>63257</strong>元/m²</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import history from "../utils/history"
import store from '../utils/store';
import { STORE_HOUSE } from "../utils/bus"
import { bus, BUS_EVENT, form, house } from "../utils/bus"

const list = history.list

onMounted(() => bus.emit(BUS_EVENT.HISTORY_INIT))
</script>
<style lang="scss" scoped>
.table {
  position: absolute;
  width: 100%;
  height: 100%;
  right: -100%;
  top: 0;
  background-color: #e0e1e5;
  line-height: 1;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}

.th-wrapper {
  display: flex;
  align-items: center;
  padding: 0 24px;
  height: 102px;
  background: #444c60;
}

.th {
  position: relative;
  font-size: 30px;
  font-weight: 500;
  color: #e0e1e5;
  flex-shrink: 0;
  text-align: center;
  &::after {
    position: absolute;
    top: 50%;
    right: 0;
    content: "";
    transform: translateY(-50%);
    width: 1px;
    height: 28px;
    background-color: #8d8d8d;
  }
}

.th:nth-child(1),
.td:nth-child(1) {
  flex-basis: 150px;
}
.th:nth-child(2),
.td:nth-child(2) {
  flex-basis: 154px;
}
.th:nth-child(3),
.td:nth-child(3) {
  flex-basis: 229px;
}
.th:nth-child(4),
.td:nth-child(4) {
  flex: 1;
  &::after {
    display: none;
  }
}

.tr {
  width: 703px;
  height: 156px;
  margin: 22px auto;
  background: #ededed;
  box-shadow: 0px 10px 21px 0px rgba(0, 0, 0, 0.15);
  border-radius: 32px;
  padding: 35px 20px 26px;

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
        background-color: #A2A2A2;
      }
    }

    &-right {
      padding-left: 15px;
      flex-shrink: 0;
      flex-basis: 230px;
      strong {
        color: #5C5C5C;
      }
    }
  }
}

.alert {
  color: var(--color-primary) !important;
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
