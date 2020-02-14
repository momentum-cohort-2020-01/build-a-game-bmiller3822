class Game {
    constructor(){
    let canvas = document.querySelector("#canvas") //Screen is 300x500
    let screen = canvas.getContext('2d')
    let gameSize = {x: canvas.width, y: canvas.height}
    this.bodies = []
    this.bodies = this.bodies.concat(new Player(this, gameSize)) 
    this.bodies = this.bodies.concat(createEnemies(this))
    
    let tick = () => { 
        
        if(this.bodies.length<60){
            console.log("HELLO!")
            this.bodies=this.bodies.concat(createEnemies(this))
        }
        this.update()
        
        this.draw(screen, gameSize) 
        requestAnimationFrame(tick)
        
    }
    tick()
    }

    
    update(){
        let noCollisions = (b1) => {
            return this.bodies.filter(function (b2) { return colliding(b1,b2) }).length === 0
        }
        
        this.bodies = this.bodies.filter(noCollisions)
        this.bodies = this.bodies.filter(body=>body.center.x>=0)
        this.bodies = this.bodies.filter(body=>body.center.x<=canvas.width)
        
        for (let i=0; i<this.bodies.length; i++){
            this.bodies[i].update()
        }
    }
   
    
    draw (screen, gameSize){
        screen.clearRect (0, 0, gameSize.x, gameSize.y)
        for(let i=0; i < this.bodies.length; i++){
            drawRect(screen, this.bodies[i])
            
        }
    }

    addBody (body){
        this.bodies.push(body)
    }

    function(gameOver){
        if (this.Player===undefined){
            console.log("Game over!")
        }
    }
    gameOver(){}

} //final curly brace for class game



class Player {
    constructor(game, gameSize){
        this.game = game
        this.size = {x: 15, y: 30}
        this.fillStyle = "#ec4e3b"
        this.center = {x:gameSize.x-gameSize.x+this.size.x *2, y: gameSize.y/2}

        this.keyboarder = new Keyboarder()
    }

    update () {
        if (this.keyboarder.isDown(this.keyboarder.KEYS.UP)) {
        this.center.y -= 2
        } else if (this.keyboarder.isDown(this.keyboarder.KEYS.DOWN)) {
        this.center.y += 2
        }
        
        if (this.keyboarder.isDown(this.keyboarder.KEYS.SPACEBAR)){
            let bullet = new Bullet({x: this.center.x+this.size.x + 10, y: this.center.y},
                {x: 15, y: 0})

                this.game.addBody(bullet)
        }
    }
} //Final curly brace for class Player


class Enemy {
    constructor (game, center){
        this.game = game
        this.center = center
        this.size = {x:15, y: 15}
        this.patrolX = 500
        this.speedX= -5
    }

    update(){
        this.center.x += this.speedX
        this.patrolX += this.speedX
    }
} //Final curly brace for class Enemy 


function createEnemies (game){
    let enemies = []
    for (let i=0; i<5; i++){
        enemies.push(new Enemy(game, {x: 500, y: Math.random()*300}))
    }
    return enemies
}


class Bullet {
    constructor(center, velocity){
        this.center = center
        this.size = {x:5, y:5}
        this.velocity = velocity
    }
    update(){
        this.center.x += this.velocity.x *3
        this.center.y += this.velocity.y *3
    }
} //Final curly brace for class Bullet
    //What Matisse used to adjust the number of ticks below:
    //Something to look at is not having bullets colliding. 
    // update(){
    // this.ticks+=1
    // if (this.ticks % 2 === 0){
    //     this.center.x += this.velocity.x
    //     this.center.y += this.velocity.y
    // }
    // }


class Keyboarder {

    constructor(){
     let keyState = {}
    
     window.addEventListener('keydown', function (e) {
       keyState[e.keyCode] = true
     })
    
     window.addEventListener('keyup', function (e) {
       keyState[e.keyCode] = false
     })

     this.isDown = function (keyCode) {
       return keyState[keyCode] === true
     }
    
     this.KEYS = { UP: 38, DOWN: 40, SPACEBAR: 32 }
    }

} //Final curly brace for class Keyboarder


class Powerup {
    //If there's time...
} //Final curly brace for class PowerUp


//==========Helper Functions===========================================================
function drawRect(screen, body, color=false){
    screen.fillRect(body.center.x - body.size.x/2, body.center.y-body.size.y/2,  
        body.size.x, body.size.y)
    screen.fillStyle = "white"
}

function colliding (b1, b2) { 
    return !(
      b1 === b2 ||
          b1.center.x + b1.size.x / 2 < b2.center.x - b2.size.x / 2 ||
          b1.center.y + b1.size.y / 2 < b2.center.y - b2.size.y / 2 ||
          b1.center.x - b1.size.x / 2 > b2.center.x + b2.size.x / 2 ||
          b1.center.y - b1.size.y / 2 > b2.center.y + b2.size.y / 2 
    )
  }

window.addEventListener("load", function(){  
    new Game()
})

console.log ("Nothing broken!")


//=====================Notes and other nonsense==================================================

    //Function to not let player leave the screen
    //Score function
    //Title screen?  Maybe. 
    //Sprites for characters
    //Background image scrolling
    //No collission for bullet on itself so you can do %

// ||
//           b1.center.x > canvas.width ||
//           b1.center.x < canvas.width


 // for (let i=0; i<this.bodies.length; i++){
        //     if (this.bodies[i].center.x < canvas.width || this.bodies[i].center.x>canvas.width){
        //         return this.bodies.filter
        //     }
        // }

        // let outsideBorder = () => {
        //     return this.bodies.filter(function (){return beyondBorder()}).length ===0
        // }

        // this.bodies = this.bodies.filter(function(){
        //     for (let i=0; i<this.bodies.length; i++){
        //         if (this.bodies[i].center.x>=0 && this.bodies[i].center.x<=canvas.width){
        //             return this.bodies[i]
        //         }
        // }})
        // this.bodies = this.bodies.filter(outsideBorder)

        // this.bodies = this.bodies.filter(beyondBorder)
      // let beyondBorder = function beyondBorder(){
        // for (let i=0; i<this.bodies.length; i++){
        //     if (this.bodies[i].center.x>=0 && this.bodies[i].center.x<=canvas.width){
        //         return this.bodies[i]
        //     }
        // }
        
    // }
        //splice what I want to remove

//         const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];

// const result = words.filter(word => word.length > 6);

// console.log(result);
// expected output: Array ["exuberant", "destruction", "present"]


        
           
        // let canvas = document.querySelector("#canvas") //Screen is 300x500
        // for (let i=0; i<this.bodies.length; i++){
        //     if (this.bodies[i].center.x < canvas.width || this.bodies[i].center.x>canvas.width){
        //         this.bodies[i].remove
        //         for (let i=0; i<this.bodies.length; i++){
        //         this.bodies[i].update()
        //         }
        //     }
        // }
        
        
        //If the body is outside of the parameters, remove from the list of bodies. 
    

   
    
