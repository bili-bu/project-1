### ![GA](https://cloud.githubusercontent.com/assets/40461/8183776/469f976e-1432-11e5-8199-6ac91363302b.png) 

# project-1: **Princess Peach avoids her friends**


## Overview

This was my first project during my time training at the General Assembly bootcamp. 

The task was to build a grid-based computer game that rendered in a browser. This project was front-end only and as such we used HTML and CSS as well as plain ‘vanilla’ JavaScript to build out the game.

We were given many different options and I decided to recreate the cult classic frogger. To give it a bit of an unusual twist, I thought it would be fun to delve into the Super Mario universe for characters and style. 


*Princess Peach had a long day ... she wants to get home and relax, but **alas** her road is blocked by four of her friends who are all quite keen to chat. Guide P.P. across the grid to get her home as quickly as possible. If you run into a friend you will lose a life and have to start again. You have three lives!* 


Click **[here](https://bili-bu.github.io/project-1/)** to play.

### The brief

* Render a game in the browser
* Design logic for winning & visually display which player won
* Stick with **KISS (Keep It Simple Stupid)** and **DRY (Don't Repeat Yourself)** principles
* Use **Javascript** for **DOM manipulation**
* **Deploy your game online**, where the rest of the world can access it

### Technologies used

* HTML5
*	CSS3
*	JavaScript
*	Git
*	GitHub
*	Google Fonts


## The game 

### Starting screen

I wanted to create a clean look for my game and as such when the window loads, the only thing that's visible is the starting screen with the name of the game and a button which starts the actual game. When this button is pushed the below code is activated through ```click``` event listener:

```
startButton.addEventListener('click', () => {
    gameboard.style.display = 'flex'
    start.style.display = 'none'
    audio.src = 'music/Super Mario Bros. medley.mp3' 
    audio.play()
  })
```

The click makes the start display disappear and the game-board appear. Simultaneously the theme song from Super Mario will start playing.  

### Setting up the game

To create the game board I used a div with the class of "grid" which I created in the HTML: 

```
<div class="grid"></div>
```

I then used a for loop in JavaScript to create a 9x9 grid on which I also simultaneously placed the character, the obstacles (Princess Peach's four friends) and the home fields on the board in their starting positions. 

```
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
```

Next I needed to write code to make P.P. move across the board. I added a ```keydown``` event listener that would recognise the the directional key the player would press. This then would instigate an if function which would remove the class containing the image of P.P. and add it to the next directionally accurate cell in the grid. 

```
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
```

### Collisions

In that same ```keydown``` event listener I also included the cases in which P.P. would would move to a field that was already occupied by one of her friends, Donkey Kong (DK), Mario, Toad (mushroom) and Finn riding Jake (a little Adventure Time easter egg). If P.P. would move to a cell which already displayed the image of a friend, P.P. would be automatically moved to her starting position again and one life would be removed from the initial three lives. This also triggers the ```gameOver``` function. More on that later... 

```
  if (cells[princess].classList.contains('DK') || cells[princess].classList.contains('mario') || cells[princess].classList.contains('mushroom') || cells[princess].classList.contains('finn')) {
    cells[princess].classList.remove('princess')
    princess = 76
    cells[76].classList.add('princess')
    lives -= 1
    livesText.innerHTML = `${lives}`
    gameOver()
  }
```
### Getting home

Also embedded in the ```keydown``` event listener is a function that gets triggered when P.P. reaches one of her three homes: the home (castle) image in that cell is replaced by a success (thumbs-up) image and P.P. once again gets placed back to her initial starting position. The game keeps count through points how many times P.P. has reached home - this is a tally that's hidden from the player. Here, the ```getHome``` function gets triggered.

``` 
  if (cells[princess].classList.contains('home')) {
    cells[princess].classList.remove('home')
    cells[princess].classList.remove('princess')
    cells[princess].classList.add('success')
    princess = 76
    cells[76].classList.add('princess')
    points += 1
    getHome()
  }
 ```

### Obstacles

The obstacles in the game are P.P.s four friends that all move across the screen, cell by cell at a specific interval. See below for an example:

```
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
              gameOver()
            }
          }
          cells[marioIndex[i]].classList.remove('mario')
          marioIndex[i] -= 1
          cells[marioIndex[i]].classList.add('mario')
        }
      }
    }, intervalTime)
  }
```

Instead of having a random interval for the characters to appear on screen as is the case with the original Frogger game, I decided to place three obstacles equidistantly in one line together and have them move at the same interval forward, creating a seemingly continuous loop for the characters to appear in line. Once a character reaches the end of the line it is moved back to the front of the line and carries on moving at the same pace and distance across the line. Here again, I also built in code to take into account the situation in which the character moves to a field that contains P.P. The same as before applies: P.P. gets moved back to her starting position, one life is removed from the lives counter and the ```gameOver``` function is run. 

### Winning

The ```getHome``` function mentioned above runs every time P.P. makes it to one of her three castles. The function will check the count of points and if it equals 3 then the player is declared a winner. 

```
  function getHome() {
    if (points === 3) {
      gameboard.style.display = 'none'
      gamewon.style.display = 'block'
      restartButton[0].addEventListener('click', () => {
        window.location.reload()
      })
    }
  }
```

Once the proper condition is met, the game-board display disappears and the player is met with a new congratulatory display. It also includes a button with an event listener to restart the game should the player want to play an extra round. The game goes back to its initial setting through reloading the window. 

### Losing

As mentioned before, whenever P.P. comes in contact with one of her friends she looses a life and the ```gameOver``` function is triggered:

```
  function gameOver() {
    if (lives === 0) {
      gameboard.style.display = 'none'
      gameover.style.display = 'block'
      restartButton[1].addEventListener('click', () => {
        window.location.reload()
      })
    }
  }
```

The logic for losing is very similar to that of winning. The game-board disappears and you are left with a game over screen which has a button asking the player whether he wants to play again.

## Conclusion 

### Challenges

During the first month of the GA Immersive Software Engineering course we focused nearly exclusively on vanilla JavaScript which was the first language I had to learn from scratch. Although I enjoyed learning JS I also found parts of it challenging. I didn't feel very confident with some of the more advanced functions we had learned and was pretty lost when we started on this first project. This is why I chose to make this game as easy as possible for me to build. I really embraced the idea of KISS and wrote code that I felt confident writing. 

In retrospect I should have challenged myself more and even though I was doing very well with my project schedule I should have left some time for me to look into more advanced functions to the game and implemented some of my stretch goals such as making the obstacles appear truly randomly or creating multiple levels of difficulty to the game, which is easily winnable as it currently stands.

### Victories

I feel that given this was my first project I'm proud that I managed to build a fully functional game which has no bugs and is not breaking. I also managed to make it visually pleasing which gives me great joy as well. I very much enjoyed the process and I feel much more confident in my JavaScript abilities now that I have proof I can build something with very little help from the internet or teaching staff. 

### Potential Changes

While writing the ReadMe I was hard-pressed not to make any sweeping changes to the code since I noticed that there was a lot of repetition. Refactoring my code on this project would definitely be my highest priority, closely followed by making it more complex as a game with extra levels and random obstacle movement.