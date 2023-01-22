export class Slide {
  constructor(slide, wrapper) {
    this.slide = document.querySelector(slide)

    this.wrapper = document.querySelector(wrapper)
  }

  onStar(event) {
    event.preventDefault(); // para previnir o padrão e não bugar
    console.log("mouseDown")
    this.wrapper.addEventListener("mousemove", this.onMove)
  }

  onMove(event) {
    console.log("moveu")
  }

  onEnd(event) {
    console.log('acabou')
    this.wrapper.removeEventListener("mousemove", this.onMove)
  }

  addSlideEvents() {
    this.wrapper.addEventListener('mousedown', this.onStar) //mousedown quer dizer quando cliquei
    this.wrapper.addEventListener("mouseup", this.onEnd)
  }

  bindEvents() {
    this.onStar = this.onStar.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }

  init() {
    this.bindEvents();
    this.addSlideEvents();
    return this;
  }
}
