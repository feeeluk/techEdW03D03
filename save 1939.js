// global variables
// ******************************************************************
// ******************************************************************
let minimumStayScore = 14

let deckId = ""

let dealerArray = []
let dealerSection = "dealerSection"
let dealerTotalScore = 0 
let dealerNumberOfCards = 0

let playerArray = []
let playerSection = "playerSection"
let playerTotalScore = 0
let playerNumberOfCards = 0

let htmlDeal = document.getElementById("dealButtonId");
let htmlDealerScore = document.getElementById("dealerScore");
let htmlDealerNumberOfCards = document.getElementById("dealerNumberOfCards");
let htmlPlayerScore = document.getElementById("playerScore");
let htmlPlayerNumberOfCards = document.getElementById("playerNumberOfCards");
let htmlPlayerActions = document.getElementById("playerActions");


// global event listeners
// ******************************************************************
// ******************************************************************
htmlDeal.addEventListener("click", function(){

    storeDeck().then(function(){

        // show deckId
        console.log("DeckID = " + deckId);

        // initial deal
        storeCardsInArray(deckId, 2, dealerArray, dealerSection, dealerTotalScore, dealerNumberOfCards);
        storeCardsInArray(deckId, 2, playerArray, playerSection, playerTotalScore, playerNumberOfCards);
        

        //takeAction(playerTotalScore);

    })
})


// functions
// ******************************************************************
// ******************************************************************    
async function storeDeck(){
    const deck  = await fetchDeckFromAPI();
    deckId = deck;
}


async function fetchDeckFromAPI(){
    let response = await fetch("https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
    let json = await response.json();
    let returnedArray = Object.entries(json);

    return returnedArray[1][1];
}


async function storeCardsInArray(deck, numberOfCardsToDeal, nameOfArray, elementId, totalScore, totalNumberOfCards){

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

    displayCards(nameOfArray, numberOfCardsToDeal, elementId, totalScore, totalNumberOfCards);
    console.log(nameOfArray);
}


async function fetchCardsFromAPI(deck, numberOfCards){

    let response = await fetch(`https://www.deckofcardsapi.com/api/deck/${deck}/draw/?count=${numberOfCards}`);
    let json = await response.json();
    let array = Object.entries(json);

    console.log(array)
    return array;
}


function displayCards(nameOfArray, numberOfCardsToDeal, elementId, totalScore, totalNumberOfCards){

    for(let i = 0; i < nameOfArray.length; i++) {

        let id = elementId.toString();
        
        let newImg = document.createElement("img");
        newImg.setAttribute("id", `${id}img${i}`)
        newImg.src = nameOfArray[i].imageFront;
        
        let newP = document.createElement("p");
        newP.setAttribute("id", `${id}p${i}`)

        document.getElementById(id).appendChild(newP);
        document.getElementById(id).appendChild(newImg);  
        
        totalScore += parseInt(nameOfArray[i].value, 10)
        totalNumberOfCards++      
    }

    console.log(totalScore)
    console.log(totalNumberOfCards)

    showDetails(elementId, totalScore, totalNumberOfCards)
}
    
    
function showDetails(elementId, totalScore, totalNumberOfCards){
    if(elementId === "dealerSection"){
        document.getElementById("dealerScore").innerText = totalScore;
        document.getElementById("dealerNumberOfCards").innerText = totalNumberOfCards;
    } else{
        document.getElementById("playerScore").innerText = totalScore;
        document.getElementById("playerNumberOfCards").innerText = totalNumberOfCards;
    }
}


function takeAction(totalScore){

    console.log(totalScore)
    // while(totalScore < 21 ){

    //     let createHitButton = document.createElement("button");
    //     createHitButton.innerText = "HIT"

    //     let createStayButton = document.createElement("button");
    //     createStayButton.innerText = "STAY"

    //     document.getElementById(htmlId).appendChild(createHitButton)
    //     document.getElementById(htmlId).appendChild(createStayButton)
    // }

    // if(totalScore < 21 ){
    //     let createHitButton = document.createElement("button");
    //     createHitButton.innerText = "HIT"

    //     let createStayButton = document.createElement("button");
    //     createStayButton.innerText = "STAY"

    //     document.getElementById(htmlId).appendChild(createHitButton)
    //     document.getElementById(htmlId).appendChild(createStayButton)
    // }
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