var model = require("./db").model;
var Book = model.Book;

/**
* Function route()
* @param {Object} app: express application object.
* @api public
*/
function route(app) {

  app.get("/", function(req, res){
    res.sendfile("/public/index.html");
  });

  app.get("/book", function(req, res){
    Book.findAll(function(err, docs){
      res.json(docs);
    });
  });

  app.post("/book/query", function(req, res){
    Book.findByExample(req.body, function(err, docs){
      res.json(docs);
    });
  });

  app.post("/book", function(req, res){
    var book = Book.create(req.body);
    book.insert(function(err, doc){
      if(!err && doc){
        res.json(doc);
      }else {
        res.statusCode = 400;
        res.end();
      }
    });
  });
}

/**
* Export only route function.
*/
module.exports =  route;
