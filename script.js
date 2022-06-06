const cards = document.querySelectorAll('.card');
let hasFlipped = false;
let firstCard, secondCard;
let lockBoard = false;

function flipCard(){
    if(lockBoard) return;
    if(this === firstCard) return;
    
    this.classList.add('flip');
    if(!hasFlipped){
        hasFlipped = true;
        firstCard = this;
        return;
    }
    secondCard = this;
    hasFlipped = false;
    checkMatch();
}
function checkMatch(){
    if(firstCard.dataset.card === secondCard.dataset.card){
        disableCard();
        return;
    }
    unflipCard();
}

function disableCard(){
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCard(){
    lockBoard = true;
    setTimeout(function(){
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        lockBoard = false;
        resetBoard();
    },1500);
}

function resetBoard(){
    [hasFlipped,lockBoard] = [false,false];
    [firstCard,secondCard] = [null,null];

}

(
function embaralhar(){
    cards.forEach( (card)=>{
        let randomPosition = Math.floor(Math.random()*12);
        card.style.order = randomPosition;
    })
}
)();
cards.forEach( (card) =>{
    card.addEventListener('click', flipCard)
})
