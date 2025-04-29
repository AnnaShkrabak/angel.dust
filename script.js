document.addEventListener('DOMContentLoaded', () => {
const block = document.getElementById('im8');
let x = 0;
let y = 0;
let dx = 2;
let dy = 2;
let angle = 0;

const text = "СПАСИБО\u00A0ЗА\u00A0ПРОСМОТР!";
const footer = document.getElementById("footerText");
const foot = document.getElementById("foot");
const textContainer = document.getElementById("text");
const character = document.getElementById("character");
const bodies = document.getElementById("bodies");

let index = 0;
let isTyping = false;
let stepToggle = false;
let stepInterval;

let targetX = 0;
let currentX = 0;
let currentRotation = 0;

function startWalkingAnimation() {
  stepInterval = setInterval(() => {
    stepToggle = !stepToggle;
    character.style.backgroundImage = stepToggle ? 'url("a1.png")' : 'url("a2.png")';
    currentRotation = stepToggle ? -5 : 5;
  }, 300);
}

function stopWalkingAnimation() {
  clearInterval(stepInterval);
  character.style.backgroundImage = 'url("a0.png")';
  currentRotation = 0;
  targetX = -180; // плавно уходит влево
}

function typeWriter() {
  if (index === 0) startWalkingAnimation();

  if (index < text.length) {
    const span = document.createElement("span");
    span.textContent = text.charAt(index);
    span.style.opacity = 0;
    span.style.display = "inline-block";
    span.style.transition = "opacity 0.4s ease, transform 0.4s ease";
    span.style.transform = "translateY(5px)";
    textContainer.appendChild(span);

    requestAnimationFrame(() => {
      span.style.opacity = 1;
      span.style.transform = "translateY(0)";
    });

    index++;
    targetX = textContainer.offsetWidth + 50;
    setTimeout(typeWriter, 150);
  } else {
    stopWalkingAnimation();
    setTimeout(() => {
      isTyping = false;
    }, 500);
  }
}

function smoothCharacterFollowText() {
  function animate() {
    if (isTyping) {
      currentX += (targetX - currentX) * 0.1;
    }
    // Плавное перемещение и поворот
    character.style.transform = `translate(${currentX}px, 0) rotate(${currentRotation}deg)`;
    requestAnimationFrame(animate);
  }
  animate();
}

smoothCharacterFollowText();

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


window.addEventListener("scroll", () => {
  if (window.scrollY > 3300) {
      foot.style.opacity = 1;
      bodies.style.backdropFilter = "blur(50px)";
      if (!isTyping) { 
        isTyping = true;
        index = 0; // Сбрасываем индекс
        textContainer.innerHTML = ""; // Очищаем текст
        typeWriter();
    }
  } else {
    textContainer.innerHTML = ""; // Очищаем текст
    bodies.style.backdropFilter = "blur(5px)";
    foot.style.opacity = 0;
  }
});


});