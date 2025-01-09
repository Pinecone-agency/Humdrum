(function initializeSliders() {
  var triggerSplide = false
  var triggerSwiper = false

  var paginationSplide = new Splide('#pagination-splide', {
    type: 'loop',
    focus: 'center',
    gap: 40,
    speed: 300,
    // clones: 4,
    cloneStatus: false,
    autoWidth: true,
    isNavigation: true,
    perMove: 1,
    arrows: false,
    pagination: false,
    breakpoints: {
      767: {
        gap: 24,
      },
    }
  });

  paginationSplide.mount();

  var gallerySwiper = new Swiper('#main_slider', {
    spaceBetween: 12,
    speed: 300,
    navigation: {
      nextEl: ".therapy_button.is-right",
      prevEl: ".therapy_button.is-left"
    },
    centeredSlides: true,
    slidesPerView: 1,
    loop: true,
    // loopAdditionalSlides: 4,
    allowTouchMove: true,
    grabCursor: true,
  });

  paginationSplide.on('moved', function (newIndex, prevIndex, destIndex) {
    if (!triggerSplide) {
      triggerSwiper = true;
      console.log({ newIndex });
      gallerySwiper.slideToLoop(newIndex);
    }
    console.log({ newIndex2: newIndex });
    triggerSplide = false;
  });

  gallerySwiper.on('slideChangeTransitionEnd', function () {
    if (!triggerSwiper) {
      const activeIndex = this.realIndex;
      triggerSplide = true;
      paginationSplide.go(activeIndex);
    }

    triggerSwiper = false;
  });
})();