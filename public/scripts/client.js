$(document).ready(function() {

// Fake data taken from initial-tweets.json
const tweetData = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1722539700796
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1722626100796
  },
]

  // jQuery event listener for "submit"
  $( '#tweet-form' ).on('submit', function(event) {
    // Prevent the default form submission behaviour
    event.preventDefault();

    // Serialize the form data
    const serializedData = $(this).serialize();

    //Send the serialized data to the server using an Ajax POST request
    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: serializedData,
      success: function(response) {
        // Reset the form for new input
        $('#tweet-form')[0].reset();
      },
      error: function(error) {
        console.error('Error posting tweet', error);
      }
    });
  });
  

  // renderTweets and function that takes in an array of tweet objects (tweetData) and appends each one to the #tweets-container
  const renderTweets = function(tweets) {
    // loop through tweets
    tweets.forEach(tweet => {
      // calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
      $('.tweets-container').append($tweet);
    });
  }

  // createTweetElement function that takes in a tweet object and returns a tweet <article> element containing the enture HTML structure of the tweet
  const createTweetElement = function(tweet) {
    let $tweet = $(`
      <article class="tweet">
        <header>
          <div class="tweet-user-info">
            <img src="${tweet.user.avatars}" alt="User Avatar" />
            <h3>${tweet.user.name}</h3>
          </div>
          <div class="tweet-user-handle">
            <p>${tweet.user.handle}</p>
          </div>
        </header>
        <div class="tweet-content">
          <p>${tweet.content.text}</p>
        <footer>
          <time>${new Date(tweet.created_at).toLocaleDateString()}</time>
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

  // Render the tweets using the fake data
  renderTweets(tweetData);
});