
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
        this.gameBoard.createBoard()
        // add click eventListner to the div to flip card
        const div = document.querySelector("#cards-display")
        // bind this back to the Game obj, instead of the element that 
        // the eventListener is added on
        div.addEventListener('click', this.playOneTurn.bind(this))
        // get dealer to shuffle and deal
        this.dealer.shuffle()
        //console.log("cards after shuffled", this.dealer.cards)
        this.cardsOnBoard = this.dealer.deal()
    }

    isRoundCompleted() {
        if(this.playerOneScore + this.playerTwoScore === 4) {
            console.log('one round done')
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
                } else if(this.turn === "Player Two") {
                    this.playerTwoScore += 1
                    console.log("playerTwoScore:", this.playerTwoScore)
                }

                this.switchPlayers()

            // if dont match, flip back, then switch player
            } else { 
                console.log("no matching!")
                setTimeout(() => {
                    //console.log('setTimeout')
                    this.flipCardsBack()
                }, 4000)
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

        console.log(`${this.turn}'s turn`)
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
    }


    createBoard() {
        for(let i=0; i<this.numOfCards; i++) {
            const el = this.createElement(i)
            this.cardsDisplay.appendChild(el)
        }
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

