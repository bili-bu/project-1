function main() {

  // Imported items from index.html
  const start = document.querySelector('.start')
  const gameboard = document.querySelector('.gameboard')
  const startButton = document.querySelector('.play')
  const audio = document.querySelector('#audio')
  const gameover = document.querySelector('.gameover')
  const restartButton = document.querySelector('.restart')
  const livesText = document.querySelector('.lives')
  const pointsText = document.querySelector('.points')

  // Start screen set up 
  startButton.addEventListener('click', () => {
    gameboard.style.display = 'flex'
    start.style.display = 'none'
    audio.src = 'music/Super Mario Bros. medley.mp3' 
    audio.play()
  })

  // Grid items to construct the JS grid
  const width = 9
  const gridCellCount = width * width
  const grid = document.querySelector('.grid')
  const cells = []

  let lives = 3
  let points = 0
  let functionCalled = 0

  // Items on the grid
  const homeIndex = [2, 4, 6]
  const DKIndex = [54, 57, 60]
  const marioIndex = [53, 50, 47]
  const mushroomIndex = [27, 30, 33]
  const finnIndex = [26, 23, 20]

  let princess = 76
  let intervalTime = 1000

  // Construction of the grid and placing items in cell lomushroomions at the beginning of the game
  for (let i = 0; i < gridCellCount; i++) {
    const cell = document.createElement('div')
    cell.classList.add('cell')
    if (i === princess) {
      cell.classList.add('princess')
    }
    if (i === homeIndex[0] || i === homeIndex[1] || i === homeIndex[2]) {
      cell.classList.add('home')
    }
    if (i === DKIndex[0] || i === DKIndex[1] || i === DKIndex[2]) {
      cell.classList.add('DK')
    }
    if (i === marioIndex[0] || i === marioIndex[1] || i === marioIndex[2]) {
      cell.classList.add('mario')
    }
    if (i === mushroomIndex[0] || i === mushroomIndex[1] || i === mushroomIndex[2]) {
      cell.classList.add('mushroom')
    }
    if (i === finnIndex[0] || i === finnIndex[1] || i === finnIndex[2]) {
      cell.classList.add('finn')
    }
    grid.appendChild(cell)
    cells.push(cell)
  }

  // Movement for the key character
  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
      if (princess === cells.length - 1) {
        return
      }
      cells[princess].classList.remove('princess')
      princess += 1
      cells[princess].classList.add('princess')
    } else if (event.key === 'ArrowLeft') {
      if (princess === 0) {
        return
      }
      cells[princess].classList.remove('princess')
      princess -= 1
      cells[princess].classList.add('princess')
    } else if (event.key === 'ArrowUp') {
      if (princess < width) {
        return
      }
      cells[princess].classList.remove('princess')
      princess -= width
      cells[princess].classList.add('princess')
    } else if (event.key === 'ArrowDown') {
      if (princess > cells.length - width - 1) {
        return
      }
      cells[princess].classList.remove('princess')
      princess += width
      cells[princess].classList.add('princess')
    }
    if (cells[princess].classList.contains('DK') || cells[princess].classList.contains('mario') || cells[princess].classList.contains('mushroom') || cells[princess].classList.contains('finn')) {
      cells[princess].classList.remove('princess')
      princess = 76
      cells[76].classList.add('princess')
      lives -= 1
      livesText.innerHTML = `${lives}`
      gameOver()
    }
    if (cells[princess].classList.contains('home')) {
      getHome()
    }
  })

  // Loops for the moving obstacles
  const DKInterval = function () {
    setInterval(() => {
      for (let i = 0; i < DKIndex.length; i++) {
        if (DKIndex[i] > 53 && DKIndex[i] <= 62) {
          if (DKIndex[i] === 62) {
            cells[62].classList.remove('DK')
            DKIndex[i] -= (width)
            cells[DKIndex[i]].classList.add('DK')
          } else {
            if (cells[DKIndex[i] + 1].classList.contains('princess')) {
              cells[DKIndex[i] + 1].classList.remove('princess')
              princess = 76
              cells[76].classList.add('princess')
              lives -= 1
              livesText.innerHTML = `${lives}`
              gameOver()
            }
          }
          cells[DKIndex[i]].classList.add('DK')
          cells[DKIndex[i]].classList.remove('DK')
          DKIndex[i] += 1
          cells[DKIndex[i]].classList.add('DK')
        }
      }
    }, intervalTime)
  }

  DKInterval()

  const marioInterval = function () {
    setInterval(() => {
      for (let i = 0; i < marioIndex.length; i++) {
        if (marioIndex[i] >= 45 && marioIndex[i] < 54) {
          if (marioIndex[i] === 45) {
            cells[45].classList.remove('mario')
            marioIndex[i] += (width)
            cells[marioIndex[i]].classList.add('mario')
          } else {
            if (cells[marioIndex[i] - 1].classList.contains('princess')) {
              cells[marioIndex[i] - 1].classList.remove('princess')
              princess = 76
              cells[76].classList.add('princess')
              lives -= 1
              livesText.innerHTML = `${lives}`
              gameOver
            }
          }
          cells[marioIndex[i]].classList.remove('mario')
          marioIndex[i] -= 1
          cells[marioIndex[i]].classList.add('mario')
        }
      }
    }, intervalTime)
  }

  marioInterval()

  const mushroomInterval = function () {
    setInterval(() => {
      for (let i = 0; i < mushroomIndex.length; i++) {
        if (mushroomIndex[i] > 26 && mushroomIndex[i] <= 35) {
          if (mushroomIndex[i] === 35) {
            cells[35].classList.remove('mushroom')
            mushroomIndex[i] -= (width)
            cells[mushroomIndex[i]].classList.add('mushroom')
          } else {
            if (cells[mushroomIndex[i] + 1].classList.contains('princess')) {
              cells[mushroomIndex[i] + 1].classList.remove('princess')
              princess = 76
              cells[76].classList.add('princess')
              lives -= 1
              livesText.innerHTML = `${lives}`
              gameOver()
            }
          }
          cells[mushroomIndex[i]].classList.add('mushroom')
          cells[mushroomIndex[i]].classList.remove('mushroom')
          mushroomIndex[i] += 1
          cells[mushroomIndex[i]].classList.add('mushroom')
        }
      }
    }, intervalTime)
  }

  mushroomInterval()

  const finnInterval = function () {
    setInterval(() => {
      for (let i = 0; i < finnIndex.length; i++) {
        if (finnIndex[i] >= 18 && finnIndex[i] < 27) {
          if (finnIndex[i] === 18) {
            cells[18].classList.remove('finn')
            finnIndex[i] += (width)
            cells[finnIndex[i]].classList.add('finn')
          } else {
            if (cells[finnIndex[i] - 1].classList.contains('princess')) {
              cells[finnIndex[i] - 1].classList.remove('princess')
              princess = 76
              cells[76].classList.add('princess')
              lives -= 1
              livesText.innerHTML = `${lives}`
              gameOver()
            }
          }
          cells[finnIndex[i]].classList.remove('finn')
          finnIndex[i] -= 1
          cells[finnIndex[i]].classList.add('finn')
        }
      }
    }, intervalTime)
  }

  finnInterval()

  function gameOver() {
    if (lives === 0) {
      gameboard.style.display = 'none'
      gameover.style.display = 'block'
      restartButton.addEventListener('click', () => {
        window.location.reload()
      })
    }
  }

  function getHome() {
    cells[princess].classList.remove('home')
    cells[princess].classList.remove('princess')
    cells[princess].classList.add('success')
    princess = 76
    cells[76].classList.add('princess')
    points += 100
    pointsText.innerHTML = `${points}`
    functionCalled += 1
  }

  const functionCalledInterval = setInterval(() => {
    if (functionCalled !== 0 && functionCalled === 3) {
      clearInterval(functionCalledInterval)
      clearInterval(DKInterval)
      clearInterval(marioInterval)
      clearInterval(finnInterval)
      clearInterval(mushroomInterval)
      alert('Good work! Now lets try going a little faster')
      intervalTime /= 2
      DKInterval()
      marioInterval()
      finnInterval()
      mushroomInterval()
      for (let i = 0; i < homeIndex.length; i++) {
        cells[homeIndex[i]].classList.remove('success')
        cells[homeIndex[i]].classList.add('home')
      }
    }
  }, 200)


}

document.addEventListener('DOMContentLoaded', main)