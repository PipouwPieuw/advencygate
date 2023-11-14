$(document).ready(function() {
    // Page load
    setTimeout(function() {
        $('.page_content').removeClass('loading');
    }, 500);
    
	var mik = String.fromCharCode;
	var azd = [
		mik(97, 98, 114, 97, 99, 97, 100, 97, 98, 114, 97, 110, 116, 101, 115, 113, 117, 101),
		mik(98, 111, 106, 97, 110, 103, 108, 101, 115),
		mik(99, 108, 97, 118, 105, 99, 117, 108, 101),
		mik(116, 111, 112, 105, 110, 97, 109, 98, 111, 117, 114),
		mik(113, 117, 111, 108, 105, 98, 101, 116),
	];
	var pok = [
		false,
		false,
		false,
		false,
		false
	];
	$('.js-input').on('keyup', function() {
		var index = parseInt($(this).attr('data-index')) - 1;
		var value = $(this).val().toLowerCase().replaceAll(' ', '');
		if(value == azd[index]) {
			$(this).addClass('solved');
			$(this).blur();
			pok[index] = true;
			checkAnswers();
		}
	});
	function checkAnswers() {
		for(erg in pok)
			if(!pok[erg])
				return;
		setTimeout(function() {
			$('.js-button-wrapper').addClass('visible');
			var timeOffsetInput = 0;
			$('.js-input').each(function() {
				var that = $(this);
				timeOffsetInput += 100;
				setTimeout(function() {
					that.addClass('move');
				}, timeOffsetInput);
			});
			setTimeout(function() {
				$('.js-button-wrapper').addClass('front');
			}, 500);
		}, 500);
	}
});