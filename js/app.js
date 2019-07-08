
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
        this.cardsFlipped = []
        this.playerOneScore = 0
        this.playerTwoScore = 0
        this.turn = 'Player One'
        this.cardsOnBoard = []
        this.matchCount = 0
        console.log(this.gameBoard)
    }


    startGame() {

        //this.renderWinner()

        this.gameBoard.renderBoard()
        // add click eventListner to the div to flip card
        const div = document.querySelector("#cards-display")
        // bind this back to the Game obj, instead of the element that 
        div.addEventListener('click', this.playOneTurn.bind(this))
        // get dealer to shuffle and deal
        this.dealer.shuffle()
        //console.log("cards after shuffled", this.dealer.cards)
        this.cardsOnBoard = this.dealer.deal()
        
    }

    // determinWinner() {
    //     if(this.isRoundCompleted) {
    //         console.log("determin winner")
    //         this.renderWinner()
    //      }
    // }

    renderWinner() {
        console.log("rendering winner")
        
        const winnerDisplay = document.querySelector('#winner-display')
        const showWinner = document.createElement('div')
        winnerDisplay.appendChild(showWinner)
        console.log(winnerDisplay)
      
        console.log(this.playerOneScore, this.playerTwoScore)

        document.querySelector('#game-board').innerText = " "

        if(this.playerOneScore>this.playerTwoScore) {
            showWinner.innerText = `Winner is Player One` 
        } else if (this.playerOneScore<this.playerTwoScore) {
            showWinner.innerText = `Winner is Player two` 
        } else if (this.playerOneScore === this.playerTwoScore) {
            showWinner.innerText = `It's A TIE!` 
        }
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
        console.log(game)
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
        this.cardsOnBoard = []
    }

    shuffle() {
        this.cards.sort(() => Math.random() - 0.5)
        //console.log("shuffledCards:", this.cards)
    }

    deal() {
        // top two cards on board, deal top two cards twice 
        this.cardsOnBoard.push(this.cards[0], this.cards[1], this.cards[0], this.cards[1])
        this.cardsOnBoard.push(this.cards[2], this.cards[3], this.cards[2], this.cards[3])
        this.cardsOnBoard.sort(() => Math.random() - 0.5)
        console.log(this.cardsOnBoard)
       
        return this.cardsOnBoard
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
        for(let i=0; i<this.numOfCards; i++) {
            const el = this.createElement(i)
            this.cardsDisplay.appendChild(el)
        }

        for(let j=1; j<3; j++) {
            const scoreEl = this.createElement('div')
            scoreEl.setAttribute("class", "col col-6")
            scoreEl.setAttribute("id", `player-${j}-score`)
            scoreEl.innerText = `Player ${j} Score: `
            const score = document.createElement('span')
            score.setAttribute("id", `player-${j}-point`)
            scoreEl.appendChild(score)
            this.scoreDisplay.appendChild(scoreEl)

        }

        const turnEl = this.createElement('div')
        turnEl.setAttribute("class", "col col-12")
        turnEl.setAttribute("id", "show-turn")
        turnEl.innerText = `Plyer One's Turn to Flip Two Cards`
        this.turnDisplay.appendChild(turnEl)


    }

    createElement(i) {
        const el = document.createElement('div')
        el.setAttribute("id", i)
        el.setAttribute("class", "col col-3")
        const img = document.createElement('img')
        img.setAttribute("src", "images/back.svg")
        el.append(img)
        //console.log(el)
        return el
    }

    
}



// --------------Game start---------------

const game = new Game(cards)
game.startGame()


