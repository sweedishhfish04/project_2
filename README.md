# Foreign Exchange
This application utilizes html, css, bootstrap, javascript, jquery, Node.js, sequelize, mysql, handlebars.js, RESTful, and Microsoft's Translation API. The end result is an application that allows users to critique the machine translation given by Microsoft, vote on which translations are most accurate, and search for terms in many language so that people can learn the proper way of speaking in another language.

## Project Overview
There are two main ways in which users interact with this application:
1. The Search Bar
2. Phrase Cards

### The Search Bar
![Search Bar](https://github.com/bshin19/Foreign-Exchange/blob/final/public/img/forexload.gif)

The search bar aligns near the top of the page on load and utilizes position:sticky to always sit at the top of the screen regardless of user scroll position.

Users can enter a term and desired language and a search is performed on the database to see if that combination exists already. If so, nothing happens (but in future functionality, the searched term will populate on the page). If the searched phrase hasn't already been searched, it is created in the database and the page is refreshed (again, future functionality will use javascript to perform a partial refresh only).

Categories also exist as potential limiters for searching, so users can search by category and language to pull up all results within that category without limiting by phrase.

### Phrase Cards
![Card Example](https://github.com/bshin19/Foreign-Exchange/blob/final/public/img/forexcard.PNG)

Phrase cards make up the rest of the page. These are filled with both the Microsoft machine translated code and user translations.

Typesets are set to match their origin language. Pictured below. To circumvent the difficulties of typing foreign keys on domestic keyboards, there is a planned future inclusion of speech-to-text functionality.

![Foreign typesets](https://github.com/bshin19/Foreign-Exchange/blob/final/public/img/forexlang.PNG)

#### Voting
![Voting](https://github.com/bshin19/Foreign-Exchange/blob/final/public/img/forexvotse.PNG)
Along the right side of each translation upon each card is the voting display. Future functionality intends to limit responses to only those that are most relevant (highly voted upon). Voting will be limited to users only and a single vote per user to prevent tampering as much as possible.

+ The yellow button displays total votes (whether positive or negative).
+ The Blue button increases the vote value by one.
+ The red button decreases the vote value by one.

#### Responding
Users can type along the bottom input bar for each card to add a custom translation to the table. These can then be voted on and interacted with just like the machine translated automatic responses.

### Login
Some elements of the login functionality are working, but as of now it is limited in use. Logging in is planned to be a requirement for accessing any voting functionality and providing unique translations.

The search and post to database in english functionality is intended to be open for any user on the site, whether logged in or not.