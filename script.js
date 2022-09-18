window.addEventListener("DOMContentLoaded", (e) => {


let title = document.getElementById('title-turn');
let img = document.getElementById('chateau-turn');

let btn = document.getElementById('btn');
let pigeon = document.getElementById('pigeon');

let inscr_btn = document.getElementById('go-inscription');
let connect_btn = document.getElementById('go-connexion');
let inscr = document.getElementById('inscription');
let connect = document.getElementById('connexion');

if(title){
    title.addEventListener('mouseover', (evt) => {
        img.classList.add('turn');
    })   
    title.addEventListener('mouseout', (evt) => {
        img.classList.remove('turn');
    }) 
}

if(btn){
    btn.addEventListener('click', (evt) => {
        pigeon.classList.add('animation-pigeon');
    })
}

if(inscr_btn){ 
    inscr_btn.addEventListener('click', (evt) => {
        inscr.classList.remove('un-display');
        connect.classList.add('un-display');
    })
    connect_btn.addEventListener('click', (evt) => {
        inscr.classList.add('un-display');
        connect.classList.remove('un-display');
    })
}

});
