/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data

    games.forEach(game => {
        
    
        // create a new div element, which will become the game card
        const DivNew = document.createElement('div');

        // add the class game-card to the list
        DivNew.classList.add('game-card');

        // set the inner HTML using a template literal to display some info 
        DivNew.innerHTML = `
            <img src = "${game.img}" class = "game-img">
            <h2>${game.name}</h2>
            <p>${game.description}</p>
            <p>Backers: ${game.backers}</p>
        `;
        // append the game to the games-container
        gamesContainer.appendChild(DivNew);
    });

}
// call the function we just defined using the correct variable

addGamesToPage(GAMES_JSON);

// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const no_of_Backers = GAMES_JSON.reduce((a, game) => a + game.backers, 0);
const no_of_Backers_string = no_of_Backers.toLocaleString('en-US');
contributionsCard.innerText = `${no_of_Backers_string}`;


// set the inner HTML using a template literal and toLocaleString to get a number with commas
const total_Amount=GAMES_JSON.reduce((a,game) => a+game.pledged,0)
const total_Amount_string=total_Amount.toLocaleString('en-US')

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
// set inner HTML using template literal
raisedCard.innerText = `$ "${total_Amount_string}"`;



// grab number of games card and set its inner HTML
const totalGames = GAMES_JSON.length;
const gamesCard = document.getElementById("num-games");
gamesCard.innerText = `${totalGames}`;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);
    // use filter() to get a list of games that have not yet met their goal
    const GoalNotMet = GAMES_JSON.filter((game) => game.pledged < game.goal);
    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(GoalNotMet);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const GoalMet = GAMES_JSON.filter((game) => game.pledged >= game.goal);
    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(GoalMet);

}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);

}

// select each button in the "Our Games" section
const unfundedgames = document.getElementById("unfunded-btn");
const fundedgames = document.getElementById("funded-btn");
const allgames = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedgames.addEventListener("click", filterUnfundedOnly);
fundedgames.addEventListener("click", filterFundedOnly);
allgames.addEventListener("click", showAllGames);



/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfundedGamesTotal = GAMES_JSON.filter(game => game.pledged < game.goal);


// create a string that explains the number of unfunded games using the ternary operator
let numUnfundedString = `${(unfundedGamesTotal.length == 1) ? `A total of $${total_Amount_string} has been raised for ${totalGames} games. Currently, ${unfundedGamesTotal.length} game remains unfunded. We need your help to fund these amazing games!` : `A total of $${total_Amount_string} has been raised for ${totalGames} games. Currently, ${unfundedGamesTotal.length} games remain unfunded. We need your help to fund these amazing games!`}`;



// create a new DOM element containing the template string and append it to the description container
const newParaElement = document.createElement('p');
newParaElement.innerText = numUnfundedString;
descriptionContainer.appendChild(newParaElement);


/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGame = document.getElementById("first-game");
const secondGame = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [{name: nameSGame1, description: descriptionSGame1, pledged: pledgedSGame1, goal: goalSGame1, backers: backersSGame1, img: imgSGame1}, {name: nameSGame2, description: descriptionSGame2, pledged: pledgedSGame2, goal: goalSGame2, backers: backersSGame2, img: imgSGame2}, ...remainingGames] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
const newElement1 = document.createElement('newElement1');
newElement1.innerText = nameSGame1;
firstGame.appendChild(newElement1);

// do the same for the runner up item
const newElement2 = document.createElement('newElement2');
newElement2.innerText = nameSGame2;
secondGame.appendChild(newElement2);