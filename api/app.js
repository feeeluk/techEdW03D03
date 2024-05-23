let button = document.getElementById("buttonId");
button.addEventListener("click", function(){
    let howManyCards = document.getElementById("howManyCards").value;
    ShowData(howManyCards);
})

async function GetPokerCards(count)
{
    let response = await fetch("https://www.deckofcardsapi.com/api/deck/new/draw/?count="+count);
    let json = await response.json();
    let myArray = Object.entries(json);

    return myArray;
}

async function ShowData(count)
{
    let array = await GetPokerCards(count);

    document.getElementById("returnedItems").innerHTML ='';

    for(let i = 0; i < array[2][1].length; i++)
        {
            console.log(array[2][1][i].image)
            let newIMG = document.createElement("img");
            newIMG.src = array[2][1][i].image;
            document.getElementById("returnedItems").appendChild(newIMG);
        }
}