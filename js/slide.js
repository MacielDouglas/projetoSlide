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
    let movetype;
    if (event.type === 'mousedown') {
      event.preventDefault(); // para previnir o padrão e não bugar
      movetype = "mousemove";
    } else {
      this.dist.startX = event.changedTouches[0].clientX;
      movetype = "touchmove"
    }
    // this.dist.startX = event.clientX;
    this.wrapper.addEventListener(movetype, this.onMove);
  }

  onMove(event) {
    const pointerPosition = (event.type === 'mousemove') ? event.clientX : event.changedTouches[0].clientX

    const finalPosition = this.updatePosition(pointerPosition);
    this.moveSlide(finalPosition);
  }

  onEnd(event) {
    const movetype = (event.type === 'mouseup') ? 'mousemove' : 'touchmove';
    this.wrapper.removeEventListener(movetype, this.onMove)
    this.dist.finalPosition = this.dist.movePosition;
  }

  addSlideEvents() {
    this.wrapper.addEventListener('mousedown', this.onStar) //mousedown quer dizer quando cliquei
    this.wrapper.addEventListener('touchstart', this.onStar) 
    this.wrapper.addEventListener("mouseup", this.onEnd)
    this.wrapper.addEventListener("touchend", this.onEnd)
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
