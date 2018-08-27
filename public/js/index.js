// Get references to page elements
var $engBaseField = $("#engBaseField");
var $foreignLangSub = $("#foreignLangSub");
var $catForm = $("#catForm");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");
var $voteBtn = $(".voteBtn");
var $newTransBtn = $(".newTransBtn")

// The API object contains methods for each kind of request we'll make
var API = {
  postPhrase: function (phraseData) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(phraseData)
    });
  },
  getExamples: function () {
    return $.ajax({
      url: "/api/phrases",
      type: "GET"
    });
  },
  deleteExample: function (id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  },
  vote: (voteType, transId) => {
    return $.ajax({
      url: '/api/vote/' + voteType + '/' + transId,
      type: "PUT"
    })
  },
  addTrans: (newTransObj) => {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      url: '/api/newTrans/',
      type: 'POST',
      data: JSON.stringify(newTransObj)
    })
  }
};

// handleFormSubmit is called whenever we submit a new phrase
// Save the new phrase to the db and refresh the list
var handleFormSubmit = function (event) {
  event.preventDefault();
  var phrase = {
    text: $engBaseField.val().trim(),
    language: $foreignLangSub.val().trim(),
    category: $catForm.val().trim()
    //user: someusername.val().trim() --also add comma above
  };
  console.log(phrase);
  if (!phrase.text || phrase.language === "Find Language Here") {
    console.log("bad request");
    alert("You must enter an example text and description!");
    return;
  } else {
    API.postPhrase(phrase).then(function () {
      location.reload()
    });

    $engBaseField.val("");
  };
};


var handleVote = event => {
  API.vote($(event.target).attr('vote-type'), $(event.target).attr('trans-id')).then(() => {
    location.reload()
  })
}

var handleNewTrans = event => {
  event.preventDefault()
  let pId = $(event.target).attr('phrase-id')
  let nt = $("#new-trans-" + pId).val().trim()
  console.log('New translation: ' + nt + ' for phrase ID: ' + pId)
  let transObj = {
    phraseId: pId,
    trans: nt,
    language: $("#lang-trans-" + pId).val().trim(),
    votes: 0
  }
  API.addTrans(transObj).then(() => {
    $exampleList.empty();

  })
}

// Add event listeners to the submit and translate buttons
$submitBtn.on("click", handleFormSubmit);

$voteBtn.on("click", handleVote);

$newTransBtn.on('click', handleNewTrans)




