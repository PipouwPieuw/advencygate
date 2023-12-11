$(document).ready(function () {
    var _ = 1,
        i = "",
        a = String.fromCharCode;
    function n(_, i) {
        var n, o;
        _.attr("data-icon", i),
            (n = a(48, 55, 49, 52, 48, 49, 49, 53, 49, 56, 49, 48, 49, 54, 48, 51, 48, 57, 48, 52, 49, 55, 49, 50, 48, 54, 49, 51, 48, 53, 48, 56, 48, 50, 49, 49)),
            (o = ""),
            $(".js-timeline-icon").each(function () {
                o += $(this).attr("data-icon");
            }),
            o == n && (l(), $(".js-modal-overlay").addClass("active"), localStorage.setItem("tartine", !0));
    }
    function o() {
        var _ = [];
        $(".js-timeline-icon").each(function () {
            _.push($(this).attr("data-icon"));
        }),
            $(".js-icon-trigger").each(function () {
                var i = $(this).attr("data-icon");
                _.includes(i) ? $(this).addClass("chosen") : $(this).removeClass("chosen");
            });
    }
    function l() {
        $(".js-modal-text").text(a(84, 79, 80, 73, 78, 65, 77, 66, 79, 85, 82));
    }
    function c() {
        $("body").addClass("solved"),
            (t = 0),
            (e = [
                a(48, 56, 47, 48, 53, 47, 49, 54),
                a(50, 57, 47, 48, 55, 47, 49, 55),
                a(51, 48, 47, 48, 49, 47, 49, 56),
                a(48, 49, 47, 48, 54, 47, 49, 56),
                a(48, 55, 47, 48, 55, 47, 49, 56),
                a(50, 55, 47, 48, 55, 47, 49, 56),
                a(50, 54, 47, 49, 48, 47, 49, 56),
                a(48, 50, 47, 48, 51, 47, 49, 57),
                a(50, 48, 47, 48, 53, 47, 49, 57),
                a(50, 48, 47, 48, 55, 47, 49, 57),
                a(48, 54, 47, 48, 57, 47, 49, 57),
                a(49, 55, 47, 49, 48, 47, 49, 57),
                a(48, 57, 47, 49, 48, 47, 50, 48),
                a(49, 57, 47, 48, 55, 47, 50, 49),
                a(49, 54, 47, 48, 54, 47, 50, 49),
                a(50, 50, 47, 48, 55, 47, 50, 50),
                a(51, 49, 47, 48, 51, 47, 50, 51),
                a(49, 52, 47, 48, 52, 47, 50, 51),
            ]),
            (s = [
                a(80, 114, 101, 109, 105, 232, 114, 101, 32, 82, 117, 233, 101, 32, 100, 101, 115, 32, 70, 97, 100, 97, 115),
                a(83, 233, 109, 105, 110, 97, 105, 114, 101, 32, 97, 117, 32, 80, 117, 121, 32, 100, 117, 32, 79, 117, 102),
                a(84, 101, 115, 116, 32, 108, 105, 118, 101, 32, 100, 101, 32, 108, 39, 97, 112, 112, 108, 105, 99, 97, 116, 105, 111, 110, 32, 84, 89, 77),
                a(83, 233, 109, 105, 110, 97, 105, 114, 101, 32, 224, 32, 83, 97, 110, 32, 83, 101, 98, 97, 115, 116, 105, 97, 110),
                a(84, 114, 97, 118, 97, 117, 120, 32, 97, 117, 32, 98, 117, 114, 101, 97, 117, 32, 100, 101, 115, 32, 67, 97, 114, 109, 101, 115),
                a(69, 109, 109, 233, 110, 97, 103, 101, 109, 101, 110, 116, 32, 97, 117, 32, 98, 117, 114, 101, 97, 117, 32, 100, 101, 115, 32, 67, 97, 114, 109, 101, 115),
                a(53, 32, 97, 110, 115, 32, 100, 101, 32, 65, 100, 118, 101, 110, 99, 121, 32, 97, 117, 32, 84, 114, 97, 110, 99, 104, 111, 105, 114),
                a(87, 101, 101, 107, 45, 101, 110, 100, 32, 101, 110, 32, 65, 118, 101, 121, 114, 111, 110, 32, 99, 104, 101, 122, 32, 74, 117, 108, 101, 115),
                a(83, 233, 109, 105, 110, 97, 105, 114, 101, 32, 224, 32, 69, 100, 105, 109, 98, 111, 117, 114, 103, 104),
                a(69, 86, 71, 32, 100, 101, 32, 70, 97, 98, 105, 101, 110, 32, 224, 32, 66, 101, 114, 108, 105, 110),
                a(77, 97, 114, 105, 97, 103, 101, 32, 100, 101, 32, 70, 97, 98, 105, 101, 110, 32, 101, 116, 32, 78, 97, 100, 232, 103, 101),
                a(76, 101, 115, 32, 54, 32, 97, 110, 115, 32, 100, 101, 32, 65, 100, 118, 101, 110, 99, 121),
                a(83, 233, 109, 105, 110, 97, 105, 114, 101, 32, 224, 32, 68, 111, 110, 103, 101, 115),
                a(83, 101, 109, 97, 105, 110, 101, 32, 100, 101, 32, 114, 117, 115, 104, 32, 84, 97, 97, 107, 97, 114, 111),
                a(83, 233, 109, 105, 110, 97, 105, 114, 101, 32, 224, 32, 76, 111, 110, 100, 114, 101, 115),
                a(80, 111, 116, 32, 100, 101, 32, 100, 233, 112, 97, 114, 116, 32, 100, 101, 32, 70, 108, 111, 114, 101, 110, 116),
                a(80, 111, 116, 32, 100, 101, 32, 100, 233, 112, 97, 114, 116, 32, 100, 101, 32, 76, 117, 100, 111, 118, 105, 99),
                a(82, 101, 112, 97, 115, 32, 99, 104, 101, 122, 32, 87, 97, 108, 105, 100),
            ]),
            $(".js-timeline-noimg").each(function () {
                var _ = (t += 1) >= 10 ? "" : "0",
                    i = $('<li class="list_timeline__item js-timeline-item"></li>'),
                    a = $('<div class="list_timeline__image"></div>');
                a.append('<img class="list_timeline__img js-img" src="assets/img/coquelicot/' + _ + t + 'bassine.png"/>'),
                    i.append(a),
                    i.append('<span class="list_timeline__date js-date">' + e[t - 1] + "</span>"),
                    i.append('<span class="list_timeline__desc js-desc">' + s[t - 1] + "</span>"),
                    i.insertAfter($(this)),
                    $(this).remove();
            });
    }
    localStorage.getItem("tartine")
        ? ($(".js-modal-open").addClass("visible"), l(), c())
        : ($(".js-timeline-icon").each(function () {
              $(this).attr("data-index", _);
              var i = localStorage.getItem("data-icon-" + _);
              i && n($(this), JSON.parse(i)), (_ += 1);
          }),
          o()),
        setTimeout(function () {
            $(".page_content").removeClass("loading");
        }, 500),
        $(".js-back-link").on("click", function () {
            $("body").addClass("no_scroll"), $(".js-page-transition").addClass("visible");
            var _ = 0;
            $(".js-page-transition-item").each(function () {
                _ += 100;
                var i = $(this);
                setTimeout(function () {
                    i.addClass("visible");
                }, _);
            }),
                setTimeout(function () {
                    location.href = "/advencygate";
                }, 1e3);
        }),
        $(document).on("click", function (_) {
            if (!(!$(_.target).closest(".js-timeline-item").length > 0)) {
                var a = $(_.target).closest(".js-timeline-item");
                i = a;
                var n = $(".js-overlay"),
                    o = $(".js-overlay-image"),
                    l = $(".js-overlay-desc"),
                    c = a.find(".js-img").attr("src"),
                    r = a.find(".js-date").text() + " - " + a.find(".js-desc").text();
                o.attr("src", c), l.text(r), n.addClass("active");
            }
        }),
        $(".js-overlay").on("click", function () {
            $(this).removeClass("active"), (i = "");
        }),
        $(".js-modal-open").on("click", function () {
            $(".js-modal-overlay").addClass("active");
        }),
        $(".js-modal-close, .js-modal-overlay").on("click", function (_) {
            if ($(_.target).hasClass("js-modal-close")) {
                var i = 0;
                $("body").hasClass("solved") || c(),
                    $(".js-modal-open").addClass("visible"),
                    setTimeout(function () {
                        $(".js-modal-overlay").removeClass("active");
                    }, (i = 100));
            }
        }),
        $(".js-icon-picker").on("click", function () {
            $(".js-timeline-icon.active").removeClass("active"), $(this).removeClass("active");
        }),
        $(".js-timeline-icon").on("click", function () {
            $(this).addClass("active"), $(".js-icon-picker").addClass("active");
        }),
        $(".js-icon-trigger").on("click", function () {
            var _ = $(this).attr("data-icon");
            if($(".js-timeline-icon.active").attr('data-icon') == _)
            	localStorage.removeItem("data-icon-" + $(".js-timeline-icon.active").attr("data-index")), n($(".js-timeline-icon.active"), '00'), o();
            else
	            localStorage.setItem("data-icon-" + $(".js-timeline-icon.active").attr("data-index"), JSON.stringify(_)), n($(".js-timeline-icon.active"), _), o();
        }),
        $(".js-overlay-button").on("click", function (_) {
            _.stopPropagation();
            var a = $(this).attr("data-btn"),
                n = "";
            if ("prev" == a) {
                if (i.is(":first-of-type")) {
                    var o = i.parent();
                    n = o.is(":first-of-type") ? $(".list_timeline ul:last-of-type li:last-of-type") : o.prev().prev().find("li:last-of-type");
                } else n = i.prev();
            } else if (i.is(":last-of-type")) {
                var o = i.parent();
                n = o.is(":last-of-type") ? $(".list_timeline ul:first-of-type li:first-of-type") : o.next().next().find("li:first-of-type");
            } else n = i.next();
            var l = $(".js-overlay-image"),
                c = $(".js-overlay-desc"),
                r = n.find(".js-img").attr("src"),
                d = n.find(".js-date").text() + " - " + n.find(".js-desc").text();
            l.attr("src", r), c.text(d), (i = n);
        });
});
