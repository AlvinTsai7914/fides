// .hero-slider
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
        // loop: true,
        speed: 1000,
        watchSlidesProgress: true,
        autoplay: {
            delay: 5000,
            stopOnLastSlide: false,
            // disableOnInteraction: false,
        },
        on: {
            init: function() {
                var videos = document.querySelectorAll('.hero-slider video');
                console.log(videos)
                videos.forEach((video) => {
                    video.currentTime = 1
                })
             
            },
            // progress: function () {
            //     console.log("progress")
            //     var swiper = this;
            //     for (var i = 0; i < swiper.slides.length; i++) {
            //         var slideProgress = swiper.slides[i].progress;
            //         var innerOffset = swiper.width * interleaveOffset;
            //         var innerTranslate = slideProgress * innerOffset;
            //         swiper.slides[i].querySelector(".slide-inner").style.transform =
            //             "translateX(" + innerTranslate + "px)";
            //     }
            // },
            // touchStart: function () {
            //     console.log("touchStart")
            //     var swiper = this;
            //     for (var i = 0; i < swiper.slides.length; i++) {
            //         swiper.slides[i].style.transition = "";
            //     }
            // },

            // setTransition: function(speed) {
            //     console.log("setTransition")
            //     var swiper = this;
            //     for (var i = 0; i < swiper.slides.length; i++) {
            //         swiper.slides[i].style.transition = 1000 + "ms";
            //         // console.log(1000)
            //         swiper.slides[i].querySelector(".slide-inner").style.transition =
            //             1000 + "ms";
            //     }
            // },

            transitionStart: function(){
                var videos = document.querySelectorAll('video');
                Array.prototype.forEach.call(videos, function(video){
                    video.pause();
                });
              },
              
            transitionEnd: function(){
                var activeIndex = this.activeIndex;
                var activeSlide = document.getElementsByClassName('swiper-slide')[activeIndex];
                var activeSlideVideo = activeSlide.getElementsByTagName('video')[0];
                console.log(activeSlideVideo !== undefined)
                if (activeSlideVideo !== undefined) {
                    activeSlideVideo.play();
                }
            },
        }
    };

    let heroSliderLength = $(".hero-slider .swiper-container .swiper-slide").length
    console.log(heroSliderLength)

    let bannerSwiper, 
        bannerSwiper2;

    if (heroSliderLength == 1) {
        bannerSwiper = new Swiper("section.hero-slider .swiper-container", swiperOptionsSingleSlide);
        bannerSwiper2 = new Swiper("section.hero-slider .swiper-container-cards", {
            effect: "fade",
            fadeEffect: { crossFade: true },
        });
    } else if (heroSliderLength > 1) {
        bannerSwiper = new Swiper("section.hero-slider .swiper-container", swiperOptions);
        bannerSwiper2 = new Swiper("section.hero-slider .swiper-container-cards", {
            // loop: true,
            effect: "fade",
            fadeEffect: { crossFade: true },
            // spaceBetween: 10
        });
    }
    

    bannerSwiper.controller.control = bannerSwiper2;
    bannerSwiper2.controller.control = bannerSwiper;
})

