const UNKNOWN_TITLE="???????";

window.addEventListener('keydown', function (e) {
    switch(e.key) {
        case 'q':
            displayDuels();
            break;
        case 'w':
            display4Player();
            break;
        case 'e':
            displayDoubles();
            break;
        case 'r':
            displayPrice();
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

// displayRandomGames updates the options to be displayed
function displayRandomGames(optionsDisplayed, gamesMap, gameType) {
    var arr = selectUnique(optionsDisplayed, gamesMap.size);
    console.log(arr);

    var html = buildGameHTML(gamesMap, arr, gameType);
    console.log(html);

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
    [3, {name: "Show and Tell!", seen: false}],
    [4, {name: "Spaghetti Slice", seen: false}],
    [5, {name: "Trace Race", seen: false}],
    [6, {name: "Getting Handsy", seen: false}],
]);
function displayDuels() {
    displayRandomGames(DUELS_DISPLAYED, DUEL_GAMES, DUEL_TYPE);
    selectGame();
}

const FOURS_DISPLAYED = 4;
const FOURS_TYPE = "four";
const FOUR_GAMES = new Map([
    [0, {name: "Blow the Joker", seen: false}],
    [1, {name: "Eye to Eye", seen: false}],
    [2, {name: "Fork 'em Over", seen: false}],
    [3, {name: "Cereal Thrillers", seen: false}],
    [4, {name: "Loony Spoons", seen: false}],
    [5, {name: "Ping Pong Panic", seen: false}],
    [6, {name: "Stacks on Stacks", seen: false}],
    [7, {name: "Hips Don't Lie", seen: false}],
    [8, {name: "Scrabble Dabble", seen: false}],
    [9, {name: "Air Headed", seen: false}],
    [10, {name: "Touch the Cat", seen: false}],
    [11, {name: "On a Roll", seen: false}],
    [12, {name: "Money Grab", seen: false}],
]);
function display4Player() {
    displayRandomGames(FOURS_DISPLAYED, FOUR_GAMES, FOURS_TYPE);
    selectGame();
}

const DOUBLES_DISPLAYED = 3;
const DOUBLES_TYPE = "double";
const DOUBLE_GAMES = new Map([
    [0, {name: "Got Your Back", seen: false}],
    [1, {name: "Puzzle Partners", seen: false}],
    [2, {name: "Catch Me If You Can", seen: false}],
]);
function displayDoubles() {
    displayRandomGames(DOUBLES_DISPLAYED, DOUBLE_GAMES, DOUBLES_TYPE);
    selectGame();
}

const PRICE_OPTIONS = ["1 Can", "2 Cans", "3 Cans"];
function displayPrice() {
    displayPrices(PRICE_OPTIONS);
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
    game = null;
    switch(choice.getAttribute("data-type")) {
        case DUEL_TYPE:
            game = DUEL_GAMES.get(parseInt(num));
            game.seen = true;
            DUEL_GAMES.set(parseInt(num), game);
            break;
        case DOUBLES_TYPE:
            game = DOUBLE_GAMES.get(parseInt(num));
            game.seen = true;
            DOUBLE_GAMES.set(parseInt(num), game);
            break;
        case FOURS_TYPE:
            game = FOUR_GAMES.get(parseInt(num));
            game.seen = true;
            FOUR_GAMES.set(parseInt(num), game);
            break;
    }
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
