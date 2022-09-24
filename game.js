"use strict";

/* ---------------------- VARIABLES & IMAGES & CLASS ---------------------- */
let canvas, context, x, y;
let state = 0 ; 
let nbWicked = 0 ; 
let wicked = [];
let points = 0 ; 
let difficulty = 0;

const f11 = new Image();
const f21 = new Image();
const f31 = new Image();
const f41 = new Image();
const f12 = new Image();
const f22 = new Image();
const f32 = new Image();
const f42 = new Image();
const f13 = new Image();
const f23 = new Image();
const f33 = new Image();
const f43 = new Image();
const death = new Image();
const lose = new Image();
const beginning = new Image();

class Wicked {

    constructor(x, y, h, l, f) {
      this.xStart=x;
      this.yStart=y;
      this.x = x; //posX
      this.y = y; //posY
      this.h = h; //largeur
      this.l = l; //longueur
      this.f = f ; //perso 
      this.image = choseImage() ; 
      this.dead = 0 ;
      this.deathInProgress = 0 ; 
      this.timeDeath = 0 ; //
      this.direction=(this.yStart-357)/(this.xStart-1300);
      this.vitesse=2 ; 
    }

    move(){
        this.x += this.vitesse ; 
        this.y += this.direction*this.vitesse ;
    }

    animDeath(){
        this.f = death ; 
        this.l = this.h ; 
        this.h = this.l-20; 
        this.timeDeath = difficulty+30 ; 
        this.deathInProgress=1 ; 
    }
}

function choseImage

/* ------------------------------ INIT GAME ------------------------------ */
window.onload = init;

function init() {

    f11.src = 'images/perso1.1.svg';
    f21.src = 'images/perso2.1.svg';
    f31.src = 'images/perso3.1.svg';
    f41.src = 'images/perso4.1.svg';
    f12.src = 'images/perso1.2.svg';
    f22.src = 'images/perso2.2.svg';
    f32.src = 'images/perso3.2.svg';
    f42.src = 'images/perso4.2.svg';
    f13.src = 'images/perso1.3.svg';
    f23.src = 'images/perso2.3.svg';
    f33.src = 'images/perso3.3.svg';
    f43.src = 'images/perso4.3.svg';
    death.src = 'images/perso1.3.svg'
    lose.src = 'images/perdu.png';
    beginning.src = 'images/debut.png';

    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');

    let random ; 
    for(let i=0; i<100; i++){ //create 100 wickeds
        x = 0 ;
        y = Math.floor(Math.random() * 300) + 340;
        random = Math.random(); 
        if (random<0.25)  wicked[i] = new Wicked(x, y, 85, 60, 1)  ;  
        else if (random>0.25 && random<=0.5)  wicked[i] = new Wicked(x, y, 85, 60, 2) 
        else if (random>0.5 && random<=0.75)  wicked[i] = new Wicked(x, y, 85, 60, 3)  ; 
        else  wicked[i] = new Wicked(x, y, 80, 100, 4) ; 

       
    }
    

/* ----------------- EVENT ---------------- */
canvas.addEventListener('click', (evt) => {
    evt.preventDefault() ; 
    switch(state){

        default : // beginning of the game (-> case 0)
            if(evt.x >= 760 && evt.x <= 1200 
            && evt.y >= 650 && evt.y <= 790) state = 1 ; 
            break ; 

        case 1 : // game 
            // if click on wicked
            for(let i=0; i<nbWicked; i++){
                if(!wicked[i].dead && !wicked[i].deathInProgress) {
                    if (evt.x-200 >= wicked[i].x && evt.x-200 <= (wicked[i].x + wicked[i].l) 
                    && evt.y-150 >= wicked[i].y && evt.y-150 <= (wicked[i].y + wicked[i].h)) {
                            wicked[i].animDeath();  
                            points ++ ; 
                            break;
                    }  
                }
            }
            break ; 

        case 2 : // end of the game 
            if(true) state = 1 ; 
            sendToPHP();
            break ; 
    }
})
/* ---------------------------------------- */

    window.requestAnimationFrame(gameLoop); // start the first frame request
}

/* ----------------------------- GAME LOOP ----------------------------- */
function gameLoop(timeStamp){
    difficulty++;
    switch(state){

        default : // beginning of the game (-> case 0)
            
            break ; 

        case 1 : // game 
           // if (nbWicked<100){
                nbWicked += (Math.random()+difficulty/1000000) > 0.99 ? 1 : 0;
         //   }
            for(let i=0; i<nbWicked; i++){
                if(!wicked[i].dead && !wicked[i].deathInProgress) wicked[i].move();
                if (wicked[i].deathInProgress && wicked[i].timeDeath < difficulty) wicked[i].dead = 1 ; 
                if(wicked[i].x > 1200) state=2 ;  
            }
            break ; 

        case 2 : // end of the game 
            
            break ; 
    }

    draw();
    window.requestAnimationFrame(gameLoop); // keep requesting new frames
}

/* ----------------------------- DRAW FUNCTION ----------------------------- */
function draw(){
    context.clearRect(0, 0, 1500, 750); // cleaning screen

    switch(state){

        default : // beginning of the game (-> case 0)
            context.drawImage(beginning, 0, 0);
            break ; 

        case 1 : // game 
            for(let i=0; i<nbWicked; i++){ 
                if(!(wicked[i].dead)){
                    context.drawImage(wicked[i].f, wicked[i].x, wicked[i].y, wicked[i].l, wicked[i].h);
               }
            }
            context.font = '60px serif';
            context.fillText(points, 20, 55);
            break ; 

        case 2 : // end of the game 
            context.drawImage(lose, 0, 0);
            break ; 
    }    
}


function sendToPHP(){
    const d = new Date();
    d.setTime(d.getTime() + (24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = "points" + "=" + points + ";" + expires + ";path=/";

    window.location.reload(false); 

}

