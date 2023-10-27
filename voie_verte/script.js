
$(document).ready(function() {
	var soundSwap = new Audio('assets/swap.wav');

    $('.card_box:not(.fixed)').draggable({
        zIndex: 2,
        revert: false,
        revertDuration: 200,
        start: function(event, ui) {
            ui.helper.data('dropped', false);
            startPosition = $(this).position();
            $('.card_box').css({ 'z-index': 0 });
            $(this).css({ 'z-index': 1 });
        },
        stop: function(event, ui) {
            var draggable = $(this);
            if (!ui.helper.data('dropped')) {
				soundSwap.pause();
				soundSwap.currentTime = 0;
				soundSwap.play();
                moveElem(draggable);
            } else {
                draggable.css({ 'z-index': 0 });
            }
        }
    });

    $('.card_container').droppable({
        accept: $('.card_box'),
        tolerance: "pointer",
        drop: function(event, ui) {
            ui.helper.data('dropped', true);
			soundSwap.pause();
			soundSwap.currentTime = 0;
			soundSwap.play();
            var draggable = ui.draggable;
            var droppable = $(this);
            var dropPos = droppable.position();
            var dataPos = droppable.attr('data-pos');
	        var elem = $('.card_box[data-pos=' + dataPos + ']');
            if (elem.length > 0
             && elem.attr('data-val') != draggable.attr('data-val')) {
             	if(draggable.hasClass('placed')) {
             		var dragPos = draggable.attr('data-pos');
             		var originPos = $('.card_container[data-pos=' + dragPos + ']').position();
		            elem.css({ 'z-index': 3, 'pointer-events': 'none' }).animate({
		                left: originPos.left,
		                top: originPos.top,
		            }, 200).attr('data-pos', dragPos).addClass('placed');
			        setTimeout(function() {
			            elem.css({ 'pointer-events': 'all' });
			        }, 200);
    	        }
    	        else {
    	            moveElem(elem);    	        	
    	        }
            }
            draggable.css({ 'z-index': 3, 'pointer-events': 'none' }).animate({
                left: dropPos.left,
                top: dropPos.top,
            }, 200).attr('data-pos', dataPos).addClass('placed');
	        checkValues();
            setTimeout(function() {
                draggable.css({ 'pointer-events': 'all' });
                droppable.css({ 'pointer-events': 'all' });
            }, 200);
        }
    });

    function moveElem(elem) {
        elem.css({ 'z-index': 3, 'pointer-events': 'none' }).animate({
            left: elem.attr('data-left'),
            top: elem.attr('data-top'),
        }, 200).attr('data-pos', "").removeClass('placed');
        setTimeout(function() {
            elem.css({ 'pointer-events': 'all' });
        }, 200);
    }

	function checkValues() {
		var validString = '030813151118060114161702040910051207';
		var currentString = '';
		$('.card_container').each(function() {
			var pos = $(this).attr('data-pos');
			if(!$('.card_box[data-pos="' + pos + '"]').length > 0)
				return false;
			else
				currentString += $('.card_box[data-pos="' + pos + '"]').attr('data-val');
		});
		if(currentString == validString) {
			setTimeout(function() {
	    		$('body').addClass('solved');
		    }, 200);
		    setTimeout(function() {
	        	solve();
		    }, 1000);
		}
	}

	function solve() {
		var a = [97, 98, 114, 97, 99, 97, 100, 97, 98, 114, 97, 110, 116, 101, 115, 113, 117, 101];
		var amount = $('.card_container').length;
		for(let i = 1; i<=amount; i++) {
		    setTimeout(function() {
				var zero = i < 10 ? '0' : '';
				$('.card_container[data-pos=' + zero + i + ']').attr('data-char', String.fromCharCode(a.shift()));
				soundSwap.pause();
				soundSwap.currentTime = 0;
				soundSwap.play();
				$('.card_box[data-pos=' + zero + i + ']').addClass('green');
				moveElem($('.card_box[data-pos=' + zero + i + ']'));
		    }, i * 150);
		}
	}
});