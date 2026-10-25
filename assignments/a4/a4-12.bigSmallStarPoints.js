var canvas;
var ctx;
var w = 1000;
var h = 750;
var colour = [40, 45, 50, 55, 60]; // color array for star colors

var player = {
    x: w/2,
    y: h - 40,
    w: 120,
    h: 20,
    c: 200,
    a: 1,
    change: {x: 0, y: 0, w: 0, h: 0, c: 0, a: 0}
}

var allStars = []; //// array that holds all the star objects which are falling towards the player during the game.
var interval; // holds setInterval so that it can then be stopped by clearInterval when the game ends.
var timerInterval; /// holds the setInterval so that clearInterval can stop the countdown timer when the game ends.
var speedInterval; // holds the setInterval so that clearInterval can stop the speed increase interval when the game ends.
var score = 0; //// holds how many points the player has earned based on how many stars have collided with the player rectangle, identical to the score keeper we learned in module 11
var timer = counter(-1, 60); // holds the timer and also defines the duration of the game, I started with 30 seconds but increased it to 60 because it takes a little while to get used to the game.
var gameOver = false; /// when this variable turns from false to true the animation loop stops drawing stars and shows the game over screen.
var started = false; // defines when the game has started, which prevents the game from doing so when the title screen and instruction page are on screen.
var instructions = false; //// defines when the instructions screen is shown, it turns from false to true when the first mouseclick is made.
var fallSpeed = 1.5; // this holds the starting speed of the falling stars, which is then increased over the durration of the game with setInterval

setUpCanvas();

document.getElementById("canvas").onclick = click; //// this is the first interactive part from the player, the mouse clicks which control the different screens and actually starting the game
document.onkeydown = keydown; // this is the second interactive part from the player, how the actual game is played with the keyboard arrows.

animationLoop(); /// calls the animation loop which also holds the initial start screen and instruction screen.

////////// function section //////////

function animationLoop(){
    clear();

    if(!started && !instructions){ //// IF the game hasn't started AND the instructions screen isn't showing yet, show the START SCREEN
        startScreen();
        requestAnimationFrame(animationLoop);
        return;
    }

    if(instructions && !started){ /// IF the instructions screen is showing, show the INSTRUCTIONS SCREEN until the player clicks
        instructionsScreen();
        requestAnimationFrame(animationLoop);
        return;
    }

    ctx.beginPath(); // begins creation of the text
    ctx.font = "40px Trebuchet MS"; //// Trebuchet MS is a web safe font which looks better to me than plain Arial
    ctx.fillStyle = "white";
    ctx.textAlign = "left"; // from W3Schools
    ctx.fillText("Score: " + score, 20, 55);
    ctx.textAlign = "right";
    ctx.fillText("Time: " + timer.getCurrentCount(), w - 20, 55);
    ctx.textAlign = "left";

    if(gameOver){ /// once the timer runs out this stops the game and shows the end screen
        ctx.fillText("Game Over", 370, h/2);
        ctx.fillText("Final Score: " + score, 310, h/2 + 60);
        requestAnimationFrame(animationLoop);
        return;
    }

    updateProperties_rect(player);
    if(player.x - player.w/2 < 0){ player.x = player.w/2; player.change.x = 0; }
    if(player.x + player.w/2 > w){ player.x = w - player.w/2; player.change.x = 0; }
    rect(player);

    for(var i=0; i<allStars.length; i++){
        starRotate(allStars[i]);
        allStars[i].y += allStars[i].speed;
        allStars[i].angle += allStars[i].change.angle;
        allStars[i].c += allStars[i].change.c;

        if(allStars[i].y > h + 50){ /// if a star reaches the bottom without being caught, remove it from the array
            allStars.splice(i, 1);
        } else if(
            player.x + player.w/2 > allStars[i].x - allStars[i].w/2
            && player.x - player.w/2 < allStars[i].x + allStars[i].w/2
            && player.y + player.h/2 > allStars[i].y - allStars[i].h/2
            && player.y - player.h/2 < allStars[i].y + allStars[i].h/2
        ){
            if(allStars[i].w > 35){ // if else for deciding which sized star gives what points, big stars give more for now, will change this later
                score += 3; /// bigger stars give 3 points here, though i later realized this doesnt make sense since theyre easier to catch
            } else {
                score += 1; // smaller stars give 1 point
            }
            allStars.splice(i, 1); //// removes/splices the caught star from the array
        }
    }

    requestAnimationFrame(animationLoop);
}

