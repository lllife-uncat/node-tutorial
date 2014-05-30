var expect = require("chai").expect;
var model = require("../server/db").model;

describe("[Tutorial Model]", function(){
  it("Should serialize model ok", function(){
    var book = new model.Book();
    book.title = "NodeJS";
    book.author = "GH";
    book.date = new Date();
    var json = JSON.stringify(book);
    console.log(json);
  });
});
