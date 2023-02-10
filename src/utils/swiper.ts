export default class SwipeDelete {
  private startX: number
  private currentX: number
  private startY: number
  private currentY: number
  private itemWidth: number
  private confirmWidth: number
  private contentDom: HTMLElement
  private delDom: HTMLElement

  constructor(private uuid: string, private container: HTMLElement, private delFn: () => void) {
    this.startX = 0
    this.currentX = 0
    this.startY = 0
    this.currentY = 0
    this.itemWidth = container.getBoundingClientRect().width
    this.confirmWidth = this.itemWidth / 3
    this.contentDom = this.container.querySelector(".tr-content") as HTMLElement
    this.delDom = this.container.querySelector(".tr-del") as HTMLElement
    container.ontouchstart = this.handleTouchStart
    container.ontouchmove = this.handleTouchMove
    container.ontouchend = this.handleTouchEnd
  }

  private moveContainer = (deltaX: number) => {
    if (deltaX > 0) deltaX = 0
    this.contentDom.style.transform = `translate3d(${deltaX}px, 0, 0)`
    if (-deltaX > this.confirmWidth) {
      this.delDom.classList.add("active")
    } else {
      this.delDom.classList.remove("active")
    }
  }

  private handleTouchStart = (event: TouchEvent) => {
    this.startX = event.touches[0].clientX
    this.startY = event.touches[0].clientY
  }

  private handleTouchMove = (event: TouchEvent) => {
    this.currentX = event.touches[0].clientX
    this.currentY = event.touches[0].clientY
    const deltaX = this.currentX - this.startX
    const deltaY = this.currentY - this.startY
    this.moveContainer(deltaX)
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (event.cancelable) event.preventDefault()
    }
  }

  private handleTouchEnd = (event: TouchEvent) => {
    const deltaX = this.currentX - this.startX
    if (this.currentX !== 0 && -deltaX > this.confirmWidth) this.removeItem()
    this.reset()
  }

  private removeItem = () => {
    this.delFn()
  }

  private reset = () => {
    this.startX = 0
    this.currentX = 0
    this.moveContainer(0)
  }
}
