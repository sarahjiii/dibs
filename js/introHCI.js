//var postIndex = 0;
// Call this function when the page loads (the jQuery "ready" event)
$(document).ready(function() {
  $('#header').show();
	initializePage();
  displayPosts();
  displayAlerts();
})


/*
 * Function that is called when the document is ready.
 */
function initializePage() {
  if (location.href.includes("index.html") && (!localStorage.getItem("curUser")
      || !localStorage.getItem("curPassword"))) {
    location.replace("login.html");
  }
  $( "nav" ).hide();

  hardcodeUsers();

  // load example posts
  var post0 = {
    'index': 0,
    'foodItem': "Pepperoni Pizza",
    'loc': "Geisel Library",
    'imgsrc': "images/pizza.jpg",
    'time': "5:45 PM",
    'contains': "dairy pork",
    'user': "example.post",
    'claimedUser': "No one yet"};

  var post1 = {
      'index': 1,
      'foodItem': "Chow Mein",
      'loc': "CENTER 101",
      'imgsrc': "images/noodles.jpg",
      'time': "12:00 PM",
      'contains': "gluten",
      'user': "example.post",
      'claimedUser': "No one yet"};

  if (!localStorage.getItem('post0') && !localStorage.getItem('claim0'))
    localStorage.setItem("post0", JSON.stringify(post0));
  if (!localStorage.getItem('post1') && !localStorage.getItem('claim1'))
    localStorage.setItem("post1", JSON.stringify(post1));

	$( ".hamburger" ).click(function() {
		$( "nav" ).slideToggle( "slow", function() {});
    });

}

function displayAlerts(){
  var userAlerts = localStorage.getItem('curUser') + "Alerts";
  var alerts = JSON.parse(localStorage.getItem(userAlerts));
  console.log("Alerts: " + alerts);
  for (var i = 0; i < alerts.length; i++) {
    alert(alerts[i]);
  }
  alerts = [];
  localStorage.setItem(userAlerts, JSON.stringify(alerts));
}

function saveUser(){
  var user = document.getElementById("user").value;
  var pass = document.getElementById("pass").value;
  localStorage.setItem("curUser", user);
  localStorage.setItem("curPassword", pass);
  if (user == "") {
    alert("Please enter your username.");
    localStorage.removeItem("curUser");
    localStorage.removeItem("curPassword");
  }
  else if (pass=="") {
    alert ("Please enter your password.");
    localStorage.removeItem("curUser");
    localStorage.removeItem("curPassword");
  }
}

function login() {
  var user = document.getElementById("user").value;
  var pass = document.getElementById("pass").value;

  var users = JSON.parse(localStorage.getItem('users'));
  var passes = JSON.parse(localStorage.getItem('passes'));

  // check if the user and password are actually in our storage

  // first find the user
  var userFound = users.indexOf(user);
  if(userFound == -1){
    alert("Invalid username. Please create an account instead!");
    return;
  }
  else{
    var correctPass = passes[userFound];
    if(correctPass != pass){
      alert("Incorrect password, please try again.");
      return;
    }
  }

  localStorage.setItem("curUser", user);
  localStorage.setItem("curPassword", pass);
  location.replace("index.html");
}

function createAccount() {
  var user = document.getElementById("user").value;
  var pass = document.getElementById("pass").value;

  var users = JSON.parse(localStorage.getItem('users'));
  var passes = JSON.parse(localStorage.getItem('passes'));

  // check if the user and password are actually in our storage

  // first find the user
  var userFound = users.indexOf(user);
  //if username already taken or empty string as username, alert
  if(userFound != -1 || user == ''){
    alert("This username is taken. Use a new username to create an account");
    return;
  }
  //invalid password
  else if(pass == ''){
    alert("Enter a password of at least one character");
    return;
  }
  //valid password and username, so store it as curUser and add it to list of
  //users
  else{
    localStorage.setItem("curUser", user);
    localStorage.setItem("curPassword", pass);
    users.push(user);
    passes.push(pass);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("passes", JSON.stringify(passes));

    var list = [];
    localStorage.setItem(user + "Alerts", JSON.stringify(list));
    var friends = [user, "example.post"];
    localStorage.setItem(user + "Friends", JSON.stringify(friends));

    location.replace("foodpref.html");
  }


}

