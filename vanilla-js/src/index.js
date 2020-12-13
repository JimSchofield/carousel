class HiDar {
  constructor(selector) {
    this.selector = selector;
    this.container = document.querySelector(`[data-${this.selector}]`);
    this.activeIndex = 0;

    if (!this.container) {
      return;
    }

    this.init();
  }

  init() {
    this.gatherChildren()
      .attachHandlers();
  }

  gatherChildren(containerEl) {
    this.slides = this.container.querySelectorAll(`[data-${this.selector}-slide]`)
    this.forwardEl = this.container.querySelector(`[data-${this.selector}-forward]`)
    this.backEl = this.container.querySelector(`[data-${this.selector}-back]`)
    
    return this;
  }

  attachHandlers() {
    this.backEl.addEventListener('click', this.onBack.bind(this));
    this.forwardEl.addEventListener('click', this.onForward.bind(this));

    return this;
  }

  get slidesNumber() {
    return this.slides.length;
  }

  get onLastSlide() {
    return this.activeIndex >= this.slidesNumber - 1;
  }

  get onFirstSlide() {
    return this.activeIndex === 0;
  }

  onBack(event) {
    if (this.onFirstSlide) {
      this.activateSlide(this.slidesNumber - 1);
      return;
    }

    this.activateSlide(this.activeIndex - 1);
  }

  onForward(event) {
    if (this.onLastSlide) {
      this.activateSlide(0);
      return;
    }

    this.activateSlide(this.activeIndex + 1);
  }

  deactivateAllSlides() {
    this.slides.forEach((slide) => slide.classList.remove('carousel__slide--active'));
  }

  activateSlide(index) {
    this.deactivateAllSlides();
    this.slides[index].classList.add('carousel__slide--active');
    this.activeIndex = index;
  }
}

window.carousel = new HiDar('carousel');
