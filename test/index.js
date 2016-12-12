// Should see the page
casper.test.begin("Should load app into the document", 3, function(test) {
  casper.start("http://localhost:8080/", function(){
    test.assertTitleMatches(/Books App/)
    test.assertExists("#app")
    test.assertUrlMatches(/\//)
  })
  .run(function(){
    test.done();
  })
});

// Test the history API
casper.test.begin("Should catch all URLs", 3, function(test) {
  casper.start("http://localhost:8080/non-existing-url", function(){
    test.assertTitleMatches(/Books App/)
    test.assertElementCount("#app", 1)
    test.assertUrlMatches(/\/non-existing-url/)
  })
  .run(function(){
    test.done();
  })
});

// Favorites
casper.test.begin("Should list books", 2, function(test) {
  casper.start("http://localhost:8080/index", function(){
    this.mouse.click("button.like[0]")

    test.assertTitleMatches(/Books App/)
    // test.assert(cards > 4)
    // document.querySelector(".container.grid .wide.index .ui.card")
    test.assertUrlMatches(/\/index/)
  })
  .run(function(){
    test.done();
  })
});

// Favorites
casper.test.begin("Should search books", 2, function(test) {
  casper.start("http://localhost:8080/report", function(){

    // should to back to the index page to to a different page
    this.click("form.search input[type='text']")
    test.assertUrlMatches(/\/index/)

    // results should not be empty
    var cards = this.getElementInfo(".ui.card").html
    test.assert(cards.match("rating").length > 0)

  })
  .run(function(){
    test.done();
  })
});
