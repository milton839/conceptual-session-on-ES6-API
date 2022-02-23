// 1. button event handler setup
// 2. get input value
// error handling for string value

// https://deckofcardsapi.com/api/deck/new/draw/?count=10
// https://api.thedogapi.com/v1/breeds
const main = document.getElementById("main");
const searchButton = () =>{
    const input = document.getElementById("input-value");
    const error = document.getElementById("error");
    

    const inputValue = parseInt(input.value);
    if(isNaN(inputValue) || inputValue==""){ //isNaN check number or string /others-true
        // alert("Please enter a number");
        error.innerText="please give a number";
        input.value="";
        main.innerHTML="";
    }
    else if(inputValue <= 0){
        error.innerText="Please give a positive number";
        input.value="";
        main.innerHTML="";
    }
    else{
        main.innerHTML="";
        fetch(`https://deckofcardsapi.com/api/deck/new/draw/?count=${inputValue}`)
        .then(res => res.json())
        .then(data => cardsDisplay(data.cards))

        input.value="";
        error.innerHTML=""
    }
}

const cardsDisplay = (cards) =>{
    // cards = cards.cards;
    console.log(cards);
    for(const card of cards){
        console.log(card);
        const div = document.createElement("div");
        div.classList.add("col-lg-4")
        div.classList.add("mb-5")
        div.innerHTML=`
            <div class="card" style="width: 18rem;">
                <img src="${card.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${card.suit}</h5>
                    <p class="card-text">${card.code}</p>
                    <button onclick="cardDetails('${card.code}')" class="btn btn-primary">See Details</button>
                </div>
            </div>
        `
        main.appendChild(div)
    }
}

const cardDetails = (code) =>{
    fetch(`https://deckofcardsapi.com/api/deck/new/draw/?count=52`)
        .then(res => res.json())
        .then(data => {
            const allCards = data.cards;
            const singleCard = allCards.find(card => card.code === code)
            const div = document.createElement("div");
            main.innerHTML="";
            div.innerHTML=`
                <div class="card" style="width: 18rem;">
                    <img src="${singleCard.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${singleCard.suit}</h5>
                        <p class="card-text">${singleCard.code}</p>
                        <p class="card-text">${singleCard.value}</p>
                    </div>
                </div>
            `
            main.appendChild(div)
        })
}