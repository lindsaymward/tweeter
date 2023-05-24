/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$('document').ready(function() {
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

  const renderTweets = function(tweets) {
    $('.tweet-feed').empty();
    tweets.forEach(function(tweet) {
      const newTweet = createTweetElement(tweet);
      $('.tweet-feed').prepend(newTweet);
    });
  };

  $("#tweet-form").on("submit", function(event) {
    event.preventDefault();
    const tweetText = $(this).serialize();
    $('.error p').detach();
    $('.error i').detach();
    if (tweetText === "text=") {
      $('.error').append('<i class="fa-solid fa-circle-exclamation"></i><p>Please enter a tweet first</p>');
      return $('.error').slideDown('fast');
    }
    if (tweetText.length > 145) {
      $('.error').append('<i class="fa-solid fa-circle-exclamation"></i><p>Your tweet is over the 140 character limit</p>');
      return $('.error').slideDown('fast');
    }
    $('.error').slideUp();
    $.post("/tweets", tweetText)
      .then(loadTweets);
  });

  const loadTweets = function() {
    $.get('/tweets', null, renderTweets, 'json');
  };

  const escape = function(str) {
    let div = document.createElement("article");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  loadTweets();
});

