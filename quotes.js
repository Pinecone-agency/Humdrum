(function initializeSliders() {
  document.addEventListener('DOMContentLoaded', function () {
    const rangeSlider = document.getElementById('range');
    const resizableDiv = document.getElementById('progress');
    const movingDiv = document.getElementById('thumb');

    const totalValues = 14;
    rangeSlider.value = 7;

    let initialSliderValue = Math.min(rangeSlider.value, totalValues);
    resizableDiv.style.width = `${(initialSliderValue / totalValues) * 100}%`;
    movingDiv.style.left = `${(initialSliderValue / totalValues) * 100}%`;

    rangeSlider.addEventListener('input', function () {
      const sliderValue = rangeSlider.value;
      resizableDiv.style.width = `${(sliderValue / totalValues) * 100}%`;
      movingDiv.style.left = `${(sliderValue / totalValues) * 100}%`;
    });
  });
})();

(function initializeFlatpickr() {
  document.addEventListener('DOMContentLoaded', function () {
    flatpickr("#name-3", {
      dateFormat: "Y-m-d",
      altInput: true,
      altFormat: "F j, Y",
      minDate: "today"
    });
  });
})();

(function initializeFormSubmission() {
  // Handle form submission
  document.getElementById('email-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("email", document.getElementById("name-4").value);
    formData.append("first_name", document.getElementById("name").value);
    formData.append("last_name", document.getElementById("name-2").value);
    formData.append("weekday_hours", document.getElementById("hrs-week-2").value);
    formData.append("saturday_hours", document.getElementById("Saturday-hrs-week").value);
    formData.append("sunday_hours", document.getElementById("Sunday-hrs-week").value);
    formData.append("kms_per_week", document.getElementById("kms-week").value);
    formData.append("plan_end_date", document.getElementById("name-3").value);
    formData.append("base_rate", rates[document.getElementById('range').value]["baserate_(weekday)_cost"]);
    formData.append("source", "pricing_calculator"); //very important to set as pricing_calculator to ensure endpoint handles email to user!

    console.log(formData)
    fetch('https://humdrum.app/api/1.1/wf/leads-create-lead', {
      method: 'POST',
      headers: {

      },
      body: formData
    })
      .then(response => response.text())
      .then(text => {
        text = text.replace(/[^\x20-\x7E]/g, '');
        return JSON.parse(text);
      })
      .then((data) => {
        // Trigger PostHog event
        postHogEvent('cost_calculator', {});

        // Identify user in PostHog
        postHogIdentify(document.getElementById("name-4").value, document.getElementById("name").value + " " + document.getElementById("name-2").value);

        console.log('Success:', data);
      })
      .catch(error => console.error('Error:', error));
  });
})();

(function initializePricingData() {
  async function fetchPricingData() {
    const url = "https://humdrum.app/api/1.1/wf/payrates-current-payrates";
    const headers = {

      "Content-Type": "application/json"
    };

    try {
      const response = await fetch(url, { method: 'GET', headers: headers });
      let textData = await response.text();
      textData = textData.replace(/[^\x20-\x7E]/g, '');
      const parsedData = JSON.parse(textData).response;
      return parsedData;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  function updatePrices(data, index) {
    if (!data || !data.hourly_rates || !data.hourly_rates.rates[index]) return;

    const selectedRate = data.hourly_rates.rates[index];
    document.getElementById('workerPrice').innerText = selectedRate['baserate_(weekday)_pay'];
    document.getElementById('totalPrice').innerText = selectedRate['baserate_(weekday)_cost'];

    nightPrice = selectedRate.night_cost;
    saturdayPrice = selectedRate.saturday_cost;
    eveningPrice = selectedRate.evening_cost;
    sundayPrice = selectedRate.sunday_cost;
    publicPrice = selectedRate.public_holiday_cost;
    travelPrice = data.kms.rate;
    sleepOver = `${data.sleepovers.rate} ${data.sleepovers.units}`;
  }

  async function initialize() {
    const data = await fetchPricingData();
    if (data) {
      const hourlyRates = data.hourly_rates.rates;
      rates = hourlyRates;
      slider.max = hourlyRates.length - 1;
      slider.value = 7;
      updatePrices(data, slider.value);

      slider.addEventListener('input', function () {
        updatePrices(data, slider.value);
      });
    }
  }

  const slider = document.getElementById('range');
  let rates;
  initialize();
})();