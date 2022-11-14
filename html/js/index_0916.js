// HERO SLIDER
$(function () {
    // var menu = [];
    // jQuery('.hero-slider .swiper-slide').each(function (index) {
    //     menu.push(jQuery(this).find('.slide-inner').attr("data-text"));
    // });
    var interleaveOffset = 0.5;
    var swiperOptionsSingleSlide = {
        speed: 1000,
        parallax: true,
        watchSlidesProgress: true,
    };

    var swiperOptions = {
        loop: true,
        speed: 1000,
        parallax: true,
        autoplay: {
            delay: 6500,
            disableOnInteraction: false,
        },
        watchSlidesProgress: true,
        on: {
            // progress: function () {
            //     var swiper = this;
            //     for (var i = 0; i < swiper.slides.length; i++) {
            //         var slideProgress = swiper.slides[i].progress;
            //         var innerOffset = swiper.width * interleaveOffset;
            //         var innerTranslate = slideProgress * innerOffset;
            //         swiper.slides[i].querySelector(".slide-inner").style.transform =
            //             "translate3d(" + innerTranslate + "px, 0, 0)";
            //     }
            // },

            touchStart: function () {
                var swiper = this;
                for (var i = 0; i < swiper.slides.length; i++) {
                    swiper.slides[i].style.transition = "";
                }
            },

            setTransition: function (speed) {
                var swiper = this;
                for (var i = 0; i < swiper.slides.length; i++) {
                    swiper.slides[i].style.transition = speed + "ms";
                    // swiper.slides[i].querySelector(".slide-inner").style.transition =
                    //     speed + "ms";
                }
            },
        }
    };
    let heroSliderLength = $(".hero-slider .swiper-container .swiper-slide").length
    console.log(heroSliderLength)
    // var swiper = new Swiper("section.hero-slider .swiper-container", swiperOptions);
    let swiper, 
        swiper2;

    if (heroSliderLength == 1) {
        swiper = new Swiper("section.hero-slider .swiper-container", swiperOptionsSingleSlide);
        swiper2 = new Swiper("section.hero-slider .swiper-container-cards", {
        effect: "fade",
        fadeEffect: { crossFade: true },
    });
    } else if (heroSliderLength > 1) {
        swiper = new Swiper("section.hero-slider .swiper-container", swiperOptions);
        swiper2 = new Swiper("section.hero-slider .swiper-container-cards", {
        loop: true,
        effect: "fade",
        fadeEffect: { crossFade: true },
        // spaceBetween: 10
    });
    }
    

    // DATA BACKGROUND IMAGE
    // var sliderBgSetting = $(".slide-bg-image");
    // sliderBgSetting.each(function (indx) {
    //     if ($(this).attr("data-background")) {
    //         $(this).css("background-image", "url(" + $(this).data("background") + ")");
    //     }
    // });

    swiper.controller.control = swiper2;
    swiper2.controller.control = swiper;
})

// sticky nav
$(function () {
    let $stickyNavHeight = $(".process .sticky_nav").height(),
        endPoint;
    // console.log($stickyNavHeight, endPoint)
    let start 
    if ($(window).height() > 1000) {
        start = "0px 30%";
        endPoint = $stickyNavHeight ;
    } else {
        start = "0px 18%";
        endPoint = $stickyNavHeight * 0.95;
    }
    console.log(start)
    ScrollTrigger.create({
        trigger: '.sticky_nav',
        start,
        endTrigger: '.content.process5',
        end: `center 50%`,
        pin: '.sticky_nav',
        // pinSpacing: false,
        // markers: true
    })
    ScrollTrigger.create({
        trigger: '.process .section_title__wrapper',
        start,
        endTrigger: '.content.process5',
        end: `center 50%`,
        pin: '.process .section_title__wrapper',
        pinSpacing: false,
        // markers: true
    })
    $(window).resize(function () {
        $stickyNavHeight = $(".process .sticky_nav").height()
        endPoint = $stickyNavHeight * .9
        // console.log($stickyNavHeight, endPoint)
        // ScrollTrigger.refresh()
    })

    let options 
    if ($(window).height() > 1000) {
        options = {
            root: null,
            rootMargin: "-40% 0px -20% 0px",
            threshold: [0]
        }
    } else {
        options = {
            root: null,
            rootMargin: "-55% 0px -30% 0px",
            threshold: [0]
        }
    }
    // 條件達成做什麼：符合設定條件下，目標進入或離開 viewport 時觸發此 callback 函式
    let callback = (entries, observer) => {
        // entries 能拿到所有目標元素進出(intersect)變化的資訊
        entries.forEach(e => {
            let target = e.target,
                targetId = e.target.id,
                targetContentIndex = e.target.dataset.contentIndex,
                isIntersecting = e.isIntersecting;
            if (isIntersecting && targetContentIndex !== 0) {
                // console.log(targetContentIndex)
                // $(".sticky_nav .anim").removeClass("anim")
                // $(".sticky_nav img.item_img").attr("src", `img/process${targetContentIndex}.png`)
                // setTimeout(function() {
                //     $(".sticky_nav img.item_img").addClass("anim")
                // })
                $(target).addClass("active")
                $(`.sticky_nav .item_img`).addClass("d-none")
                $(`.sticky_nav .process${targetContentIndex}`).removeClass("d-none")
            } else if (!isIntersecting) {
                $(target).removeClass("active")
            }
        })
    }

    // 製作鈴鐺：建立一個 intersection observer，帶入相關設定資訊
    let observer = new IntersectionObserver(callback, options)

    // 設定觀察對象：告訴 observer 要觀察哪個目標元素
    let observeTargets = $(".content")
    for (const target of observeTargets) {
        observer.observe(target);
    }

})

