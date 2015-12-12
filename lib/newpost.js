"use strict";

/*
   This program is a modification of a gist credited below.
   @credit: https://gist.github.com/jay3sh/1236634
   bin
*/


var Post = require('./post'),
    
postProperties = [
  { id:'title', text:'Title', answerType:'str' },
  { id:'description', text:'Description', answerType:'str' },
  { id:'categories', text:'Categories', answerType:'array' },
  { id:'date', text:'Date(millisecs)', answerType:'date' }
];




/*
   This function prompts the user for input
   
   @param: (String) question - require input from the user.
   @param: (Function) callback - function which accepts user data
*/
function prompt(question, callback) {
  var stdin = process.stdin;
  var stdout = process.stdout;

  stdin.resume();
  stdout.write(question + ": ");

  stdin.once('data', function(data) {
    data = data.toString().trim();
    callback(stdin, data);
  });
}




/*
   Main program
*/
function main() {
  var counter = 0;
  var propertiesLength = postProperties.length;
  var options = {};
  var post;
  var question;

  function processVal(stdin, val) {
    if (question.answerType === 'date') {
      options[question.id] = val ? parseInt(val, 10) : Date.now();
    } 
    else if (question.answerType === 'array') {
      options[question.id] = val ? val.split(',') : ['uncategorised'];
    } 
    else {
      options[question.id] = val;
    }
  
   // if properties still available
    if (counter < (propertiesLength - 1)) {
      question = postProperties[++counter];
      prompt(question.text, processVal);
    } 
    else {
      // create a new post
      post = new Post(options);
      post.createPost();
      stdin.end();
    }
  }

  question = postProperties[counter];
  
  prompt(question.text, processVal);
}


module.exports = main;
