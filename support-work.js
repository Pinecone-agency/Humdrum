(function initializeLottieSlider() {
  // Create update slider event
  var updateSliderEvent = document.createEvent("Event");
  updateSliderEvent.initEvent("updateSliderValue");

  let latestFrame = 0;
  const rangeSlider = document.getElementById('Range');
  const resizableDiv = document.getElementById('resizableDiv');
  const movingDiv = document.getElementById('movingDiv');

  // Total number of values in your dataset (14 in this case)
  const totalValues = 13;

  // Set the initial slider value to 6 (or any other default value)
  rangeSlider.value = 0;

  // Get the first Lottie animation from Webflow's data-src attribute
  const lottieElement = document.querySelector('.wings_lottie');
  const lottieSrc = lottieElement.getAttribute('data-src');

  // Load the first Lottie animation manually using the Lottie library
  const lottieInstance = lottie.loadAnimation({
    container: lottieElement, // Lottie container
    renderer: 'svg',
    loop: false, // Optional, depending on your needs
    autoplay: false, // Controlled by the range slider
    path: lottieSrc, // Path from Webflow's data-src attribute
  });

  // Re-sync the wings animation latest frame on complete
  lottieInstance.addEventListener('complete', function () {
    if (lottieInstance.renderer.renderedFrame !== latestFrame) {
      lottieInstance.playSegments([lottieInstance.renderer.renderedFrame, latestFrame], true)
    }
  })

  // Add event listener for when the Lottie animation is fully loaded
  lottieInstance.addEventListener('DOMLoaded', function () {
    const maxFrames = lottieInstance.totalFrames;

    // Ensure the slider value is clamped between 0 and totalValues
    let initialSliderValue = Math.min(rangeSlider.value, totalValues);

    // Set the initial frame based on the slider's value (as a percentage of totalValues)
    const initialFrame = (initialSliderValue / totalValues) * maxFrames;
    // lottieInstance.goToAndStop(initialFrame, true);
    lottieInstance.setSpeed(1.2);
    lottieInstance.playSegments([lottieInstance.renderer.renderedFrame, initialFrame], true);

    // Update latest frame after get the initial frame
    latestFrame = initialFrame;

    // Also adjust resizableDiv and movingDiv based on initial slider value
    resizableDiv.style.width = `${(initialSliderValue / totalValues) * 100}%`;
    movingDiv.style.left = `${(initialSliderValue / totalValues) * 100}%`;

    // Add event listener for range slider to update the frame dynamically
    const updateSlider = () => {
      const sliderValue = rangeSlider.value;

      // Adjust the width of the resizable div
      resizableDiv.style.width = `${(sliderValue / totalValues) * 100}%`;

      // Adjust the left position of the moving div
      movingDiv.style.left = `${(sliderValue / totalValues) * 100}%`;

      // Calculate the corresponding frame in the Lottie animation based on slider value
      let frame = (sliderValue / totalValues) * maxFrames;

      // Prevent frame from going beyond the maximum frames
      if (frame >= maxFrames) {
        frame = maxFrames - 1; // Clamp it to the last frame
      }

      // Update latest frame
      latestFrame = frame;

      // Synchronize the Lottie animation to the current frame
      // lottieInstance.goToAndStop(frame, true);
      if (lottieInstance.isPaused) {
        lottieInstance.playSegments([lottieInstance.renderer.renderedFrame, frame], false);
      }
    }

    rangeSlider.addEventListener('input', updateSlider);

    // Listen for the event.
    rangeSlider.addEventListener(
      "updateSliderValue",
      updateSlider,
      false,
    );
  });

  // Get the second Lottie animation for the range thumb click
  const secondLottieElement = document.querySelector('.pony-lottie'); // Another Lottie container
  const secondLottieSrc = secondLottieElement.getAttribute('data-src');

  // Load the second Lottie animation
  const secondLottieInstance = lottie.loadAnimation({
    container: secondLottieElement,
    renderer: 'svg',
    loop: false, // Optional
    autoplay: false, // Autoplay is disabled; we'll control it manually
    path: secondLottieSrc,
  });

  rangeSlider.addEventListener('mousedown', function () {
    secondLottieInstance.stop(); // Stop the animation to reset it
    secondLottieInstance.play(); // Start playing the second Lottie animation from the beginning
  });

  rangeSlider.addEventListener("mouseup", function () {
    secondLottieInstance.stop(); // Stop the animation to reset it
    secondLottieInstance.play(); // Start playing the second Lottie animation from the beginning
  });

  async function fetchPricingData() {
    const url = "https://humdrum.app/api/1.1/wf/payrates-current-payrates";
    const headers = {
      "Authorization": "Bearer 1cc584af831897154489f040375b4929",
      "Content-Type": "application/json"
    };

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: headers,
      });

      if (!response.ok) {
        console.error(`Error: ${response.status} - ${response.statusText}`);
        return null;
      }

      let textData = await response.text();
      textData = textData.replace(/[^\x20-\x7E]/g, '');  // Additional cleaning

      try {
        const parsedData = JSON.parse(textData);  // Parse the JSON
        console.log("Parsed data:", parsedData);  // Debugging
        return parsedData;
      } catch (parseError) {
        console.error("Error parsing JSON:", parseError);
        return null;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // Function to update the UI with corresponding prices
  function updatePrices(data, index) {
    if (!data || !data.hourly_rates || !data.hourly_rates.rates || data.hourly_rates.rates.length <= index) return;

    const selectedRate = data.hourly_rates.rates[index];
    console.log("Updating values for index:", index);  // Debugging

    workerPrice.innerText = `${selectedRate['baserate_(weekday)_pay']}`;
    nightPrice.innerText = `${selectedRate.night_cost}`;
    saturdayPrice.innerText = `${selectedRate.saturday_cost}`;
    eveningPrice.innerText = `${selectedRate.evening_cost}`;
    sundayPrice.innerText = `${selectedRate.sunday_cost}`;
    publicPrice.innerText = `${selectedRate.public_holiday_cost}`;
    travelPrice.innerText = `${data.kms.rate} ${data.kms.units}`;
    totalPrice.innerText = `${selectedRate['baserate_(weekday)_cost']}`;
    sleepOver.innerText = `${data.sleepovers
      .rate} ${data.sleepovers
        .units}`;
    // Debugging
  }

  // Initialize function
  async function initialize() {
    const data = await fetchPricingData();  // Fetch the pricing data

    if (!data) {
      console.error("No data received from fetchPricingData");
      return;  // Exit if no data
    }

    // Access the nested structure correctly
    const hourlyRates = data.response?.hourly_rates?.rates;

    if (!hourlyRates) {
      console.error("Data structure is not as expected. Missing 'hourly_rates' or 'rates'.");
      return;  // Exit if the structure is not as expected
    }

    // Set the slider max value based on the number of rates
    slider.max = hourlyRates.length - 1;
    slider.value = 0;

    // Initial price update for default slider value
    updatePrices(data.response, slider.value);

    // Add event listener for slider change
    slider.addEventListener('input', function () {
      updatePrices(data.response, slider.value);
    });

    // Update slider value on screen view
    ScrollTrigger.create({
      trigger: $('.participant_cards-wrap'),
      start: 'top 50%',
      once: true,
      onEnter: () => {
        setTimeout(function () {
          slider.value = 7;
          slider?.dispatchEvent(updateSliderEvent);
          updatePrices(data.response, slider.value);
        }, 200)
      },
    })
  }

  // Elements
  const slider = document.getElementById('Range');
  const workerPrice = document.getElementById('workerPrice');
  const nightPrice = document.getElementById('nightPrice');
  const saturdayPrice = document.getElementById('saturdayPrice');
  const eveningPrice = document.getElementById('eveningPrice');
  const sundayPrice = document.getElementById('sundayPrice');
  const publicPrice = document.getElementById('publicPrice');
  const travelPrice = document.getElementById('travelPrice');
  const totalPrice = document.getElementById('totalPrice');
  const sleepOver = document.getElementById('sleepOver');

  // Initialize the process
  initialize();
})();

(function initializeSliders() {
  const swiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    spaceBetween: 24,
    centeredSlides: false,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      bulletClass: 'session_pagination',
      bulletActiveClass: 'is-active',
      bulletElement: 'button',
      clickable: true,
    },
    navigation: {
      nextEl: '.session_arrow.is-right',
      prevEl: '.session_arrow.is-left',
    },
    loop: false,
    breakpoints: {
      479: {
        slidesPerView: 1,
        spaceBetween: 24,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 24,
      },
      992: {
        slidesPerView: 2,
        spaceBetween: 32,
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 32,
      },
    },
  });
})();