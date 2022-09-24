"use strict";

/* ---------------------- VARIABLES & IMAGES & CLASS ---------------------- */
let canvas, context, x, y;
let state = 0 ; 
let nbWicked = 0 ; 
let wicked = [];
let points = 0 ; 
let difficulty = 0;

const f1 = new Image();
const f2 = new Image();
const f3 = new Image();
const f4 = new Image();
const death = new Image();
const lose = new Image();
const beginning = new Image();

class Wicked {

    constructor(x, y, h, l, f, v) {
      this.xStart=x;
      this.yStart=y;
      this.x = x; //posX
      this.y = y; //posY
      this.h = h; //largeur
      this.l = l; //longueur
      this.f = f ; //image 
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

/* ------------------------------ INIT GAME ------------------------------ */
window.onload = init;

function init() {

    f1.src = 'images/perso1.1.svg';
    f2.src = 'images/perso2.1.svg';
    f3.src = 'images/perso3.1.svg';
    f4.src = 'images/perso4.1.svg';
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
        if (random<0.25)  wicked[i] = new Wicked(x, y, 85, 60, f1, 2)  ;  
        else if (random>0.25 && random<=0.5)  wicked[i] = new Wicked(x, y, 85, 60, f2, 2) 
        else if (random>0.5 && random<=0.75)  wicked[i] = new Wicked(x, y, 85, 60, f3, 2)  ; 
        else  wicked[i] = new Wicked(x, y, 80, 100, f4, 2) ; 

       
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
               // console.log(evt.x,"Xentre",wicked[i].x,"-",(wicked[i].x + wicked[i].l)); 
               // console.log(evt.y,"Yentre",wicked[i].y,"-",(wicked[i].y + wicked[i].h));
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
            if (nbWicked<100){
                nbWicked += (Math.random()+difficulty/1000000) > 0.99 ? 1 : 0;
            }
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

