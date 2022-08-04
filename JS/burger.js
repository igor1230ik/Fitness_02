"use strict"



//  Проверка на пользование с мобильного устройства
const isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.iOS() ||
            isMobile.Opera() ||
            isMobile.Windows());
    }
};

// Если использование с мобильного добавляем BODY класс _touch!!!
if (isMobile.any()) {
    document.body.classList.add('_touch');

    let menuArrows = document.querySelectorAll('.menu__arrow');
    if (menuArrows.length > 0) {
        menuArrows.forEach(function (item, index, array) {
            const menuArrow = menuArrows[index];
            menuArrow.addEventListener('click', function (e) {
                menuArrow.parentElement.classList.toggle('_active');
            });
        });
    }
} else {
    // Если использование с компьютера добавляем BODY класс _pc!!!!!
    document.body.classList.add('_pc');
}


// Плавная прокрутка с нужному разделу

const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
if (menuLinks.length > 0) {
    menuLinks.forEach(menuLink => {
        menuLink.addEventListener('click', onMenuLinkClick);
    });

    function onMenuLinkClick(e) {
        const menuLink = e.target;

        // Проверка на существовании атрибута и существование класса указанного в дата-атрибуте
        if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;



            // При нажатии в меню ссылки меню закроется и прокрутится к указанной позиции
            if (iconMenu.classList.contains('_active')) {
                document.body.classList.remove('_block');
                iconMenu.classList.remove('_active');
                menuBody.classList.remove('_active');
            }

            // прокрутка на нужную позицию
            window.scrollTo({
                top: gotoBlockValue,
                behavior: "smooth",
            });
            e.preventDefault();
        }
    }
}


// Меню бургер ===================================================================
const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');

if (iconMenu) {
    iconMenu.addEventListener("click", function (e) {
        document.body.classList.toggle('_block');
        iconMenu.classList.toggle('_active');
        menuBody.classList.toggle('_active');
    });
}


// Скрытие меню при нажатии на пустое место
menuBody.addEventListener('click', lockMenu);
function lockMenu() {
    if (iconMenu.classList.contains('_active')) {
        document.body.classList.remove('_block');
        iconMenu.classList.remove('_active');
        menuBody.classList.remove('_active');
    }
}
