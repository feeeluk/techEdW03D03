let myGlobalArray = []

let button = document.getElementById("buttonId");

button.addEventListener("click", function(){
    
    let howManyCards = document.getElementById("howManyCards").value;
    createGlobalArray(howManyCards);
})

async function GetPokerCards(count){

    let response = await fetch("https://www.deckofcardsapi.com/api/deck/new/draw/?count="+count);
    let json = await response.json();
    let myArray = Object.entries(json);

    console.log(myArray)
    return myArray;
}

async function createGlobalArray(count){

    let array = await GetPokerCards(count);

    document.getElementById("returnedItems").innerHTML ='';

    for(let i = 0; i < array[2][1].length; i++)
        {            
            let item = {
                value:`${[giveCardActualValue(array[2][1][i].value)]}`,
                imageBack:"https://www.deckofcardsapi.com/static/img/back.png",
                imageFront:`${[array[2][1][i].image]}`
            }

            myGlobalArray.push(item)
        }

    initialDisplay(myGlobalArray);
    console.log(myGlobalArray);
}


function initialDisplay(array){

    for(let i = 0 ; i < array.length; i++) {
        let newIMG = document.createElement("img");
        newIMG.setAttribute("id", `img${[i]}`)
        newIMG.src = array[i].imageBack;
        document.getElementById("returnedItems").appendChild(newIMG);
        
        
        let newP = document.createElement("p");
        newP.setAttribute("id", `p${[i]}`)
        document.getElementById("returnedItems").appendChild(newP);
        
        let listenForCardClick = document.getElementById(`img${[i]}`);
        listenForCardClick.addEventListener("click", function(){
            document.getElementById(`img${[i]}`).src = array[i].imageFront;
            document.getElementById(`p${[i]}`).innerText = array[i].value;  
        })
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
            value = 11;
            break;

        case "QUEEN":
            value = 12;
            break;

        case "KING":
            value = 13;
            break;

        case "ACE":
            value = 1;
            break;
    }

    return value;

}
