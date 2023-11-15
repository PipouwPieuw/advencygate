
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
		setTimeout(function() {
			location.href = '/advencygate';
		}, 1000);
	});
	
	var activeItem = "";
	var pok = String.fromCharCode;
	$(document).on('click', function(e) {
		if(!$(e.target).closest('.js-timeline-item').length > 0)
			return;
		var elem = $(e.target).closest('.js-timeline-item');
		activeItem = elem;
		var overlay = $('.js-overlay');
		var overlayImg = $('.js-overlay-image');
		var overlayDesc = $('.js-overlay-desc');
		var imgSrc = elem.find('.js-img').attr('src');
		var imgDate = elem.find('.js-date').text();
		var imgDesc = imgDate + ' - ' + elem.find('.js-desc').text();
		overlayImg.attr('src', imgSrc);
		overlayDesc.text(imgDesc);
		overlay.addClass('active');
	});
	$('.js-overlay').on('click', function() {
		$(this).removeClass('active');
		activeItem = "";
	});
	$('.js-modal-open').on('click', function() {
		$('.js-modal-overlay').addClass('active');
	});
	$('.js-modal-close, .js-modal-overlay').on('click', function(e) {
		if(!$(e.target).hasClass('js-modal-close'))
			return;
		var delay = 0;
		if(!$('body').hasClass('solved')) {
			$('body').addClass('solved');
			showAll();
			$('.js-modal-open').addClass('visible');
			delay = 100;
		}
		setTimeout(function() {
			$('.js-modal-overlay').removeClass('active');
		}, delay);
	});
	$('.js-icon-picker').on('click', function() {
		$('.js-timeline-icon.active').removeClass('active');
		$(this).removeClass('active');
	});
	$('.js-timeline-icon').on('click', function() {
		$(this).addClass('active');
		$('.js-icon-picker').addClass('active');
	});
	$('.js-icon-trigger').on('click', function() {
		var icon = $(this).attr('data-icon');
		$('.js-timeline-icon.active').attr('data-icon', icon);
		checkAnswers();
	});
	$('.js-overlay-button').on('click', function(e) {
		e.stopPropagation();
		var dir = $(this).attr('data-btn');
		var nextItem = "";
		if(dir == "prev") {
			if(activeItem.is(':first-of-type')) {
				var itemParent = activeItem.parent();
				if(itemParent.is(':first-of-type')) {
					nextItem = $('.list_timeline ul:last-of-type li:last-of-type');
				}
				else {
					nextItem = itemParent.prev().prev().find('li:last-of-type');
				}
			}
			else {
				nextItem = activeItem.prev();
			}
		}
		else {
			if(activeItem.is(':last-of-type')) {
				var itemParent = activeItem.parent();
				if(itemParent.is(':last-of-type')) {
					nextItem = $('.list_timeline ul:first-of-type li:first-of-type');
				}
				else {
					nextItem = itemParent.next().next().find('li:first-of-type');
				}
			}
			else {
				nextItem = activeItem.next();
			}
		}
		var overlayImg = $('.js-overlay-image');
		var overlayDesc = $('.js-overlay-desc');
		var imgSrc = nextItem.find('.js-img').attr('src');
		var imgDate = nextItem.find('.js-date').text();
		var imgDesc = imgDate + ' - ' + nextItem.find('.js-desc').text();
		overlayImg.attr('src', imgSrc);
		overlayDesc.text(imgDesc);
		activeItem = nextItem;
	});
	function checkAnswers() {
		var v = pok(48, 55, 49, 52, 48, 49, 49, 53, 49, 56, 49, 48, 49, 54, 48, 51, 48, 57, 48, 52, 49, 55, 49, 50, 48, 54, 49, 51, 48, 53, 48, 56, 48, 50, 49, 49);
		var str = '';
		$('.js-timeline-icon').each(function() {
			str += $(this).attr('data-icon');
		});
		if(str == v) {
			$('.js-modal-text').text(pok(84, 79, 80, 73, 78, 65, 77, 66, 79, 85, 82));
			$('.js-modal-overlay').addClass('active');
		}
	}
	function showAll() {
		var counter = 0;
		var dates = [
			pok(48, 56, 47, 48, 53, 47, 49, 54),
			pok(50, 57, 47, 48, 55, 47, 49, 55),
			pok(51, 48, 47, 48, 49, 47, 49, 56),
			pok(48, 49, 47, 48, 54, 47, 49, 56),
			pok(48, 55, 47, 48, 55, 47, 49, 56),
			pok(50, 55, 47, 48, 55, 47, 49, 56),
			pok(50, 54, 47, 49, 48, 47, 49, 56),
			pok(48, 50, 47, 48, 51, 47, 49, 57),
			pok(50, 48, 47, 48, 53, 47, 49, 57),
			pok(50, 48, 47, 48, 55, 47, 49, 57),
			pok(48, 54, 47, 48, 57, 47, 49, 57),
			pok(49, 55, 47, 49, 48, 47, 49, 57),
			pok(48, 57, 47, 49, 48, 47, 50, 48),
			pok(49, 57, 47, 48, 55, 47, 50, 49),
			pok(49, 54, 47, 48, 54, 47, 50, 49),
			pok(50, 50, 47, 48, 55, 47, 50, 50),
			pok(51, 49, 47, 48, 51, 47, 50, 51),
			pok(49, 52, 47, 48, 52, 47, 50, 51),
		];
		var titles = [
			pok(80, 114, 101, 109, 105, 232, 114, 101, 32, 82, 117, 233, 101, 32, 100, 101, 115, 32, 70, 97, 100, 97, 115),
			pok(83, 233, 109, 105, 110, 97, 105, 114, 101, 32, 97, 117, 32, 80, 117, 121, 32, 100, 117, 32, 79, 117, 102),
			pok(84, 101, 115, 116, 32, 108, 105, 118, 101, 32, 100, 101, 32, 108, 39, 97, 112, 112, 108, 105, 99, 97, 116, 105, 111, 110, 32, 84, 89, 77),
			pok(83, 233, 109, 105, 110, 97, 105, 114, 101, 32, 224, 32, 83, 97, 110, 32, 83, 101, 98, 97, 115, 116, 105, 97, 110),
			pok(84, 114, 97, 118, 97, 117, 120, 32, 97, 117, 32, 98, 117, 114, 101, 97, 117, 32, 100, 101, 115, 32, 67, 97, 114, 109, 101, 115),
			pok(69, 109, 109, 233, 110, 97, 103, 101, 109, 101, 110, 116, 32, 97, 117, 32, 98, 117, 114, 101, 97, 117, 32, 100, 101, 115, 32, 67, 97, 114, 109, 101, 115),
			pok(53, 32, 97, 110, 115, 32, 100, 101, 32, 65, 100, 118, 101, 110, 99, 121, 32, 97, 117, 32, 84, 114, 97, 110, 99, 104, 111, 105, 114),
			pok(87, 101, 101, 107, 45, 101, 110, 100, 32, 101, 110, 32, 65, 118, 101, 121, 114, 111, 110, 32, 99, 104, 101, 122, 32, 74, 117, 108, 101, 115),
			pok(83, 233, 109, 105, 110, 97, 105, 114, 101, 32, 224, 32, 69, 100, 105, 109, 98, 111, 117, 114, 103, 104),
			pok(69, 86, 71, 32, 100, 101, 32, 70, 97, 98, 105, 101, 110, 32, 224, 32, 66, 101, 114, 108, 105, 110),
			pok(77, 97, 114, 105, 97, 103, 101, 32, 100, 101, 32, 70, 97, 98, 105, 101, 110, 32, 101, 116, 32, 78, 97, 100, 232, 103, 101),
			pok(76, 101, 115, 32, 54, 32, 97, 110, 115, 32, 100, 101, 32, 65, 100, 118, 101, 110, 99, 121),
			pok(83, 233, 109, 105, 110, 97, 105, 114, 101, 32, 224, 32, 68, 111, 110, 103, 101, 115),
			pok(83, 101, 109, 97, 105, 110, 101, 32, 100, 101, 32, 114, 117, 115, 104, 32, 84, 97, 97, 107, 97, 114, 111),
			pok(83, 233, 109, 105, 110, 97, 105, 114, 101, 32, 224, 32, 76, 111, 110, 100, 114, 101, 115),
			pok(80, 111, 116, 32, 100, 101, 32, 100, 233, 112, 97, 114, 116, 32, 100, 101, 32, 70, 108, 111, 114, 101, 110, 116),
			pok(80, 111, 116, 32, 100, 101, 32, 100, 233, 112, 97, 114, 116, 32, 100, 101, 32, 76, 117, 100, 111, 118, 105, 99),
			pok(82, 101, 112, 97, 115, 32, 99, 104, 101, 122, 32, 87, 97, 108, 105, 100),
		];
		$('.js-timeline-noimg').each(function() {
			counter += 1;
			var zero = counter >= 10 ? "" : "0";			
			var newElem = $('<li class="list_timeline__item js-timeline-item"></li>');
			var newElemImg = $('<div class="list_timeline__image"></div>');
			newElemImg.append('<img class="list_timeline__img js-img" src="assets/img/coquelicot/' + zero + counter + 'bassine.png"/>');
			newElem.append(newElemImg);
			newElem.append('<span class="list_timeline__date js-date">' + dates[counter-1] + '</span>');
			newElem.append('<span class="list_timeline__desc js-desc">' + titles[counter-1] + '</span>');
			newElem.insertAfter($(this));
			$(this).remove();
		});
	}
});