const UNKNOWN_TITLE="???????";

// selectUnique returns an array of length toSelect that contain unique random numbers in the provided range
function selectUnique(toSelect, range) {
    var arr = [];
    while(arr.length < toSelect){
        var r = Math.floor(Math.random() * range);
        if(arr.indexOf(r) === -1) arr.push(r);
    }
    return arr;
}

// buildOptionHTML builds the html for the options provided
//   gameMap: map of all games
//   games: array of game numbers to choose (generated from selectUnique)
//   type: name of game type. Used to populate "data-type" attribute
function buildOptionHTML(gameMap, games, type) {
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

// displayOptions updates the options to be displayed
function displayOptions(optionsDisplayed, gamesMap, gameType) {
    var arr = selectUnique(optionsDisplayed, gamesMap.size);
    console.log(arr);

    var html = buildOptionHTML(gamesMap, arr, gameType);
    console.log(html);

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
    displayOptions(DUELS_DISPLAYED, DUEL_GAMES, DUEL_TYPE);
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
]);
function display4Player() {
    displayOptions(FOURS_DISPLAYED, FOUR_GAMES, FOURS_TYPE);
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
    displayOptions(DOUBLES_DISPLAYED, DOUBLE_GAMES, DOUBLES_TYPE);
    selectGame();
}

// Variables for configuring the selector settings
const ITERATIONS = 60;
const START_SPEED = 75;
const SPEED_BASE = 1.04;
const FLASHES = 8;
const FLASH_SPEED = 100;

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
            //var sound = document.getElementById("beep");
            var sfx = document.querySelector('input[name="sfx"]:checked').value;
            var sound = new Audio("sounds/"+sfx);
            //sound.pause();
            //sound.currentTime = 0;
            sound.play();
            
            // increase the interval at which we cycle through the options exponentially
            // gives it a nice "slowing down" feel. Linear doesn't feel as nice
            speed += Math.pow(SPEED_BASE, position);
            clearInterval(id);
            id = setInterval(cycle_options, speed);
        }
    }

    // make the winning option flash. Note: FLASH_SPEED needs to be even, otherwise the winner ends up de-highlighted
    function winner() {
        id = setInterval(flash, FLASH_SPEED);
        let i = 0;
        let choice = document.getElementsByClassName("highlighted")[0]
        
        // reveal the choice if it hasn't been revealed yet
        if (choice.textContent == UNKNOWN_TITLE) {
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
            choice.textContent = game.name;
        }
        function flash() {
            if (i == FLASHES) {
                clearInterval(id);
            } else {
                let myClass = choice.getAttribute("class");
                if (myClass == "highlighted option") {
                    choice.setAttribute("class","option");
                } else {
                    choice.setAttribute("class","highlighted option");
                }
                i++;
            }
        }
    }
}