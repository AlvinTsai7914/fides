// 共用 js
// 節流器
function throttle(func, timeout = 250) {
    let last;
    let timer;

    return function () {
        const context = this;
        const args = arguments;
        const now = +new Date();

        if (last && now < last + timeout) {
            clearTimeout(timer);
            timer = setTimeout(function () {
                last = now;
                func.apply(context, args);
            }, timeout);
        } else {
            last = now;
            func.apply(context, args);
        }
    };
}

function debounce(func, delay = 250) {
    let timer = null;

    return () => {
        let context = this;
        let args = arguments;

        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(context, args);
        }, delay);
    };
}

$(function() {
    $('header a[href*="#"]:not([href="#"])').click(function () {

        if (
            location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
            location.hostname == this.hostname &&
            this.hash.slice(1) != 'top'
        ) {
            let target = $(this.hash);

            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

            if (target.length) {
                $('html, body').animate(
                    {
                        scrollTop: target.offset().top - 100,
                    },
                    1000
                );
                return false;
            }
        }
    });
    $('.process a[href*="#"]:not([href="#"])').click(function () {

        if (
            location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
            location.hostname == this.hostname &&
            this.hash.slice(1) != 'top'
        ) {
            let $windowW = $(window).width(),
                $windowH = $(window).height(),
                $windowHHalf = $windowH / 3,
                target = $(this.hash),
                stopPoint;

            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            console.log(target)
            if ($windowW > 992) {
                stopPoint = target.offset().top - $windowHHalf;
            } else if ($windowW < 992) {
                stopPoint = target.offset().top - $windowHHalf - 50;
            }
           

            if (target.length) {
                $('html, body').animate(
                    {
                        scrollTop: stopPoint,
                    },
                    1000
                );
                return false;
            }
        }
    });
})

$(function() {
    // 漢堡選單
    $(".hamburger").on("click", function(e) {
        // openSubNav(e)
        $(".burger").toggleClass("-open")
        $(".sub_nav").toggleClass("-open")
        $("html").toggleClass("-locked")
        $(".overlay").toggleClass("-open")
        $("header").toggleClass("-active")
        // $(".nav_list__item").removeClass("-open")

    })

    $(".overlay").on("click", function() {
        $(".-open").removeClass("-open")
        $("html").removeClass("-locked")
        $("header").removeClass("-active")
    })

    $(".sub_nav a").on("click",function() {
        $(".-open").removeClass("-open")
        $("html").removeClass("-locked")
        $("header").removeClass("-active")
    })

    // 網頁滾動事件的動作
    function windowScrollEvent() {
        let $scrollTop = $(window).scrollTop(),
            $header = $("header");

        if ($scrollTop > 90) {
            $header.addClass("-solid");
        } else {
            $header.removeClass("-solid");
        }
    }
    

    // 監聽網頁滾動 控制header和gototop
    $(window).on("scroll", throttle(windowScrollEvent));

})