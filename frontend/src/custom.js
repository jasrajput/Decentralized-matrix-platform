// CustomScripts.js
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
import Swiper from 'swiper';
import 'swiper/swiper-bundle.min.css'; // Import Swiper styles
import PureCounter from '@srexi/purecounterjs';

const CustomScripts = () => { 
  useEffect(() => {
    // =================== Preloader ================== //
    const preloader = document.querySelector('.preloader');
    if (preloader) {
      preloader.style.transition = 'opacity 0.5s ease';
      setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 500); // .5 seconds for the fade-out transition
      }, 1000); // 1 second delay before starting the fade-out effect
    }
    // =================== Preloader end ================== //

    function switchThemeByUrl() {
      const urlParams = new URLSearchParams(window.location.search);
      const theme = urlParams.get('theme');
      if (theme) {
        localStorage.setItem("theme", theme);
      }
    }
    
    function updateThemeColor(themeMode = 'light') {
      document.documentElement.setAttribute('data-bs-theme', themeMode);
      localStorage.setItem('theme', themeMode);
    
      const colorSwitcher = document.getElementById('colorSwitcher');
      if (colorSwitcher) {
        if (themeMode === 'dark') {
          colorSwitcher.classList.add('dark-switcher');
        } else {
          colorSwitcher.classList.remove('dark-switcher');
        }
      }
      changeImage(themeMode);
    }
    
    function changeImage(themeMode) {
      const icon = document.querySelector('#colorSwitcher img');
      if (icon) {
        icon.src = themeMode === 'dark' ? '/assets/images/icon/sun.svg' : '/assets/images/icon/moon.svg';
      }
      
      const images = document.querySelectorAll('img.dark');
      images.forEach(img => {
        let oldSrc = img.src;
        if (themeMode === 'dark') {
          oldSrc = oldSrc.replace("-dark.", ".");
          const oldIndex = oldSrc.lastIndexOf(".");
          const baseName = oldSrc.slice(0, oldIndex);
          const extension = oldSrc.slice(oldIndex);
          img.src = baseName + "-dark" + extension;
        } else {
          img.src = oldSrc.replace("-dark.", ".");
        }
      });
    }
    
    // Initialize theme on page load and expose function globally
    document.addEventListener('DOMContentLoaded', () => {
      switchThemeByUrl();
      const theme = localStorage.getItem('theme') || 'dark';
      updateThemeColor(theme);
      window.updateThemeColor = updateThemeColor;
    });
    
    // =================== Theme Switcher end ================== //

    const menuList = document.querySelectorAll("ul");
    menuList.forEach((menu) => {
        const parentLi = menu.parentElement;
        if (parentLi) {
            parentLi.addEventListener("mouseover", () => {
                const menuPos = menu.getBoundingClientRect();
                if (menuPos.left + menu.offsetWidth > window.innerWidth) {
                    menu.style.left = -menu.offsetWidth + "px";
                }
            });
        }
    });

    const submenuList = document.querySelectorAll("ul>li>.submenu");
        submenuList.forEach((submenu) => {
            const parentLi = submenu.parentElement;
            if (parentLi) {
                parentLi.classList.add("menu-item-has-children");
            }
        });

     // Menu toggle
     const menuLinks = document.querySelectorAll(".menu li a");
     menuLinks.forEach((link) => {
         link.addEventListener('click', (e) => {
             e.stopPropagation();
             const element = link.parentElement;
             if (parseInt(window.innerWidth, 10) < 1200) {
                 if (element.classList.contains("open")) {
                     element.classList.remove("open");
                     element.querySelector("ul").style.display = "none";
                 } else {
                     element.classList.add("open");
                     element.querySelector("ul").style.display = "block";
                 }
             }
         });
     });

    // =================== Header and Scroll Behavior ================== //
    const headerBar = document.querySelector(".header-bar");
    headerBar.addEventListener("click", () => {
      headerBar.classList.toggle("active");
      const menu = document.querySelector(".menu");
      if (menu) {
        menu.classList.toggle("active");
      }
    });

    const fixedTop = document.querySelector("header");
    const scrollToTop = document.querySelector('.scrollToTop');

    const handleScroll = () => {
      if (scrollToTop) {
        if (window.pageYOffset > 300) {
          scrollToTop.style.bottom = '7%';
          scrollToTop.style.opacity = '1';
          scrollToTop.style.transition = 'all .5s ease';
        } else {
          scrollToTop.style.bottom = '-30%';
          scrollToTop.style.opacity = '0';
          scrollToTop.style.transition = 'all .5s ease';
        }
      }

      if (fixedTop) {
        if (window.scrollY > 300) {
          fixedTop.classList.add("header-fixed", "fadeInUp");
        } else {
          fixedTop.classList.remove("header-fixed", "fadeInUp");
        }
      }
    };

    // Animation on Scroll
    AOS.init();

    const handleClick = (e) => {
      e.preventDefault();
      const scrollDuration = 100; // Set scroll duration in milliseconds
      const scrollStep = -window.scrollY / (scrollDuration / 15);
      const scrollInterval = setInterval(() => {
        if (window.scrollY !== 0) {
          window.scrollBy(0, scrollStep);
        } else {
          clearInterval(scrollInterval);
        }
      }, 15);
    };

    if (scrollToTop) {
      scrollToTop.addEventListener('click', handleClick);
    }

    window.addEventListener('scroll', handleScroll);

    // return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollToTop) {
        scrollToTop.removeEventListener('click', handleClick);
      }
    // };
    // =================== Header and Scroll Behavior end ================== //


    // =================== Swiper Initialization ================== //
    new Swiper('.partner__slider', {
      spaceBetween: 24,
      grabCursor: true,
      loop: true,
      slidesPerView: 2,
      breakpoints: {
        576: { slidesPerView: 3 },
        768: { slidesPerView: 4 },
        992: { slidesPerView: 5, spaceBetween: 15 },
        1200: { slidesPerView: 6, spaceBetween: 25 }
      },
      autoplay: { delay: 1, disableOnInteraction: true },
      speed: 2000,
    });

    new Swiper('.blog__slider', {
      spaceBetween: 24,
      grabCursor: true,
      loop: true,
      slidesPerView: 1,
      breakpoints: {
        576: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        992: { slidesPerView: 3 },
        1200: { slidesPerView: 3 }
      },
      autoplay: true,
      speed: 500,
      navigation: {
        nextEl: ".blog__slider-next",
        prevEl: ".blog__slider-prev",
      },
    });

    new Swiper('.testimonial__slider', {
      spaceBetween: 24,
      grabCursor: true,
      loop: true,
      slidesPerView: 1,
      breakpoints: {
        576: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        992: { slidesPerView: 2 },
        1200: { slidesPerView: 2, spaceBetween: 25 }
      },
      autoplay: true,
      speed: 500,
      navigation: {
        nextEl: ".testimonial__slider-next",
        prevEl: ".testimonial__slider-prev",
      },
    });

    new Swiper('.testimonial__slider2', {
      spaceBetween: 24,
      grabCursor: true,
      loop: true,
      slidesPerView: 1,
      breakpoints: {
        576: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        992: { slidesPerView: 3 },
        1200: { slidesPerView: 3, spaceBetween: 25 }
      },
      autoplay: true,
      speed: 500,
      navigation: {
        nextEl: ".testimonial__slider-next",
        prevEl: ".testimonial__slider-prev",
      },
    });

    new Swiper('.testimonial__slider3', {
      spaceBetween: 24,
      grabCursor: true,
      loop: true,
      slidesPerView: 1,
      autoplay: true,
      speed: 500,
    });

    new Swiper('.roadmap__slider', {
      grabCursor: true,
      slidesPerView: 1,
      breakpoints: {
        576: { slidesPerView: 1, spaceBetween: 15 },
        768: { slidesPerView: 2, spaceBetween: 15 },
        992: { slidesPerView: 3, spaceBetween: 10 },
        1200: { slidesPerView: 4, spaceBetween: 10 },
        1400: { slidesPerView: 4, spaceBetween: 10 }
      },
      autoplay: true,
      speed: 500,
    });
    // =================== Swiper Initialization end ================== //

    // =================== Scroll Behavior ================== //
    new PureCounter();
    // =================== Scroll Behavior end ================== //

    // =================== RTL Icon Direction ================== //
    const htmlTag = document.querySelector('html');
    if (htmlTag && htmlTag.getAttribute('dir') === 'rtl') {
      const icons = document.querySelectorAll('i');
      icons.forEach((icon) => {
        if (icon.classList.contains("fa-arrow-right") || icon.classList.contains("fa-angle-right")) {
          icon.classList.remove("fa-arrow-right", "fa-angle-right");
          icon.classList.add("fa-arrow-left", "fa-angle-left");
        } else if (icon.classList.contains("fa-arrow-left") || icon.classList.contains("fa-angle-left")) {
          icon.classList.remove("fa-arrow-left", "fa-angle-left");
          icon.classList.add("fa-arrow-right", "fa-angle-right");
        }
      });
    }

    
    // =================== RTL Icon Direction end ================== //

  }, []);

  return null; // This component doesn't render anything
};

export default CustomScripts;
