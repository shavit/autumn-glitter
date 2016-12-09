// Should see the page
casper.test.begin("Should load app into the document", 3, function(test) {
  casper.start("http://localhost:8080/src/html", function(){
    test.assertTitleMatches(/Books App/)
    test.assertExists("#app")
    test.assertUrlMatches(/src\/html/)
  })
  .run(function(){
    test.done();
  })
});
