var postIndex = 0;
// Call this function when the page loads (the jQuery "ready" event)
$(document).ready(function() {
  $('#header').show();
	initializePage();
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
  var containsStr = "Contains: ";
  for (var i = 0; i < contains.length; i++) {
    if (contains[i].checked) {
      containsStr = containsStr + contains[i].defaultValue + " ";
    }
  }

  var postObject = {'foodItem': foodItem,
                  'location': loc,
                  'time': time,
                   'contains': containsStr};
  var postName = "post" + postIndex;
  localStorage.setItem(postName, JSON.stringify(postObject));
  postIndex++;
  console.log(postObject);
}

function displayPosts(){
  var source   = $("#entry-template").html();
  var template = Handlebars.compile(source);
  var parentDiv = $("#templatedPosts");

  for(var i = 0; i < postIndex; i++){
    var postId = "post" + i;
    var curObject = JSON.parse(localStorage.getItem(postId));
    var curHtml = template(curObject);
    parentDiv.append(curHtml);
  }
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
