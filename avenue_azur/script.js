$(document).ready(function() {
	// Page load
	setTimeout(function() {
		$('.page_content').removeClass('loading');
	}, 500);
	$('.js-back-link').on('click', function() {
		$('body').addClass('no_scroll');
		$('.js-page-transition').addClass('visible');
		var counter = 0;
		$('.js-page-transition-item').each(function() {
			counter += 100;
			var that = $(this);
			setTimeout(function() {
				that.addClass('visible');
			}, counter);
		});
		// setTimeout(function() {
		// 	location.href = '/advencygate';
		// }, 1000);
	});
	
	var mik = String.fromCharCode;
	var azd = [
		[mik(116, 104, 101, 114, 101, 115, 97, 109, 97, 121), mik(109, 97, 121)],
		[mik(112, 114, 111, 106, 101, 99, 116, 105, 108, 101)],
		[mik(108, 97, 115, 118, 101, 103, 97, 115)],
		[mik(117, 114, 97, 110, 117, 115)],
		[mik(118, 111, 114, 119, 101, 114, 107)],
		[mik(114, 101, 103, 100, 97, 114)],
		[mik(112, 101, 117, 103, 101, 111, 116)],
		[mik(103, 114, 97, 110, 100, 114, 111, 110, 100)],
		[mik(109, 97, 110, 103, 97, 114, 101, 118, 97)],
		[mik(104, 97, 110, 100, 112, 108, 97, 110, 116)],
		[mik(97, 108, 111, 99, 97, 115, 105, 97), mik(111, 114, 101, 105, 108, 108, 101, 100, 233, 108, 233, 112, 104, 97, 110, 116), mik(111, 114, 101, 105, 108, 108, 101, 115, 100, 233, 108, 233, 112, 104, 97, 110, 116)],
		[mik(115, 97, 101, 110, 99, 104, 97, 105)],
		[mik(115, 105, 103, 114, 117, 110)],
		[mik(121, 111, 117, 114, 105, 100, 106, 111, 114, 107, 97, 101, 102, 102), mik(100, 106, 111, 114, 107, 97, 101, 102, 102)],
		[mik(109, 105, 110, 105)],
		[mik(109, 111, 114, 100, 111, 114)],
		[mik(101, 100, 100, 105, 101), mik(105, 114, 111, 110, 109, 97, 105, 100, 101, 110)],
		[mik(115, 111, 108, 100, 111, 109, 105)]
	];
	var pok = [
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false
	];
	$('.js-input').on('keyup', function() {
		var index = parseInt($(this).attr('data-index')) - 1;
		var value = $(this).val().toLowerCase().replaceAll(' ', '').replaceAll('\'', '');
		if(azd[index].includes(value)) {
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
		var v = mik(66, 79, 74, 65, 78, 71, 76, 69, 83);
		var timeOffsetInput = 0;
		var isEven = true;
		$('.js-input').each(function() {
			var that = $(this);
			if(isEven) {
				isEven = false;
				timeOffsetInput += 100;
			}
			else {
				isEven = true;
			}
			setTimeout(function() {
				that.addClass('move');
			}, timeOffsetInput);
		});
		var timeOffsetAnswer = 100;		
		$('.js-list-answers').addClass('visible');
		$('.js-answer').each(function() {
			timeOffsetAnswer += 100;
			var that = $(this);
			var index = that.attr('data-answer');
			$(this).text(v.charAt(index));
			setTimeout(function() {					
				that.addClass('visible');
			}, timeOffsetAnswer);
		});
	}
});