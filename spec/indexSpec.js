describe("Drawing Text", function() {
  it("Draws text on the canvas", function() {
    //arrange
    var field1 = "This is a test tweet";
    //var tweetString = document.getElementById("field1");
    //var tLengthGreater = tweetString.value.length;
    var bool = field1.draw();
    //act
    //var result = parseTweet(tweetString);
    var result = bool;
    //assert
    expect(result).toBeTrue();
  });
});
