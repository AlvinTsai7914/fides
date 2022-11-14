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

function closeSubNav() {
    $(".-open").removeClass("-open")
    $("html,body").removeClass("-locked")
    $("header").removeClass("-active")
}
// header
$(function() {
    $(".hamburger").on("click", function(e) {
        // openSubNav(e)
        // $(".nav_list__item").removeClass("-open")
        $(".burger").toggleClass("-open")
        $(".sub_nav").toggleClass("-open")
        // $("html,body").toggleClass("-locked")
        $(".overlay").toggleClass("-open")
        $("header").toggleClass("-active")
        
    })

    $(".overlay").on("click", () => {closeSubNav()})
    // 漢堡選單
    $('header a[href*="#"]:not([href="#"])').click(function () {
    
        if (
            location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
            location.hostname == this.hostname &&
            this.hash.slice(1) != 'top'
        ) {
            let target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            // let scrollTop = $(window).width() > 768 ? target.offset().top : target.offset().top - 80
            let scrollTop = target.offset().top
            if (target.length) {
                $('html, body').animate(
                    {
                        scrollTop
                    },
                    1000
                );
                return false;
            }
        }
        $(".sub_nav").data("open", "0");  
    });
    $(".sub_nav a").on("click",() => {closeSubNav()})
       

    // 網頁滾動事件的動作
    function windowScrollEvent() {
        let $scrollTop = $(window).scrollTop(),
            $header = $("header");
            closeSubNav()
        if ($scrollTop > 90) {
            $header.addClass("-solid");
        } else {
            $header.removeClass("-solid");
        }
    }
    

    // 監聽網頁滾動 控制header和gototop
    $(window).on("scroll", throttle(windowScrollEvent));

})