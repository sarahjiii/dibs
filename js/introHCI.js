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
