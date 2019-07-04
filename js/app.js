
const cards = [
    {
        id: 1,
        name: "Princess Leia"
    }, 
    {
        id: 2,
        name: "Han Solo"
    }, 
    {
        id: 3,
        name: "Luke"
    }, 
    {
        id: 4,
        name: "Darth Vader"
    }, 
    {
        id: 5,
        name: "Yoda"
        
    }, 
    {
        id: 6,
        name: "obi-wan kenobi"
    },     
    
]


// add click eventListner to the div to flip card
const $div = $('#cardDisplay')
const flipCard = (evt) => {
    console.log(evt.target)
}
$div.on("click", flipCard)










// --------------Game class---------------
class Game {
    constructor(cards) {
        this.dealer = new Dealer(cards)
    }
    

    startGame() {
        this.dealer.shuffle(this.cards)
        console.log("cards after shuffled", this.dealer.cards)
        const cardsOnBoard = this.dealer.deal()
        displayCards(cardsOnBoard)
    }

    displayCards(cardsOnBoard) {

    }

    checkMatching() {
    }

    determinWinner() {

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
        console.log("shuffledCards:", this.cards)
    }

    deal() {
        // top two cards on board, deal top two cards twice 
        this.cardsOnBoard.push(this.cards[0], this.cards[1], this.cards[0], this.cards[1])
        this.cardsOnBoard.sort(() => Math.random() - 0.5)
        console.log(this.cardsOnBoard)
       
        return cardsOnBoard
    }
}


// --------------Board class---------------










// --------------Game start---------------

const game = new Game(cards)
game.startGame()

