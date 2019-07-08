
const cards = [
    {
        id: 0,
        name: "leia"
    }, 
    {
        id: 1,
        name: "han"
    }, 
    {
        id: 2,
        name: "luke"
    }, 
    {
        id: 3,
        name: "darth"
    }, 
    {
        id: 4,
        name: "yoda"
        
    }, 
    {
        id: 5,
        name: "ben"
    },     
    
]

//console.log(document.body)


    // play a turn
    // check for match
    // switch players
    // check if one round is done 
        // check if hasCards
        // play a new round 
            // add a play a new round to startGame 



// --------------Game class---------------
class Game {
    constructor(cards) {
        this.gameBoard = new GameBoard(8)
        this.dealer = new Dealer(cards)
        this.clickHandler = this.playOneTurn.bind(this)
        console.log(this.gameBoard)
        this.init()
    }

    init() {
        this.cardsFlipped = []
        this.playerOneScore = 0
        this.playerTwoScore = 0
        this.turn = 'Player One'
        this.cardsOnBoard = []
    }

    startGame() {
        // reset the state
        this.init()

        this.gameBoard.renderBoard()
        // add click eventListner to the div to flip card

        //  go create this when renderBoard
        const div = document.querySelector("#cards-display")

        console.log(div)
        // bind this back to the Game obj, instead of the element that 
        div.addEventListener('click', this.clickHandler)
        // get dealer to shuffle and deal
        this.dealer.shuffle()
        //console.log("cards after shuffled", this.dealer.cards)
        this.cardsOnBoard = this.dealer.deal()
        
    }

    clearGameBoard() {
        const div = document.querySelector("#cards-display")
        div.removeEventListener('click', this.clickHandler)
        document.querySelector('#game-board').remove()
    }


    renderWinner() {
        console.log("rendering winner")

        this.clearGameBoard()
        
        const winnerDisplay = document.createElement('div')
        winnerDisplay.setAttribute("id", "winner-display")
        document.body.appendChild(winnerDisplay)

        const showWinner = document.createElement('div')
        winnerDisplay.appendChild(showWinner)
        console.log(winnerDisplay)
      
        console.log(this.playerOneScore, this.playerTwoScore)

        if(this.playerOneScore>this.playerTwoScore) {
            showWinner.innerText = `Winner is Player One` 
        } else if (this.playerOneScore<this.playerTwoScore) {
            showWinner.innerText = `Winner is Player two` 
        } else if (this.playerOneScore === this.playerTwoScore) {
            showWinner.innerText = `It's A TIE!` 
        }

        this.renderButtons()
    }

    renderButtons() {
        const winnerDisplay = document.querySelector('#winner-display')
        const btnPlayMoreRound = document.createElement('button')
        btnPlayMoreRound.setAttribute('class', "btn btn-primary btn-lg")
        btnPlayMoreRound.innerText = "Play Another Round"
        winnerDisplay.appendChild(btnPlayMoreRound)


        const playRound = () => {
            // btnPlayMoreRound.removeEventListener('click', playRound)
            this.playAnotherRound()
        }

        // btnPlayMoreRound.addEventListener("click", this.playAnotherRound)
        btnPlayMoreRound.addEventListener("click", playRound, { once: true })

        // const btnQuit = document.createElement('button')
        // btnQuit.setAttribute('class', "btn btn-warning btn-lg")
        // btnQuit.innerText = "Quit"
        // winnerDisplay.appendChild(btnQuit)
        //tnQuit.addEventListener("click", startPage())

    }

    playAnotherRound() {
        document.querySelector('#winner-display').remove()
        //const newGame = new Game(cards)
        game.startGame()
    }

    isRoundCompleted() {
        if(this.playerOneScore + this.playerTwoScore === 4) {
            console.log('one round done')

            setTimeout(()=>this.renderWinner(), 3000)

            return true
        } else {
            return false 
        }
    }

    //play a turn 
    playOneTurn (evt) {
         //console.log(this)
         // when event fires 
        if(evt.target.tagName === 'IMG' && this.cardsFlipped.length < 2) {
            // did.id is the position on board
            console.log(evt.target.parentNode.id)
            let divClicked = document.getElementById(evt.target.parentNode.id)
            console.log(divClicked)

            // flip images, to get the right images, using name
            divClicked.firstChild.setAttribute("src", `images/${this.cardsOnBoard[evt.target.parentNode.id].name}.jpg`)

            this.cardsFlipped.push({
                flippedCard: this.cardsOnBoard[evt.target.parentNode.id], 
                // divId: evt.target.parentNode.id
                img: evt.target
            })
            console.log(this.cardsFlipped)

            if(this.cardsFlipped.length === 2) {
                this.checkForMatch()
            }
        }
    }
        
