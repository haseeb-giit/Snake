function rungame() {
    let inputDir = { x: 0, y: 0 };
  
    const music = new Audio('Sources/Audio/Moving.wav');
    const over = new Audio('Sources/Audio/lose1.wav');
    const foodmusic = new Audio('Sources/Audio/food.wav');
    const soundee = new Audio('Sources/Audio/bg.mp3');
    // const
    //main locl game
    let speed = document.getElementById('sp').value;
    let score = 0;
    let snakearr = [{ x: 14, y: 15 }];
    let food = { x: 12, y: 12 };
    let lastpaintTime = 0;
    function main(ctime) {

        window.requestAnimationFrame(main);
        // console.log(ctime)
        if ((ctime - lastpaintTime) / 1000 < 1 / speed) {
            return;
        }
        lastpaintTime = ctime;
        gameEngin();
        // soundee.play();

    }
    function gameEngin() {
        // updating the snake game
        function isCollide(sarr) {
            for (let i = 1; i < snakearr.length; i++) {
                if (snakearr[i].x === snakearr[0].x && snakearr[i].y === snakearr[0].y) {
                    return true;
                }
            }
            // if you bump in the wall
            if (snakearr[0].x >= 18 || snakearr[0].x <= 0 || snakearr[0].y >= 18 || snakearr[0].y <= 0) {
                return true;
            }
        }
        if (isCollide(snakearr)) {
            soundee.pause();
            over.play();
            inputDir = { x: 0, y: 0 };
            alert('Game Over. Press Any Key To Play Again !');
            snakearr = [{ x: 14, y: 4 }];
            score = 0;
        }
        // If You Eat The Food Increment The Score And regenerate the food
        if (snakearr[0].y === food.y && snakearr[0].x === food.x) {
            foodmusic.play();
            snakearr.unshift({ x: snakearr[0].x + inputDir.x, y: snakearr[0].y + inputDir.y });
            let a = 2;
            let b = 16;
            score += 1;
            if (score > hiscore) {
                hiscoreval = score;
                localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
                hiscoreBox.innerHTML = "hiSocre: " + hiscore;

            }
            scoreBox.innerHTML = "Score : " + score;
            food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
        }
        //Moving the snake

        for (let i = snakearr.length - 2; i >= 0; i--) {
            // const element = array[i];
            snakearr[i + 1] = { ...snakearr[i] };
        }
        snakearr[0].x += inputDir.x;
        snakearr[0].y += inputDir.y;

        //Display the Snake
        board.innerHTML = "";
        snakearr.forEach((e, index) => {
            snakeElement = document.createElement('div');
            snakeElement.style.gridRowStart = e.y;
            snakeElement.style.gridColumnStart = e.x;
            if (index === 0) {
                snakeElement.classList.add('head');
            }
            else {
                snakeElement.classList.add('snake');
            }
            board.appendChild(snakeElement);

        });
        foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);
    }
    // Movig Fucntions and Conmditions of the Game
    let hiscore = localStorage.getItem("hiscore");
    if (hiscore == null) {
        hiscoreval = 0;
        localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
    }
    else {
        hiscoreval = JSON.parse(hiscore);
        hiscoreBox.innerHTML = "HiSocre: " + hiscore;
    }
    window.requestAnimationFrame(main);
    window.addEventListener('keydown', e => {
        inputDir = { x: 0, y: 1 } // Start the Game
        music.play();
        switch (e.key) {
            case "ArrowUp":
                console.log("Arrow up Key is Pressed");
                inputDir.x = 0;
                inputDir.y = -1;
                break;
            case "ArrowDown":
                console.log("Arrow Down Key is Pressed");
                inputDir.x = 0;
                inputDir.y = 1;
                break;
            case "ArrowLeft":
                console.log("Arrow Left Key is Pressed");
                inputDir.x = -1;
                inputDir.y = 0;
                break;
            case "ArrowRight":
                console.log("Arrow Right Key is Pressed");
                inputDir.x = 1;
                inputDir.y = 0;
                break;
        }
    });
};