$(function() {
    const animateCSS = (element, animation, prefix = 'animate__') =>
        // We create a Promise and return it
        new Promise((resolve, reject) => {
            const animationName = `${prefix}${animation}`;
            const node = document.querySelector(element);

            node.classList.add(`${prefix}animated`, animationName);

            // When the animation ends, we clean the classes and resolve the Promise
            function handleAnimationEnd(event) {
            event.stopPropagation();
            node.classList.remove(`${prefix}animated`, animationName);
            resolve('Animation ended');
            }

            node.addEventListener('animationend', handleAnimationEnd, {once: true});
        });

    let options = {
            root: null,
            rootMargin: "0px 0px -30% 0px",
            threshold: [0]
        }

    // 條件達成做什麼：符合設定條件下，目標進入或離開 viewport 時觸發此 callback 函式
    let callback = (entries, observer) => {
        // entries 能拿到所有目標元素進出(intersect)變化的資訊
        entries.forEach(e => {
            let target = e.target,
                targetId = e.target.id,
                targetContentIndex = e.target.dataset.contentIndex,
                isIntersecting = e.isIntersecting;
            if (isIntersecting ) {
                // console.log(targetContentIndex)
                // $(".sticky_nav .anim").removeClass("anim")
                // $(".sticky_nav img.item_img").attr("src", `img/process${targetContentIndex}.png`)
                // setTimeout(function() {
                //     $(".sticky_nav img.item_img").addClass("anim")
                // })
                $(target).children("h3").addClass("animate__animated").addClass("animate__fadeInUp")
                $(target).children("p").addClass("animate__animated").addClass("animate__fadeInUp")
                $(target).siblings(".about_img").addClass("animate__animated").addClass("animate__fadeInUp")
            }  else if (!isIntersecting) {
                // $(target).removeClass("active")
            }
        })
    }

    // 製作鈴鐺：建立一個 intersection observer，帶入相關設定資訊
    let observer = new IntersectionObserver(callback, options)

    // 設定觀察對象：告訴 observer 要觀察哪個目標元素
    let observeTargets = $(".about_content");
    // let observeTargets = $(".about_img");
    for (const target of observeTargets) {
        observer.observe(target);
    }
})

// service_card_wrapper
$(function () {
    ScrollTrigger.batch(".service_card_wrapper", {
        interval: 0.3, // time window (in seconds) for batching to occur. 
        //batchMax: 3,   // maximum batch size (targets)
        onEnter: batch => gsap.to(batch, { opacity: 1, y: 0, stagger: { each: 0.15, grid: [1, 3] }, overwrite: true }),
        onLeave: batch => gsap.set(batch, { opacity: 0, y: -100, overwrite: true }),
        onEnterBack: batch => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.15, overwrite: true }),
        onLeaveBack: batch => gsap.set(batch, { opacity: 0, y: 100, overwrite: true })
        // you can also define things like start, end, etc.
    });
    ScrollTrigger.addEventListener("refreshInit", () => gsap.set(".service_card_wrapper", { y: 0 }));

})

// blog-slider
$(function () {
    var swiper3 = new Swiper('section.success_stories .blog-slider', {
        spaceBetween: 30,
        effect: 'fade',
        loop: true,
        autoplay: {
            delay: 6500,
            disableOnInteraction: false,
        },
        // mousewheel: {
        //     invert: false,
        // },
        navigation: {
            nextEl: 'section.success_stories .swiper-button-next',
            prevEl: 'section.success_stories .swiper-button-prev',
        },
        autoHeight: true,
        // pagination: {
        //     el: '.blog-slider__pagination',
        //     clickable: true,
        // }
    });
})

// process
$(function () {
    $('#accordion').collapse({
        toggle: false
    })

    $(".process_m h3").on("click", function() {
        $(this).parent(".collapse_item").toggleClass("-collapsed")
    })
})