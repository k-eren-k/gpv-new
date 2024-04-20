var spans = document.querySelectorAll(".repo-desc span");

spans.forEach(function (span) {
  if (text.length > 200) {
    span.textContent = text.slice(0, 200) + "...";
  }
});
var spans = document.querySelectorAll(".gists-desc span");

spans.forEach(function (span) {
  if (text.length > 200) {
    span.textContent = text.slice(0, 200) + "...";
  }
});
