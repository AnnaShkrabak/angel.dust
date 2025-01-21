const block = document.getElementById('im8');
let x = 0;
let y = 0;
let dx = 2;
let dy = 2;
let angle = 0; // Угол поворота

function moveBlock() {
  const screenWidth = window.innerWidth -100;
  const screenHeight = window.innerHeight -100;

  if (screenWidth >= 1200) {
    // Изменение позиции блока
    x += dx;
    y += dy;

    // Проверка на столкновение с границами окна
    if (x + block.offsetWidth > screenWidth || x < 0) {
      dx *= -1; // Меняем направление по X
    }

    if (y + block.offsetHeight > screenHeight || y < 0) {
      dy *= -1; // Меняем направление по Y
    }

    // Применение новых координат
    block.style.left = `${x}px`;
    block.style.top = `${y}px`;
  } else {
    // Если экран меньше 1200px — фиксируем блок в углу
    x = 20;
    y = 20;
    block.style.left = `${x}px`;
    block.style.top = `${y}px`;
  }

  // Вращение блока
  angle += 2; // Увеличиваем угол
  block.style.transform = `rotate(${angle}deg)`;

  requestAnimationFrame(moveBlock); // Запускаем анимацию
}

// Инициализация начальной позиции
block.style.left = '0px';
block.style.top = '0px';

// Запуск анимации
moveBlock();