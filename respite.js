(function initializeSliders() {
  const swiper = new Swiper('#homing', {
    slidesPerView: 1,
    spaceBetween: 10,
    autoHeight: true,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      bulletClass: 'testimonial_bullet',
      bulletActiveClass: 'is-active',
      bulletElement: 'button',
      clickable: true,
    },
    navigation: {
      nextEl: '.testimonial_button.is-next',
      prevEl: '.testimonial_button.is-prev',
    },
  });
})();