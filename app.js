const board = document.querySelector('.board')
const score = document.querySelector('h2')
const numberOfSquares = 16
const randArr = []
let currentNumShown = 0
let numberOfMatches = 0
let preventUserAction = false;
let squareOne;
let squareTwo;
let tmp1;
let tmp2;

function createArray() {
    for(let i = 1; i < numberOfSquares/2 + 1; i++){
        randArr.push(i,i)
    }
    randArr.sort(() => Math.random() -0.5)
}

function drawSquares() {
    for(let i = 1; i < 17; i++) {
        const square = document.createElement('div')
        square.setAttribute('class', 'square')
        square.setAttribute('id', ('square'+i))
        square.innerText = randArr[i-1]
        board.appendChild(square)
        square.addEventListener('click', function(e) {
            click(square)
        })
    }
}

function click(square) {
    if(square.id === 'checked' || preventUserAction) return
    if(currentNumShown === 0){
        square.style="color: black;"
        currentNumShown++
        squareOne = square
        tmp1 = squareOne.id
        squareOne.setAttribute('id', 'checked')
        
    } else if(currentNumShown === 1) {
        square.style="color: black;"
        squareTwo = square
        tmp2 = squareTwo.id
        squareTwo.setAttribute('id', 'checked')
        checkForMatch()
    }
}

function checkForMatch() {
    if(squareOne.innerText === squareTwo.innerText) {
        match()
    } else {
        noMatch()
    }
}

function match() {
    console.log('match')
    numberOfMatches++
    score.innerText++
    currentNumShown = 0
    squareOne.style="color: rgb(118, 223, 26);"
    squareTwo.style="color: rgb(118, 223, 26);"
    console.log(numberOfMatches)
    if(numberOfMatches === 8) {
        win()
    }
}

function noMatch() {

    preventUserAction = true
    squareOne.style="color: orangered;"
    squareTwo.style="color: orangered;"

    setTimeout(() => {
        squareOne.style="color: rgb(121, 120, 117);"
        squareTwo.style="color: rgb(121, 120, 117);"
        squareOne = 'square0'
        squareTwo = 'square0'
        preventUserAction = false;
    }, 1200)
    
    currentNumShown = 0
    squareOne.setAttribute('id', tmp1)
    squareTwo.setAttribute('id', tmp2)
}

function win() {
    preventUserAction = true
    score.innerText = 'You win!'
    
}

createArray()
drawSquares()

