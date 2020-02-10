const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext("2d");
const scale = 5;
const rows = canvas.height / scale;
const columns = canvas.width / scale;
const numberOfCells = rows * columns;

const counter = document.querySelector('.counter');
let numberOfGenerations = 0;

const reset = document.querySelector('.reset');

const board = new Board();

const count = () => {
  numberOfGenerations++;
  counter.innerHTML = numberOfGenerations;
};

reset.addEventListener('click', () => {
  board.populateNextGeneration();
  numberOfGenerations = 0;
  board.reset();
  board.populate();
});

board.populate();

setInterval(() => {
  board.populateNextGeneration();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  board.update();
  count();
}, 100);