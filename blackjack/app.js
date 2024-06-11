let minimum = 14
let dealerArray = []
let playerArray = []

let htmlDealerSection = document.getElementById("dealerSection");
let htmlDealerScore = document.getElementById("dealerScore");
let htmlDealerNumberOfCards = document.getElementById("dealerNumberOfCards");
let htmlDealerCards = document.getElementById("dealerCards");


let htmlPlayerSection = document.getElementById("playerSection");
let htmlPlayerScore = document.getElementById("playerScore");
let htmlPlayerNumberOfCards = document.getElementById("playerNumberOfCards");
let htmlPlayerActions = document.getElementById("playerActions");
let htmlPlayerCards = document.getElementById("playerCards");




// global event listeners
// ******************************************************************
// ******************************************************************
let htmlDeal = document.getElementById("dealButtonId");

htmlDeal.addEventListener("click", function(){
    main()
})


// functions
// ******************************************************************
// ******************************************************************
async function main(){
    try{
        const deckId = await fetchDeckFromAPI()

        const dealerFirstCard = await storeCardsInArray(deckId, 1, dealerArray)
        const displayDealerFirstCard = await displayCards(dealerArray, htmlDealerCards, "dealerSection", false)
        const dealerSecondCard = await storeCardsInArray(deckId, 1, dealerArray)
        const displayDealerSecondCard = await displayCards(dealerArray, htmlDealerCards, "dealerSection", true)

        const playerFirstCard = await storeCardsInArray(deckId, 1, playerArray)
        const displayPlayerFirstCard = await displayCards(playerArray, htmlPlayerCards, "playerSection", true)
        const playerSecondCard = await storeCardsInArray(deckId, 1, playerArray)
        const displayPlayerSecondCard = await displayCards(playerArray, htmlPlayerCards, "playerSection", true)
        const calculatePlayerInitialScore = calculateTotalScore(playerArray, 0)
        const displayPlayerDetails = displayDetails(htmlPlayerScore, calculatePlayerInitialScore, htmlPlayerNumberOfCards, 2)
        
        // player round 1
        const playerStick = stick(htmlPlayerActions, calculatePlayerInitialScore, 2)
        
            let htmlPlayerRound1 = document.getElementById("stick");
            htmlPlayerRound1.addEventListener("click", function(){
                    alert("stick")
                })

        const playerHit = hit(htmlPlayerActions, calculatePlayerInitialScore, 2)
        const playerBust = bust(htmlPlayerActions, calculatePlayerInitialScore)

        // player round 2
        // player round 3
     
        // dealer round 1 (reveal)
        // dealer round 2
        // dealer round 3
        // dealer round 4

        // winner

    }
    catch{

    }
}

// the game uses a specific deck of cards, so all game action must use the same deck
const fetchDeckFromAPI = async () => {

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
                "value":giveCardActualValue(array[2][1][i].value),
                "imageBack":"https://www.deckofcardsapi.com/static/img/back.png",
                "imageFront":array[2][1][i].image
            }
            nameOfArray.push(item)
            console.log(item)
        }
}

async function fetchCardsFromAPI(deck, numberOfCards){

    let response = await fetch(`https://www.deckofcardsapi.com/api/deck/${deck}/draw/?count=${numberOfCards}`);
    let json = await response.json();
    let array = Object.entries(json);

    return array;
}


function displayCards(nameOfArray, element, string, showFace){
    
    //element.innerText = '';

    for(let i = nameOfArray.length-1; i < nameOfArray.length; i++) {
        
        id = string.toString();
        
        let newImg = document.createElement("img");
        newImg.setAttribute("id", `${id}img${i}`)
        if(showFace === true){
            newImg.src = nameOfArray[i].imageFront;
        } else {
            newImg.src = nameOfArray[i].imageBack;
        }
        
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
    
    
function displayDetails(htmlScore, totalScore, htmlNumberOfCards, totalNumberOfCards){

    htmlScore.innerText = totalScore;
    htmlNumberOfCards.innerText = totalNumberOfCards
}


let stick = (id, totalScore, totalNumberOfCards) =>{

    if(totalScore <= 21 && totalNumberOfCards <= 5 && totalScore >= minimum){
        let button = document.createElement("button")
        button.setAttribute("id", "stick")
        button.innerText = "STICK"
        id.appendChild(button)
    } 
}

let hit = (id, totalScore, totalNumberOfCards) =>{

    if(totalScore <= 21 && totalNumberOfCards <= 5 && totalScore){
        let button = document.createElement("button")
        button.setAttribute("id", "hit")
        button.innerText = "HIT"
        id.appendChild(button)
    } 
}

let bust = (id, totalScore) =>{

    if(totalScore > 21){
        let button = document.createElement("button")
        button.setAttribute("id", "bust")
        button.innerText = "BUST"
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
