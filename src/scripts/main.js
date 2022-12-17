"use strict"
window.onload = function () {
    $('.slick-multiple').slick({
        // dots: true,

        speed: 300,
        cssEase: 'linear',
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
        responsive: [
            {
                breakpoint: 850,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 596,
                settings: {
                    slidesToShow: 1,
                }
            },

            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 1,
                    dots: true,
                    arrows: false
                }
            }
        ],
        prevArrow: '<svg class="prev" width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_3910_126)"><path d="M5.32935 9.47742L13.7908 0.176819C13.9865 -0.0384587 14.2551 -0.164517 14.547 -0.178062C14.8389 -0.191607 15.1179 -0.0909537 15.3323 0.105292L16.0152 0.729469C16.4596 1.13622 16.4912 1.82934 16.0858 2.27487L8.98048 10.085L16.7758 17.212C16.9903 17.4082 17.116 17.6772 17.1294 17.9697C17.1427 18.2625 17.042 18.5421 16.8463 18.7575L16.2232 19.4421C16.0273 19.6574 15.7589 19.7835 15.467 19.797C15.1751 19.8106 14.8961 19.7099 14.6817 19.5137L5.40013 11.0282C5.18513 10.8313 5.05964 10.561 5.04692 10.268C5.03285 9.97387 5.13319 9.6932 5.32935 9.47742Z"/></g><defs><clipPath id="clip0_3910_126"><rect width="19.9396" height="20" fill="white" transform="matrix(-1 0 -2.22607e-08 1 20.87 0)"/></clipPath></defs></svg>',
        nextArrow: '<svg class="next" width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_3910_132)"><path d="M15.6795 10.5226L7.21806 19.8232C7.02237 20.0385 6.75377 20.1645 6.46185 20.1781C6.16994 20.1916 5.89099 20.091 5.67651 19.8947L4.99363 19.2705C4.54925 18.8638 4.51762 18.1707 4.9231 17.7251L12.0284 9.91505L4.23305 2.78805C4.01857 2.5918 3.89282 2.32276 3.87947 2.03028C3.8661 1.73747 3.96682 1.45792 4.16251 1.24248L4.78565 0.557867C4.9815 0.342583 5.24994 0.216532 5.54186 0.202987C5.83377 0.189442 6.11272 0.290095 6.3272 0.48634L15.6087 8.97182C15.8237 9.16869 15.9492 9.43905 15.9619 9.73205C15.976 10.0261 15.8757 10.3068 15.6795 10.5226Z"/></g><defs><clipPath id="clip0_3910_132"><rect width="19.9396" height="20" fill="white" transform="matrix(1 0 2.22607e-08 -1 0.138916 20)"/></clipPath></defs></svg>',
    });
    new WOW({
        animateClass: 'animate__animated'
    }).init();

    $('#btn-timetable').on('click', () => {
        $('#popup-container').css('visibility', 'visible');
    });

    $('.popup-timetable .close').on('click', () => {
        $('#popup-container').css('visibility', 'hidden');
    })

    let myMap;

    // Дождёмся загрузки API и готовности DOM.
    ymaps.ready(init);

    function init() {
        myMap = new ymaps.Map('map', {
            center: [55.606114, 37.723015],
            controls: [],
            // autoFitToViewport: 'always',
            zoom: 17
        }, {
            searchControlProvider: 'yandex#search'
        });
        myMap.geoObjects
            .add(new ymaps.Placemark([55.606114, 37.723015], {
                balloonContent: 'улица Генерала Белова, 26',
                iconCaption: 'улица Генерала Белова, 26'
            }, {
                preset: 'islands#dotIcon',
                iconColor: 'rgb(94,93,93)'
            }))

    }

    $('#burger').on('click', () => {
        $('.menu').addClass('open');
    })

    $('.menu > *').on('click', () => {
        $('.menu').removeClass('open');
    })

    $('#record').on('click', ()=>{
        $('#contact')[0].scrollIntoView({behavior:"smooth"});
    })
    $('#look').on('click', ()=>{
        $('#service')[0].scrollIntoView({behavior:"smooth"});
    })

    let nameUser = $('#name');
    let phoneUser = $('#phone');

    $('#btn-record').on('click', () => {
        let hasError = false;
        $('.input-error').hide();
        $('.record-form input ').css('border-color', ' #F4DEFF');


        if (!nameUser.val().trim()) {
            nameUser.css('border-color', '#ff0000b8');
            nameUser.next().show();
            nameUser.next().next().css('margin-top', '10px');
            hasError = true;
        }

        if (!phoneUser.val().trim()) {
            phoneUser.css('border-color', '#ff0000b8');
            phoneUser.next().show();
            phoneUser.next().next().css('margin-top', '10px');
            hasError = true;
        }

        if (!hasError) {
            let loader = $('.loader');
            loader.css('display', 'flex');
            $.ajax({
                method: "POST",
                url: "https://testologia.site/checkout",
                data: {
                    name: nameUser.val(),
                    phone: phoneUser.val()
                }
            })
                .done(function (msg) {
                    loader.hide();
                    if (msg.success === 1) {
                        let recordForm = $('.record-form');
                        let heightOrder = recordForm.height();
                        recordForm.hide();
                        $('.record').append('<div id="order-success">Спасибо за заявку, мы свяжемся с вами в ближайшее время!</div>');
                        $('#order-success').css({
                            height: heightOrder,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontSize: '22px',
                            textAlign: 'center'
                        })
                    } else {
                        alert('Возникла ошибка при оформлении, позвоните нам и запишитсь на тренировку');
                    }
                })
        }


    })
}

