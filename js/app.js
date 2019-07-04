
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



class Game {
    constructor(cards) {
        this.cards = cards
        this.cardsInPlay = []
        
    }

    checkMatching() {

    }

    determinWinner() {

    }
}




class Dealer {
    constructor (cards) {
        this.cards = cards 

    }


    shuffleCards() {

    }

    dealCards() {

    }
}




class Player {
    constructor() {
        
    }

    playCard() {

    }

    choosePlayAgain() {

    }

    chooseQuit() {

    }
}






const game = new Game(cards)
console.log(game)

const player1 = new Player()
const player2 = new Player()

console.log(player1, player2)
