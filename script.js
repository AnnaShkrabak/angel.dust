const block = document.getElementById('im8');
let x = 0; 
let y = 0; 
let dx = 2; 
let dy = 2; 
  const screenWidth = window.innerWidth - 80;
  const screenHeight = window.innerHeight - 50;

function moveBlock() {

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

  requestAnimationFrame(moveBlock); // Запускаем анимацию
}

// Запуск анимации
moveBlock();