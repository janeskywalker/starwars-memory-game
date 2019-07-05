
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








// --------------Game class---------------
class Game {
    constructor(cards) {
        this.dealer = new Dealer(cards)
        this.cardsFlipped = []
        this.player1Score = 0
        this.player2Score = 0
        this.turn = 'Player One'
        this.cardsOnBoard = []
        this.matchCount = 0
    }
    

    startGame() {
        // add click eventListner to the div to flip card
        const div = document.querySelector("#cardDisplay")
        div.addEventListener('click', this.flipCard.bind(this))

        this.dealer.shuffle()
        console.log("cards after shuffled", this.dealer.cards)
        this.cardsOnBoard = this.dealer.deal()
        
    }

    // play a turn
    // check for match
    // switch players
    // check if one round is done 
        // check if hasCards
        // play a new round 
            // add a play a new round to startGame 



    //displayCards(cardsOnBoard) {
        //console.log(cardsOnBoard)

    //play a turn 
     flipCard (evt) {
         console.log(this)
        if(evt.target.tagName === 'IMG' && this.cardsFlipped.length < 2) {
            console.log(evt.target.parentNode.id)
            let divClicked = document.getElementById(evt.target.parentNode.id)
            console.log(divClicked)
            divClicked.firstChild.setAttribute("src", `images/${this.cardsOnBoard[evt.target.parentNode.id].name}.jpg`)

            //add flipped cards into an array
            this.cardsFlipped.push(this.cardsOnBoard[evt.target.parentNode.id])
            console.log(this.cardsFlipped)


            this.checkMatching()
        }
    }
        

    //}

    checkMatching() {
        if(this.cardsFlipped.length>1) {
            console.log(this.cardsFlipped)

            // if match, add score 1
            if(this.cardsFlipped[0].name === this.cardsFlipped[1].name) {

                // check which player 
                this.player1Score += 1
                console.log(this.player1Score)

                // if dont match, flip back 
            } else { 
                // switch user
            }
        }
        
    }


    // switch player
    switchPlayers() {
        if (this.turn === 'Player One') {
            this.turn = 'Player Two'
        } else {
            this.turn = 'Player One'
        }

        alert(`${this.turn} it's your turn.`)

        this.cardsFlipped = []

        // flip cards back to back 
        // only flip the unmatched ones 

    }







    // determinWinner() {

    // }
}



// --------------Dealer class---------------

class Dealer {
    constructor (cards) {
        this.cards = cards
        this.cardsOnBoard = []
    }

    shuffle() {
        this.cards.sort(() => Math.random() - 0.5)
        console.log("shuffledCards:", this.cards)
    }

    deal() {
        // top two cards on board, deal top two cards twice 
        this.cardsOnBoard.push(this.cards[0], this.cards[1], this.cards[0], this.cards[1])
        this.cardsOnBoard.sort(() => Math.random() - 0.5)
        console.log(this.cardsOnBoard)
       
        return this.cardsOnBoard
    }

    hasCards() {

    }
}


// --------------Board class---------------










// --------------Game start---------------

const game = new Game(cards)
game.startGame()

