
const swiperCard = new Swiper('.swiper.is-card', {
  effect: 'cards',
  grabCursor: true,
  cardsEffect: {
    slideShadows: false,
    perSlideRotate: 23.5
  },
  initialSlide: 2,


});
// Initialize the swiper with shadow effect
const swiperShadowCard = new Swiper('.swiper.is-shadow', {
  effect: 'cards',
  grabCursor: true,
  initialSlide: 3,
  cardsEffect: {
    slideShadows: false,
    // perSlideRotate: 25
    perSlideRotate: 23.5
  },
});

// Initialize the main draggable swiper
const swiper = new Swiper('.swiper.is-dragable', {
  slidesPerView: 'auto', // Auto width for slides
  spaceBetween: 24, // Gap between slides in pixels
  grabCursor: true, // Makes the slider draggable
});

// Link the two Swipers so they move together
swiperCard.controller.control = swiperShadowCard;
swiperShadowCard.controller.control = swiperCard;


function ctaAnim() {
  let ctaAnimTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".section_cta",
      start: "top 90%",
      end: "bottom top",
      scrub: false,
      toggleActions: "play none none none"

    },
    defaults: {
      ease: "power2.out",
      duration: 0.8,
      yoyo: true,
      repeat: -1
    }
  })

  ctaAnimTl.to(".cta_heading-icon-wrapper.is-man", {
    y: "-0.6em",
    rotate: 10,
    duration: 0.6

  })
    .fromTo(".cta_heading-icon-wrapper.is-horse", { rotate: -20 }, { rotate: 30 }, 0)
    .to(".cta_heading-icon-wrapper.is-house", {
      scale: "1.1",
      duration: 0.5
    }, 0)
    .to(".cta_heading-icon-wrapper.is-radio", {
      y: "-0.6em",
      rotate: -10,
      duration: 0.6

    });

}
ctaAnim();
