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
        <img src=${tweet.user.avatars} />
        <h3>${tweet.user.name}</h3>
      </span>
      <h4>${tweet.user.handle}</h4>
    </header>
    <p class="tweet-body">${tweet.content.text}</p>
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
  }

  const renderTweets = function(tweets) {
    tweets.forEach(function(tweet) {
      const newTweet = createTweetElement(tweet);
      $('.tweet-feed').append(newTweet);
    })
  }
  
  $("#tweet-form").on("submit", function(event) {
    event.preventDefault();
    $.post("/tweets", $(this).serialize());
  });

  const loadTweets = function() {
    $.get('/tweets', null, function(data) {
      renderTweets(data);
    }, 'json');
  }

  loadTweets();
});

