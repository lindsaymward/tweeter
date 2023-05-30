$(document).ready(() => {
  $('#tweet-text').on('input', function(event) {
    const $length = $(this).val().length;
    const $counter = $(this).closest('form').find(".counter");
    const $charLeft = $counter.text(140 - $length);
    $counter.toggleClass("red", $charLeft.val() < 0);
  });
});