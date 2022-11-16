const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
let player1TextScore = document.querySelector(".player1score")
let player2TextScore = document.querySelector(".player2score")
let gameTip = document.querySelector(".tip")
let ball
let leftPlayer
let rightPlayer
let player1IntScore = 0
let player2IntScore = 0
canvas.width = 1024
canvas.height = 576
// let mouse = {
//     x: canvas.width / 2,
//     y: canvas.height / 2
// }

// canvas.addEventListener('mousemove', event => {
//     mouse.x = event.offsetX
//     mouse.y = event.offsetY
// })
const gravity = 0.5
const colors = ["#2185C5", "#7ECEFD", "#FFF6E5", "#FF7F66"]
const keysLP = {
    upLP: {
        pressed: false,
    },
    downLP: {
        pressed: false,
    }
}
const keysRP = {
    upRP: {
        pressed: false,
    },
    downRP: {
        pressed: false,
    }
}

class Ball {
    constructor(radius) {
        this.x = Math.floor(Math.random() * 20) + 30
        this.y = Math.floor(Math.random() * 400) + 50

        this.radius = radius
        this.velocityX = 20
        this.velocityY = 7
        this.hue = 0
    }

    draw() {
        c.beginPath()
        c.fillStyle = `hsl(${hue}, 50%, 50%)`
        c.arc(this.x, this.y, this.radius, Math.PI * 2, false)
        c.fill()
        c.closePath()
    }
    
    update() {
        this.draw()
        this.hue += 2
        this.x += this.velocityX
        this.y += this.velocityY
        
        
        if (this.y + this.radius + this.velocityY > canvas.height || this.y - this.radius + this.velocityY < 0) {
            this.velocityY = -this.velocityY;
        }


    }
}


class Player {
    constructor(x, y, color) {
        this.x = x
        this.y = y
        this.width = 20
        this.height = 125
        this.color = color
        this.velocityY = 8
    }

    draw() {
        c.fillStyle = this.color
        c.fillRect(this.x, this.y, this.width, this.height)
    }
    
    update() {
        this.draw()
        
        if (this.y + this.height + this.velocityY > canvas.height || this.y < 0) {
            this.velocityY = 0;
        } 
    }
}

let  hue = 0

function updateScore() {
    if(ball.x - ball.radius < 0 && player1IntScore <= 9 && player2IntScore <= 9) {
        player2IntScore += 1
        player2TextScore.textContent = player2IntScore
        init()
        
    } else if(player2IntScore >= 10) {
        gameTip.style.display = "flex"
        gameTip.textContent = "Player2 Wins!"
    }

    if(ball.x + ball.radius > canvas.width) {
        player1IntScore += 1
        player1TextScore.textContent = player1IntScore
        init()
    } else if(player2IntScore >= 10) {
        gameTip.style.display = "flex"
        gameTip.textContent = "Player2 Wins!"
    }
}


function init() {
    ball = new Ball(15)
    leftPlayer = new Player(20, 350, "white")
    rightPlayer = new Player(canvas.width - 40, 400, "white")
}

addEventListener('keydown', (e) => {
    console.log(e.keyCode);
    switch (e.keyCode) {
        case 87:    //UP
            keysLP.upLP.pressed = true; 
            break;
        case 83:    //DOWN
            keysLP.downLP.pressed = true; 
            break;
        case 38:    //UP
            keysRP.upRP.pressed = true; 
            break;
        case 40:    //DOWN
            keysRP.downRP.pressed = true; 
            break;
        case 32:    //DOWN
            init()
            gameTip.style.display = "none"
            break;
    }
})

addEventListener('keyup', (e) => {
    switch (e.keyCode) {
        case 87:    //UP
            keysLP.upLP.pressed = false; 
            break;
        case 83:    //DOWN
            keysLP.downLP.pressed = false; 
            break;
        case 38:    //UP
            keysRP.upRP.pressed = false; 
            break;
        case 40:    //DOWN
            keysRP.downRP.pressed = false; 
            break;
    }
})

function animate() {
    requestAnimationFrame(animate)
    hue += 10
    c.fillStyle = "rgba(0, 0, 0, .6)"
    c.fillRect(0, 0, canvas.width, canvas.height)
    c.fillStyle = "white"
    c.fillRect((canvas.width - 5)/2, 0, 10, canvas.height)
    ball.update()
    leftPlayer.update()
    rightPlayer.update()
    updateScore()

    // let diffX = (mouse.x + ball.radius) - (leftPlayer.x + leftPlayer.width)  //X2 - X1
    // let diffY = mouse.y - leftPlayer.y //Y2 - Y1
    // let dist = Math.sqrt((diffX * diffX) + (diffY * diffY))
    // console.log(dist)
    // console.log(mouse.x, mouse.y);
    if(keysLP.upLP.pressed && leftPlayer.y > 0) {
        leftPlayer.velocityY = 8
        leftPlayer.y -= leftPlayer.velocityY
    } else if(keysLP.downLP.pressed && leftPlayer.y + leftPlayer.height < canvas.height) {
        leftPlayer.velocityY = 8
        leftPlayer.y += leftPlayer.velocityY
    }


    if(keysRP.upRP.pressed && rightPlayer.y > 0) {
        rightPlayer.velocityY = 8
        rightPlayer.y -= rightPlayer.velocityY
    } else if(keysRP.downRP.pressed && rightPlayer.y + rightPlayer.height < canvas.height) {
        rightPlayer.velocityY = 8
        rightPlayer.y += rightPlayer.velocityY
    }

    // if(dist <= 31 ||)
    if(ball.x - ball.radius < leftPlayer.x + leftPlayer.width && (ball.y > leftPlayer.y && ball.y < leftPlayer.y + leftPlayer.height + 2)) {
        // console.log("beyond LEFTPLAYER'S X co-ordinate");
        ball.velocityX = -ball.velocityX
    } 

    if(ball.x + ball.radius > rightPlayer.x && (ball.y > rightPlayer.y && ball.y < rightPlayer.y + rightPlayer.height + 2)) {
        // console.log("beyond RIGHTPLAYER'S X co-ordinate");
        ball.velocityX = -ball.velocityX
    } 
        
}

animate()


