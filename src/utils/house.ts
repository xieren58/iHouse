import { ILoan, IHouseBaseInfo } from "../types/constant"

export default class House {
  VAT = 0 // 增值税
  PIT = 0 // 个人所得税
  DT = 0 // 契税
  downPayment = 0 // 首付
  // 公积金贷款
  providentFundLoan: ILoan = {
    amount: 0,
    years: 0,

    wayOfPI: {
      months: [],
      interest: 0,
      total: 0,
    },
    wayOfP: {
      months: [],
      interest: 0,
      total: 0,
    },
  }
  // 商业贷款
  businessLoan: ILoan = {
    amount: 0,
    years: 30,
    wayOfPI: {
      months: [],
      interest: 0,
      total: 0,
    },
    wayOfP: {
      months: [],
      interest: 0,
      total: 0,
    },
  }
  id: string
  originPrice: number
  price: number
  verifyUnitPrice: number
  verifyPrice: number
  area: number
  isCollected: boolean
  isNew: boolean
  isFive: boolean
  isOnly: boolean
  isRelocation: boolean
  isFirstRelocation: boolean
  age: number
  businessLoanRate: number
  providentFundLoanRate: number

  constructor(options: IHouseBaseInfo) {
    this.id = options.id
    this.isCollected = !!options.isCollected
    this.isNew = options.isNew
    this.originPrice = options.originPrice
    this.price = options.price
    this.verifyUnitPrice = options.verifyUnitPrice
    this.verifyPrice = this.isNew ? this.price : options.verifyUnitPrice * options.area
    this.area = options.area
    this.isFive = !!options.isFive
    this.isOnly = !!options.isOnly
    this.isRelocation = !!options.isRelocation
    this.isFirstRelocation = !!options.isFirstRelocation
    this.age = this.isNew ? 0 : new Date().getFullYear() - options.age
    this.businessLoanRate = options.businessLoanRate || 0.043
    this.providentFundLoanRate = options.providentFundLoanRate || 0.031
    this.init()
  }

  static f2S(value: number) {
    return (+value).toFixed(2)
  }

  static f2N(value: number) {
    return +value.toFixed(2)
  }

  private init() {
    if (!this.isNew) {
      this.getVAT()
      this.getDT()
      this.getPIT()
    }
    this.getDownPayment()
    this.getProvidentFundLoan()
    this.getBusinessLoan()
  }

  // Value-Added Tax
  private getVAT() {
    if (this.isFirstRelocation) return (this.VAT = 0)
    const price = House.f2N(this.isFive ? this.verifyPrice - this.originPrice : this.verifyPrice)
    this.VAT = House.f2N((price / 1.05) * (0.05 + 0.003))
  }

  // Personal Income Tax
  private getPIT() {
    if (this.isFive && this.isOnly) this.PIT = 0
    else {
      // 动迁房1%，商品房2%
      const rate = this.isRelocation ? 0.01 : 0.02
      this.PIT = House.f2N((this.verifyPrice - this.VAT) * rate)
    }
  }

  // Deed Tax
  private getDT() {
    const rate = this.area <= 90 ? 0.01 : 0.015
    this.DT = House.f2N((this.verifyPrice - this.VAT) * rate)
  }

  private getDownPayment() {
    this.downPayment = House.f2N(this.price - this.verifyPrice * 0.65)
  }

  getUnitPriceDiscount() {
    return (this.verifyUnitPrice / (this.price / this.area) * 10).toFixed(1)
  }

  getUnitPrice() {
    return House.f2S(this.price / this.area * 10000)
  }

  getTax() {
    return House.f2S(this.VAT + this.DT + this.PIT)
  }

  getTaxWithDownPayment() {
    return House.f2S(this.VAT + this.DT + this.PIT + this.downPayment)
  }

  getTotalLoan() {
    const provident = this.providentFundLoan
    const business = this.businessLoan
    const { wayOfP: PP, wayOfPI: PPI } = provident
    const { wayOfP: BP, wayOfPI: BPI } = business
    return {
      amount: House.f2S(provident.amount + business.amount),
      wayOfPI: House.f2S(PPI.months[0] + BPI.months[0]),
      wayOfP: House.f2S(PP.months[0] + BP.months[0]),
    }
  }

  private getProvidentFundLoan() {
    const loan = this.providentFundLoan
    loan.amount = 100
    loan.years = this.age >= 20 ? 15 : this.age <= 19 && this.age >= 6 ? 35 - this.age : 30
    loan.wayOfPI = this.getWayOfPI(loan.amount, this.providentFundLoanRate, loan.years)
    loan.wayOfP = this.getWayOfP(loan.amount, this.providentFundLoanRate, loan.years)
  }

  private getBusinessLoan() {
    const loan = this.businessLoan
    loan.amount = House.f2N(this.verifyPrice * 0.65 - this.providentFundLoan.amount)
    loan.wayOfPI = this.getWayOfPI(loan.amount, this.businessLoanRate, loan.years)
    loan.wayOfP = this.getWayOfP(loan.amount, this.businessLoanRate, loan.years)
  }

  private getWayOfPI(amount: number, rate: number, years: number) {
    amount = amount * 10000
    rate = rate / 12
    const months = 12 * years
    const firstMonth = House.f2N(amount * ((rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1)))
    return {
      months: [firstMonth],
      interest: House.f2N(firstMonth * months - amount),
      total: House.f2N(firstMonth * months),
    }
  }

  private getWayOfP(amount: number, rate: number, years: number) {
    amount = amount * 10000
    rate = rate / 12
    const months = 12 * years
    const firstMonth = House.f2N(amount / months + amount * rate)
    // 总利息=〔(总贷款额÷还款月数+总贷款额×月利率)+总贷款额÷还款月数×(1+月利率)〕÷2×还款月数-总贷款额
    const total = House.f2N(((amount / months + amount * rate + (amount / months) * (1 + rate)) / 2) * months)
    return {
      months: [firstMonth],
      interest: House.f2N(total - amount),
      total: total,
    }
  }
}