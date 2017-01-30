'use strict'; // Режим полного соответствия современному стандарту ECMAScript 5 (ES5)

$(function () {
    // Создание ассоциативного массива для хранения формулы
    var formula = {};

    // При нажатии на клетку таблицы вызывается функция
    var cell = $("td");
    cell.click(function () { // При нажатии на ячейку
        // Добавляем химический элемент в формулу
        var el = $(this).find("div.title").text();
        // Если элемент уже есть в формуле
        if (el in formula) {
            formula[el]++; // Увеличиваем на 1
        } else {
            formula[el] = 1; // Пока только 1 такой элемент
        }
        // Собираем химическую формулу в HTML
        var html = "";
        for (var e in formula) {
            html += e;
            var count = formula[e]; // Количество
            if (count > 1) // Нижний индекс
                html += "<sub>" + count + "</sub>";
        }
        // Показываем формулу
        $("div#formula").html(html);
    });

    // Описание элемента внизу страницы
    var desc = $("div#description");

    cell.hover(function () { // Когда пользователь наводит курсор мыши на элемент (ячейку таблицы)
            // Текст на который надо заменить
            var newText = $(this).find("div.description").html();
            // Если описание для химического элемента не задано
            if (newText == undefined) {
                newText = "Напишите описание для элемента " +
                    $(this).find("div.name").html();
            }
            // Заменяем текст
            console.log("Показываем описание: " + newText);
            desc.html(newText);
            desc.show();
        },
        function () { // Когда пользователь убирает мышь с ячейки таблицы
            /* Выключаем описание */
            desc.hide();
        });
});