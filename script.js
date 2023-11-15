$(document).ready(function() {
	
	$('.js-route').on('click', function(e) {
		$('html').addClass('ovh');
		$('body').addClass('no_click');
		$(this).addClass('triggered');
		if($(this).hasClass('list_levels__bg')) {
			$(this).parent().addClass('triggered');
			$('.list_levels').addClass('triggered');
		}
		var url = $(this).attr('data-url');
		setTimeout(function() {
			location.href = url;
		}, 500);
	});
});


