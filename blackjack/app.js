// global variables
// ******************************************************************
// ******************************************************************
let deckId = ""

let playerArray = []
let dealerArray = []

let dealerTotal = 0 
let playerTotal = 0

let button = document.getElementById("buttonId");
let dealerScore = document.getElementById("dealerScore");
let playerScore = document.getElementById("playerScore")


// global event listeners
// ******************************************************************
// ******************************************************************
button.addEventListener("click", function(){

    let howManyCards = 2;
    let player = "playerSection";
    let dealer = "dealerSection";

    populateArray(howManyCards, playerArray, player);
    populateArray(howManyCards, dealerArray, dealer);
})


// functions
// ******************************************************************
// ******************************************************************
async function populateArray(numberOfCards, nameOfArray, elementId){

    let array = await GetPokerCards(numberOfCards);

    for(let i = 0; i < array[2][1].length; i++)
        {            
            let item = {
                value:`${[giveCardActualValue(array[2][1][i].value)]}`,
                imageBack:"https://www.deckofcardsapi.com/static/img/back.png",
                imageFront:`${[array[2][1][i].image]}`
            }

            nameOfArray.push(item)
        }

    initialDisplay(nameOfArray, elementId);
    console.log(nameOfArray);
}


async function GetPokerCards(count){

    let response = await fetch("https://www.deckofcardsapi.com/api/deck/new/draw/?count="+count);
    let json = await response.json();
    let myArray = Object.entries(json);

    console.log(myArray)
    return myArray;
}


function initialDisplay(array, elementId){

    for(let i = 0 ; i < array.length; i++) {

        let id = elementId.toString();
        
        let newImg = document.createElement("img");
        newImg.setAttribute("id", `${id}img${i}`)
        newImg.src = array[i].imageFront;
        
        let newP = document.createElement("p");
        newP.setAttribute("id", `${id}p${i}`)

        document.getElementById(id).appendChild(newP);
        document.getElementById(id).appendChild(newImg);  
        
        if(id === "dealerSection"){
            dealerTotal += parseInt(array[i].value, 10)
        } else if(id === "playerSection"){
            playerTotal += parseInt(array[i].value, 10)
        }       
    }

    console.log(dealerTotal)
    console.log(playerTotal)
    dealerScore.innerText = dealerTotal;
    playerScore.innerText = playerTotal;
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