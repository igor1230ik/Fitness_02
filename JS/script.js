"use strict"

$(document).ready(function () {
    $('.customes-slider').slick({
        arrows: false,
        dots: true,
        speed: 1000,
        slidesToShow: 1,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 4000,
        pauseOnFocus: false,
        pauseOnHover: false,
        pauseOnDotsHover: true,

    });

});

