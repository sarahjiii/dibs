// Call this function when the page loads (the jQuery "ready" event)
$(document).ready(function() {
  $('#body').show();
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
