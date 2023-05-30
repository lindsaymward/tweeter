// Everything happens after page loads fully:
$('document').ready(function() {
    // Initial load of previous tweets
    loadTweets();
    $('#write-button').on('click', onClick);
    $("#tweet-form").on("submit", onSubmit);
  });

  // Click animated arrow in nav to auto-focus to form textarea
  const onClick = function() {
    $('#tweet-form').slideToggle();
    $('#tweet-text').focus();
    $('.error').hide();
  };

  // Construct tweet based on data from renderTweets loop:
  const createTweetElement = function(tweet) {
    let timePosted = timeago.format(tweet.created_at);
    let $tweet = $(`<article class="tweet">
    <header>
      <span>
        <img src=${doEscape(tweet.user.avatars)} />
        <h3>${doEscape(tweet.user.name)}</h3>
      </span>
      <h4>${doEscape(tweet.user.handle)}</h4>
    </header>
    <p class="tweet-body">${doEscape(tweet.content.text)}</p>
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
    const $container = $('.tweet-feed').empty();
    tweets.forEach(function(tweet) {
      const newTweet = createTweetElement(tweet);
      $container.prepend(newTweet);
    });
  };

  // AJAX POST request and reload visible tweets. Error handling for tweets that don't fit criteria.
  const onSubmit = function(event) {
    event.preventDefault();
    const $tweetText = $(this).serialize();
    const $input = $(this).find('#tweet-text');
    const $error = $(this).next();
    $error.slideUp('fast');
    $error.children().detach();

    if ($input[0].value === "") {
      $error.append('<i class="fa-solid fa-circle-exclamation"></i><p>Please enter a tweet first</p>');
      return $error.slideDown();
    }
    if ($input[0].value.length > 140) {
      $error.append('<i class="fa-solid fa-circle-exclamation"></i><p>Your tweet is over the 140 character limit</p>');
      return $error.slideDown();
    }

    $.post("/tweets", $tweetText)
      .then(loadTweets);
  };

  // AJAX GET request
  const loadTweets = function() {
    $.get('/tweets', null, renderTweets, 'json');
  };

  // Securing createTweetElement to prevent malicious users from breaking app
  const doEscape = function(str) {
    let div = document.createElement("article");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };