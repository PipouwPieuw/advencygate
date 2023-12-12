$(document).ready(function () {

    setTimeout(function () {
        $(".page_content").removeClass("loading");
    }, 500),
        $(".js-back-link").on("click", function () {
            $(".js-page-transition").addClass("visible");
            var a = 0;
            $(".js-page-transition-item").each(function () {
                a += 100;
                var t = $(this);
                setTimeout(function () {
                    t.addClass("visible");
                }, a);
            }),
                setTimeout(function () {
                    location.href = "/advencygate";
                }, 1e3);
        });
    var a,
        t = new Audio("assets/swap.wav"),
        e = String.fromCharCode;
    if ($(window).width() > 1199) {
		$(".card_box").each(function () {
			if(localStorage.getItem("vv-desktop-data-pos-" + $(this).attr('data-val'))) {
	        	var pos = localStorage.getItem("vv-desktop-data-pos-" + $(this).attr('data-val'));
	        	var target = $('.card_container[data-pos="' + pos + '"').position();
	        	$(this).animate({ left: target.left, top: target.top }, 0).attr("data-pos", pos).addClass("placed");
	        }
	    });
	    s();
        function n(a, isSolved = false) {
            a
                .css({ "z-index": 3, "pointer-events": "none" })
                .animate({ left: a.attr("data-left"), top: a.attr("data-top") }, 200)
                .attr("data-pos", "")
                .removeClass("placed");
                if(!isSolved)
                    localStorage.removeItem("vv-desktop-data-pos-" + a.attr('data-val'));
                setTimeout(function () {
                    a.css({ "pointer-events": "all" });
                }, 200);
        }
        $(".card_box:not(.fixed)").draggable({
            zIndex: 2,
            revert: !1,
            revertDuration: 200,
            start: function (a, t) {
                t.helper.data("dropped", !1), (startPosition = $(this).position()), $(".card_box").css({ "z-index": 0 }), $(this).css({ "z-index": 1 });
            },
            stop: function (a, e) {
                var s = $(this);
                e.helper.data("dropped") ? s.css({ "z-index": 0 }) : (t.pause(), (t.currentTime = 0), t.play(), n(s));
            },
        }),
            $(".card_container").droppable({
                accept: $(".card_box"),
                tolerance: "pointer",
                drop: function (a, e) {
                    e.helper.data("dropped", !0), t.pause(), (t.currentTime = 0), t.play();
                    var o = e.draggable,
                        i = $(this),
                        r = i.position(),
                        d = i.attr("data-pos"),
                        c = $(".card_box[data-pos=" + d + "]");
                    if (c.length > 0 && c.attr("data-val") != o.attr("data-val")) {
                        if (o.hasClass("placed")) {
                            var l = o.attr("data-pos"),
                                p = $(".card_container[data-pos=" + l + "]").position();
                            c.css({ "z-index": 3, "pointer-events": "none" }).animate({ left: p.left, top: p.top }, 200).attr("data-pos", l).addClass("placed"),
                            setTimeout(function () {
                                c.css({ "pointer-events": "all" });
                            }, 200);
                        } else n(c);
                    }
                    o.css({ "z-index": 3, "pointer-events": "none" }).animate({ left: r.left, top: r.top }, 200).attr("data-pos", d).addClass("placed"),
                        localStorage.setItem("vv-desktop-data-pos-" + o.attr('data-val') , d),
                        s(),
                        setTimeout(function () {
                            o.css({ "pointer-events": "all" }), i.css({ "pointer-events": "all" });
                        }, 200);
                },
            });
    } else
		$(".card_container").each(function () {
			if(localStorage.getItem("vv-mobile-data-pos-" + $(this).attr('data-pos'))) {
	        	var val = localStorage.getItem("vv-mobile-data-pos-" + $(this).attr('data-pos'));
	        	$(this).attr("data-val", val);
	        	$('<i class="webfont webfont-' + val + '"></i>').appendTo($(this));
	        }
	    }),
	    setChosenITems(),
	    s(),
        $(".card_container").on("click", function () {
            (a = $(this)), $(".mobile_cards").addClass("visible");
        }),
            $(".mobile_cards__item").on("click", function () {
                var e = $(this).attr("data-val");
                if(a.attr('data-val') == e) {
                	a.removeAttr('data-val');
                	a.find("i").remove();
                	localStorage.removeItem("vv-mobile-data-pos-" + a.attr('data-pos'));
                	$(".mobile_cards").removeClass("visible");
                }
                else {
	                a.attr("data-val", e),
	                	localStorage.setItem("vv-mobile-data-pos-" + a.attr('data-pos') , e),
	                    a.find("i").remove(),
	                    $('<i class="webfont webfont-' + e + '"></i>').appendTo(a),
	                    $(".mobile_cards").removeClass("visible"),
	                    s();
	            }
	            setChosenITems();
            });
    function setChosenITems() {
    	var t = [];
	    $(".card_container[data-val]").each(function () {
	        t.push($(this).attr("data-val"));
	    });
	    $(".mobile_cards__item").each(function () {
	        var a = $(this).attr("data-val");
	        t.includes(a) ? $(this).addClass("chosen") : $(this).removeClass("chosen");
	    });
    }
    function s() {
        var a = "";
        $(".card_container").each(function () {
            if ($(window).width() > 1199) {
                var t = $(this).attr("data-pos");
                if (!$('.card_box[data-pos="' + t + '"]').length > 0) return !1;
                a += $('.card_box[data-pos="' + t + '"]').attr("data-val");
            } else {
                var e = $(this).attr("data-val");
                if (void 0 === e || !1 === e) return !1;
                a += $(this).attr("data-val");
            }
        }),
            "030813151118060114161702040910051207" == a &&
                (setTimeout(function () {
                    $("body").addClass("solved");
                }, 200),
                setTimeout(function () {
                    (function a() {
                        var s = [97, 98, 114, 97, 99, 97, 100, 97, 98, 114, 97, 110, 116, 101, 115, 113, 117, 101],
                            o = $(".card_container").length;
                        for (let i = 1; i <= o; i++)
                            setTimeout(function () {
                                var a = i < 10 ? "0" : "";
                                $(".card_container[data-pos=" + a + i + "]").attr("data-char", e(s.shift()));
                                	if ($(window).width() > 1199) {
	                                    t.pause(),
	                                    (t.currentTime = 0),
	                                    t.play()
	                                }
                                    $(".card_box[data-pos=" + a + i + "]").addClass("green"),
                                    $(window).width() > 1199 ? n($(".card_box[data-pos=" + a + i + "]"), true) : ($(".card_container[data-pos=" + a + i + "] i").remove(), $(".card_container[data-pos=" + a + i + "]").removeAttr("data-val"));
                            }, 150 * i);
                    })();
                }, 1e3));
    }
});
