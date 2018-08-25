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
      // url: "api/examples",
      url: "/api/phrases",
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
 console.log("Phrase: =========================================")
 console.log(phrase);
  API.postPhrase(phrase).then(function() {
    //refreshExamples();
    location.reload()
  });

  $engBaseField.val("");
  
  // $foreignLangSub.val("");
};



// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);
// add event listener to the value changes in the language box

// $foreignLangSub.on("click", handleFormSubmit);