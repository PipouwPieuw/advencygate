
$(document).ready(function() {
	var activeItem = "";
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
	$('.js-modal-close').on('click', function() {
		$('.js-modal-overlay').removeClass('active');
		$('body').addClass('solved');
		showAll();
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
		var v = String.fromCharCode(48, 55, 49, 52, 48, 49, 49, 53, 49, 56, 49, 48, 49, 54, 48, 51, 48, 57, 48, 52, 49, 55, 49, 50, 48, 54, 49, 51, 48, 53, 48, 56, 48, 50, 49, 49);
		var str = '';
		$('.js-timeline-icon').each(function() {
			str += $(this).attr('data-icon');
		});
		if(str == v) {
			$('.js-modal-text').text(String.fromCharCode(76, 97, 32, 114, 195, 169, 112, 111, 110, 115, 101));
			$('.js-modal-overlay').addClass('active');
		}
	}
	function showAll() {
		var counter = 0;
		var dates = [
			'08/05/16',
			'29/07/17',
			'30/01/18',
			'01/06/18',
			'07/07/18',
			'27/07/18',
			'26/10/18',
			'02/03/19',
			'20/05/19',
			'20/07/19',
			'06/09/19',
			'17/10/19',
			'09/10/20',
			'19/07/21',
			'16/06/21',
			'22/07/22',
			'31/03/23',
			'14/04/23',
		];
		var titles = [
			'Première Ruée des Fadas',
			'Séminaire au Puy du Ouf',
			'Test live de l\'application TYM',
			'Séminaire à San Sebastian',
			'Travaux au bureau des Carmes',
			'Emménagement au bureau des Carmes',
			'5 ans de Advency au Tranchoir',
			'Week-end en Aveyron chez Jules',
			'Séminaire à Edimbourgh',
			'Enterrement de vie de garçon de Fabien à Berlin',
			'Mariage de Fabien et Nadège',
			'Les 6 ans de Advency',
			'Séminaire à Donges',
			'Semaine de rush Taakaro',
			'Séminaire à Londres',
			'Pot de départ de Florent',
			'Pot de départ de Ludovic',
			'Repas chez Walid',
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