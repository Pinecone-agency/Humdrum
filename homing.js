(function initializeReadMore() {
  document.addEventListener("DOMContentLoaded", function () {
    // Run only if the screen width is less than 991 pixels
    if (window.innerWidth < 991) {
      const textContainers = document.querySelectorAll(".text-container");

      textContainers.forEach(container => {
        const textContent = container.querySelector(".text-content");
        const originalText = textContent.textContent;
        const truncateLimit = 100; // Adjust character limit as needed for 3 lines

        function truncateText() {
          textContent.textContent = originalText.slice(0, truncateLimit) + "... ";
          textContent.style.display = "inline";
          textContent.style.webkitLineClamp = "3";
        }

        // Initial Truncation
        truncateText();

        // Create the "Read More" button
        const readMoreLink = document.createElement("span");
        readMoreLink.classList.add("read-more");
        readMoreLink.textContent = "Read More";
        container.appendChild(readMoreLink); // Append the button after the text content

        readMoreLink.addEventListener("click", function () {
          if (textContent.classList.contains("expanded")) {
            truncateText(); // Collapse back to truncated state
            readMoreLink.textContent = "Read More";
            textContent.classList.remove("expanded");
          } else {
            textContent.textContent = originalText; // Show full text
            textContent.style.display = "block"; // Remove line clamping
            readMoreLink.textContent = "Read Less";
            textContent.classList.add("expanded");
          }
        });
      });
    }
  });
})();

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