function hardcodeUsers(){
  var users = [];
  users[0] = 'yasmine';
  users[1] = 'meeta';
  users[2] = 'sarah';

  var passes = [];
  passes[0] = 'pass';
  passes[1] = 'mm';
  passes[2] = 'ji';

  var list = [];
  if (localStorage.getItem('users') == null) {
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('passes', JSON.stringify(passes));
  }

  if(localStorage.getItem('yasmineAlerts') == null){
    localStorage.setItem('yasmineAlerts', JSON.stringify(list));
  }

  if(localStorage.getItem('meetaAlerts') == null){
    localStorage.setItem('meetaAlerts', JSON.stringify(list));
  }

  if(localStorage.getItem('sarahAlerts') == null){
    localStorage.setItem('sarahAlerts', JSON.stringify(list));
  }

  var list = ['meeta', 'sarah', 'yasmine', 'example.post'];

  if(localStorage.getItem("yasmineFriends") == null){
    localStorage.setItem("yasmineFriends", JSON.stringify(list));
  }

  if(localStorage.getItem("meetaFriends") == null){
    localStorage.setItem("meetaFriends", JSON.stringify(list));
  }

  if(localStorage.getItem("sarahFriends") == null){
    localStorage.setItem("sarahFriends", JSON.stringify(list));
  }

  localStorage.setItem("example.postAlerts", JSON.stringify(list));
}


function deleteUser(){
  localStorage.removeItem("curUser");
  localStorage.removeItem("curPassword");
}

function saveFoodPref() {
  var prefs = document.getElementsByName("pref");
  var prefString = "";
  for(var i = 0; i < prefs.length; i++){
    if (prefs[i].checked) {
      prefString = prefString + prefs[i].defaultValue + " and ";
    }
  }
  var editedPref = prefString.substring(0,prefString.length - 5);
  localStorage.setItem("preferences", editedPref);
  alert("Your food preferences of " + editedPref + " were saved");
}

function postClick() {
  var foodItem = document.getElementById("foodItem").value;
  var loc = document.getElementById("location").value;
  var time = document.getElementById("time").value;
  var contains = document.getElementsByName("contains");
  var snack = document.getElementById("postSnack");
  var imgsrc = localStorage.getItem("image");
  var containsStr = "";
  for (var i = 0; i < contains.length; i++) {
    if (contains[i].checked) {
      containsStr = containsStr + contains[i].defaultValue + " and ";
    }
  }

  if (foodItem == "") {
    snack.innerHTML = "Please enter food item.";
    snack.className = "show";
    setTimeout(function(){ snack.className = snack.className.replace("show", ""); }, 3000);
    return;
  }

  else if (loc == "") {
    snack.innerHTML = "Please enter location of pick up.";
    snack.className = "show";
    setTimeout(function(){ snack.className = snack.className.replace("show", ""); }, 3000);
    return;
  }

  else if (imgsrc == "" || imgsrc == null) {
    snack.innerHTML = "Please select a photo.";
    snack.className = "show";
    setTimeout(function(){ snack.className = snack.className.replace("show", ""); }, 3000);
    return;
  }

  containsStr = containsStr.substring(0,containsStr.length - 5);
  var curUser = localStorage.getItem("curUser");

  console.log(postObject);
  var postIndex = 2;

  if(localStorage.getItem("postIndex") != null){
    postIndex = parseInt(localStorage.getItem("postIndex"));
  }

  var postObject = {
    'index': postIndex,
    'foodItem': foodItem,
    'loc': loc,
    'imgsrc': imgsrc,
    'time': time,
    'contains': containsStr,
    'user': curUser,
    'claimedUser': "No one yet"}; //nobody has claimed it
  var postName = "post" + postIndex;

  localStorage.setItem(postName, JSON.stringify(postObject));
  postIndex = postIndex + 1;
  localStorage.removeItem("postIndex");
  localStorage.setItem("postIndex", postIndex);
  localStorage.removeItem("image");
  location.replace("index.html");
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
    postIndex = 2;
  }
  else{
    postIndex = localStorage.getItem("postIndex");
  }

  console.log("postIndex: ", postIndex);
  //clear the parentDiv to make sure we're not appending over and over again
  parentDiv.html("");
  var curUserFriends = localStorage.getItem("curUser") + "Friends";
  var friends = JSON.parse(localStorage.getItem(curUserFriends));
  for(var i = 0; i < postIndex; i++){
    var postId = "post" + i;
    var curObject = JSON.parse(localStorage.getItem(postId));
    if (curObject != null && friends.includes(curObject.user)) {
      var curHtml = template(curObject);
      parentDiv.prepend(curHtml);
    }
  }
}

