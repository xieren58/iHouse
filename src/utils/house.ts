interface IOptions {
  name?: string
  originPrice: number
  price: number
  verifyPrice: number
  area: number
  isFive: boolean
  isOnly: boolean
  isRelocation: boolean
  isFirstRelocation: boolean
  age: number
  businessLoanRate?: number
  providentFundLoanRate?: number
}

interface ILoan {
  amount: number // 贷款金额
  years: number // 贷款年限
  wayOfPI: {
    months: number[] // 月还款
    interest: number // 总利息
    total: number //总还款
  }
  wayOfP: {
    months: number[]
    interest: number
    total: number
  }
}

export default class House {
  private VAT = 0 // 增值税
  private PIT = 0 // 个人所得税
  private DT = 0 // 契税
  private downPayment = 0 // 首付
  // 公积金贷款
  private providentFundLoan: ILoan = {
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
  private businessLoan: ILoan = {
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
  private originPrice: number
  private price: number
  private verifyPrice: number
  private area: number
  private isFive: boolean
  private isOnly: boolean
  private isRelocation: boolean
  private isFirstRelocation: boolean
  private age: number
  private businessLoanRate: number
  private providentFundLoanRate: number

  constructor(options: IOptions) {
    this.originPrice = options.originPrice
    this.price = options.price
    this.verifyPrice = options.verifyPrice
    this.area = options.area
    this.isFive = !!options.isFive
    this.isOnly = !!options.isOnly
    this.isRelocation = !!options.isRelocation
    this.isFirstRelocation = !!options.isFirstRelocation
    this.age = new Date().getFullYear() - options.age
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
    this.getVAT()
    this.getDT()
    this.getPIT()
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

  private getProvidentFundLoan() {
    const loan = this.providentFundLoan
    const rate = 0.031
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

  log() {
    const tax = this.VAT + this.DT + this.PIT
    const provident = this.providentFundLoan
    const business = this.businessLoan
    const { wayOfP: PP, wayOfPI: PPI } = provident
    const { wayOfP: BP, wayOfPI: BPI } = business
    const f = House.f2S

  // 房屋信息：
  // ${DICT.originPrice}：${f(this.originPrice)}
    // ${DICT.price}：${f(this.price)}
    // ${DICT.verifyPrice}：${f(this.verifyPrice)}
    // ${DICT.area}：${f(this.area)}
    // ${DICT.isFive}：${+this.isFive}
    // ${DICT.isOnly}：${+this.isOnly}
    // ${DICT.isRelocation}：${+this.isRelocation}
    // ${DICT.isFirstRelocation}：${+this.isFirstRelocation}
    // ${DICT.age}：${new Date().getFullYear() - this.age}
    // ${DICT.providentFundLoanRate}：${+this.providentFundLoanRate}
    // ${DICT.businessLoanRate}：${+this.businessLoanRate}
    const output = (`
  税费信息：
    ${DICT.VAT}：${f(this.VAT)}
    ${DICT.PIT}：${f(this.PIT)}
    ${DICT.DT}：${f(this.DT)}
    总税：${f(tax)}

    ${DICT.downPayment}：${f(this.downPayment)}
    首付+税：${f(this.downPayment + tax)}

  贷款信息：
    贷款总额：${f(provident.amount + business.amount)}
    等额本息月还款：${f(PPI.months[0] + BPI.months[0])}，每月相同，总利息：${f(PPI.interest + BPI.interest)}，总还款额：${f(PPI.total + BPI.total)}
    等额本金月还款：${f(PP.months[0] + BP.months[0])}，每月递减，总利息：${f(PP.interest + BP.interest)}，总还款额：${f(PP.total + BP.total)}

    公积金贷款总额：${f(provident.amount)}，年限：${provident.years}
        等额本息月还款：${f(PPI.months[0])}，每月相同，总利息：${f(PPI.interest)}，总还款额：${f(PPI.total)}
        等额本金月还款：${f(PP.months[0])}，每月递减，总利息：${f(PP.interest)}，总还款额：${f(PP.total)}
    商贷总额：${f(business.amount)}，年限：${business.years}
        等额本息月还款：${f(BPI.months[0])}，每月相同，总利息：${f(BPI.interest)}，总还款额：${f(BPI.total)}
        等额本金月还款：${f(BP.months[0])}，每月递减，总利息：${f(BP.interest)}，总还款额：${f(BP.total)}
    `)
    console.log(output)
    return output
  }
}

export enum DICT {
  name = "名称",
  originPrice = "买入价",
  price = "售价",
  verifyPrice = "核验价",
  area = "面积",
  isFive = "是否满五",
  isOnly = "是否唯一",
  isRelocation = "是否动迁",
  isFirstRelocation = "是否一手动迁",
  age = "房屋年份",
  businessLoanRate = "商贷利率",
  providentFundLoanRate = "公积金利率",
  VAT = "增值税",
  PIT = "个税",
  DT = "契税",
  downPayment = "首付"
}

export const my = new House({
  name: "",
  originPrice: 0,
  price: 512,
  verifyPrice: 445,
  area: 81.59,
  isFive: !!1,
  isOnly: !!1,
  isRelocation: !!1,
  isFirstRelocation: !!1,
  age: 2006,
  providentFundLoanRate: 0,
  businessLoanRate: 0,
})
// my.log()
