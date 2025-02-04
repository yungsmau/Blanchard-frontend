// dropdown
const params = {
  btnClassName: "js-header-dropdown-btn",
  dropClassName: "js-header-drop",
  activeClassName: "is-active",
  disabledClassName: "is-disabled"
};

function onDisable(evt) {
  if (evt.target.classList.contains(params.disabledClassName)) {
    evt.target.classList.remove(
      params.disabledClassName,
      params.activeClassName
    );
    evt.target.removeEventListener("animationend", onDisable);
  }
}

function setMenuListener() {
  document.body.addEventListener("click", (evt) => {
    const activeElements = document.querySelectorAll(
      `.${params.btnClassName}.${params.activeClassName}, .${params.dropClassName}.${params.activeClassName}`
    );

    if (
      activeElements.length &&
      !evt.target.closest(`.${params.activeClassName}`)
    ) {
      activeElements.forEach((current) => {
        if (current.classList.contains(params.btnClassName)) {
          current.classList.remove(params.activeClassName);
        } else {
          current.classList.add(params.disabledClassName);
        }
      });
    }

    if (evt.target.closest(`.${params.btnClassName}`)) {
      const btn = evt.target.closest(`.${params.btnClassName}`);
      const path = btn.dataset.path;
      const drop = document.querySelector(
        `.${params.dropClassName}[data-target="${path}"]`
      );

      btn.classList.toggle(params.activeClassName);

      if (!drop.classList.contains(params.activeClassName)) {
        drop.classList.add(params.activeClassName);
        drop.addEventListener("animationend", onDisable);
      } else {
        drop.classList.add(params.disabledClassName);
      }
    }
  });
}

setMenuListener();



// hero-swiper
const heroSwiper = new Swiper('.js-hero-swiper', {
  allowTouchMove: false,
  loop: true,
  effect: 'fade',
  speed: 10000,
  autoplay: {
    delay: 100
  }
});



// galary-select
const element = document.querySelector('#selectCustom');
const choices = new Choices(element, {
  searchEnabled: false,
  itemSelectText: " "
});



// galary-swiper
document.addEventListener("DOMContentLoaded", () => {
  let gallerySlider = new Swiper(".slides-container", {

    grid: {
      rows: 1,
      fill: "row"
    },

    pagination: {
      el: ".galary-pagination",
      type: "fraction",
    },

    navigation: {
      nextEl: ".galary-next",
      prevEl: ".galary-prev"
    },

    breakpoints: {
      320: {
        slidesPerView: 1,
        slidesPerGroup: 1,
      },

      768: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 38,
      },

      1024: {
        slidesPerView: 2,
        spaceBetween: 34,
        slidesPerGroup: 2,
      },

      1280: {
        slidesPerView: 3,
        spaceBetween: 34,
        slidesPerGroup: 3,
      },

      1600: {
        slidesPerView: 3,
        spaceBetween: 50,
        slidesPerGroup: 3,
      },
    },

    a11y: false,
    keyboard: {
      enabled: true,
      onlyInViewport: true
    }, // можно управлять с клавиатуры стрелками влево/вправо

    // Дальнейшие надстройки делают слайды вне области видимости не фокусируемыми
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    slideVisibleClass: "slide-visible",

    on: {
      init: function () {
        this.slides.forEach((slide) => {
          if (!slide.classList.contains("slide-visible")) {
            slide.tabIndex = "-1";
          } else {
            slide.tabIndex = "";
          }
        });
      },
      slideChange: function () {
        this.slides.forEach((slide) => {
          if (!slide.classList.contains("slide-visible")) {
            slide.tabIndex = "-1";
          } else {
            slide.tabIndex = "";
          }
        });
      }
    },

    on: {
      /* исправляет баг с margin-top остающимся при смене брейкпоинта, это было нужно в 6-й версии свайпера */
      beforeResize: function () {
        this.slides.forEach((el) => {
          el.style.marginTop = "";
        });
      }
    }
  });
});



// accordion
(() => {
  new Accordion(".js-accordion-container", {
    openOnInit: [0]
  });
})();


// tabs
const tabs = {
  tabsClass: "js-tab-btn",
  wrap: "js-tabs-wrap",
  content: "js-tab-content",
  active: "active"
};

function setTabs(tabs) {
  const tabBtns = document.querySelectorAll(`.${tabs.tabsClass}`);

  function onTabClick(e) {
    e.preventDefault();
    const path = this.dataset.path;
    const wrap = this.closest(`.${tabs.wrap}`);
    const currentContent = wrap.querySelector(`.${tabs.content}[data-target="${path}"]`);
    const contents = wrap.querySelectorAll(`.${tabs.content}`);

    contents.forEach((el) => {
      el.classList.remove(tabs.active);
    });

    currentContent.classList.add(tabs.active);

    tabBtns.forEach((el) => {
      el.classList.remove(tabs.active);
    });

    this.classList.add(tabs.active);
  }

  tabBtns.forEach(function (el) {
    el.addEventListener("click", onTabClick);
  });
}

