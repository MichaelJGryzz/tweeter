$(document).ready(function() {

  // jQuery event listener for "submit"
  $( '#tweet-form' ).on('submit', function(event) {
    // Prevent the default form submission behaviour
    event.preventDefault();

    // Get the tweet content from the textarea using the ID tweet-text
    const tweetContent = $('#tweet-text').val().trim();

    // Error message variable
    let errorMessage = '';

    // Validation 1: Check if the tweet content is empty
    if (!tweetContent) {
      errorMessage = 'Error: Cannot tweet a blank tweet!';
    }

    // Validation 2: Check if the tweet content exceeds 140 characters
    else if (tweetContent.length > 140) {
      errorMessage = 'Error: Cannot tweet if more than 140 characters!';
    }

    // If there is an error message, display it
    if (errorMessage) {
      $('.error-text').text(errorMessage); // Update the text inside the .error-text span
      $('#error-message').slideDown(); // Slide down the error message container
      return; // Prevent form submission if error is present
    }

    // Serialize the form data
    const serializedData = $(this).serialize();

    //Send the serialized data to the server using an Ajax POST request
    $.post('/tweets', serializedData)
      .then(() => {
        // Clear the textarea with the ID tweet-text
        $('#tweet-text').val('');

        // Reset the counter to 140
        const $counter = $('.new-tweet .counter');
        $counter.text('140');
        $counter.removeClass('error');

        // Clear the child elements of tweets-container
        $('.tweets-container').empty();

        // Load the updated tweets
        loadTweets();
      })
      .catch(error => {
        console.error('Error posting tweet', error);
    });
  });

  // renderTweets and function that takes in an array of tweet objects (tweetData) and appends each one to the #tweets-container
  const renderTweets = function(tweets) {
    // loop through tweets
    tweets.forEach(tweet => {
      // calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
      $('.tweets-container').prepend($tweet);
    });
  }

  // escape function used to ensure that any user-generated content is safely encoded, preventing XSS attacks.
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // createTweetElement function that takes in a tweet object and returns a tweet <article> element containing the enture HTML structure of the tweet
  const createTweetElement = function(tweet) {
    let $tweet = $(`
      <article class="tweet">
        <header>
          <div class="tweet-user-info">
            <img src="${escape(tweet.user.avatars)}" alt="User Avatar" />
            <h3>${escape(tweet.user.name)}</h3>
          </div>
          <div class="tweet-user-handle">
            <p>${escape(tweet.user.handle)}</p>
          </div>
        </header>
        <div class="tweet-content">
          <p>${escape(tweet.content.text)}</p>
        <footer>
          <time>${timeago.format(tweet.created_at)}</time>
          <div class="tweet-icons">
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-heart"></i>
          </div>
        </footer>
      </article>
    `);

    return $tweet;
  }

  // loadTweets function to fetch and load tweets from the server
  const loadTweets = function() {
    $.get('/tweets')
      .then(tweets => {
        // Render the tweets using from the server
        renderTweets(tweets);
      })
      .catch(error => {
        console.error('Error fetching tweet', error);
      });
  }

  // Load tweets on page load
  loadTweets();
});