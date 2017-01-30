'use strict'; // Режим полного соответствия современному стандарту ECMAScript 5 (ES5)

// Игровое поле
var map = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']];

// Количество сделанных ходов
var moves = 0;

function showResult(message) {
    $("#result").text(message);
    $("#currentMove").hide();
}

function touch(row, col, cell) { // row - строка, col - столбец (колонка)
    // cell - клетка в интерфейсе (на странице)
    // Получаем текст из текущей клетки
    var cellUI = $(cell);
    var text = cellUI.text();
    if (text == "X" || text == "O") {
        // Не делаем ход и сразу выходим
        console.log("Клетка занята");
        return;
    }

    // Получаем кто сейчас ходит
    var playerUI = $("#player"); // Где хранится кто сейчас ходит
    var player = playerUI.text(); // Получаем текущего игрока
    console.log("Ходит: " + player + " " + row + " " + col);

    // Рисуем крестик или нолик
    cellUI.text(player);
    // Записываем этот ход в массив
    var r = row - 1;
    var c = col - 1;
    map[r][c] = player;
    moves++; // Сделали ход => увеличиваем их количество

    // Проверяем результат игры (выйгрыш)
    // Проверяем строчку
    if (map[r][0] == map[r][1] && map[r][1] == map[r][2]) {
        showResult("Выйграли: " + player); // Мы выйграли!
        return;
    }
    // Проверяем столбец
    if (map[0][c] == map[1][c] && map[1][c] == map[2][c]) {
        showResult("Выйграли: " + player); // Мы выйграли!
        return;
    }
    // Проверяем главную диагональ
    if (r == c) {
        if (map[0][0] == map[1][1] && map[1][1] == map[2][2]) {
            showResult("Выйграли: " + player); // Мы выйграли!
            return;
        }
    }
    // Проверяем дополнительную диагональ
    if (r == (2 - c)) {
        if (map[0][2] == map[1][1] && map[1][1] == map[2][0]) {
            showResult("Выйграли: " + player); // Мы выйграли!
            return;
        }
    }
    // Проверяем на ничью
    if (moves == 3 * 3) {
        showResult("Ничья");
        return;
    }

    // Меняем сторону, которая ходит
    if (player == "X") {
        player = "O";
    } else if (player == "O") {
        player = "X";
    }
    // Сохраняем кто ходит
    playerUI.text(player);
}

function newGame() {
    // Очистить поле на экране
    $("td").text("");
    // Очистить массив в памяти
    map = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']];
    // Обнулить ходы
    moves = 0;
    // Снова показать текущий ход
    $("#currentMove").show();
    // Задать что ходят крестики
    $("#player").text("X");
}