    checkForMatch() {
            console.log("cardsFlippedArray", this.cardsFlipped)
            // if match, add score 1, check if all cards flipped 
            if(this.cardsFlipped[0].flippedCard.name === this.cardsFlipped[1].flippedCard.name) {
                console.log("you have got a match!")
                // check which player, increment score 
                if(this.turn === "Player One") {
                    this.playerOneScore += 1
                    console.log("playerOneScore:", this.playerOneScore)
                    document.querySelector('#player-1-point').innerText = this.playerOneScore
                } else if(this.turn === "Player Two") {
                    this.playerTwoScore += 1
                    console.log("playerTwoScore:", this.playerTwoScore)
                    document.querySelector('#player-2-point').innerText = this.playerTwoScore
                }

                this.switchPlayers()

            // if dont match, flip back, then switch player
            } else { 
                console.log("no matching!")
                setTimeout(() => {
                    //console.log('setTimeout')
                    this.flipCardsBack()
                }, 2000)
            }
        }

    flipCardsBack() {
        console.log('flipping')
        console.log("cardsFlippedArray:", this.cardsFlipped)

        this.cardsFlipped.forEach((next) => {
            next.img.setAttribute('src', 'images/back.svg')
        })

        this.switchPlayers()
    }


    // switch player
    switchPlayers() {
        console.log('switching player')
        if (this.turn === 'Player One') {
            this.turn = 'Player Two'
        } else {
            this.turn = 'Player One'
        }

        console.log(`${game.turn}'s turn`)

        
        console.log(document.querySelector("#game-board"))
        document.querySelector('#turn').innerText = `${game.turn}`
        // flip cards back to back 
        // only flip the unmatched ones 
        this.cardsFlipped = []

        this.isRoundCompleted()
        
    }
}



// --------------Dealer class---------------

class Dealer {
    constructor (cards) {
        this.cards = cards
        // this.cardsOnBoard = []
    }

    shuffle() {
        this.cards.sort(() => Math.random() - 0.5)
        //console.log("shuffledCards:", this.cards)
    }

    deal() {
        const cardsToDeal = []
        // top two cards on board, deal top two cards twice 
        cardsToDeal.push(this.cards[0], this.cards[1], this.cards[0], this.cards[1])
        cardsToDeal.push(this.cards[2], this.cards[3], this.cards[2], this.cards[3])
        cardsToDeal.sort(() => Math.random() - 0.5)
        console.log(cardsToDeal)
       
        return cardsToDeal
    }
}




// --------------GameBoard class---------------

class GameBoard {
    constructor(numOfCards) {
        this.numOfCards = numOfCards
        this.cardsDisplay = document.querySelector('#cards-display')
        this.scoreDisplay = document.querySelector('#score-display')
        this.turnDisplay = document.querySelector('#turn-display')

        //console.log(game)
    }


    renderBoard() {

        const gameBoardContainer = document.createElement('div')
        gameBoardContainer.setAttribute("id", "game-board")
        gameBoardContainer.setAttribute("class", "container")
        document.body.appendChild(gameBoardContainer)

        const cardsDisplay = document.createElement('div')
        const turnDisplay = document.createElement('div')
        const scoreDisplay = document.createElement('div')
       

        cardsDisplay.setAttribute("id", "cards-display")
        cardsDisplay.setAttribute("class", "row")

        turnDisplay.setAttribute("id", "turn-display")
        turnDisplay.setAttribute("class", "row")

        scoreDisplay.setAttribute("id", "score-display")
        scoreDisplay.setAttribute("class", "row")

        gameBoardContainer.appendChild(turnDisplay)
        gameBoardContainer.appendChild(cardsDisplay)
        gameBoardContainer.appendChild(scoreDisplay)


        //append cards
        for(let i=0; i<this.numOfCards; i++) {
            const el = this.createCard(i)
            cardsDisplay.appendChild(el)
        }

        // display score
        for(let j=1; j<3; j++) {
            const scoreEl = document.createElement('div')
            scoreEl.setAttribute("class", "col col-6")
            scoreEl.setAttribute("id", `player-${j}-score`)
            scoreEl.innerText = `Player ${j} Score: `
            const score = document.createElement('span')
            score.setAttribute("id", `player-${j}-point`)
            score.setAttribute("class", `big-font`)
            scoreEl.appendChild(score)
            scoreDisplay.appendChild(scoreEl)

        }

        // display turn
        const turnEl = document.createElement('div')
        turnEl.setAttribute("class", "col col-12")
        turnEl.setAttribute("id", "show-turn")
        const turn = document.createElement('span')
        turn.setAttribute("id", "turn")
        turnEl.appendChild(turn)
        turnEl.innerHTML = `<span id="turn" class="big-font">${game.turn}</span>'s Turn to Flip Two Cards`
        turnDisplay.appendChild(turnEl)


    }

    createCard(i) {
        const el = document.createElement('div')
        el.setAttribute("id", i)
        el.setAttribute("class", "col col-3")
        const img = document.createElement('img')
        img.setAttribute("src", "images/back.svg")
        el.append(img)
        return el
    }

    
}



// --------------Game start---------------

const game = new Game(cards)
game.startGame()


