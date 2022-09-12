window.addEventListener("DOMContentLoaded", (e) => {


let title = document.getElementById('title-turn');
let img = document.getElementById('chateau-turn');

let btn = document.getElementById('btn');

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

});
