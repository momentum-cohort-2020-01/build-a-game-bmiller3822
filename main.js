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
        console.log("Hello!")
    }

    draw (screen, gameSize){
        screen.clearRect (0, 0, gameSize.x, gameSize.y)
        for(let i=0; i < this.bodies.length; i++){
            drawRect(screen, this.bodies[i])
        }
    }
} //final curly brace for class game



class Player {
    constructor(game, gameSize){
        this.game = game //What does this do? 
        this.size = {x: 15, y: 15}
        this.center = {x: gameSize.x/2, y: gameSize.y - this.size.y * 2}
    }
} //Final curly brace for class Player


class Enemy {

} //Final curly brace for class Enemy 


class Bullet {

} //Final curly brace for class Bullet


class GlitterBomb {

} //Final curly brace for class GlitterBomb


class Powerup {
    //If there's time...
} //Final curly brace for class PowerUp


//==========Helper Functions===========================================================
function drawRect(screen, body){ //Hmm, but why are we passing in these?
    screen.fillRect(body.center.x - body.size.x/2, body.center.y-body.size.y/2,  //Going to assume this sizes the rectangles?
        body.size.x, body.size.y)
}


window.addEventListener("load", function(){  //Adding the event listener now so I can see stuff show up. 
    new Game()
})

console.log ("Nothing broken!")