setTabs(tabs);



// map
ymaps.ready(init);
function init() {
  var myMap = new ymaps.Map("map", {
    center: [55.758468, 37.601088],
    zoom: 14,
    controls: ['geolocationControl', 'zoomControl']
  },
    {
      suppressMapOpenBlock: true,
      geolocationControlSize: "large",
      geolocationControlPosition: { top: "420px", right: "20px" },
      geolocationControlFloat: 'none',
      zoomControlSize: "small",
      zoomControlFloat: "none",
      zoomControlPosition: { top: "320px", right: "20px" }
    }
  );

  myMap.behaviors.disable('scrollZoom');

  var myPlacemark = new ymaps.Placemark([55.758468, 37.601088], {}, {
    iconLayout: 'default#image',
    iconImageHref: 'img/Placemark.svg',
    iconImageSize: [25, 25],
    iconImageOffset: [-1, -30]
  });

  myMap.geoObjects.add(myPlacemark)
}



// developments-swiper
const developmentsSwiper = new Swiper('.js-developments-slider', {
  // Optional parameters
  direction: 'horizontal',
  loop: false,


  breakpoints: {
    320: {
      slidesPerGroup: 1,
      slidesPerView: 1,
      spaceBetween: 15,
    },

    650: {
      slidesPerGroup: 2,
      slidesPerView: 2,
      spaceBetween: 34,
    },

    1024: {
      slidesPerGroup: 2,
      slidesPerView: 3,
      spaceBetween: 27,
    },

    1440: {
      slidesPerView: 3,
      spaceBetween: 50,
    },
  },

  // Navigation arrows
  navigation: {
    nextEl: '.js-developments-button-next',
    prevEl: '.js-developments-button-prev',
  },

  pagination: {
    el: ".developments-pagination",
    type: "bullets",
    clickable: true,
  },
});



// projects-swiper
const projectsSwiper = new Swiper('.js-projects-slider', {
  slidesPerView: 1,
  direction: 'horizontal',
  loop: false,
  grid: {
    rows: 1,
    fill: "row"
  },

  spaceBetween: 20,
  navigation: {
    nextEl: '.js-projects-button-next',
    prevEl: '.js-projects-button-prev',
  },

  breakpoints: {
    320: {
      slidesPerView: 1,
      slidesPerGroup: 1
    },

    550: {
      slidesPerView: 2,
      spaceBetween: 34
    },

    1100: {
      slidesPerView: 2,
      spaceBetween: 50
    },

    1101: {
      slidesPerView: 3,
      spaceBetween: 50
    }
  },
});



// mask
var selector = document.querySelector("input[type='tel']");
var im = new Inputmask("+7 (999)-999-99-99");

im.mask(selector);



// validate
const validation = new window.JustValidate('#form',
  {
    errorLabelCssClass: 'is-label-invalid',
    errorLabelStyle: {
      color: '#D11616',
    },
    errorFieldCssClass: 'is-invalid',
  }
);

validation
  .addField('#name', [
    {
      rule: 'minLength',
      value: 2,
      errorMessage: 'Вы не ввели имя.'
    },
    {
      rule: 'maxLength',
      value: 30,
    },
    {
      rule: 'required',
      errorMessage: 'Вы не ввели имя.'
    },
  ])
  .addField('#tel', [
    {
      rule: 'required',
      errorMessage: 'Вы не ввели телефон.',
      function: (name, value) => {
        const phone = selector.inputmask.unmaskedvalue()
        return Number(phone) && phone.length === 10
      }
    }
  ]);


// burger
let burger = document.querySelector('.header__burger');
let menu = document.querySelector('.header__nav');
let menuLinks = document.querySelectorAll('.header__items__top');

burger.addEventListener('click',

  function () {

    burger.classList.toggle('header__burger--active');

    menu.classList.toggle('header__nav--active');
  })
menuLinks.forEach(function (el) {
  el.addEventListener('click', function () {

    burger.classList.remove('header__burger--active');

    menu.classList.remove('header__nav--active');
  })
});


// search
let search = document.querySelector('.header__search-btn');
let searchForm = document.querySelector('.header__search-form');
let searchClose = document.querySelectorAll('.header__search-close-btn')

search.addEventListener('click',

  function () {
    this.disabled = true;
    search.classList.add('header__search-btn--hidden');

    searchForm.classList.toggle('header__search-form--active');
  })

searchClose.forEach(function (el) {
  el.addEventListener('click', function () {
    search.disabled = false;

    search.classList.remove('header__search-btn--hidden');

    searchForm.classList.remove('header__search-form--active');
  })
});


$(document).ready(function () {

  $(".header__search-move, .header__search-close-btn").click(function () {
    $(".header__burger, .header__logo").toggleClass("hidden");
  });
});


// tooltip
(() => {
  tippy(".js-tooltip-btn", {
    content: 'My tooltip!',
    theme: 'tooltip-theme',
  });
})();
