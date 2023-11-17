$(document).ready(function(){
	// Page load
	setTimeout(function() {
		$('.page_content').removeClass('loading');
	}, 500);
	$('.js-back-link').on('click', function() {
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
	
	var boardWidth = $('#list_landscapes').width();
	var boardHeight = $('#list_landscapes').height();
	var activeCircle = "";
	var soundZoomIn = new Audio('assets/zoom_in.wav');
	var soundZoomOut = new Audio('assets/zoom_out.wav');
	var soundTransition = new Audio('assets/transition.wav');
	var erz = String.fromCharCode;

	$('.landscape').click(function() {
		var elem = $(this);
		if(!elem.hasClass('active')) {
			var elemPos = elem.position();
			var img = $(this).find('img');
			var imgWidth = img.prop('naturalWidth');
			var imgHeight = img.prop('naturalHeight');
			var displayWidth = imgWidth > 945 ? 945 : imgWidth;
			soundZoomIn.play();
			elem.addClass('active');
			$('.app_overlay').addClass('active');
			if($(window).width() > 1199) {
				elem.find('.inner').css({
					'z-index': 2,
					'width': displayWidth + 'px',				
					'left': (boardWidth - displayWidth) / 2 - elemPos.left + 'px',
			        'top': (boardHeight - imgHeight) / 2 - elemPos.top + 'px'
				});
			}
			else {
				elem.find('.inner').addClass('active');
			}
		}
	});

	$('.app_overlay').click(function() {
		if($('#pickable_colors').hasClass('active')) {
			$('#pickable_colors').removeClass('active');
	        setTimeout(function() {
	        	$('#pickable_colors').removeClass('bottom');
	        }, 300);
	    }
		else {
			var elem = $('.landscape.active');
			zoomOut(elem);
		}
	});

	$('.landscape:not(.active) .list_colors').click(function(e) {
		e.stopPropagation();
	});

	$('.list_colors span').click(function(e) {
		if($('#pickable_colors').hasClass('active') && activeCircle.is($(this))) {
			$('#pickable_colors').removeClass('active');
	        setTimeout(function() {
	        	$('#pickable_colors').removeClass('bottom');
	        }, 300);
		}
		else {
			activeCircle = $(this);
			var elemIndex = activeCircle.parent().index();
			if($(this).closest('.list_colors').hasClass('bottom')) {
				$('#pickable_colors').addClass('bottom');
		        setTimeout(function() {
					$('#pickable_colors').addClass('active');
					$('#pickable_colors').attr('data-index', elemIndex);
		        }, 10);
			}
			else {
				$('#pickable_colors').addClass('active');
				$('#pickable_colors').attr('data-index', elemIndex);
			}
		}
	});

	$(document).mouseup(function(e){
		if (!$('.list_colors span').is(e.target) && !$('#pickable_colors').is(e.target) && !$('.app_overlay').is(e.target)) {
	        $('#pickable_colors').removeClass('active');
	        setTimeout(function() {
	        	$('#pickable_colors').removeClass('bottom');
	        }, 300);
	    }
	});

	$('#pickable_colors span').click(function(e) {
		var elem = $(this);
		var elemText = elem.text();
		var elemLetter = elem.attr('data-initial');
		var elemColor = elem.attr('data-bg');
		activeCircle.attr('data-text', elemText);
		activeCircle.attr('data-initial', elemLetter);
		activeCircle.css('background', elemColor);
		checkOneElement();
	});

	$('#flip_board').click(function() {
		soundTransition.pause();
		soundTransition.currentTime = 0;
		soundTransition.play();
		$('#wrapper').toggleClass('solved');
	});

	function checkOneElement() {
		var elem = $('.landscape.active');
		if(validateElementColors(elem)) {
			var elem = $('.landscape.active');
			zoomOut(elem);
			elem.addClass('solved');			
			checkAllElements();
		}
	}

	function checkAllElements() {
		var i = 0;
		
		$('.landscape.solved').each(function() {
			if(validateElementColors($(this))) {
				i++;
				if(i == $('.landscape').length) {

					setTimeout(function() {
						$('body, #wrapper').addClass('solved');
						soundTransition.play();
					}, 500);


					setTimeout(function() {						
						drawText();
					}, 1500);
				}
			}
		});
	}

	function validateElementColors(elem) {
		var elemId = elem.attr('id');
		var correctColors = "";
		var selectedColors = "";
		elem.find('.list_colors li').each(function() {
			selectedColors += $(this).find('span').attr('data-text');
		});
		switch(elemId) {
			case "img01":
				correctColors = "PistanquetteSparpatrac";
				break;
			case "img02":
				correctColors = "RavaponchirePhilandrageGranboumierPomplefoisseDécabongue";
				break;
			case "img03":
				correctColors = "MerlapoirePimpasiveTrongiscarmeMarjacrible";
				break;
			default:
				correctColors = "";
		}

		if(selectedColors == correctColors) {
			return true;
		}
		else {
			return false;
		}
	}

	function zoomOut(elem) {
		soundZoomOut.play();
		elem.removeClass('active');
		$('.app_overlay').removeClass('active');
		if($(window).width() > 1199) {
			elem.find('.inner').css({
				'z-index': 0,
				'width': '300px',	
				'left': 0,
			    'top': 0
			});
		}
		else {			
			elem.find('.inner').removeClass('active');
		}
	}

	function drawText() {
		var ctx = document.querySelector("canvas").getContext("2d"),
	    dashLen = 220, dashOffset = dashLen, speed = 5,
	    txt = erz(67, 76, 65, 86, 73, 67, 85, 76, 69), x = 30, i = 0;

		ctx.font = "35px Comic Sans MS, cursive, TSCu_Comic, sans-serif"; 
		ctx.lineWidth = 5; ctx.lineJoin = "round"; ctx.globalAlpha = 2/3;
		ctx.strokeStyle = ctx.fillStyle = "#E30000";

		(function loop() {
		  ctx.clearRect(x, 0, 60, 150);
		  ctx.setLineDash([dashLen - dashOffset, dashOffset - speed]); // create a long dash mask
		  dashOffset -= speed;                                         // reduce dash length
		  ctx.strokeText(txt[i], x, 90);                               // stroke letter
		  if (dashOffset > 0) requestAnimationFrame(loop);             // animate
		  else {
		    ctx.fillText(txt[i], x, 90);                               // fill final letter
		    dashOffset = dashLen;                                      // prep next char
		    x += ctx.measureText(txt[i++]).width + ctx.lineWidth * Math.random();
		    ctx.setTransform(1, 0, 0, 1, 0, 3 * Math.random());        // random y-delta
		    ctx.rotate(Math.random() * 0.005);                         // random rotation
		    if (i < txt.length) requestAnimationFrame(loop);
		  }
		})();
	}
});