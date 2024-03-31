const UNKNOWN_TITLE="???????";

// Selects a wheel based on key press
window.addEventListener('keydown', function (e) {
    switch(e.key) {
        case 'q':
            displayDuels();
            break;
        case 'w':
            display4Player();
            break;
        case 'e':
            displayBowsers();
            break;
        case 'r':
            displayDKs();
            break;
        case 't':
            displayPrice();
            break;
        case 'a':
            displayGameRewards();
            break;
        case 's':
            displayDuelRewards();
            break;
    }
}, false)

// selectUnique returns an array of length toSelect that contain unique random numbers in the provided range
function selectUnique(toSelect, range) {
    var arr = [];
    while(arr.length < toSelect){
        var r = Math.floor(Math.random() * range);
        if(arr.indexOf(r) === -1) arr.push(r);
    }
    return arr;
}

// buildGameHTML builds the html for the options provided
//   gameMap: map of all games
//   games: array of game numbers to choose (generated from selectUnique)
//   type: name of game type. Used to populate "data-type" attribute
function buildGameHTML(gameMap, games, type) {
    var html = "";
    for (var i = 0; i < games.length; i++) {
        let game = gameMap.get(games[i]);
        let name = "";
        if (game.seen) {
            name = game.name;
        } else {
            name = UNKNOWN_TITLE;
        }
        html += '<div class="option" data-game="' + games[i] + '" data-type="' + type + '"><p>' + name + '</p></div>';
    }
    return html;
}

function buildPriceHTML(prices) {
    var html = "";
    for (var i = 0; i < prices.length; i++) {
        let name = prices[i];
        html += '<div class="option" id="price' + i + '"><p>' + name + '</p></div>';
    }
    return html;
}

function buildGameRewardHTML(rewards, numRewards) {
    var arr = selectUnique(numRewards, rewards.length);
    var html = "";
    for (var i = 0; i < arr.length; i++) {
        let reward = arr[i];
        html += '<div class="option"><p>' + rewards[reward] +'</p></div>';
    }
    return html
}

// displayRandomGames updates the options to be displayed
function displayRandomGames(optionsDisplayed, gamesMap, gameType) {
    var arr = selectUnique(optionsDisplayed, gamesMap.size);
    var html = buildGameHTML(gamesMap, arr, gameType);
    document.getElementById("wheel").innerHTML = html;
}

function displayPrices(prices) {
    var html = buildPriceHTML(prices);
    document.getElementById("wheel").innerHTML = html;
}

const DUELS_DISPLAYED = 3;
const DUEL_TYPE = "duel";
const DUEL_GAMES = new Map([
    [0, {name: "Klask", seen: false}],
    [1, {name: "Foosketball", seen: false}],
    [2, {name: "Mitten Masters", seen: false}],
    [3, {name: "Getting Handsy", seen: false}],
    [4, {name: "Stacks on Stacks", seen: false}],
    [5, {name: "Ball Brawl", seen: false}],
    [6, {name: "Thar She Blows", seen: false}],
]);
function displayDuels() {
    document.getElementById("title").innerHTML = "Duel Minigame!";
    displayRandomGames(DUELS_DISPLAYED, DUEL_GAMES, DUEL_TYPE);
    selectGame();
}

const FOURS_DISPLAYED = 4;
const FOURS_TYPE = "four";
const FOUR_GAMES = new Map([
    [0, {name: "Blow the Joker", seen: false}],
    [1, {name: "Loony Spoons", seen: false}],
    [2, {name: "Ping Pong Panic", seen: false}],
    [3, {name: "Scrabble Dabble", seen: false}],
    [4, {name: "Air Headed", seen: false}],
    [5, {name: "Touch the Cat", seen: false}],
    [6, {name: "On a Roll", seen: false}],
    [7, {name: "Cash Grab", seen: false}],
    [8, {name: "Matchsticks", seen: false}],
    [9, {name: "Cups and Downs", seen: false}],
    [10, {name: "Catch Me If You Can", seen: false}],
    [11, {name: "Got Your Back", seen: false}],
    [12, {name: "A Dicey Alliance", seen: false}],
]);
function display4Player() {
    document.getElementById("title").innerHTML = "Free For All Minigame!";
    displayRandomGames(FOURS_DISPLAYED, FOUR_GAMES, FOURS_TYPE);
    selectGame();
}

const BOWSER_DISPLAYED = 3;
const BOWSER_TYPE = "bowser";
const BOWSER_GAMES = new Map([
    [0, {name: "Money Shot", seen: false}],
    [1, {name: "Long Shot", seen: false}],
    [2, {name: "Big Shot", seen: false}],
]);
function displayBowsers() {
    document.getElementById("title").innerHTML = "Bowser Minigame!";
    displayRandomGames(BOWSER_DISPLAYED, BOWSER_GAMES, BOWSER_TYPE);
    selectGame();
}

const DK_DISPLAYED = 3;
const DK_TYPE = "dk";
const DK_GAMES = new Map([
    [0, {name: "Fork 'em Over", seen: false}],
    [1, {name: "Cup, Cup, and Away", seen: false}],
    [2, {name: "Hips Don't Lie", seen: false}],
]);
function displayDKs() {
    document.getElementById("title").innerHTML = "Donkey Kong Minigame!";
    displayRandomGames(DK_DISPLAYED, DK_GAMES, DK_TYPE);
    selectGame();
}

