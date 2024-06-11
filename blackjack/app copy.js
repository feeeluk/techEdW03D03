// global variables
// ******************************************************************
// ******************************************************************
let deckId = ""
let htmlDeal = document.getElementById("dealButtonId");

let dealerArray = []
let dealerTotalScore = 0 
let dealerNumberOfCards = 0
let htmlDealerSection = document.getElementById("dealerSection");
let htmlDealerScore = document.getElementById("dealerScore");
let htmlDealerNumberOfCards = document.getElementById("dealerNumberOfCards");
let htmlDealerCards = document.getElementById("dealerCards");

let playerArray = []
let playerTotalScore = 0
let playerNumberOfCards = 0
let htmlPlayerSection = document.getElementById("playerSection");
let htmlPlayerScore = document.getElementById("playerScore");
let htmlPlayerNumberOfCards = document.getElementById("playerNumberOfCards");
let htmlPlayerActions = document.getElementById("playerActions");
let htmlPlayerCards = document.getElementById("playerCards");



// global event listeners
// ******************************************************************
// ******************************************************************
htmlDeal.addEventListener("click", function(){

    // the game uses a specific deck of cards, so all game action must use the same deck
    storeDeck().then(function(){

        // initial deal (dealer)
        // get cards from API and push into array
        storeCardsInArray(deckId, 2, dealerArray).then( function(){

            // display cards
            displayCards(dealerArray, htmlDealerCards, "dealer");
    
            // calculate totalScore
            let totalScore = calculateTotalScore(dealerArray, dealerTotalScore);

            // calculate totalNumberOfCards
            let totalNumberOfCards = calculateTotalNumberOfCards(dealerArray, dealerNumberOfCards);

            // display details
            displayDetails(htmlDealerScore, totalScore, htmlDealerNumberOfCards, totalNumberOfCards);

        })
            
        // initial deal (player)
        // get cards from API and push into array
        storeCardsInArray(deckId, 2, playerArray).then( function(){

            // display cards
            displayCards(playerArray, htmlPlayerCards, "player");
    
            // calculate totalScore
            let totalScore = calculateTotalScore(playerArray, playerTotalScore);

            // calculate totalNumberOfCards
            let totalNumberOfCards = calculateTotalNumberOfCards(playerArray, playerNumberOfCards);

            // display details
            displayDetails(htmlPlayerScore, totalScore, htmlPlayerNumberOfCards, totalNumberOfCards);

            action(htmlPlayerActions, totalScore, totalNumberOfCards)

            document.getElementById("hit").addEventListener("click", function(){
                
                    // get cards from API and push into array
                    storeCardsInArray(deckId, 1, playerArray).then( function(){

                    // display cards
                    displayCards(playerArray, htmlPlayerCards, "player");
            
                    // calculate totalScore
                    let totalScore = calculateTotalScore(playerArray, playerTotalScore);

                    // calculate totalNumberOfCards
                    let totalNumberOfCards = calculateTotalNumberOfCards(playerArray, playerNumberOfCards);

                    // display details
                    displayDetails(htmlPlayerScore, totalScore, htmlPlayerNumberOfCards, totalNumberOfCards);

                    action(htmlPlayerActions, totalScore, totalNumberOfCards)
                })
            })

        })
    })
})


// functions
// ******************************************************************
// ******************************************************************    
const storeDeck = async () => {
    const deck  = await fetchDeckFromAPI();
    deckId = deck;
}

    async function fetchDeckFromAPI(){
        let response = await fetch("https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
        let json = await response.json();
        let returnedArray = Object.entries(json);

        return returnedArray[1][1];
    }


async function storeCardsInArray(deck, numberOfCardsToDeal, nameOfArray){

    let array = await fetchCardsFromAPI(deck, numberOfCardsToDeal);

    for(let i = 0; i < array[2][1].length; i++)
        {            
            let item = {
                value:`${[giveCardActualValue(array[2][1][i].value)]}`,
                imageBack:"https://www.deckofcardsapi.com/static/img/back.png",
                imageFront:`${[array[2][1][i].image]}`
            }

            nameOfArray.push(item)
        }
}

    async function fetchCardsFromAPI(deck, numberOfCards){

        let response = await fetch(`https://www.deckofcardsapi.com/api/deck/${deck}/draw/?count=${numberOfCards}`);
        let json = await response.json();
        let array = Object.entries(json);

        console.log(array)
        return array;
    }


function displayCards(nameOfArray, element, string){
    element.innerText = '';

    for(let i = 0; i < nameOfArray.length; i++) {
        
        id = string.toString();
        
        let newImg = document.createElement("img");
        newImg.setAttribute("id", `${id}img${i}`)
        newImg.src = nameOfArray[i].imageFront;
        
        let newP = document.createElement("p");
        newP.setAttribute("id", `${id}p${i}`)

        element.appendChild(newP);
        element.appendChild(newImg);     
    }
}


function calculateTotalScore(nameOfArray, totalScore){
    
    for(let i = 0; i < nameOfArray.length; i++) {

        totalScore += parseInt(nameOfArray[i].value, 10);

    }

    return totalScore;
}


function calculateTotalNumberOfCards(nameOfArray, totalNumberOfCards){

    for(let i = 0; i < nameOfArray.length; i++) {

        totalNumberOfCards++;
    }

    return totalNumberOfCards;
}
    
    
function displayDetails(score, totalScore, numberOfCards, totalNumberOfCards){

    score.innerText = totalScore;
    numberOfCards.innerText = totalNumberOfCards
}


let action = (id, totalScore, totalNumberOfCards) =>{
    
    id.innerText = ''

    if(totalScore < 21 && totalNumberOfCards < 5){
        let button = document.createElement("button")
        button.setAttribute("id", "hit")
        button.innerText = "HIT"
        id.appendChild(button)
    } else if (totalScore < 21 && totalNumberOfCards === 5){
        let button = document.createElement("button")
        button.innerText = "5 carder"
        button.setAttribute("id", "5Card")
        id.appendChild(button)
    } else {
        let button = document.createElement("button")
        button.innerText = "bust"
        button.setAttribute("id", "bust")
        id.appendChild(button)
    }

}


function giveCardActualValue(stringValue){

    let value = 0;

    switch (stringValue){

        case "2":
            value = 2;
            break;

        case "3":
            value = 3;
            break;

        case "4":
            value = 4;
            break;

        case "5":
            value = 5;
            break;

        case "6":
            value = 6;
            break;

        case "7":
            value = 7;
            break;

        case "8":
            value = 8;
            break;

        case "9":
            value = 9;
            break;

        case "10":
            value = 10;
            break;

        case "JACK":
            value = 10;
            break;

        case "QUEEN":
            value = 10;
            break;

        case "KING":
            value = 10;
            break;

        case "ACE":
            value = 1;
            break;
    }

    return value;
}
