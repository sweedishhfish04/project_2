var db = require("../models");
var Languages = require("../public/js/languages");

// function postcb(post, json, cb) {
//   post = Languages(JSON.parse(JSON.stringify(json)))
//   cb();
// };

module.exports = function (app) {
  // Get all examples

  app.get("/api/examples", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.json(dbExamples);
    })
  })

  // this code will get all translated phrases relevant to the user
  app.get("/api/phrases", function (req, res) {
    db.Trans.findAll({
      where: {
        trans: req.body.trans,
        language: req.body.language
      }
    }).then(function (Trans) {
      res.json(Trans);
    });
  });

  // Create a new example
  app.post("/api/examples", function (req, res) {
    db.Example.create(req.body).then(function (dbExample) {
      let jsonObj = JSON.parse(JSON.stringify(dbExample));
      Languages(jsonObj, req.body.language, (translate) => {
        db.Trans.create({
          trans: translate,
          language: req.body.language,
          votes: 0,
          phraseId: jsonObj.id
        }).then((result) => {
          res.json(result);
        })
      })
    })
  })
  // Delete an example by id
  app.delete("/api/examples/:id", function (req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
      res.json(dbExample);
    });
  });
}
