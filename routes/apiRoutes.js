var db = require("../models");

module.exports = function(app) {
  // Get all examples

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
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
