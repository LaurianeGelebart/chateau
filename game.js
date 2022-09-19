"use strict";

/* ---------------------- VARIABLES & IMAGES & CLASS ---------------------- */
let canvas, context, x, y;
let state = 0 ; 
let nbWicked = 0 ; 
let wicked = [];
let points = 0 ; 

const f1 = new Image();
const f2 = new Image();
const f3 = new Image();
const f4 = new Image();
const lose = new Image();
const beginning = new Image();

class Wicked {
    constructor(x, y, h, l, f) {
      this.x = x; //posX
      this.y = y; //posY
      this.h = h; //largeur
      this.l = l; //longueur
      this.f = f ; //image 
      this.dead = 0 ;
    }

    move(){
        this.x += 2 ; // On peut imaginer ajouter un attribut vitesse non ? 
    }
}

/* ------------------------------ INIT GAME ------------------------------ */
window.onload = init;

function init() {

    f1.src = 'images/perso1.1.svg';
    f2.src = 'images/perso2.1.svg';
    f3.src = 'images/perso3.1.svg';
    f4.src = 'images/perso4.1.svg';
    lose.src = 'images/perdu.svg';
    beginning.src = 'images/debut.svg';

    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');

    let random ; 
    for(let i=0; i<100; i++){ //create 100 wickeds
        x = 0 ;
        y = Math.floor(Math.random() * 300) + 340;
        random = Math.random(); 
        if (random<0.25)  wicked[i] = new Wicked(x, y, 85, 60, f1)  ;  
        else if (random>0.25 && random<=0.5)  wicked[i] = new Wicked(x, y, 85, 60, f2) 
        else if (random>0.5 && random<=0.75)  wicked[i] = new Wicked(x, y, 85, 60, f3)  ; 
        else  wicked[i] = new Wicked(x, y, 80, 100, f4) ; 

       
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
            console.log("hey");
            for(let i=0; i<nbWicked; i++){
                console.log(evt.x,"Xentre",wicked[i].x,"-",(wicked[i].x + wicked[i].l)); 
                console.log(evt.y,"Yentre",wicked[i].y,"-",(wicked[i].y + wicked[i].h));
                if(!(wicked[i].dead)) {
                    if (evt.x-200 >= wicked[i].x && evt.x-200 <= (wicked[i].x + wicked[i].l) 
                    && evt.y-150 >= wicked[i].y && evt.y-150 <= (wicked[i].y + wicked[i].h)) {
                            wicked[i].dead=1 ; 
                            points ++ ; 
                    };   
                }
            }
            break ; 

        case 2 : // end of the game 
            if(true) state = 1 ; 
            break ; 
    }
})
/* ---------------------------------------- */

    window.requestAnimationFrame(gameLoop); // start the first frame request
}

/* ----------------------------- GAME LOOP ----------------------------- */
function gameLoop(timeStamp){

    switch(state){

        default : // beginning of the game (-> case 0)
            
            break ; 

        case 1 : // game 
            if (nbWicked<100){
                nbWicked += Math.random() < 0.01 ? 1 : 0;
            }
            for(let i=0; i<nbWicked; i++){
                if(!wicked[i].dead) wicked[i].move();
                if(wicked[i].x > 1300) state=2; // end of the game 
                //if(wicked[i].x > 1300) wicked[i].dead=1;
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
