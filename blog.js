(function initializeSliders() {
  var swiper = new Swiper('.swiper-container', {
    slidesPerView: 'auto',
    spaceBetween: 16,
    centeredSlides: true,
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    on: {
      init() {
        this.slideTo(1);
      },
    },
  });
})();

(function initializeArticles() {
  // Script to force show the article card on filter
  let cmsLoaded = false;
  let afterCmsLoaded = false;

  window.fsAttributes = window.fsAttributes || [];
  window.fsAttributes.push([
    'cmsload',
    (listInstances) => {
      console.log('cmsload Successfully loaded!');

      // The callback passes a `listInstances` array with all the `CMSList` instances on the page.
      const [listInstance] = listInstances;

      // The `renderitems` event runs whenever the list renders items after switching pages.
      listInstance.on('renderitems', (renderedItems) => {
        if (afterCmsLoaded) {
          renderedItems.map((item) => {
            if (item?.element) $(item.element).css('opacity', 1);
          });
        }

        if (cmsLoaded) afterCmsLoaded = true;
        cmsLoaded = true;
      });
    },
  ]);
})();