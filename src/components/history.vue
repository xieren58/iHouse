<template>
  <div class="table">
    <div class="th-wrapper">
      <div class="th">总价</div>
      <div class="th">面积</div>
      <div class="th">首付(含税)</div>
      <div class="th">月供</div>
    </div>
    <history-item v-for="(value) in list" :value="value"></history-item>
    <div class="tip" v-if="list.length">* 左滑编辑，右滑删除</div>
    <div class="empty" v-if="!list.length">* 点击保存即可出现在历史记录中</div>
  </div>
</template>
<script lang="ts" setup>
import { history } from "../utils/bus"
import historyItem from "./history-item.vue"

const list = history.list
</script>
<style lang="scss">
.table {
  position: absolute;
  width: 100%;
  height: 100%;
  right: -100%;
  top: 0;
  overflow-y: scroll;
  overflow-x: hidden;
  padding-bottom: 100px;
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

.tip, .empty {
  margin: 40px 0;
  color: #bfbfbf;
  font-size: 24px;
  font-weight: 500;
  text-align: center;
}

.empty {
  margin-top: 400px;
}
</style>
