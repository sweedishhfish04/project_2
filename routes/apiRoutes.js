var db = require("../models");
var Languages = require("../public/js/languages");

function postcb(post, json, cb) {
  post = Languages(JSON.parse(JSON.stringify(json)))
  cb();
};

module.exports = function(app) {
  // Get all examples

  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    })
  })
  
  // this code will get all phrases relevant to the user
  app.get("/api/phrases", function(req, res) {
    db.Trans.findAll({
      trans: req.body.trans,
      language: req.body.language,
      votes: req.body.votes
    }).then(function(phrases) {
      res.json(phrases);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) { 
      let jsonObj = JSON.parse(JSON.stringify(dbExample))
      console.log(jsonObj);
      
      Languages(jsonObj, (translate) => {
        console.log('translate: ' + translate)
        db.Trans.create({
          trans: translate,
          language: '',
          votes: 0
        }).then( (result) => {
          res.json(dbExample);
        }) // FIXME: find language and tally votes
        
      })
      //postcb(translate, dbExample, function() {
      //  db.Trans.create(translate, language, votes)
      //  res.json(dbExample);
      //})
      //var translate = Languages(JSON.parse(JSON.stringify(dbExample)))
      //res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
