var db = require("../models");
var Languages = require("../public/js/languages");

module.exports = function (app) {

  // Get User

  app.get("/User", function (req, res) {
    db.User.findAll().then(function (User) {
      res.json(User);
    })
  })

  // Get all phrases

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

  // Create a new phrase
  app.post("/api/examples", function (req, res) {
    console.log("----------------------------------------- REQ BODY");
    console.log(req.body);
    db.Example.findOrCreate({
      where: {
        text: req.body.text
      }, defaults:
        req.body
    })
      .spread((phrase, created) => {
        console.log(created);
        let jsonObj = JSON.parse(JSON.stringify(phrase));
        Languages(jsonObj, req.body.language, (translate) => {
          db.Trans.create({
            trans: translate,
            language: req.body.language,
            votes: 0,
            phraseId: jsonObj.id
          }).then((result) => {
            res.json(result);
          })
        });
      })
  })

  // Handle translation votes
  app.put('/api/vote/:direction/:transId', (req, res) => {
    db.Trans.findOne({
      where: {
        id: req.params.transId
      }
    }).then((result) => {
      let newVotes = result.votes
      if (req.params.direction === 'up')++newVotes
      if (req.params.direction === 'down')--newVotes
      db.Trans.update({
        votes: newVotes
      },
        {
          where: {
            id: req.params.transId
          }
        }).then((result) => {
          res.json(result)
        })
    })
  })

  // Add new user-supplied translations
  app.post('/api/newTrans', (req, res) => {
    db.Trans.create(req.body).then(result => {
      res.json(result)
    })
  })

  // Delete an example by id
  app.delete("/api/examples/:id", function (req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
      res.json(dbExample);
    });
  });
}
