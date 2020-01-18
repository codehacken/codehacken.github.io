/*
Code from Patrick Carrington.
http://www.patrickcarrington.com/assets/js/pubs.js?version=1.1
*/

var section = document.querySelector('#publications'); // Identifies the publications section of the website
var requestURL = "/assets/publications/pubsList.json"; // Identifies the json file where the publications are listed
var request = new XMLHttpRequest();
var author = "Ashwinkumar Ganesan"

function showPubsByYear(){//jsonObj) {

  request.open('GET', requestURL);

  request.responseType = 'json';
  request.send();

  var jsonObj;
  var myArticle;
  var section = document.querySelector('#publications');
  request.onload = function() {
    jsonObj = request.response;
    $(".pubList").remove();

  var pubs = jsonObj['pubs'];
  myArticle = document.createElement('ol');
  myArticle.className = "pubList";
  //myArticle.reversed = true;
  var lastYear = 0;
  pubs.sort(function(a, b){return b.year - a.year}); // Sort list by year

  for (var i = 0; i < pubs.length; i++) { //loop through the list of publications

    if(lastYear !== pubs[i].year){ // Create a heading if the year of the pub at the current index is different from the previous
      var hr = document.createElement("hr");
      myArticle.appendChild(hr);

      var yr = document.createElement("h3");
      yr.className = "pubHead";
      yr.textContent = pubs[i].year;
      myArticle.appendChild(yr);
      lastYear = pubs[i].year;
    }

    var pubEntry = document.createElement('li');
    pubEntry.className = "pubitem";
    // For image as list icon.
    // pubEntry.style = "list-style-image:url(assets/images/ldaexplore.png);"

    var pubDetail = document.createElement('div');
    pubDetail.className = "pubdetail";
    // For image as list icon.
    // pubDetail.style = "top:-60px; position:relative;"

    var pubLink = document.createElement('a');
    pubLink.className = "pubtitle";

    var venue = document.createElement('span');
    venue.className = "venue";

    var authorList = document.createElement('span');
    authorList.className = "pubauthors";

    var authors = pubs[i].authors;
    for (var j = 0; j < authors.length; j++) { // Loop through the author list and add commas where appropriate
      if(j > 0){authorList.innerHTML += ", ";}
      var a = "" + authors[j];
      if(a == author){ // Bold my name in the pub entry
        //console.log("bolding");
        a = "<strong>" + author + "</strong>";
      }
      authorList.innerHTML += a;
    }
    authorList.innerHTML += ". ";


    pubLink.href = pubs[i].link;
    pubLink.textContent = pubs[i].title + ". ";


    // Build the pub entry html
    pubDetail.appendChild(authorList);
    venue.innerHTML = " " + pubs[i].venue;
    pubDetail.appendChild(pubLink);
    pubDetail.appendChild(venue);

    if(pubs[i].awards){
      var award = document.createElement('span');
      award.className = "pubaward"
      award.innerHTML = pubs[i].awards;
      pubDetail.appendChild(award);
    }

    //pubEntry.appendChild(pubLink);
    pubEntry.appendChild(pubDetail);
    myArticle.appendChild(pubEntry); //Add the pub entry to the list
  }
section.appendChild(myArticle); // Add the list to the webpage
}
}

