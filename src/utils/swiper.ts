export default class SwipeDelete {
  private startX: number
  private currentX: number
  private startY: number
  private currentY: number
  private itemWidth: number
  private confirmWidth: number
  private contentDom: HTMLElement
  private operationDom: HTMLElement

  constructor(private container: HTMLElement, private rightFn: () => void, private leftFn: () => void) {
    this.startX = 0
    this.currentX = 0
    this.startY = 0
    this.currentY = 0
    this.itemWidth = container.getBoundingClientRect().width
    this.confirmWidth = this.itemWidth / 3
    this.contentDom = this.container.querySelector(".tr-content") as HTMLElement
    this.operationDom = this.container.querySelector(".tr-operation") as HTMLElement
    container.ontouchstart = this.handleTouchStart
    container.ontouchmove = this.handleTouchMove
    container.ontouchend = this.handleTouchEnd
  }

  private isRightValid(deltaX: number) {
    return -deltaX > this.confirmWidth
  }

  private isLeftValid(deltaX: number) {
    return deltaX > this.confirmWidth
  }

  private moveContainer = (deltaX: number) => {
    this.contentDom.style.transform = `translate3d(${deltaX}px, 0, 0)`
    if (this.isRightValid(deltaX)) {
      this.operationDom.classList.add("red")
    } else if (this.isLeftValid(deltaX)) {
      this.operationDom.classList.add("yellow")
    } else {
      this.operationDom.classList.remove("red")
      this.operationDom.classList.remove("yellow")
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
    // click: event.touches[0].clientX: 0
    if (this.currentX !== 0 && this.isRightValid(deltaX)) this.removeItem()
    if (this.currentX !== 0 && this.isLeftValid(deltaX)) this.editItem()
    this.reset()
  }

  private removeItem = () => {
    this.rightFn()
  }

  private editItem = () => {
    this.leftFn()
  }

  private reset = () => {
    this.startX = 0
    this.currentX = 0
    this.moveContainer(0)
  }
}
