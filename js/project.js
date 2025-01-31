document.addEventListener("DOMContentLoaded", ()=>{
    gsap.registerPlugin(CustomEase);
    CustomEase.create(
        "hop",
        "M0, 0 C0.354,0 0.464,0.133 0.498,0.502 0.532,0.872 0.651,1 1,1"
    );

    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
    const links = document.querySelectorAll('.link');
    const socialLinks = document.querySelectorAll('.socials a');
    let isAnimating = false;

    const splitTextIntoSpans = (selector) => {
        let elements = document.querySelectorAll(selector);
        elements.forEach((element) => {
            let text = element.innerText;
            let splitText = text
                .split("")
                .map(function (char){
                    return `<span>${char == " " ? "&nbsp;&nbsp" : char}</span>`;
                })
                .join("");
            element.innerHTML = splitText;
            console.log(element.innerHTML);
        });
    };
    splitTextIntoSpans(".header h3");

    menuToggle.addEventListener("click",() => {
        if(isAnimating) return;

        if(menuToggle.classList.contains("closed")){
            menuToggle.classList.remove("closed");
            menuToggle.classList.add("opened");

            isAnimating = true;

            gsap.to(menu, {
                clipPath: "polygon(0% 0%,100% 0%,100% 100%,0% 100%)",
                ease: "hop",
                duration: 1.5,
                onStart:() => {
                    menu.style.pointerEvents = "all";
                },
                onComplete: () => {
                    isAnimating = false;
                },
            });
            gsap.to(links, {
                y:0,
                opacity:1,
                stagger: 0.1,
                delay: 0.85,
                duration: 1,
                ease: "power3.out",
            });
            gsap.to(socialLinks, {
                y:0,
                opacity:1,
                stagger: 0.05,
                delay: 0.85,
                duration: 1,
                ease: "power3.out",
            });
            gsap.to(".video-wrapper", {
                clipPath: "polygon(0% 0%,100% 0%,100% 100%,0% 100%)",
                ease: "hop",
                delay: 0.5,
                duration: 1.5,
            });
            gsap.to(".header h3 span", {
                rotateY: 0,
                stagger: 0.05,
                delay: 0.75,
                duration: 1.5,
                ease: "power4.out",
            });
            gsap.to(".header h3 span", {
                y:0,
                scale: 1,
                stagger:  0.05,
                delay: 0.5,
                duration: 1,
                ease: "power4.out",
            })
        }else{
            menuToggle.classList.remove("opened");
            menuToggle.classList.add("closed");

            isAnimating = true;

            gsap.to(menu, {
                clipPath: "polygon(0% 0%,100% 0%,100% 0%,0% 0%)",
                ease: "hop",
                duration:1.5,
                onComplete: () =>{
                    menu.style.pointerEvents = "none";
                    gsap.set(menu,{
                        clipPath: "polygon(0% 100%,100% 100%,100% 100%,0% 100%)",
                    });
                    gsap.set(links, {y: 30, opacity: 0});
                    gsap.set(socialLinks, {y: 30, opacity: 0});
                    gsap.set(".video-wrapper", {
                        clipPath: "polygon(0% 100%,100% 100%,100% 100%,0% 100%)",
                    });
                    gsap.set(".header h3 span", {
                        y: 500,
                        rotateY: 90,
                        scale: 0.75
                    });

                    isAnimating = false;
                }
            })
        }
    })
});
AOS.init();
// carousel
new Swiper('.card-wrapper', {
    loop: true,
    spaceBetween: 30,
    centeredSlides: true,
    slidesPerView: 'auto',
    speed: 600,

    autoplay:{
        delay:3000,
        disableOnInteraction:false
    },
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable:true,
      dynamicBullets: true,
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    // responsive breakpoints
    breakpoints: {
        0:{
            slidesPerView: 1,
        },
        768:{
            slidesPerView: 2,
        },
        1024:{
            slidesPerView: 3,
        }
    },
    effect: "coverflow",
    coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier:1,
    },
    // effect: 'coverflow',
    // coverflowEffect: {
    //     rotate: 10,
    //     stretch: 0,
    //     depth: 100,
    //     modifier: 1,
    //     slideShadows : true,
    // },

    speed: 600, // Kecepatan animasi
    parallax: true,
    on: {
        slideChangeTransitionEnd: function(){
            document.querySelectorAll('.swiper-slide').forEach(slide => {
                slide.classList.remove('active-slide')
            });

            let activeSlide = document.querySelector('.swiper-slide-active');
            if(activeSlide){
                activeSlide.classList.add('active-slide');
            }
        }
    }
  });