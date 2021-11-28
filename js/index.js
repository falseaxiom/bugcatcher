/* access localstorage, create level if necessary; randomize bug image */
const bugs = ["logo.png", "brackets.gif", "semicolon.png", "typo.png", "thimis.png"];
window.onload = (e) =>{
    let lvl = parseInt(localStorage.getItem("lvl"));
    if (!isNaN(lvl)) {
        console.log('lvl', lvl);
    }
    else {
        console.log('new player');
        localStorage.setItem("lvl","0");
    }

    let rand = Math.floor(Math.random() * bugs.length);
    let randBug = document.getElementById("randBug");
    randBug.src = "imgs/"+bugs[rand];
}