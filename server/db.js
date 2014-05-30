var mongojs = require("mongojs");
var configs = {
  connectionString: "localhost:27017/NodeTutorial"
};

var db = mongojs(configs.connectionString);

/**
* Class Boook.
* @member {string} entity
* @member {String} ttitle
* @member {String} author
* @member {Function} insert
*/
function Book() {
  this.title = null;
  this.author = null;
  this.date = null;
}

Book.entity = "Books";

Book.create = function(book) {
  book.date = new Date(book.date);
  book.insert = Book.prototype.insert;
  return book;
}

Book.findByExample = function(ex, callback) {
  db.collection(Book.entity).find(ex, function(err, docs){
    callback(err, docs);
  });
}

Book.findAll = function(callback) {
  db.collection(Book.entity).find(function(err, docs){
    callback(err, docs);
  });
};

Book.prototype.insert = function(callback) {
  db.collection(this.entity).save(this, function(err, doc){
    callback(err, doc);
  });
}

module.exports.model = {
  Book: Book
};
