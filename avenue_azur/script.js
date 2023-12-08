$(document).ready(function () {

    setTimeout(function () {
        $(".page_content").removeClass("loading");
    }, 500),
        $(".js-back-link").on("click", function () {
            $("body").addClass("no_scroll"), $(".js-page-transition").addClass("visible");
            var _ = 0;
            $(".js-page-transition-item").each(function () {
                _ += 100;
                var a = $(this);
                setTimeout(function () {
                    a.addClass("visible");
                }, _);
            }),
                setTimeout(function () {
                    location.href = "/advencygate";
                }, 1e3);
        });
    var _ = String.fromCharCode,
        a = [
            [_(116, 104, 101, 114, 101, 115, 97, 109, 97, 121), _(109, 97, 121)],
            [_(112, 114, 111, 106, 101, 99, 116, 105, 108, 101)],
            [_(108, 97, 115, 118, 101, 103, 97, 115)],
            [_(117, 114, 97, 110, 117, 115)],
            [_(118, 111, 114, 119, 101, 114, 107)],
            [_(114, 101, 103, 100, 97, 114)],
            [_(112, 101, 117, 103, 101, 111, 116)],
            [_(103, 114, 97, 110, 100, 114, 111, 110, 100)],
            [_(109, 97, 110, 103, 97, 114, 101, 118, 97)],
            [_(104, 97, 110, 100, 112, 108, 97, 110, 116)],
            [_(97, 108, 111, 99, 97, 115, 105, 97), _(111, 114, 101, 105, 108, 108, 101, 100, 233, 108, 233, 112, 104, 97, 110, 116), _(111, 114, 101, 105, 108, 108, 101, 115, 100, 233, 108, 233, 112, 104, 97, 110, 116)],
            [_(115, 97, 101, 110, 99, 104, 97, 105)],
            [_(115, 105, 103, 114, 117, 110)],
            [_(121, 111, 117, 114, 105, 100, 106, 111, 114, 107, 97, 101, 102, 102), _(100, 106, 111, 114, 107, 97, 101, 102, 102)],
            [_(109, 105, 110, 105)],
            [_(109, 111, 114, 100, 111, 114)],
            [_(101, 100, 100, 105, 101), _(105, 114, 111, 110, 109, 97, 105, 100, 101, 110)],
            [_(115, 111, 108, 100, 111, 109, 105)],
        ],
        s = [!1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1];

	$('.js-input').each(function() {
		var index = $(this).attr('data-index');
		var getData = localStorage.getItem('data-index-' + index);
	    if(getData){
	        $(this).val(JSON.parse(getData));
	        checkValue($(this));
	    }
	});
    $(".js-input").on("keyup", function () {
        checkValue($(this));
    });
    function checkValue(elem) {
    	var n = parseInt(elem.attr("data-index")) - 1,
            i = elem.val().toLowerCase().replaceAll(" ", "").replaceAll("'", "");
        a[n].includes(i) &&
            (elem.addClass("solved"),
            elem.blur(),
            localStorage.setItem('data-index-' + elem.attr("data-index"), JSON.stringify(elem.val())),
            (s[n] = !0),
            (function a() {
                for (erg in s) if (!s[erg]) return;
                var n = _(66, 79, 74, 65, 78, 71, 76, 69, 83),
                    i = 0,
                    t = !0;
                $(".js-input").each(function () {
                    var _ = elem;
                    t ? ((t = !1), (i += 100)) : (t = !0),
                        setTimeout(function () {
                            _.addClass("move");
                        }, i);
                });
                var e = 100;
                $(".js-list-answers").addClass("visible"),
                    $(".js-answer").each(function () {
                        e += 100;
                        var _ = elem,
                            a = _.attr("data-answer");
                        elem.text(n.charAt(a)),
                            setTimeout(function () {
                                _.addClass("visible");
                            }, e);
                    });
            })());
    }
});