function startGame(){ // I wanted a 'play again' method, so this restarts the game with a function
    allStars = [];
    score = 0;
    timer = counter(-1, 60);
    gameOver = false;
    fallSpeed = 1.5;
    player.x = w/2;
    player.change.x = 0;

    clearInterval(interval);
    clearInterval(timerInterval);
    clearInterval(speedInterval);

    interval = setInterval(function(){
        if(!gameOver){
            allStars.push(createData_star());
        }
    }, 1200);

    timerInterval = setInterval(function(){
        if(!gameOver){
            timer.increment();
            if(timer.getCurrentCount() <= 0){
                gameOver = true;
                clearInterval(interval);
                clearInterval(timerInterval);
                clearInterval(speedInterval);
            }
        }
    }, 1000);

    speedInterval = setInterval(function(){
        if(!gameOver){
            fallSpeed += 0.5;
            for(var i=0; i<allStars.length; i++){
                allStars[i].speed += 0.5;
            }
        }
    }, 5000);
}

function startScreen(){ // this function draws the title screen, i wanted it because it made it feel more like a game
    textBig("STAR CATCHER", w/2, h/2); // I increased the size of the title by creating a function for different sizes of text, in this case 'textBig' being like h1 for my texts
    textSmall("Click to Continue", w/2, h/2 + 80);
}

function instructionsScreen(){ // draws the instruction screen, I felt like I needed to include this because the game can be a tad hard to get instantly.
    text("How To Play", w/2, 160);
    textSmall("-----------------------------------------------------------------", w/2, 210); /// these seperator lines helped stopping this screen from looking like a wall of text, just my personal aesthetic choice
    textSmallLeft("/ ← → Keys To Move Bar", 230, 265); //// I created a seperate left aligned function for these because they looked better left aligned.
    textSmallLeft("/ Opposite Key To Slow Down", 230, 310);
    textSmallLeft("/ Tap Twice To Speed Up", 230, 355);
    textSmall("-----------------------------------------------------------------", w/2, 400);
    textSmallLeft("/ Big Star = 3 Points", 230, 450); // big stars give more here, will swap this later
    textSmallLeft("/ Small Star = 1 Point", 230, 495);
    textSmall("-----------------------------------------------------------------", w/2, 540);
    text("Click To Play", w/2, 620);
}

function click(event){ /// checks the mouse click events
    if(!started && !instructions){
        instructions = true;
    } else if(instructions && !started){ //// second click starts the game for the first time
        started = true;
        startGame();
    } else if(gameOver){
        startGame();
    }
}

function keydown(event){ // adds to change.x to change the movement of the player bar based on keyboard input
    if(event.key == "ArrowLeft"){
        event.preventDefault(); /// prevents the page from scrolling when arrow keys are pressed, we did this in module 9 too
        player.change.x += -5; // each left press adds -5 to the velocity, holding it or pressing it multiple times builds up speed
    } else if(event.key == "ArrowRight"){
        event.preventDefault();
        player.change.x += 5; //// each right press adds 5 to the velocity
    }
}

function createData_star(){ // creates the data for the randomly created stars with the random elements in this function.
    var size = 15 + rand(40); /// random size between 15 and 55 so small and big stars look clearly differnt from each other
    return {
        x: rand(w),
        y: -50,
        w: size,
        h: size, /// this takes the rand(40) from the size variable above, when I just used it as is the stars became kind of wonky which i didnt want.
        c: colour[randi(colour.length)],
        a: 1,
        angle: rand(360),
        speed: fallSpeed + rand(1),
        change: {angle: randn(3), c: randn(0.3)}
    }
}

