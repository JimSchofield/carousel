class Carousel {
  constructor(selector) {
    this.selector = selector;
    this.activeIndex = 0;

    this.init();
  }

  init() {
    this.getChildren()
      .activateStyles()
      .bindHandlers();
  }

  bindHandlers() {
    this.backEl.addEventListener('click', this.back.bind(this));
    this.forwardEl.addEventListener('click', this.next.bind(this));

    return this;
  }

  getChildren() {
    this.carouselEl = document.querySelector(this.selector);
    this.slidesEls = this.carouselEl.querySelectorAll(
      '[data-proto-carousel-slide]'
    );
    this.forwardEl = this.carouselEl.querySelector('[data-carousel-forward]');
    this.backEl = this.carouselEl.querySelector('[data-carousel-back]');

    return this;
  }

  activateStyles() {
    this.carouselEl.classList.add('carousel--active');
    this.slidesEls[0].classList.add('carousel__slide--active');
    return this;
  }

  goto(index) {
    this.slidesEls.forEach(el =>
      el.classList.remove('carousel__slide--active')
    );
    this.slidesEls[index].classList.add('carousel__slide--active');
    this.activeIndex = index;
  }

  next() {
    if (this.activeIndex === this.slidesEls.length - 1) {
      this.goto(0);
      return this;
    }

    this.goto(this.activeIndex + 1);
    return this;
  }

  back() {
    if (this.activeIndex == 0) {
      this.goto(this.slidesEls.length - 1);
      return this;
    }

    this.goto(this.activeIndex - 1);
    return this;
  }
}

window.myCarousel = new Carousel('[data-proto-carousel]');