function displayClaimedPosts() {
  console.log("claimed posts");
  var source = $("#claims-template").html();
  console.log("here she is");
  console.log(source);
  var template = Handlebars.compile(source);
  var curUser = localStorage.getItem("curUser");
  var parentDiv = $("#templatedClaims");
  //get the number of posts made so far
  var postIndex;

  if(localStorage.getItem("postIndex") == null){
    postIndex = 2;
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
    if (curObject != null && curObject.claimedUser == curUser) {
      var curHtml = template(curObject);
      parentDiv.prepend(curHtml);
    }
  }
}

function claimClick(clicked_id) {
  console.log("clicked_id: " + clicked_id);
  var postName = "post" + clicked_id;
  var claimName = "claim" + clicked_id;
  var snack = document.getElementById("claimSnack");
  
  var postObject = JSON.parse(localStorage.getItem(postName));
  // don't let users claim their own food
  if(postObject.user == localStorage.getItem('curUser')){
    snack.innerHTML = "You can't claim your own food!";
    snack.className = "show";
    setTimeout(function(){ snack.className = snack.className.replace("show", ""); }, 3000);
  }


  else{
    $("#" + postName).fadeOut(); //have post disappear
    $("#" + postName).remove();
    console.log(claimName);
    var time = postObject.time;
    snack.innerHTML = "You just claimed " + postObject.user + "'s " + postObject.foodItem + ". " +"\nPlease pick it up by " + time + " at " + postObject.loc + ".";
    snack.className = "show";
    setTimeout(function(){ snack.className = snack.className.replace("show", ""); }, 7000);
    //alert("You just claimed " + postObject.user + "'s " + postObject.foodItem +
      //"\nPlease pick it up by " + time + " at " + postObject.loc);
    postObject.claimedUser = localStorage.getItem("curUser");
    localStorage.setItem(claimName, JSON.stringify(postObject)); //add claim
    localStorage.removeItem(postName); //remove post

    var userAlerts = postObject.user + "Alerts";
    var alerts = JSON.parse(localStorage.getItem(userAlerts));
    alerts.push(localStorage.getItem("curUser") + " claimed your " + postObject.foodItem + "!");
    localStorage.setItem(userAlerts, JSON.stringify(alerts));
  }
}

