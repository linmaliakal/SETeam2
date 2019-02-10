//trial unit test
describe("Opposite Value", function() {
  it("Returns opposite value of given variable, using to check Jasmine running", function() {
    //arrange to test against
    let foo = false;
    //act the function
    const result = getOpposite(foo);
    //assert to check result with expected
    expect(result).toBe(true);
  });
});
describe("Length of Tweet - More", function() {
  it("Only allows tweets that are less than or equal to 280 characters", function() {
    //arrange
    var tweetString = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vitae nisi sed justo maximus vehicula. Sed iaculis a leo ac rutrum. Aliquam vel lacus ut arcu consequat dignissim. Fusce id lectus arcu. In nunc sapien, interdum at varius sed, fringilla at metus. Nulla ac nibh at erat tempor interdum. Nam eu metus et arcu laoreet finibus. Nunc eu velit ullamcorper, mollis magna id, tempor enim. Mauris ligula lorem, accumsan at porta finibus, venenatis non odio. Donec malesuada et ligula quis dapibus. Sed quis dolor rutrum, accumsan purus in, egestas dolor. Proin pulvinar, nibh quis auctor elementum, ex enim sagittis ante, at tincidunt nulla orci vel velit. Nullam tempus sollicitudin nibh non efficitur. Mauris pharetra porttitor arcu, ac venenatis risus efficitur vitae.";
    //var tweetString = document.getElementById("field1");
    //var tLengthGreater = tweetString.value.length;
    var tLengthGreater = tweetString.length;
    //act
    //var result = parseTweet(tweetString);
    var result = tLengthGreater;
    //assert
    expect(result).toBeGreaterThan(280);
  });
});
describe("Length of Tweet - Less", function() {
  it("Recognizes any string after @ symbol to be a mention of another account/person", function() {
    //arrange
    var tweetString = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vitae nisi sed justo maximus vehicula.";
    //act
    var tLengthLess = tweetString.length;
    var result = tLengthLess;
    //assert
    expect(result).toBeLessThan(280);
  });
});
describe("Length of Tweet - None", function() {
  it("Recognizes any string after @ symbol to be a mention of another account/person", function() {
    //arrange
    var tweetString = "";
    //act
    var tLength = tweetString.length;
    var result = tLength;
    //assert
    expect(result).toBe(0);
  });
});
describe("Length of Tweet - Exact", function() {
  it("Recognizes any string after @ symbol to be a mention of another account/person", function() {
    //arrange
    var tweetString = "Only allows tweets that are less than or equal to 280 charactersOnly allows tweets that are less than or equal to 280 charactersOnly allows tweets that are less than or equal to 280 charactersOnly allows tweets that are less than or equal to 280 charactersOnly allows tweets that ";
    //act
    var tLengthExact = tweetString.length;
    var result = tLengthExact;
    //assert
    expect(result).toBe(280);
  });
});
describe("Mentions from @", function() {
  it("Recognizes any string after @ symbol to be a mention of another account/person", function() {
    //arrange
    var mention = "Hey, @linmaliakal";
    //act
    //var result = parseTweet(mention);
    //assert
    //expect(result).toBeTrue();
  });
});
describe("Topics from #", function() {
  it("Recognizes any string after # to be a topic except if # follows first #", function() {
    //arrange
    //act
    //assert
  });
});
describe("URLs", function() {
  it("Finds URLs in the tweet and shows them as such", function() {
    //arrange
    //act
    //assert
  });
});
