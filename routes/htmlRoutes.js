var db = require("../models");

// Individual foreign-language translations to be displayed per native-language phrase
var Translation = (foreignPhrase, rating) => {
  this.foreignPhrase = foreignPhrase,
  this.rating = rating
}

// Tabbed card that holds the native phrase and a separate tab for each translation
var TranslationCard = (nativePhrase) => {
  this.nativePhrase = nativePhrase,
  this.translations = []
}

// Recursive magic to grab the translations
function findTranslations(phraseArr) {
  if (phraseArr.length > 0) {
    var card = new TranslationCard(phraseArr[0].text)
    db.Trans.findAll({ where: {
      phraseId: phraseArr[0].id
    }}).then( result => {
      card.translations.push(new Translation(result.trans, result.votes))
      translationCards.push(card)
      findTranslations(phraseArr.slice(1))
    })
  }

}
module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
      db.Example.findAll({}).then(function(dbExamples) {
        var translationCards = []
        findTranslations(dbExamples)
        console.log('translationCards: ' + translationCards)
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });
  //db.phrases.findAll({}).then(function(dbExamples) {
  //   res.render("index", {
  //     msg: "Welcome!"
  //     //examples: dbExamples
  //   });
  //   // });
  // });

  // Load example page and pass in an example by id
  app.get("/example/:id", function (req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function (dbExample) {
      //db.Example.findOne({ where: { id: req.params.id } }).then(function(fexDb) {
      res.render("example", {
        example: dbExample
        //example: fexDb
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