function displayMyPosts() {
  var source = $("#my-posts-template").html();
  var template = Handlebars.compile(source);
  var curUser = localStorage.getItem("curUser");
  var parentDiv = $("#templatedMine");
  //get the number of posts made so far
  var postIndex;

  if(localStorage.getItem("postIndex") == null){
    postIndex = 0;
  }
  else{
    postIndex = localStorage.getItem("postIndex");
  }

  //clear the parentDiv to make sure we're not appending over and over again
  //parentDiv.html("");
  for(var i = 0; i < postIndex; i++){
    var postId = "post" + i;
    var claimId = "claim" + i;
    var curObject = JSON.parse(localStorage.getItem(postId));
    var claimObject = JSON.parse(localStorage.getItem(claimId));
    if (curObject == null) {
      curObject = claimObject;
    }
    //console.log("curObject user: " + curObject.user);
    if(curObject != null && curObject.user == curUser){
      console.log(curObject);
      var curHtml = template(curObject);
      parentDiv.prepend(curHtml);

    }
  }
}

function unclaimClick(clicked_id) {
  var postName = "post" + clicked_id;
  var claimName = "claim" + clicked_id;

  $("#" + claimName).fadeOut(); //have claim disappear
  $("#" + claimName).remove();
  var claimObject = JSON.parse(localStorage.getItem(claimName));
  alert("You just UNclaimed " + claimObject.user + "'s " + claimObject.foodItem +
  "\n" + claimObject.user + " has been notified");
  localStorage.setItem(postName, JSON.stringify(claimObject)); //add claim
  localStorage.removeItem(claimName); //remove post
}

function addFriend() {
    var friend = document.getElementById("addedFriend").value;
    console.log(friend);
    var users = JSON.parse(localStorage.getItem('users'));
    var curUser = localStorage.getItem("curUser");
    var friends = JSON.parse(localStorage.getItem(curUser + "Friends"));

    if (!users.includes(friend)) {
      alert("No user named " + friend);
      return;
    }
    else if (friends.includes(friend)) {
      alert("You are already friends with " + friend);
      return;
    }

    friends.push(friend);
    localStorage.setItem(curUser + "Friends", JSON.stringify(friends));
    alert("You have added " + friend + " as a friend!");
    $("#friends").append("<p>" + friend + "</p>");
    document.getElementById("addedFriend").value = '';
}

function deleteClick(clicked_id) {
  console.log("clicked id " + clicked_id);
  var postName = "post" + clicked_id;
  var claimName = "claim" + clicked_id;
  var claimed = true;

  var curObject = JSON.parse(localStorage.getItem(claimName));
  if (curObject == null) { //not claimed
    curObject = JSON.parse(localStorage.getItem(postName))
    console.log(curObject);
    claimed = false;
  }

  var response = confirm("Do you want to delete " + curObject.foodItem + "?");
  if (!response) {
    return;
  }

  $("#" + claimName).fadeOut(); //have claim disappear
  $("#" + claimName).remove();
  $("#" + postName).fadeOut(); //have post disappear
  $("#" + postName).remove();

  var alertStr = "You just deleted " + curObject.foodItem;

  if (claimed) {
    localStorage.removeItem(claimName); //remove claim
    alertStr = alertStr + "\n" + curObject.claimedUser + " has been notified"
  }

  else {
    localStorage.removeItem(postName); //remove post
  }

  alert(alertStr);
}

function readURL() {
  var fileupload = $("#FileUpload1");
  var filePath = $("#spnFilePath");
  var button = $("#btnFileUpload");
    fileupload.click();
    fileupload.change(function () {
      var file = document.getElementById('FileUpload1').files[0];
      // some stuff that doesn't work
      //imgData = getBase64Image(file);
      //localStorage.setItem("imgData", imgData);
      console.log(file);
      if (file) {
        // create reader
        var reader = new FileReader();
        reader.onload = function(e) {
          // storing e.target.result, whatever that is
          localStorage.setItem("image",e.target.result);
          // browser completed reading file - display it
          $('#testImage')
              .attr('src', e.target.result)
              .width(75)
              .height(100);
          $('#testImage').show();
        };
        reader.readAsDataURL(file);
      }
      // this displays the file name
      var fileName = $(this).val().split('\\')[$(this).val().split('\\').length - 1];
      filePath.html("<b>Selected File: </b>" + fileName);
    });
  }