// .about 
$(function() {
    // ========================================
    // 文字淡入
    // ========================================
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
                isIntersecting = e.isIntersecting;
            if (isIntersecting ) {
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
    for (const target of observeTargets) {
        observer.observe(target);
    }

    // ========================================
    // parallax
    // ========================================
    $(".hero-slider .swiper-container-cards").css("top", "calc(50% - 300px)");
    $(".hero-slider .img_box").css("top", "calc(50% - 300px)");
    gsap.to(".hero-slider .swiper-container-cards", {
        y: 600,
        ease: "none",
        scrollTrigger: {
            trigger: ".hero-slider",
            // start: "top bottom", // the default values
            // end: "bottom top",
            scrub: true
        }, 
    });
    gsap.to(".hero-slider .img_box", {
        y: 600,
        ease: "none",
        scrollTrigger: {
            trigger: ".hero-slider",
            // start: "top bottom", // the default values
            // end: "bottom top",
            scrub: true
        }, 
    });
    gsap.to(".about .content_wrapper", {
        y: -300,
        ease: "none",
        scrollTrigger: {
            trigger: ".about .content_wrapper",
            // start: "top bottom", // the default values
            // end: "bottom top",
            scrub: true
        }, 
    });

    // ========================================
    // CSR動畫
    // ========================================
    gsap.to(".animate_text_csr .line_c", {
        scrollTrigger: {
            trigger: ".line_c_mask",
            start: "top bottom",
            end: "bottom 10%",
            scrub: 1,
            // markers: true
        },
        strokeDashoffset: 0,
        duration: 3
    })
    gsap.to(".animate_text_csr .line_s", {
        scrollTrigger: {
            trigger: ".line_s_mask",
            start: "top 70%",
            end: "bottom 10%",
            scrub: 1,
            // markers: true
        },
        strokeDashoffset: 0,
        duration: 3
    })
    gsap.to(".animate_text_csr .line_r_1", {
        scrollTrigger: {
            trigger: ".line_r_mask",
            start: "top 70%",
            end: "bottom 10%",
            scrub: 1,
            // markers: true
        },
        strokeDashoffset: 0,
        duration: 3
    })
    gsap.to(".animate_text_csr .line_r_2", {
        scrollTrigger: {
            trigger: ".line_r_mask",
            start: "top center",
            end: "bottom 10%",
            scrub: 1,
            // marger: true
        },
        strokeDashoffset: 0,
        duration: 1
    })

    // ========================================
    // ESG動畫
    // ========================================
    gsap.to(".animate_text_esg .line_e_1", {
        scrollTrigger: {
            trigger: ".line_e_mask",
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
            // markers: true
        },
        strokeDashoffset: 0,
        duration: 3
    })
    gsap.to(".animate_text_esg .line_e_2", {
        scrollTrigger: {
            trigger: ".animate_text_esg .line_e_2",
            start: "bottom 90%",
            end: "bottom top",
            scrub: 1,
            // markers: true
        },
        strokeDashoffset: 0,
        duration: 3
    })
    gsap.to(".animate_text_esg .line_e_3", {
        scrollTrigger: {
            trigger: ".animate_text_esg .line_e_3",
            start: "top 70%",
            end: "bottom top",
            scrub: 1,
            // markers: true
        },
        strokeDashoffset: 0,
        duration: 3
    })
    gsap.to(".animate_text_esg .line_e_4", {
        scrollTrigger: {
            trigger: ".animate_text_esg .line_e_4",
            start: "bottom 60%",
            end: "bottom top",
            scrub: 1,
            // markers: true
        },
        strokeDashoffset: 0,
        duration: 3
    })
    gsap.to(".animate_text_esg .line_s", {
        scrollTrigger: {
            trigger: ".animate_text_esg .line_s",
            start: "top 60%",
            end: "bottom center",
            scrub: 1,
            // markers: true
        },
        strokeDashoffset: 0,
        duration: 3
    })
    gsap.to(".animate_text_esg .line_g", {
        scrollTrigger: {
            trigger: ".animate_text_esg .line_g",
            start: "top 70%",
            end: "bottom center",
            scrub: 1,
            // markers: true
        },
        strokeDashoffset: 0,
        duration: 3
    })

})

// .process
$(function () {
    // =============================================
    // sitcky效果 - gsap scoll trigger pin
    // =============================================
    // Scroll Scenes 
    const scenes = gsap.utils.toArray('.scene');
    // maybe use dymanic height for pin/scroll ends?
    const height = ((scenes.length - 1) * 100) + '%';
    // Scenes Timeline
    const pinTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".scenes__items",
            pin: ".scenes",
            start: "center center",
            end: `+=${height}`,
            // onEnterBack: () => startVideo(scenes[scenes.length - 1]),
            scrub: true
        }
    });

    // Set scenes wrapper to absolute
    gsap.set(scenes, { position: "absolute", top: 0 });

    // Loop over scenes
    scenes.forEach(function (elem, i) {

        // Vid start / pause logic
        // pinTl.add(() => pinTl.scrollTrigger.direction > 0 ? startVideo(elem, i) : stopVideo(elem, i), i + 0.001);

        if (i != 0) {
            // Scene Enter animations
            pinTl.from(elem.querySelector('.scene__figure'), {
                autoAlpha: 0
            }, i
            )

            pinTl.from(elem.querySelector('.scene__header'), {
                autoAlpha: 0,
                translateY: 100
            }, i
            )
        }

        // Scene Exit animations
        if (i != scenes.length - 1) {
            pinTl.to(elem.querySelector('.scene__header'), {
                autoAlpha: 0,
                translateY: -100
            }, i + 0.75
            )
            pinTl.to(elem.querySelector('.scene__figure'), {
                autoAlpha: 0
            }, i + 0.75
            )
        }
    });

    // add a tiny amount of empty space at the end of the timeline so that the playhead trips the final callback in both directions
    pinTl.to({}, { duration: 0.001 });

    // =============================================
    // 點擊左方滾動頁面
    // =============================================
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
                targetIndex,
                sectionProcessTop = $("section.process").offset().top,
                stopPoint;

            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            targetIndex = $(target).data("contentIndex")
            if (targetIndex < 1 || targetIndex > 3) {
                stopPoint = sectionProcessTop + targetIndex * $windowH;
            } else {
                stopPoint = sectionProcessTop + targetIndex * $windowH + 200;
            }
            // if ($windowW > 992) {
            //     stopPoint = target.offset().top - $windowHHalf;
            // } else if ($windowW < 992) {
            //     stopPoint = target.offset().top - $windowHHalf - 50;
            // }


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

    $('#accordion').collapse({
        toggle: false
    })

    $(".process_m h3").on("click", function() {
        $(this).parent(".collapse_item").toggleClass("-collapsed")
    })
})

// .service
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

// .success_stories
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

