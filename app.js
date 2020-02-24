function main() {

  // Grid items to construct the JS grid
  const width = 9
  const gridCellCount = width * width
  const grid = document.querySelector('.grid')
  const cells = []

  // Items on the grid
  const pcIndex = [2, 4, 6]
  const gameboyIndex = [54, 57, 60]
  const netflixIndex = [53, 50, 47]
  const catIndex = [27, 30, 33]
  const drinkIndex = [26, 23, 20]

  let lili = 76

  // Construction of the grid and placing items in cell locations at the beginning of the game
  for (let i = 0; i < gridCellCount; i++) {
    const cell = document.createElement('div')
    cell.classList.add('cell')
    if (i === lili) {
      cell.classList.add('lili')
    }
    if (i === pcIndex[0] || i === pcIndex[1] || i === pcIndex[2]) {
      cell.classList.add('pc')
    }
    if (i === gameboyIndex[0] || i === gameboyIndex[1] || i === gameboyIndex[2]) {
      cell.classList.add('gameboy')
    }
    if (i === netflixIndex[0] || i === netflixIndex[1] || i === netflixIndex[2]) {
      cell.classList.add('netflix')
    }
    if (i === catIndex[0] || i === catIndex[1] || i === catIndex[2]) {
      cell.classList.add('cat')
    }
    if (i === drinkIndex[0] || i === drinkIndex[1] || i === drinkIndex[2]) {
      cell.classList.add('drink')
    }
    grid.appendChild(cell)
    cells.push(cell)
  }

  // Movement for the key character
  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
      if (lili === cells.length - 1) {
        return
      }
      cells[lili].classList.remove('lili')
      lili += 1
      cells[lili].classList.add('lili')
    } else if (event.key === 'ArrowLeft') {
      if (lili === 0) {
        return
      }
      cells[lili].classList.remove('lili')
      lili -= 1
      cells[lili].classList.add('lili')
    } else if (event.key === 'ArrowUp') {
      if (lili < width) {
        return
      }
      cells[lili].classList.remove('lili')
      lili -= width
      cells[lili].classList.add('lili')
    } else if (event.key === 'ArrowDown') {
      if (lili > cells.length - width - 1) {
        return
      }
      cells[lili].classList.remove('lili')
      lili += width
      cells[lili].classList.add('lili')
    }
    if (cells[lili].classList.contains('gameboy') || cells[lili].classList.contains('netflix') || cells[lili].classList.contains('cat') || cells[lili].classList.contains('drink')) {
      cells[lili].classList.remove('lili')
      lili = 76
      cells[76].classList.add('lili')
    }
  })

  // Loops for the moving obstacles
  setInterval(() => {
    for (let i = 0; i < gameboyIndex.length; i++) {
      if (gameboyIndex[i] > 53 && gameboyIndex[i] <= 62) {
        if (gameboyIndex[i] === 62) {
          cells[62].classList.remove('gameboy')
          gameboyIndex[i] -= (width - 1)
          cells[gameboyIndex[i]].classList.add('gameboy')
        } else {
          if (cells[gameboyIndex[i] + 1].classList.contains('lili')) {
            cells[gameboyIndex[i] + 1].classList.remove('lili')
            lili = 76
            cells[76].classList.add('lili')
          }
          cells[gameboyIndex[i]].classList.add('gameboy')
          cells[gameboyIndex[i]].classList.remove('gameboy')
          gameboyIndex[i] += 1
          cells[gameboyIndex[i]].classList.add('gameboy')
        }
      }
    }
  }, 1000)

  setInterval(() => {
    for (let i = 0; i < netflixIndex.length; i++) {
      if (netflixIndex[i] >= 45 && netflixIndex[i] < 54) {
        if (netflixIndex[i] === 45) {
          cells[45].classList.remove('netflix')
          netflixIndex[i] += (width - 1)
          cells[netflixIndex[i]].classList.add('netflix')
        } else {
          if (cells[netflixIndex[i] - 1].classList.contains('lili')) {
            cells[netflixIndex[i] - 1].classList.remove('lili')
            lili = 76
            cells[76].classList.add('lili')
          }
          cells[netflixIndex[i]].classList.remove('netflix')
          netflixIndex[i] -= 1
          cells[netflixIndex[i]].classList.add('netflix')
        }
      }
    }
  }, 1000)


  setInterval(() => {
    for (let i = 0; i < catIndex.length; i++) {
      if (catIndex[i] > 26 && catIndex[i] <= 35) {
        if (catIndex[i] === 35) {
          cells[35].classList.remove('cat')
          catIndex[i] -= (width - 1)
          cells[catIndex[i]].classList.add('cat')
        } else {
          if (cells[catIndex[i] + 1].classList.contains('lili')) {
            cells[catIndex[i] + 1].classList.remove('lili')
            lili = 76
            cells[76].classList.add('lili')
          }
          cells[catIndex[i]].classList.add('cat')
          cells[catIndex[i]].classList.remove('cat')
          catIndex[i] += 1
          cells[catIndex[i]].classList.add('cat')
        }
      }
    }
  }, 1000)


  setInterval(() => {
    for (let i = 0; i < drinkIndex.length; i++) {
      if (drinkIndex[i] >= 18 && drinkIndex[i] < 27) {
        if (drinkIndex[i] === 18) {
          cells[18].classList.remove('drink')
          drinkIndex[i] += (width - 1)
          cells[drinkIndex[i]].classList.add('drink')
        } else {
          if (cells[drinkIndex[i] - 1].classList.contains('lili')) {
            cells[drinkIndex[i] - 1].classList.remove('lili')
            lili = 76
            cells[76].classList.add('lili')
          }
          cells[drinkIndex[i]].classList.remove('drink')
          drinkIndex[i] -= 1
          cells[drinkIndex[i]].classList.add('drink')
        }
      }
    }
  }, 1000)

  
  // Collision of obstacles
  

    

}

document.addEventListener('DOMContentLoaded', main)