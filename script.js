import Controller from './js/controller.js'

const selectCellsNumber = document.querySelector('.select-cells-number')

const game = new Controller(selectCellsNumber.value)

const timerContent = '<span>00</span>min <span>00</span>sec'
let prevGame

selectCellsNumber.addEventListener('change', (e) => {
  document.querySelector('.playground').innerHTML = ''

  game.stopTime()
  game.elements.timer.innerHTML = timerContent

  prevGame && prevGame.stopTime()
  prevGame && (prevGame.innerHTML = timerContent)

  const newGame = new Controller(e.target.value)

  prevGame = newGame
})
