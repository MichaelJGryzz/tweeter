$(document).ready(function() {
  
  // Select the textarea within the .new-tweet section
  $('.new-tweet textarea').on('input', function() {
    // Use 'this' to refer to the textarea element
    const $textarea = $(this); // Convert plain DOM node to a jQuery object
    const charCount = $textarea.val().length; // Get the length of the input value
    const charsRemaining = 140 - charCount; // Calculate the characters reamining from 140

    // Ensure the counter element is targeted properly
    const $counter = $textarea.closest('.new-tweet').find('.counter'); // Traverse DOM to find the closest .new-tweet and then the .counter inside it
    
    // Update the counter
    $counter.text(charsRemaining);

    // Add or remove error class based on the character count (so it can be turned red if count is exceeded using CSS)
    if (charsRemaining < 0) {
      $counter.addClass('error'); // Add red colour if exceeded
    } else {
      $counter.removeClass('error') // Remove red colour if within character limit
    }
  });
});