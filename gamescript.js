let clickAudio = new Audio('audio/click.wav');
let matchAudio = new Audio('audio/match.wav');
let winAudio = new Audio('audio/win.wav')


function flipCardWhenClicked(cardObject) {
    cardObject.element.onclick = function() {
        if (cardObject.element.classList.contains("flipped")) {
        return;
        }

        clickAudio.play();

        cardObject.element.classList.add("flipped");

        setTimeout(function() {
        onCardFlipped(cardObject);
        }, 500);
    };
}

function setUpGame() {
    let cardObjects = 
        createCards(document.getElementById("card-container"), shuffleCardImageClasses());

    if (cardObjects != null) {
        for (let i = 0; i < cardObjects.length; i++) {
            flipCardWhenClicked(cardObjects[i]);
        }
    }
}


function createNewCard() {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.innerHTML += `<div class="card-down"></div><div class="card-up"></div>`;
	return cardElement

}


function appendNewCard(parentElement) {

    let cardElement = createNewCard();

    parentElement.appendChild(cardElement)

	return cardElement

}


function shuffleCardImageClasses() { 

    cardClasses = ["image-1", "image-1", "image-2", "image-2", "image-3", "image-3", "image-4", "image-4", "image-5", "image-5", "image-6", "image-6"];
    shuffleCardClasses = _.shuffle(cardClasses);

	
    return shuffleCardClasses
}



function createCards(parentElement, shuffledImageClasses) {

    let cardObjects = [];

    for(let i = 0; i < 12; i++) {
    
    let newElement = appendNewCard(parentElement);

    newElement.classList.add(shuffledImageClasses[i]);

    cardObjects.push({index:i, element: newElement, imageClass: shuffledImageClasses[i]});

    }
	return cardObjects 
}

function doCardsMatch(cardObject1, cardObject2) {

    if(cardObject1.imageClass === cardObject2.imageClass){
        return true
    } else {
        return false
    }
	
}

let counters = {};


function incrementCounter(counterName, parentElement) {

    if(counters[counterName] === undefined) {
        counters[counterName] = 0;
    }


    counters[counterName]++

	parentElement.innerHTML = counters[counterName]

}

let lastCardFlipped = null;


function onCardFlipped(newlyFlippedCard) {

    incrementCounter("flips", newlyFlippedCard);
    counterUI = document.getElementById('flip-count');
    counterUI.innerHTML = counters["flips"]


    if(counters['flips'] % 2 === 1) {
        lastCardFlipped = newlyFlippedCard;
    }

    if(counters['flips'] % 2 === 0) {
        newlyFlippedCard = newlyFlippedCard
        let doesItMatch = doCardsMatch(newlyFlippedCard, lastCardFlipped);
    if(doesItMatch === true) {
        let matchAudio = new Audio('audio/match.wav')
        matchAudio.play();
        incrementCounter("match", newlyFlippedCard)
        console.log(counters['match'])
        matchUI = document.getElementById('match-count');
        matchUI.innerHTML = counters["match"]
        let glow1 = newlyFlippedCard.element
        let glow2 = lastCardFlipped.element
        glow1.classList.add('border-glow')
        glow2.classList.add('border-glow')
    } else {
        newElement = newlyFlippedCard.element
        lastElement = lastCardFlipped.element
        newElement.classList.remove('flipped')
        lastElement.classList.remove('flipped')
        lastCardFlipped = null
    }
}

    if(counters['match'] === 6){
    let winAudio = new Audio('audio/win.wav')
    winAudio.play();
    }
}

function resetGame() {

    reset = document.getElementById("card-container")

    while (reset.firstChild) {
        reset.removeChild(reset.firstChild);
    }


    resetMatch = document.getElementById("match-count")
    resetFlip = document.getElementById("flip-count")
    resetMatch.innerHTML = 0
    resetFlip.innerHTML = 0

    counters = {}

    lastCardFlipped = null;

setUpGame();

}

setUpGame();