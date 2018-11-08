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
    var curHtml = template(curObject);
    parentDiv.append(curHtml);

  }
}

function claimClick(clicked_id) {
  //var clickedPost = document.getElementById("post" + clicked_id);
  //clickedPost.removeItem();
  var postName = "post" + clicked_id;
  $("#" + postName).fadeOut();
  $("#" + postName).remove();

  var post = localStorage.getItem(postName);
  

  localStorage.removeItem(postName);
}
/*$(function () {
  $("#camfile").click(function () {
    $("#uploadfile").click();
  });
  $("#uploadfile").change(function() {
    var fileName = $(this).val().split('\\')[$(this).val().split('\\').length - 1];
    filePath.html("<b>Selected File: </b>" + fileName);
  });
});*/

$(function () {
    var fileupload = $("#FileUpload1");
    var filePath = $("#spnFilePath");
    var button = $("#btnFileUpload");
    button.click(function () {
        fileupload.click();
    });
    fileupload.change(function () {
        var fileName = $(this).val().split('\\')[$(this).val().split('\\').length - 1];
        filePath.html("<b>Selected File: </b>" + fileName);
    });
});
