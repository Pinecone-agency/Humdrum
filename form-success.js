(function initialize() {
  function detectDevice() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Check for Android device
    if (/android/i.test(userAgent)) {
      document.getElementById("download-apple").style.display = "none";
    }
    // Check for iOS device (iPhone, iPad, iPod)
    else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      document.getElementById("download-android").style.display = "none";
    }
  }

  // Run the device detection when the page loads
  window.onload = detectDevice;

  document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('wf-form-Get-Started-Form');

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const nameInput = document.getElementById('Name-3');
      const emailInput = document.getElementById('Email');

      const formData = new FormData();
      formData.append('email', emailInput.value);
      formData.append('first_name', nameInput.value);
      formData.append('source', 'get_started');

      fetch('https://humdrum.app/api/1.1/wf/leads-create-lead', {
        method: 'POST',
        body: formData
      })
        .then(response => {
          if (response.ok) {
            // Get the base URL
            const baseUrl = window.location.origin; // This gets "https://yourdomain.com"

            // Create the success URL by combining base URL with /form-success
            const successUrl = `${baseUrl}/form-success`;

            // Redirect to the success page
            window.location.href = successUrl;
          } else {
            alert('Something went wrong. Please try again.');
          }
        })
        .catch(error => {
          console.error('Error:', error);
          alert('Something went wrong. Please try again.');
        });
    });
  });
})();