$(document).ready(function() {
	
	$('.js-route').on('click', function(e) {
		$('body').addClass('no_click');
		$(this).addClass('triggered');
		$(this).parent().addClass('triggered');
		$('.list_levels').addClass('triggered');
		var url = $(this).attr('data-url');
		setTimeout(function() {
			location.href = url;
		}, 1000);
	});
});


