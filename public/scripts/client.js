/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Everything happens after page loads fully:
$('document').ready(function() {
  // Construct tweet based on data from renderTweets loop:
  const createTweetElement = function(tweet) {
    let timePosted = timeago.format(tweet.created_at);
    let $tweet = $(`<article class="tweet">
    <header>
      <span>
        <img src=${escape(tweet.user.avatars)} />
        <h3>${escape(tweet.user.name)}</h3>
      </span>
      <h4>${escape(tweet.user.handle)}</h4>
    </header>
    <p class="tweet-body">${escape(tweet.content.text)}</p>
    <footer>
      <p>${timePosted}</p>
      <span>
      <button><i class="fa-solid fa-flag"></i></button>
      <button><i class="fa-solid fa-retweet"></i></button>
      <button><i class="fa-solid fa-heart"></i></button>
    </span>
    </footer>
  </article>`);
    return $tweet;
  };

  // Loop through database to individually pass to createTweetElement function
  const renderTweets = function(tweets) {
    $('.tweet-feed').empty();
    tweets.forEach(function(tweet) {
      const newTweet = createTweetElement(tweet);
      $('.tweet-feed').prepend(newTweet);
    });
  };

  // AJAX POST request and reload visible tweets. Error handling for tweets that don't fit criteria.
  $("#tweet-form").on("submit", function(event) {
    event.preventDefault();
    const tweetText = $(this).serialize();
    $('.error').slideUp('fast');
    $('.error p').detach();
    $('.error i').detach();

    if (tweetText === "text=") {
      $('.error').append('<i class="fa-solid fa-circle-exclamation"></i><p>Please enter a tweet first</p>');
      return $('.error').slideDown();
    }
    if (tweetText.length > 145) {
      $('.error').append('<i class="fa-solid fa-circle-exclamation"></i><p>Your tweet is over the 140 character limit</p>');
      return $('.error').slideDown();
    }

    $.post("/tweets", tweetText)
      .then(loadTweets);
  });

  // AJAX GET request
  const loadTweets = function() {
    $.get('/tweets', null, renderTweets, 'json');
  };

  // Securing createTweetElement to prevent malicious users from breaking app
  const escape = function(str) {
    let div = document.createElement("article");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // Initial load of previous tweets
  loadTweets();
});

