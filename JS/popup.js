"use strict"


const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');
const popupLinks = document.querySelectorAll('.popup-link');
const popupCloseIcon = document.querySelectorAll(".close-popup");


// Для предотвращения двойніх нажатий в дальнейшем
let unlock = true;

const timeout = 800;


// Открытие попапа

if (popupLinks.length > 0) {
    for (let index = 0; index < popupLinks.length; index++) {
        const popupLink = popupLinks[index];
        popupLink.addEventListener('click', function (e) {
            // Убираем у аттрибута href  символ "#"
            const popupName = popupLink.getAttribute('href').replace('#', '');
            // получаеи попап
            const curentPopup = document.getElementById(popupName);
            popupOpen(curentPopup);
            e.preventDefault();
        });
    }
}

// Закрытие попапа

if (popupCloseIcon.length > 0) {
    for (let index = 0; index < popupCloseIcon.length; index++) {
        const el = popupCloseIcon[index];
        el.addEventListener("click", function (e) {
            popupClose(el.closest(".popup"));
            e.preventDefault();
        });
    }
}

// Открытие попапа в попапе
function popupOpen(curentPopup) {
    if (curentPopup && unlock) {
        const popupActive = document.querySelector('.popup.open');
        if (popupActive) {
            popupClose(popupActive, false);
        } else {
            bodyLock();
        }
        curentPopup.classList.add('open');
        curentPopup.addEventListener('click', function (e) {
            if (!e.target.closest('.popup__content')) {
                popupClose(e.target.closest('.popup'));
            }
        });
    }
}

function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
        popupActive.classList.remove('open');
        if (doUnlock) {
            bodyLock();
        }
    }
}

function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector(".wrapper").offsetWidth + 'px';
    if (lockPadding.length > 0) {
        for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = lockPaddingValue;
        }
    }

    body.style.paddingRight = lockPaddingValue;
    body.classList.toggle('lock');

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }), timeout;
}



function bodyUnLock() {
    setTimeout(function () {
        if (lockPadding.length > 0) {
            for (let index = 0; index < lockPadding.length; index++) {
                const el = lockPadding[index];
                el.style.paddingRight = '0px';
            }
        }
        body.style.paddingRight = "0px";
        body.classList.remove('lock');
    }), timeout;

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }), timeout;
}

document.addEventListener('keydown', function (e) {
    if (e.which === 27) {
        const popupActive = document.querySelector('.popup.open');
        popupClose(popupActive);
    }
});


// Полифилы
(function () {
    if (!Element.prototype.closest) {
        Element.prototype.closest = function (css) {
            var node = this;
            while (node) {
                if (node.matches(css)) return node;
                else node = node.parentElement;
            }
            return null;
        };
    }
})();

(function () {
    if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.matchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.matchesSelector;
    }
})();