function showPubsByType(){//jsonObj) {

  request.open('GET', requestURL);

  request.responseType = 'json';
  request.send();

  var jsonObj;
  var myArticle;
  var section = document.querySelector('#publications');
  request.onload = function() {
    //console.log("setting jsonObj")
    jsonObj = request.response;
    //showPubsByYear(pubs);
    //showPubsByType(pubs);
    //showPubsByTopic(pubs);

    $(".pubList").remove();

  var pubs = jsonObj['pubs'];
  myArticle = document.createElement('ol');
  myArticle.className = "pubList";
  //myArticle.reversed = true;
  var lastType = 0;

  pubs.sort(function(a, b){ // sort the publist by type
    if(a.type == b.type){
      return b.year - a.year
    } else {
    //return a.type > b.type}
    return a.type.localeCompare(b.type)}
    }); //Sort list by type
  //pubs.sort(function(a, b){return b.year - a.year}); //Sort list by year

  for (var i = 0; i < pubs.length; i++) {

    if(lastType !== pubs[i].type){
      var hr = document.createElement("hr");
      myArticle.appendChild(hr);

      var tp = document.createElement("h3");
      tp.className = "pubHead";
      tp.textContent = pubs[i].type.substring(2);
      myArticle.appendChild(tp);
      lastType = pubs[i].type;
    }

    var pubEntry = document.createElement('li');
    pubEntry.className = "pubitem";

    var pubDetail = document.createElement('div');
    pubDetail.className = "pubdetail";

    var pubLink = document.createElement('a');
    pubLink.className = "pubtitle";

    var venue = document.createElement('span');
    venue.className = "venue";

    var authorList = document.createElement('span');
    authorList.className = "pubauthors";

    var authors = pubs[i].authors;
    for (var j = 0; j < authors.length; j++) {
      if(j > 0){authorList.innerHTML += ", ";}
      var a = "" + authors[j];
      if(a == author){
        //console.log("bolding");
        a = "<strong>" + author + "</strong>";
      }
      authorList.innerHTML += a;
    }
    authorList.innerHTML += ". ";


    pubLink.href = pubs[i].link;
    pubLink.textContent = pubs[i].title + ". ";

    pubDetail.appendChild(authorList);
    venue.innerHTML = " " + pubs[i].venue;
    pubDetail.appendChild(pubLink);
    pubDetail.appendChild(venue);

    if(pubs[i].awards){
      var award = document.createElement('span');
      award.className = "pubaward"
      award.innerHTML = pubs[i].awards;
      pubDetail.appendChild(award);
    }

    //pubEntry.appendChild(pubLink);
    pubEntry.appendChild(pubDetail);
    myArticle.appendChild(pubEntry);
  }
section.appendChild(myArticle);
}
}


function showPubsByTopic(){//jsonObj) {



  request.open('GET', requestURL);

  request.responseType = 'json';
  request.send();

  var jsonObj;
  var myArticle;
  var section = document.querySelector('#publications');


  request.onload = function() {
    //console.log("setting jsonObj")
    jsonObj = request.response;
    //showPubsByYear(pubs);
    //showPubsByType(pubs);
    //showPubsByTopic(pubs);

    $(".pubList").remove();

  var pubs = jsonObj['pubs'];
  myArticle = document.createElement('ol');
  myArticle.className = "pubList";
  //myArticle.reversed = true;

  var lastTopic = 0;

  //pubs.sort(function(a, b){return a.topic.localeCompare(b.topic)});
  pubs.sort(function(a, b){ // sort the publist by topic
    if(a.topic == b.topic){
      return b.year - a.year
    } else {
    return a.topic.localeCompare(b.topic)}
  }); //Sort list by topic
  //pubs.sort(function(a, b){return b.year - a.year}); //Sort list by year

  for (var i = 0; i < pubs.length; i++) {

    if(lastTopic !== pubs[i].topic){
      var hr = document.createElement("hr");
      myArticle.appendChild(hr);

      var tp = document.createElement("h3");
      tp.className = "pubHead";
      tp.textContent = pubs[i].topic.substring(2);
      /*if(pubs[i].topic == "Z-Other"){
        tp.textContent = pubs[i].topic.substring(2);
      }*/
      myArticle.appendChild(tp);
      lastTopic = pubs[i].topic;
    }

    var pubEntry = document.createElement('li');
    pubEntry.className = "pubitem";

    var pubDetail = document.createElement('div');
    pubDetail.className = "pubdetail";

    var pubLink = document.createElement('a');
    pubLink.className = "pubtitle";

    var venue = document.createElement('span');
    venue.className = "venue";

    var authorList = document.createElement('span');
    authorList.className = "pubauthors";

    var authors = pubs[i].authors;
    for (var j = 0; j < authors.length; j++) {
      if(j > 0){authorList.innerHTML += ", ";}
      var a = "" + authors[j];
      if(a == author){
        //console.log("bolding");
        a = "<strong>" + author + "</strong>";
      }
      authorList.innerHTML += a;
    }
    authorList.innerHTML += ". ";


    pubLink.href = pubs[i].link;
    pubLink.textContent = pubs[i].title  + ". ";

    pubDetail.appendChild(authorList);
    venue.innerHTML = " " + pubs[i].venue;
    pubDetail.appendChild(pubLink);
    pubDetail.appendChild(venue);

    if(pubs[i].awards){
      var award = document.createElement('span');
      award.className = "pubaward"
      award.innerHTML = pubs[i].awards;
      pubDetail.appendChild(award);
    }

    //pubEntry.appendChild(pubLink);
    pubEntry.appendChild(pubDetail);
    myArticle.appendChild(pubEntry);
  }
section.appendChild(myArticle);
}
}
