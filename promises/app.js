async function fetchDeckFromAPI(){
    let response = await fetch("https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
    let json = await response.json();
    let returnedArray = Object.entries(json);

    return returnedArray[1][1];
}

let x = fetchDeckFromAPI()
console.log(x)