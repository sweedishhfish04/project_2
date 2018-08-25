//Phrase must be sent in from json object and parsed
module.exports = function (phrase, cb) {
    // console.log('Logging phrase: ' + phrase);
    console.log('Logging phrase: ' + JSON.stringify(phrase));  
    'use strict';

    let fs = require('fs');
    let https = require('https');

    // **********************************************
    // *** Update or verify the following values. ***
    // **********************************************

    // Replace the subscriptionKey string value with your valid subscription key.
    let subscriptionKey = 'ab8347fee07f47ef8b38954f4705b403';

    let host = 'api.cognitive.microsofttranslator.com';
    let path1 = '/translate?api-version=3.0';

    // Translate to target language,
    // TODO: switch statement for the language; Then assign params to appropiate string specifying the language to be translated
    // let params = '&to=es';
    // let params2 = '&to=en&de';

    // this switch statement will translate into the language the user chooses.

         // this text variable is gonna be the text input from the user, we can get the text from the API postPhrase method.
        
    let params =  '&to=es';

    // let params2 = '&to=de';
    

        // this text variable is gonna be the text input from the user, we can get the text from the API postPhrase method.
    let text = phrase.text;

     let response_handler = function (response) {
        let body = '';
        response.on('data', function (d) {
            body += d;
        });
        response.on('end', function () {
           console.log(body)
        //    console.log('Logging phrase: ' + JSON.stringify(body));  

            let json = JSON.parse(body)
            let response = json[0].translations[0].text;
            
            cb(response);

        });
        response.on('error', function (e) {
            console.log('Error: ' + e.message);
        });
    };

    let get_guid = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    let Translate = function (content) {
        let request_params = {
            method: 'POST',
            hostname: host,
            path: path1 + params,
            headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': subscriptionKey,
                'X-ClientTraceId': get_guid(),
            }
        };

        let req = https.request(request_params, response_handler);
        req.write(content);
        req.end();
    }

    let content = JSON.stringify([{ 'Text': text }]);

    Translate(content);
    // return Languages;
};


