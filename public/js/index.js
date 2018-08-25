// Get references to page elements
var $engBaseField = $("#engBaseField");
var $foreignLangSub = $("#foreignLangSub");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

console.log($engBaseField);
console.log($foreignLangSub);

// The API object contains methods for each kind of request we'll make
var API = {
  postPhrase: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $examples = data.map(function(example) {

      var $card = $("<div>")
        .addClass("card");
      
      var $cardHd = $("<div>")
        .addClass("card-header");

      var $ul = $("<ul>")
        .addClass("nav nav-tabs card-header-tabs")

      for (var i =0; i< 3; i++) {
        var $li = $("<li>")
        .addClass("nav-item");

      var $a = $("<a>")
        .addClass("nav-link active")
        .text("VT" + i)
        .attr("href", "#");

        $li.append($a);
        $ul.append($li);
      };

      $cardHd.append($ul);

      var $cardBod = $("<div>")
        .addClass("card-body");
      
      var $p = $("<p>")
        .addClass("card-title phraseDisp")
        .text("The phrases will go here.");

      var $row = $("<div>")
        .addClass("row");

      var $col1 = $("<div>")
        .addClass("col-auto");

      var $trans = $("<div>")
        .addClass("card-text ml-4 transDisp")
        .text("Leading translation will go here");

      $col1.append($trans);
      $row.append($col1);

      var $col2 = $("<div>")
        .addClass("col-auto");

      var $voteButt = $("<button>")
        .addClass("col-auto btn btn-warning voteTotal")
        .text("VN#");
      
      var $downVote = $("<button>")
        .addClass("col-auto btn btn-primary upBtn")
        .text("^");

      var $upVote = $("<button>")
        .addClass("col-auto btn btn-danger downBtn")
        .text("V");

      $col2.append($voteButt);
      $col2.append($downVote);
      $col2.append($upVote);

      $row.append($col2);

      var $row2 = $("<div>")
        .addClass("row");

      var $phName = $("<div>")
        .addClass("small col-3 phraseUserName")
        .text("Submitted by: username");

      var $transName = $("<div>")
        .addClass("small col-3 offset-6 transUserName")
        .text("Translation by: username");


      $row2.append($phName, $transName);

      $cardBod.append($p, $row, $row2);
      
      $card.append($cardHd, $cardBod);

      return $card;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  if (!engBaseField) {
    console.log(example);
    alert("You must enter an example text and description!");
    return;
  }

  var phrase = {
    text: $engBaseField.val().trim(),
    language: $foreignLangSub.val().trim()
    //user: someusername.val().trim() --also add comma above
  };

  API.postPhrase(phrase).then(function() {
    refreshExamples();
  });

  $engBaseField.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);