const PRICE_OPTIONS = ["1 Can", "2 Cans", "3 Cans"];
function displayPrice() {
    document.getElementById("title").innerHTML = "New Star Price...";
    displayPrices(PRICE_OPTIONS);
    selectGame();
}

const GAME_REWARDS = [
    "+3 to Dice Roll",
    "+2 to Dice Roll",
    "+2 to Dice Roll",
    "+1 to Dice Roll",
    "+1 to Dice Roll",
    "+1 to Dice Roll",
    "Free Re-Roll",
    "A Beer",
    "-1 Dice Roll to Someone Else",
    "Nothing!",
];
function displayGameRewards() {
    document.getElementById("title").innerHTML = "Minigame Reward...";
    html = buildGameRewardHTML(GAME_REWARDS, 4);
    document.getElementById("wheel").innerHTML = html;
    selectGame();
}

const DUEL_REWARDS = [
    "Swap Places",
    "Give a Jello Shot",
    "Give a Jello Shot",
    "Steal a Beer",
    "Steal a Star",
    "Move Loser 3 Spaces",
    "Winner Moves 3 Spaces",
];
function displayDuelRewards() {
    document.getElementById("title").innerHTML = "Duel Reward...";
    html = buildGameRewardHTML(DUEL_REWARDS, 3);
    document.getElementById("wheel").innerHTML = html;
    selectGame();
}

// Variables for configuring the winner settings
const FLASHES = 20; // must be even
const FLASH_SPEED = 100;

// Update the price
function updatePrice(choice) {
    let newPrice = choice.textContent;
    let currentPrice = document.getElementById("currentPrice");
    currentPrice.textContent = newPrice;
}

// set the chosen game as seen and update the text from ???????
function revealChoice(choice) {
    num = choice.getAttribute("data-game");
    games = null;
    switch(choice.getAttribute("data-type")) {
        case DUEL_TYPE:
            games = DUEL_GAMES;
            break;
        case BOWSER_TYPE:
            games = BOWSER_GAMES;
            break;
        case FOURS_TYPE:
            games = FOUR_GAMES;
            break;
        case DK_TYPE:
            games = DK_GAMES;
            break;
    }
    game = games.get(parseInt(num));
    game.seen = true;
    games.set(parseInt(num), game);
    choice.innerHTML = "<p>" + game.name + "</p>";
}

// Make the winning option flash. Note: FLASH_SPEED needs to be even, otherwise the winner ends up de-highlighted
function winner() {    
    let i = 0;
    let choice = document.getElementsByClassName("highlighted")[0];

    let myId = choice.getAttribute("id");
    if (myId != null && myId.includes("price")) {
        updatePrice(choice);
    }

    // play the winning sound
    //var sfx = document.querySelector('input[name="win"]:checked').value;
    var sfx = "win1.wav";
    let flashes = FLASHES;
    let flash_speed = FLASH_SPEED;
    switch(sfx) {
        case "win1.wav":
            flash_speed = 150;
            flashes = 6;
            break;
        case "win2.wav":
            flashes = 20;
            break;
        case "win3.wav":
            flashes = 18;
            break;
        case "win4.wav":
            flashes = 20;
            break;
        case "win5.wav":
            flashes = 6;
            flash_speed = 300;
            break;
    }
    var sound = new Audio("sounds/"+sfx);
    sound.play();
    id = setInterval(flash, flash_speed);

    // reveal the choice if it hasn't been revealed yet
    if (choice.textContent == UNKNOWN_TITLE) {
        revealChoice(choice);
    }
    function flash() {
        if (i == flashes) {
            clearInterval(id);
        } else {
            let myClass = choice.getAttribute("class");
            if (myClass.includes("highlighted")) {
                choice.setAttribute("class","option");
            } else {
                choice.setAttribute("class","highlighted option");
            }
            i++;
        }
    }
}

// Variables for configuring the selectGame settings
const ITERATIONS = 10; //default 60
const SPEED_BASE = 1.04;
const START_SPEED = 75;

// selectGame randomly selects a game from the list currently visible
function selectGame() {
    // Start at a random position
    let numOpts = document.getElementsByClassName("option").length;
    let position = Math.floor(Math.random()*numOpts);
    const iterations = ITERATIONS + position;
    
    let id = null;
    let speed = START_SPEED;
    clearInterval(id);
    id = setInterval(cycle_options, speed);
    
    // cycle the highlighted option. The winner is already chosen, but this makes it fun
    function cycle_options() {
        if (position == iterations) {
            clearInterval(id);
            winner();
        } else {
            // deselect currently highlighted option
            var highlighted = document.getElementsByClassName("highlighted");
            for (var i = 0; i < highlighted.length; i++) {
                highlighted[i].setAttribute("class","option");
            }
            
            // highlight our new option
            var opts = document.getElementsByClassName("option");
            opts[position%numOpts].setAttribute("class", "highlighted option");
            position++;

            // play a sound
            // currently uses the radio buttons for testing, once a sound is selected,
            // uncomment code to use it. Needs the pause otherwise it plays poorly
            var sound = document.getElementById("beep");
            //var sfx = document.querySelector('input[name="sfx"]:checked').value;
            //var sound = new Audio("sounds/"+sfx);
            sound.pause();
            sound.currentTime = 0;
            sound.play();
            
            // increase the interval at which we cycle through the options exponentially
            // gives it a nice "slowing down" feel. Linear doesn't feel as nice
            speed += Math.pow(SPEED_BASE, position);
            clearInterval(id);
            id = setInterval(cycle_options, speed);
        }
    }
}
