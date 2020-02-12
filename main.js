class Game {
    constructor(){
    let canvas = document.querySelector("#canvas") //Screen is 300x500
    let screen = canvas.getContext('2d')
    let gameSize = {x: canvas.width, y: canvas.height}
    this.bodies = []
    this.bodies = this.bodies.concat(new Player(this, gameSize)) //Ahhh do these arguments represent this game and being inside what we've defined as gameSize?
    let tick = () => { //Updates game state at 60fps when utilizing request animation frame below.
        this.update()
        this.draw(screen, gameSize) // For drawing game bodies, uses gameSize from above.  Not sure what it does yet.
        requestAnimationFrame(tick)
    }
    tick()
    } //final curly brace for Game.constructor

    

    update(){
        let noCollisions = (b1) => {
            return this.bodies.filter(function (b2) { return colliding(b1,b2) }).length === 0
        }
        this.bodies = this.bodies.filter(noCollisions)
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
} //final curly brace for class game



class Player {
    constructor(game, gameSize){
        this.game = game //What does this do? 
        this.size = {x: 15, y: 15}
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
                {x: 7, y: 0})

                this.game.addBody(bullet)
        }
    }
} //Final curly brace for class Player


class Enemy {

} //Final curly brace for class Enemy 


class Bullet {
    constructor(center, velocity){
        this.center = center
        this.size = {x:3, y:3}
        this.velocity = velocity
    }
    update(){
        this.center.x += this.velocity.x
        this.center.y += this.velocity.y
    }
} //Final curly brace for class Bullet


// class GlitterBomb {

// } //Final curly brace for class GlitterBomb



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
function drawRect(screen, body){ //Hmm, but why are we passing in these?
    screen.fillRect(body.center.x - body.size.x/2, body.center.y-body.size.y/2,  //Going to assume this sizes the rectangles?
        body.size.x, body.size.y)
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


window.addEventListener("load", function(){  //Adding the event listener now so I can see stuff show up. 
    new Game()
})

console.log ("Nothing broken!")
