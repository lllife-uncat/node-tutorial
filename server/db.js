var mongojs = require("mongojs");
var configs = {
  connectionString: "localhost:27017/NodeTutorial"
};

var db = mongojs(configs.connectionString);

/**
* Base class.
* @member {Date} create
* @api public
*/
function Base() {
  this.create = new Date();
}

/**
* function save()
* Save current object instance into database.
* @param {Function} callback.
* @api public
*/
Base.prototype.save = function(callback) {
  db.collection(this.entity).save(this, function(err, doc){
    callback(err, doc);
  });
}

/**
* Find database record by given condition.
* @param {String} entity: Collection name.
* @param {Object} ex: Query condition.
* @param {Function}} callback.
* @api public
*/
Base.findByExample = function(entity, ex, callback) {
  db.collection(entity).find(ex, function(err, docs){
    callback(err, docs);
  });
}

/**
* Find all database record.
* @param {String} entity: Collection name.
* @param {Function} callback.
* @api public
*/
Base.findAll = function(entity, callback) {
  db.collection(entity).find(function(err, docs){
    callback(err, docs);
  });
};


/**
* Class Boook.
* @member {string} entity
* @member {String} ttitle
* @member {String} author
* @member {Function} insert
* @api public
*/
function Book(init) {
  init = init || {};
  this.entity = "Books";
  this.title =  init.title;
  this.author = init.author;
  this.date = init.date;
  Base.call(this);
}

/**
* Inherite prototype from Base.
*/
Book.prototype = new Base();

/**
* Create Book instance with init data.
* @param {Object} book.
* @return {Object} new Book instatnce.
* @api public
*/
Book.create = function(book) {
  var book = new Book(book);
  return book;
}

/**
* Export all model class.
*/
module.exports.model = {
  Book: Book,
  Base: Base
};
