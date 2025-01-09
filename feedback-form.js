(function initialize() {
  $(document).on('change', 'input#checkbox', function () {
    const isChecked = $(this).prop('checked');
    const hiddenFields = $(document).find('#Name-3, #Email, #Phone');

    if (isChecked) {
      hiddenFields.hide();
      hiddenFields.prop('required', false);
    } else {
      hiddenFields.show();
      hiddenFields.prop('required', true);
    }
  })
  // Handle form submission
  document.getElementById('wf-form-Get-Started-Form').addEventListener('submit', async function (event) {
    event.preventDefault();
    const isAnonymous = $('input#checkbox').prop('checked');

    // Create FormData object
    const formData = new FormData();

    // Map form fields to API requirements
    formData.append("reportee_fullname", !isAnonymous ? document.getElementById("Name-3").value : "");
    formData.append("reportee_email", !isAnonymous ? document.getElementById("Email").value : "");
    formData.append("reportee_phone", !isAnonymous ? document.getElementById("Phone").value : "");
    formData.append("complaint_description", document.getElementById("Feedback").value);
    formData.append("complaint_desired_outcome", document.getElementById("Desired-Outcome").value);
    formData.append("remain_anonymous", document.getElementById("checkbox").checked);

    // Log the form data for debugging
    // console.log(Object.fromEntries(formData));

    try {
      const response = await fetch('https://humdrum.app/api/1.1/wf/feedback-submit-feedback', {
        method: 'POST',
        body: formData
      });

      // Handle non-standard characters in response
      const text = await response.text();
      const cleanText = text.replace(/[^\x20-\x7E]/g, '');
      const data = JSON.parse(cleanText);

      // Clear form after successful submission
      event.target.reset();
    } catch (error) {
      console.error('Error:', error);
    }
  });
})();