/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$('document').ready(function() {
  const createTweetElement = function(tweet) {
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
      <p>${tweet.created_at}</p>
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
  
  // Test / driver code (temporary). Eventually will get this from the server.
  const data = [
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
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]
  
  renderTweets(data);
});

