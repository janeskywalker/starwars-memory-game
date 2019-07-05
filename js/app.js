
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
        this.dealer = new Dealer(cards)
        this.cardsFlipped = []
        this.playerOneScore = 0
        this.playerTwoScore = 0
        this.turn = 'Player One'
        this.cardsOnBoard = []
        this.matchCount = 0
    }
    

    startGame() {
        // add click eventListner to the div to flip card
        const div = document.querySelector("#cardDisplay")
        // bind this back to the Game obj, instead of the element that 
        // the eventListener is added on
        div.addEventListener('click', this.playOneTurn.bind(this))

        // get dealer to shuffle and deal
        this.dealer.shuffle()
        //console.log("cards after shuffled", this.dealer.cards)
        this.cardsOnBoard = this.dealer.deal()
        
    }


    //play a turn 
    playOneTurn (evt) {
         //console.log(this)
        if(evt.target.tagName === 'IMG' && this.cardsFlipped.length < 2) {

            // did.id is the position on board
            console.log(evt.target.parentNode.id)
            let divClicked = document.getElementById(evt.target.parentNode.id)
            console.log(divClicked)

            // flip images, to get the right images, using name
            divClicked.firstChild.setAttribute("src", `images/${this.cardsOnBoard[evt.target.parentNode.id].name}.jpg`)

            // set data attribute to keep track on which div get flipped
            // evt.target.dataset.parentId = evt.target.parentNode.id
            // console.log(evt.target)
        
            //add flipped cards into an array
            // this.cardsFlipped.push(this.cardsOnBoard[evt.target.parentNode.id])
            // console.log(this.cardsFlipped)

            this.cardsFlipped.push({
                flippedCard: this.cardsOnBoard[evt.target.parentNode.id], 
                divId: evt.target.parentNode.id
            })
            console.log(this.cardsFlipped)

            if(this.cardsFlipped.length === 2) {
                this.checkMatching()
            }
        }
    }
        
    checkMatching() {
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

                // check if hasCards?



            // if dont match, flip back, then switch player
            } else { 
                console.log("no matching!")
                setTimeout(() => {
                    console.log('setTimeout')
                    this.flipCardsBack()
                }, 4000)
            }

            this.switchPlayers()

        }

    flipCardsBack() {
        console.log('flipping')
        console.log("cardsFlippedArray:", this.cardsFlipped)

        // why not able to log out the parentNode -- the div??

        //find the parentNode id
        // console.log(cardsFlipped[0].divId)
        // console.log(cardsFlipped[1].divId)

        const divId0 = this.cardsFlipped[0].divId
        console.log(divId0)
        let divToFlipBack0 = document.getElementById(divId0)
        divToFlipBack0.firstChild.setAttribute("src", "images/back.svg")

        const divId1 = this.cardsFlipped[1].divId
        console.log(divId1)
        let divToFlipBack1 = document.getElementById(divId1)
        divToFlipBack1.firstChild.setAttribute("src", "images/back.svg")
    }


    // switch player
    switchPlayers() {
        console.log('switching player')
        if (this.turn === 'Player One') {
            this.turn = 'Player Two'
        } else {
            this.turn = 'Player One'
        }

        console.log(`${this.turn}`)

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
        //console.log("shuffledCards:", this.cards)
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

