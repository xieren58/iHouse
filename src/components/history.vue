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
<style lang="scss" src="../assets/css/history.scss"></style>
