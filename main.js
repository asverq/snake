//create field
let field = document.createElement('div');
document.body.appendChild(field);
field.classList.add('field');

for (let i = 1; i < 281; i++) {
  let excel = document.createElement('div');
  field.appendChild(excel);
  excel.classList.add('excel');
}


//fill the field with cells
let excel = document.getElementsByClassName('excel');

let x = 1;
let y = 14;

for (let i = 0; i < excel.length; i++) {
  if (x > 20) {
    x = 1;
    y--;
  }
  excel[i].setAttribute('posX', x);
  excel[i].setAttribute('posY', y);
  x++;
}


//generete snake
const generateSnake = () => {
  let posX = Math.round(Math.random() * (20 - 3) + 3);
  let posY = Math.round(Math.random() * (14 - 1) + 1);
  return [posX, posY];
}

let coordinates = generateSnake();
let snakeBody = [document.querySelector(`[posX = "${coordinates[0]}"][posY = "${coordinates[1]}"]`),
  document.querySelector(`[posX = "${coordinates[0] - 1}"][posY = "${coordinates[1]}"]`),
  document.querySelector(`[posX = "${coordinates[0] - 2}"][posY = "${coordinates[1]}"]`)
];

for (let i = 0; i < snakeBody.length; i++) {
  snakeBody[i].classList.add('snakeBody');
}

snakeBody[0].classList.add('head');


//generate planet
let mouse;

const createMouse = () => {
  const generateMouse = () => {
    let posX = Math.round(Math.random() * (20 - 3) + 3);
    let posY = Math.round(Math.random() * (14 - 1) + 1);
    return [posX, posY];
  }

  let mouseCoordinates = generateMouse();
  mouse = document.querySelector(`[posX = "${mouseCoordinates[0]}"][posY = "${mouseCoordinates[1]}"]`);

  while (mouse.classList.contains('snakeBody') ||
    mouse.getAttribute('posX') == snakeBody[0].getAttribute('posX') &&
    mouse.getAttribute('posY') == snakeBody[0].getAttribute('posY') ||
    mouse.getAttribute('posX') + 1 == snakeBody[0].getAttribute('posX') &&
    mouse.getAttribute('posY') + 1 == snakeBody[0].getAttribute('posY') ||
    mouse.getAttribute('posX') - 1 == snakeBody[0].getAttribute('posX') &&
    mouse.getAttribute('posY') - 1 == snakeBody[0].getAttribute('posY')) {
    mouseCoordinates = generateMouse();
    mouse = document.querySelector(`[posX = "${mouseCoordinates[0]}"][posY = "${mouseCoordinates[1]}"]`);
  }
  mouse.classList.add('mouse');
}

createMouse();


//set snake direction
let direction = 'right';
let steps = false;


//score area
let input = document.createElement('input');
document.body.appendChild(input);
input.setAttribute('readonly', 'readonly');
input.style.cssText = `
margin: auto;
margin-top: 40px;
padding-left: 10px;
font-size: 30px;
display: block;
`;

let score = 0;
input.value = `Вы слопали планет: ${score}`;


//move function
const move = () => {
  let snakeCoordinates = [snakeBody[0].getAttribute('posX'), snakeBody[0].getAttribute('posY')];
  snakeBody[0].classList.remove('head');
  snakeBody[snakeBody.length - 1].classList.remove('snakeBody');
  snakeBody.pop();

  if (direction == 'right') {
    if (snakeCoordinates[0] < 20) {
      snakeBody.unshift(document.querySelector(`[posX = "${+snakeCoordinates[0] + 1}"][posY = "${snakeCoordinates[1]}"]`));
    } else {
      snakeBody.unshift(document.querySelector(`[posX = "1"][posY = "${snakeCoordinates[1]}"]`));
    }
  } else if (direction == 'left') {
    if (snakeCoordinates[0] > 1) {
      snakeBody.unshift(document.querySelector(`[posX = "${+snakeCoordinates[0] - 1}"][posY = "${snakeCoordinates[1]}"]`));
    } else {
      snakeBody.unshift(document.querySelector(`[posX = "20"][posY = "${snakeCoordinates[1]}"]`));
    }
  } else if (direction == 'up') {
    if (snakeCoordinates[1] < 14) {
      snakeBody.unshift(document.querySelector(`[posX = "${snakeCoordinates[0]}"][posY = "${+snakeCoordinates[1] + 1}"]`));
    } else {
      snakeBody.unshift(document.querySelector(`[posX = "${snakeCoordinates[0]}"][posY = "1"]`));
    }
  } else if (direction == 'down') {
    if (snakeCoordinates[1] > 1) {
      snakeBody.unshift(document.querySelector(`[posX = "${snakeCoordinates[0]}"][posY = "${snakeCoordinates[1] - 1}"]`));
    } else {
      snakeBody.unshift(document.querySelector(`[posX = "${snakeCoordinates[0]}"][posY = "14"]`));
    }
  }

  //check eating planets
  if (snakeBody[0].getAttribute('posX') == mouse.getAttribute('posX') &&
    snakeBody[0].getAttribute('posY') == mouse.getAttribute('posY')) {
    mouse.classList.remove('mouse');
    mouse.classList.remove('mouse');
    let a = snakeBody[snakeBody.length - 1].getAttribute('posX');
    let b = snakeBody[snakeBody.length - 1].getAttribute('posY');
    snakeBody.push(document.querySelector(`[posX = "${a}"][posY = "${b}"]`));
    createMouse();
    score++;
    input.value = `Вы слопали планет: ${score}`;
  }

  //check eating self
  if (snakeBody[0].classList.contains('snakeBody')) {
    setTimeout(() => {
      alert('Игра окончена!');
    }, 200);

    clearInterval(interval);
    //snakeBody[0].style.backgrond = 'url()';
  }

  snakeBody[0].classList.add('head');
  for (let i = 0; i < snakeBody.length; i++) {
    snakeBody[i].classList.add('snakeBody');
  }

  steps = true;
}

let interval = setInterval(move, 200);


//event listener
window.addEventListener('keydown', function (e) {

  if (steps == true) {
    if (e.keyCode == 37 && direction != 'right') {
      e.preventDefault();
      direction = 'left';
      steps = false;
    } else if (e.keyCode == 38 && direction != 'down') {
      e.preventDefault();
      direction = 'up';
      steps = false;
    } else if (e.keyCode == 39 && direction != 'left') {
      e.preventDefault();
      direction = 'right';
      steps = false;
    } else if (e.keyCode == 40 && direction != 'up') {
      e.preventDefault();
      direction = 'down';
      steps = false;
    }
  }

});