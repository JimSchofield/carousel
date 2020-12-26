function PrototypeCarousel(selector) {
  this.selector = selector;
  this.activeIndex = 0;

  this.init();
}

PrototypeCarousel.prototype.init = function() {
  this.getChildren()
    .activateStyles()
    .bindHandlers();
}

PrototypeCarousel.prototype.bindHandlers = function() {
  this.backEl.addEventListener('click', this.back.bind(this));
  this.forwardEl.addEventListener('click', this.next.bind(this));

  return this;
}


PrototypeCarousel.prototype.getChildren = function() {
  this.carouselEl = document.querySelector(this.selector);
  this.slidesEls = this.carouselEl.querySelectorAll("[data-proto-carousel-slide]");
  this.forwardEl = this.carouselEl.querySelector('[data-carousel-forward]');
  this.backEl = this.carouselEl.querySelector('[data-carousel-back]');

  return this;
}

PrototypeCarousel.prototype.activateStyles = function() {
  this.carouselEl.classList.add('carousel--active');
  this.slidesEls[0].classList.add('carousel__slide--active');
  return this;
}

PrototypeCarousel.prototype.goto = function(index) {
  this.slidesEls.forEach(el => el.classList.remove('carousel__slide--active'));
  this.slidesEls[index].classList.add('carousel__slide--active');
  this.activeIndex = index;
}

PrototypeCarousel.prototype.next = function() {
  if (this.activeIndex === this.slidesEls.length - 1) {
    this.goto(0);
    return this;
  }

  this.goto(this.activeIndex + 1);
  return this;
}

PrototypeCarousel.prototype.back = function() {
  if (this.activeIndex == 0) {
    this.goto(this.slidesEls.length - 1);
    return this;
  }

  this.goto(this.activeIndex - 1);
  return this;
}

window.myCarouselInstance = new PrototypeCarousel('[data-proto-carousel]');
