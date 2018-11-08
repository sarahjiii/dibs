//var postIndex = 0;
// Call this function when the page loads (the jQuery "ready" event)
$(document).ready(function() {
  $('#header').show();
	initializePage();
  displayPosts();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
  console.log(location.href);
  if (location.href == "index.html") {
    location.replace("login.html");
  }
	$( "nav" ).hide();
	$( ".hamburger" ).click(function() {
		$( "nav" ).slideToggle( "slow", function() {});
	});
}

function postClick() {
  var foodItem = document.getElementById("foodItem").value;
  var loc = document.getElementById("location").value;
  var time = document.getElementById("time").value;
  var contains = document.getElementsByName("contains");
  var containsStr = "";
  for (var i = 0; i < contains.length; i++) {
    if (contains[i].checked) {
      containsStr = containsStr + contains[i].defaultValue + " ";
    }
  }

  var postIndex = 0;

  if(localStorage.getItem("postIndex") != null){
    postIndex = parseInt(localStorage.getItem("postIndex"));
  }
  var postName = "post" + postIndex;
  var postObject = {
                  'index': postIndex,
                  'foodItem': foodItem,
                  'loc': loc,
                  'time': time,
                  'contains': containsStr};

  localStorage.setItem(postName, JSON.stringify(postObject));
  postIndex = postIndex + 1;
  localStorage.removeItem("postIndex");
  localStorage.setItem("postIndex", postIndex);
  console.log(postObject);
}

function displayPosts(){
  var source = $("#entry-template").html();
  console.log("here she is");
  console.log(source);
  var template = Handlebars.compile(source);
  var parentDiv = $("#templatedPosts");
  //get the number of posts made so far
  var postIndex;

  if(localStorage.getItem("postIndex") == null){
    postIndex = 0;
  }
  else{
    postIndex = localStorage.getItem("postIndex");
  }

  console.log("postIndex: ", postIndex);
  //clear the parentDiv to make sure we're not appending over and over again
  parentDiv.html("");
  for(var i = 0; i < postIndex; i++){
    var postId = "post" + i;
    var curObject = JSON.parse(localStorage.getItem(postId));
    console.log("curObject");
    console.log(curObject);
    if (curObject != null) {
      var curHtml = template(curObject);
      parentDiv.append(curHtml);
    }
  }
}

function displayClaimedPosts() {
  console.log("claimed posts");
  var source = $("#claims-template").html();
  console.log("here she is");
  console.log(source);
  var template = Handlebars.compile(source);
  var parentDiv = $("#templatedClaims");
  //get the number of posts made so far
  var postIndex;

  if(localStorage.getItem("postIndex") == null){
    postIndex = 0;
  }
  else{
    postIndex = localStorage.getItem("postIndex");
  }

  console.log("postIndex: ", postIndex);
  //clear the parentDiv to make sure we're not appending over and over again
  //parentDiv.html("");
  for(var i = 0; i < postIndex; i++){
    var claimId = "claim" + i;
    var curObject = JSON.parse(localStorage.getItem(claimId));
    console.log("curObject");
    console.log(curObject);
    if (curObject != null) {
      var curHtml = template(curObject);
      parentDiv.append(curHtml);
    }
  }
}

function claimClick(clicked_id) {
  var postName = "post" + clicked_id;
  var claimName = "claim" + clicked_id;

  $("#" + postName).fadeOut(); //have post disappear
  $("#" + postName).remove();

  var postObject = JSON.parse(localStorage.getItem(postName));
  localStorage.setItem(claimName, JSON.stringify(postObject)); //add claim
  localStorage.removeItem(postName); //remove post
}

function unclaimClick(clicked_id) {
  var postName = "post" + clicked_id;
  var claimName = "claim" + clicked_id;

  $("#" + claimName).fadeOut(); //have claim disappear
  $("#" + claimName).remove();

  var claimObject = JSON.parse(localStorage.getItem(claimName));
  localStorage.setItem(postName, JSON.stringify(claimObject)); //add claim
  localStorage.removeItem(claimName); //remove post
}
