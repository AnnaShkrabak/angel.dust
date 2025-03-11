document.addEventListener('DOMContentLoaded', () => {
const block = document.getElementById('im8');
let x = 0;
let y = 0;
let dx = 2;
let dy = 2;
let angle = 0; // Угол поворота
const text = "СПАСИБО  ЗА   ПРОСМОТР!";
const footer = document.getElementById("footerText");
let index = 0;
const bodies = document.getElementById("bodies");

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

const scrollToTopBtn = document.getElementById('scrollToTopBtn');

// Показываем кнопку при прокрутке вниз
window.addEventListener('scroll', () => {
    if (window.scrollY > 1500) { // Если прокручено более 200px
        scrollToTopBtn.style.display = 'block';
        scrollToTopBtn.classList.remove('hidden');
    } else {
        scrollToTopBtn.classList.add('hidden');
        setTimeout(() => scrollToTopBtn.style.display = 'none', 300); // Задержка для плавного скрытия
    }
});

// Обработчик клика по кнопке
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Плавная прокрутка
    });
});


function typeWriter() {
  if (index < text.length) {
      footer.innerHTML += text.charAt(index);
      index++;
      setTimeout(typeWriter, 50);
  }
}

window.addEventListener("scroll", () => {
  if (window.scrollY > 3200) {
      footer.style.opacity = 1;
      bodies.style.backdropFilter = "blur(50px)";
      if (index === 0) {
          typeWriter();
      }
  } else {
    bodies.style.backdropFilter = "blur(5px)";
  }
});


});