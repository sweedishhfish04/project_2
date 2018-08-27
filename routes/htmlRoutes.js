var db = require("../models");

// Individual foreign-language translations to be displayed per native-language phrase
var Translation = function (foreignPhrase, rating) {
  this.foreignPhrase = foreignPhrase,
    this.rating = rating
}

// Tabbed card that holds the native phrase and a separate tab for each translation
var TranslationCard = function (nativePhrase, nativePhraseId) {
  this.nativePhrase = nativePhrase,
  this.nativePhraseId = nativePhraseId,
    this.translations = []
}

// Recursive magic to grab the translations
function findTranslations(phraseArr, translationCards, returnCb) {
  if (phraseArr.length > 0) {
    var card = new TranslationCard(phraseArr[0].text, phraseArr[0].id)
    db.Trans.findAll({
      where: {
        phraseId: phraseArr[0].id
      }
    }).then(transResult => {
      /*
      let jsonTrans = JSON.stringify(transResult)
      
      for (let k = 0; k < transResult.length; ++k) {
        card.translations.push(new Translation(transResult[k].trans, transResult[k].votes))
      }
      */
      card.translations = transResult
      translationCards.push(card)
      findTranslations(phraseArr.slice(1), translationCards, returnCb)
    })
  } else {
    returnCb(translationCards)
  }

}
module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      var translationCards = []
      findTranslations(dbExamples, translationCards, (resultCards) => {
        console.log('resultCards: ' + JSON.stringify(resultCards))
        let jsonResultCards = JSON.stringify(resultCards)
        res.render("index", {
          msg: "Welcome!",
          examples: JSON.parse(jsonResultCards)
        })
      })

      //res.render("index", {
      //  msg: "Welcome!",
      //  examples: dbExamples
      //});
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
