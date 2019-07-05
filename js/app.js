
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
    }
    

    startGame() {
        this.dealer.shuffle(this.cards)
        console.log("cards after shuffled", this.dealer.cards)
        const cardsOnBoard = this.dealer.deal()
        this.displayCards(cardsOnBoard)
    }

    displayCards(cardsOnBoard) {
        console.log(cardsOnBoard)

        // add click eventListner to the div to flip card
        const $div = $('#cardDisplay')
        const flipCard = (evt) => {
            console.log(evt.target.parentNode.id)

            // let $divClicked = $(evt.target.parentNode.id)
            // console.log($divClicked) 

            let divClicked = document.getElementById(evt.target.parentNode.id)
            console.log(divClicked)

            console.log(cardsOnBoard[evt.target.parentNode.id].name)

            //$(divClicked.first()).attr('src', `images/${cardsOnBoard[evt.target.parentNode.id].name}.jpg`)
         
            divClicked.firstChild.setAttribute("src", `images/${cardsOnBoard[evt.target.parentNode.id].name}.jpg`)

        }
        $div.on("click", flipCard)


    }

    // checkMatching() {
    // }

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
}


// --------------Board class---------------










// --------------Game start---------------

const game = new Game(cards)
game.startGame()

