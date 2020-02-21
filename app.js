function main() {
  const width = 9
  const gridCellCount = width * width
  const grid = document.querySelector('.grid')
  const cells = []
  

  let lili = 76
  let gameboyIndex = 54 
  let netflixIndex = 53


  for (let i = 0; i < gridCellCount; i++) {
    const cell = document.createElement('div')
    cell.classList.add('cell')
    if (i === lili) {
      cell.classList.add('lili')
    }
    if (i === gameboyIndex) {
      cell.classList.add('gameboy')
    }
    if (i === netflixIndex) {
      cell.classList.add('netflix')
    }
    grid.appendChild(cell)
    cells.push(cell)
  }


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
  })

  if (gameboyIndex > 53 && gameboyIndex < 63) {
    setInterval (() => {
      cells[gameboyIndex].classList.remove('gameboy')
      gameboyIndex += 1
      cells[gameboyIndex].classList.add('gameboy')
    }, 1000) 
  } else {
    return
  }

  if (netflixIndex > 44 && netflixIndex < 54 ) {
    setInterval (() => {
      cells[netflixIndex].classList.remove('netflix')
      netflixIndex -= 1
      cells[netflixIndex].classList.add('netflix')
    }, 1000) 
  } else {
    return
  }




    
  


}

document.addEventListener('DOMContentLoaded', main)