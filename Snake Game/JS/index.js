//constants and variables
let direction = { x: 0, y: 0 };
const foodSound = new Audio("/music/food.mp3");
const gamOver = new Audio("/music/gameover.mp3");
const moveSound = new Audio("/music/move.mp3");
const gameMusic = new Audio("/music/music.mp3");
let lastPaintTime = 0;
const speed = 5;
let snake = [{ x: 13, y: 15 }];
let food = { x: 5, y: 8 };
let score = 0;

//game funtions
function main(currentTime) {

    window.requestAnimationFrame(main);
    // console.log(lastPaintTime);
    if ((currentTime - lastPaintTime) / 1000 < (1 / speed)) {
        return;
    }
    lastPaintTime = currentTime;
    gameEngine();
    
}

//snake collide funtion
function isCollide(snake){

    //if snake collides with itself
    for(let i=1; i<snake.length; i++){
        if(snake[0].x === snake[i].x && snake[0].y === snake[i].y){
            return true;
        }
    }
    //if snake collides with wall
    if(snake[0].x === 18 || snake[0].x === 0 || snake[0].y === 18 || snake[0].y === 0){
        return true;
    }

}

function gameEngine() {

    //part1: updating snake body and food
    //when snake collides with the wall
    if(isCollide(snake)){

        //reset the score when gamne over
        score = 0;
        scoreBox.innerHTML = 'Score: ' + score;
        gamOver.play();
        gameMusic.pause();
        direction = { x: 0, y: 0 };
        alert("Oops Game Over, Press Any Key To Start Over");
        gameMusic.play();
        snake = [{ x: 13, y: 15 }];

    }

    //when snake ate the food
    if(snake[0].x === food.x && snake[0].y === food.y){

        //update score
        score += 1;
        scoreBox.innerHTML = 'Score: ' + score;

        //update high score
        if(score > highScoreVal){
            highScoreVal = score;
        }
        localStorage.setItem("highScore", JSON.stringify(highScoreVal));
        highestScore.innerHTML = "Highest Score: " + highScoreVal;

        foodSound.play();
        //increse the snake array and make the snake head at same position where the food was before eating
        snake.unshift({ x: snake[0].x+direction.x, y: snake[0].y+direction.y });
        //place the food at a random place
        let a = 2, b = 16;
        randomX = Math.round(a+(b-1)*Math.random());
        randomY = Math.round(a+(b-1)*Math.random());
        food.x = randomX;
        food.y = randomY;

    }

    //move the snake
    for(let i=snake.length-2; i>=0; i--){
        snake[i+1] = {...snake[i]};
    }
    snake[0].x += direction.x;
    snake[0].y += direction.y;

    //part2: displaying snake and food
    //displaying snake
    //clearing the game board each time to render newly upoadted snake and food
    let b = document.getElementById('board');
    b.innerHTML = "";
    snake.forEach((ele, index) => {

        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = ele.y;
        snakeElement.style.gridColumnStart = ele.x;
        if (index === 0) snakeElement.classList.add('snake-head');
        else snakeElement.classList.add('snake-body');
        b.appendChild(snakeElement);

    })

    //displaying food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    b.appendChild(foodElement);

}

//main logics
//requestAnimationFrame funtion takes a funtion as parameter and invokes that funtion also by passing current time stamp as the argument

//declaring and setting highscore
let highScore = localStorage.getItem("highScore");
let highScoreVal;
if(highScore === null){
    highScoreVal = 0;
    localStorage.setItem("highScore", JSON.stringify(highScoreVal));
}
else{
    highScoreVal = JSON.parse(highScore);
    highestScore.innerHTML = "Highest Score: " + highScoreVal;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {

    direction = { x: 0, y: 1 }; //game starts
    gameMusic.play();
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("arrow up"); 
            direction.x = 0;
            direction.y = -1;
            break;

        case "ArrowDown":
            console.log("arrow down");
            direction.x = 0;
            direction.y = 1;
            break;

        case "ArrowLeft":
            console.log("arrow left");
            direction.x = -1;
            direction.y = 0;
            break;

        case "ArrowRight":
            console.log("arrow right");
            direction.x = 1;
            direction.y = 0;
            break;

        default: break;

    }

});