function counter(incrementValue, startValue){ // creates the counter for the game
    var count = startValue;
    return {
        increment: increment,
        getCurrentCount: getCurrentCount
    }
    function getCurrentCount(){
        return count; //// returns the current value of count
    }
    function increment(){
        count += incrementValue;
    }
}

function updateProperties_rect(o){ // updates the properties of the rectangle
    o.x += o.change.x;
    o.y += o.change.y;
    o.w += o.change.w;
    o.h += o.change.h;
    o.c += o.change.c;
    o.a += o.change.a;
}

function text(t, x, y){ /// this creates the basic text, what I'd consider creating my own 'p' tag like we do in HTML.
    ctx.beginPath();
    ctx.font = "40px Trebuchet MS";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(t, x, y);
    ctx.textAlign = "left";
}

function textSmall(t, x, y){ // this customizes specifically the smaller text to choose its size, alignement and color
    ctx.beginPath();
    ctx.font = "30px Trebuchet MS";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(t, x, y);
    ctx.textAlign = "left";
}

function textSmallLeft(t, x, y){ //// same as the normal textSmall but I wanted certain texts left aligned
    ctx.beginPath();
    ctx.font = "30px Trebuchet MS";
    ctx.fillStyle = "white";
    ctx.textAlign = "left";
    ctx.fillText(t, x, y);
}

function textBig(t, x, y){ // this is like my own made H1, for the main title and the game over.
    ctx.beginPath();
    ctx.font = "bold 95px Trebuchet MS"; /// bold is added to this part
    ctx.fillStyle = "hsla(50, 100%, 60%, 1)";
    ctx.textAlign = "center";
    ctx.fillText(t, x, y);
    ctx.textAlign = "left";
}

function rect(o){ // draws the player bar
    ctx.beginPath();
    ctx.moveTo(o.x - o.w/2, o.y - o.h/2);
    ctx.lineTo(o.x + o.w/2, o.y - o.h/2);
    ctx.lineTo(o.x + o.w/2, o.y + o.h/2);
    ctx.lineTo(o.x - o.w/2, o.y + o.h/2);
    ctx.closePath();
    ctx.fillStyle = "hsla("+o.c+", 100%, 60%, "+o.a+")";
    ctx.fill();
}

function starRotate(o){ //// draws the star I made from previous assignments and rotates them as well
    var oneDegree = 2*Math.PI/360;
    ctx.save();
    ctx.translate(o.x, o.y);
    ctx.rotate(o.angle*oneDegree);
    var x = 0 - o.w/2;
    var y = 0 - o.h/2;
    ctx.beginPath();
    ctx.moveTo(x + o.w * 0.5, y);
    ctx.lineTo(x + o.w * 0.6, y + o.h * 0.35);
    ctx.lineTo(x + o.w, y + o.h * 0.4);
    ctx.lineTo(x + o.w * 0.7, y + o.h * 0.65);
    ctx.lineTo(x + o.w * 0.8, y + o.h);
    ctx.lineTo(x + o.w * 0.5, y + o.h * 0.75);
    ctx.lineTo(x + o.w * 0.2, y + o.h);
    ctx.lineTo(x + o.w * 0.3, y + o.h * 0.65);
    ctx.lineTo(x, y + o.h * 0.4);
    ctx.lineTo(x + o.w * 0.4, y + o.h * 0.35);
    ctx.closePath();
    ctx.fillStyle = "hsla("+o.c+", 100%, 60%, "+o.a+")";
    ctx.fill();
    ctx.restore();
}

function clear(){
    ctx.clearRect(0, 0, w, h);
}

function setUpCanvas(){
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    canvas.width = w;
    canvas.height = h;
    canvas.style.border = "2px solid orange";
}

function rand(range){
    var result = Math.random()*range;
    return result;
}

function randi(range){
    var r = Math.floor(Math.random()*range);
    return r;
}

function randn(range){
    var r = Math.random()*range-range/2;
    return r;
}

console.log("assignment 4");
