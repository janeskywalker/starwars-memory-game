
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
    

    startGame() {
        this.dealer.shuffle(this.cards)
    }

    checkMatching() {
    }

    determinWinner() {

    }
}



// --------------Dealer class---------------

class Dealer {
    constructor () {
        this.cards = []
    }

    shuffle(cards) {
        cards.sort(() => Math.random() - 0.5)
        console.log("shuffledCards:", cards)

        this.card = cards
    }

    deal() {

    }

}


// --------------Board class---------------






// --------------Game start---------------

const game = new Game(cards)
game.startGame()
