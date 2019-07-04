
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
        this.cards = cards
        this.dealer = new Dealer()
        this.player1 = new Player()
        this.player2 = new Player()
        this.cardsInPlay = []
    }
    

    StartGame() {
        this.dealer.shuffleCards(this.cards)
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

    }


    shuffleCards() {
        this.cards.sort()
    }

    dealCards() {

    }
}


// --------------Player class---------------


class Player {
    constructor() {
    }

    flipCard() {
    }
}





// --------------Game start---------------

const game = new Game(cards)
//console.log(game)
