"use strict"

// Проверка загружена ли страница полностью
document.addEventListener('DOMContentLoaded', function () {

    // Перехват отправки формы по нажатию кнопки
    const form = document.getElementById('form_2');
    console.log(form);

    // При отправле формы переходим в функцию formSend
    form.addEventListener('submit', formSend);

    async function formSend(e) {
        // Отменяем стандартную отправку формы
        e.preventDefault();

        // Проверка на заполнение полей формы
        let error = formValidate(form);

        let formData = new FormData(form);
        // formData.append('image', formImage.files[0]);

        if (error === 0) {
            console.log("Проверка пройдена");
            form.classList.add('_sending');
            // =====================================================================================================
            // Отправка формы в PHP

            let response = await fetch('sendmail.php', {
                method: 'POST',
                body: formData
            });

            // Проверка на отправку формы (ответ с PHP)



            if (response.ok) {
                alert('Запрос отправлено!');
                formPreview.innerHTML = '';
                form.reset();
                form.classList.remove('_sending');
            } else {
                alert('Ошибка отправки формы');
                form.classList.remove('_sending');
            }
            // =====================================================================================================
        } else {
            alert("Заполните обязательные поля");
        }



    }

    // Проверка на заполнение полей формы
    function formValidate(form) {
        let error = 0;

        let formReq = document.querySelectorAll('._req');

        for (let index = 0; index < formReq.length; index++) {
            const input = formReq[index];
            formRemoveError(input);
            if (input.classList.contains('_email')) {
                if (emailTest(input)) {
                    formAddError(input);
                    error++;
                }
            } else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
                formAddError(input);
                error++;
            } else {
                if (input.value === '') {
                    formAddError(input);
                    error++;
                }
            }
        }
        return error;
    }

    function formAddError(input) {
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
    }
    function formRemoveError(input) {
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    }
    //Функция на проверку валидности E-mail
    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }

    // Вывод фотографии при выборе
    const formImage = document.getElementById('formImage');
    const formPreview = document.getElementById('formPreview');

    // formImage.addEventListener('change', () => {
    //     uploadFile(formImage.files[0]);
    // });
    function uploadFile(file) {
        // Проверяем тип файла
        if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
            alert('Разрешены зображения jpeg, png, gif');
            formImage.value = '';
            return;
        }
        // Проверяем размер файла (<2мб)
        if (file.size > 2 * 1024 * 1024) {
            alert('Файл должен быть меньше 2 МБ');
            return;
        }
        // Вывод выбранного изображения
        var reader = new FileReader();
        reader.onload = function (e) {
            formPreview.innerHTML = `<img src="${e.target.result}" alt="Фото">`;
        };
        reader.onerror = function (e) {
            alert('Ошибка');
        };
        reader.readAsDataURL(file);
    }


    const body = document.querySelectorAll('body');
    body.forEach(function tab(item, index, array) {
        item.addEventListener("click", function (e) {
            if (e.target.classList.contains('form__input')) {
                e.target.setAttribute('placeholder', '');
            }

        });
    });
});




