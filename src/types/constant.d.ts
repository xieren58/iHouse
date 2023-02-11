export interface IStoreItem {
  key: string
  val: any
}

export interface IHouseBaseInfo {
  id: string
  uuid?: string
  originPrice: number
  price: number
  verifyUnitPrice: number
  area: number
  isNew: boolean
  isFive: boolean
  isOnly: boolean
  isRelocation: boolean
  isFirstRelocation: boolean
  age: number
  businessLoanRate: number
  providentFundLoanRate: number
}

export interface IHouseFullInfo extends IHouseBaseInfo {
  unitPrice: string
  taxWithDownPayment: string
  tax: string
  totalLoan: {
    amount: string
    wayOfPI: string
    wayOfP: string
  }
}

export interface ILoan {
  amount: number // 贷款金额
  years: number // 贷款年限
  wayOfPI: {
    // 等额本息还款方式
    months: number[] // 月还款
    interest: number // 总利息
    total: number //总还款
  }
  wayOfP: {
    // 等额本金还款方式
    months: number[]
    interest: number
    total: number
  }
}
