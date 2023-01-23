export default class Slide {
  constructor(slide, wrapper) {
    this.slide = document.querySelector(slide)

    this.wrapper = document.querySelector(wrapper)
    this.dist = {
      finalPosition: 0, startX: 0, movement: 0
    }
  }

  moveSlide(distX)  {
    this.dist.movePosition = distX; //guardar uma referencia da distancia
    this.slide.style.transform = `translate3d(${distX}px, 0, 0)`;
  }

  updatePosition(clientX) {
    this.dist.movement = (this.dist.startX - clientX) * 1.6;
   return this.dist.finalPosition - this.dist.movement;
  }

  onStar(event) {
    event.preventDefault(); // para previnir o padrão e não bugar
    this.dist.startX = event.clientX;
    this.wrapper.addEventListener("mousemove", this.onMove);
  }

  onMove(event) {
    const finalPosition = this.updatePosition(event.clientX);
    this.moveSlide(finalPosition);
  }

  onEnd(event) {
    this.wrapper.removeEventListener("mousemove", this.onMove)
    this.dist.finalPosition = this.dist.movePosition;
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
