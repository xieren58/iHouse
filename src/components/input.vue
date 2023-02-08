<template>
  <div class="title">房屋属性：</div>
  <div class="tags">
    <div class="tag" :class="{ active: 0 }">新房</div>
    <div class="split"></div>
    <div class="tag" :class="{ active: form.isFive }" @click="onTagClk('isFive')">{{ DICT.isFive }}</div>
    <div class="tag" :class="{ active: form.isOnly }" @click="onTagClk('isOnly')">{{ DICT.isOnly }}</div>
    <div class="tag" :class="{ active: form.isRelocation }" @click="onTagClk('isRelocation')">{{ DICT.isRelocation }}</div>
    <div class="tag" :class="{ active: form.isFirstRelocation }" @click="onTagClk('isFirstRelocation')">{{ DICT.isFirstRelocation }}</div>
  </div>
  <section class="numbers">
    <div class="row">
      <div class="item">
        <label for="price">{{ DICT.price }}</label>
        <div class="input-wrapper">
          <input placeholder="0" type="text" id="price" v-model="form.price" />
          <div class="unit">万</div>
        </div>
      </div>
      <div class="item">
        <label for="originPrice">{{ DICT.originPrice }}</label>
        <div class="input-wrapper">
          <input placeholder="0" type="text" id="originPrice" v-model="form.originPrice" />
          <div class="unit">万</div>
        </div>
      </div>
      <div class="item">
        <label for="verifyPrice">{{ DICT.verifyPrice }}</label>
        <div class="input-wrapper">
          <input placeholder="0" type="text" id="verifyPrice" v-model="form.verifyPrice" />
          <div class="unit">万</div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="item">
        <label for="area">{{ DICT.area }}</label>
        <div class="input-wrapper">
          <input placeholder="0" type="text" id="area" v-model="form.area" />
          <div class="unit">平</div>
        </div>
      </div>
      <div class="item">
        <label for="age">{{ DICT.age }}</label>
        <div class="input-wrapper">
          <input placeholder="0" type="text" id="age" v-model="form.age" />
          <div class="unit">年</div>
        </div>
      </div>
    </div>

    <div class="loan">
      <div><span>商贷利率: </span><strong>{{House.f2S(form.businessLoanRate * 100)}}%｜标准利率</strong></div>
      <div><span>公积金利率:</span><strong>{{House.f2S(form.providentFundLoanRate * 100)}}%｜基准利率</strong><span>（贷款年限</span><span class="alert">{{ house?.providentFundLoan.years || 0 }}</span><span>年）</span></div>
    </div>
  </section>

  <section class="mark">
    <label for="name">备注：<span>（小区、楼层）</span></label>
    <input placeholder="--" type="text" id="name" v-model="form.name" />
  </section>

  <div class="btn" @click="submit">计算</div>
</template>
<script lang="ts" setup>
import type { PropType } from "vue"
import House, { DICT, IOptions } from "../utils/house"
import { form, house, bus } from "../utils/bus"
import store from "../utils/store";

const submit = () => {
  const options = form.value
  house.value = new House(options)
  console.warn(form.value)
  store.set(form.value.name, {
    value: form.value,
    display: formatKey()
  })
  // getAll()
  bus.emit("GET_HISTORY")
}

bus.on("submit", submit)

const onTagClk= (type: string) => {
  // @ts-ignore
  form.value[type] = !form.value[type]
  bus.emit("submit")
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
</script>
<style lang="scss" scoped>
.title {
  padding: 68px 0 24px 68px;
  font-size: 26px;
  font-weight: 500;
  color: #939393;
  line-height: 52px;
}

.tags {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0 68px 36px;

  .tag {
    width: 112px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ededed;
    border: 2px solid #bcbdbd;
    border-radius: 27px;
    font-size: 25px;
    font-weight: 500;
    color: #939393;
    line-height: 52px;
    cursor: pointer;

    &.active {
      background: #ebe3dc;
      border: 2px solid var(--color-primary);
      color: var(--color-primary);
    }
  }

  .split {
    width: 2px;
    height: 47px;
    background-color: #e1e1e1;
  }
}

.numbers {
  margin: 0 auto;
  width: 686px;
  background: #e0e1e5;
  border-radius: 39px;
  padding: 55px 35px 79px;
}

.row {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 40px;
  .item {
    font-size: 0;
    margin-right: 27px;
    flex: 1;
    &:last-child {
      margin-right: 0;
    }
    label {
      font-size: 26px;
      font-weight: 500;
      color: #939393;
      line-height: 52px;
    }
    .input-wrapper {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      width: 100%;
      height: 90px;
      padding-right: 30px;
      background: #ededed;
      border: 2px solid #e5a56f;
      border-radius: 24px;
      input {
        flex: 1;
        width: 100px;
        min-width: 0;
        font-size: 36px;
        font-weight: 600;
        color: #5c5c5c;
        line-height: 66px;
        text-align: center;
        padding: 0 10px;
      }
      .unit {
        font-size: 21px;
        font-weight: 600;
        color: #5c5c5c;
        line-height: 66px;
      }
    }
  }
}

.loan {
  > div {
    span {
      font-size: 20px;
      font-weight: 500;
      color: #939393;
      line-height: 1;
    }
    &:first-child {
      margin-bottom: 6px;
    }
  }

  strong {
    font-size: 20px;
    font-weight: 500;
    color: #5c5c5c;
    line-height: 1;
  }

  .alert {
    color: var(--color-primary);
  }
}

.mark {
  width: 648px;
  height: 88px;
  display: flex;
  align-items: center;
  padding: 0 35px;
  margin: 32px auto 0;
  background: #e0e1e5;
  border-radius: 24px;
  line-height: 1;
  margin-bottom: 50px;

  label {
    font-size: 26px;
    font-weight: 500;
    color: #939393;
    span {
      font-size: 26px;
      font-weight: 500;
      color: #c4c4c4;
    }
  }

  input {
    flex: 1;
    font-size: 26px;
    font-weight: 500;
    color: #5c5c5c;
    line-height: 55px;
  }
}

.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 436px;
  height: 112px;
  margin: 0 auto;
  background: var(--color-primary);
  border-radius: 56px;
  font-size: 48px;
  font-weight: 500;
  color: #ffffff;
  cursor: pointer;
}
</style>
