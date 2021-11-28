/* access localstorage, create lvl/survey vars if necessary; randomize bug image */
const bugs = ["logo.png", "brackets.gif", "semicolon.png", "typo.png", "thimis.png"];
window.onload = (e) =>{
    let lvl = parseInt(localStorage.getItem("lvl"));
    let s1 = parseInt(localStorage.getItem("s1"));
    let s2 = parseInt(localStorage.getItem("s2"));
    if (!isNaN(lvl) && !isNaN(s1) && !isNaN(s2)) {
        console.log('lvl', lvl);
        console.log('s1', s1);
        console.log('s2', s2);
    }
    else {
        console.log('new player');
        localStorage.setItem("lvl","0");
        localStorage.setItem("s1","0");
        localStorage.setItem("s2","0");
    }

    let rand = Math.floor(Math.random() * bugs.length);
    let randBug = document.getElementById("randBug");
    randBug.src = "imgs/"+bugs[rand];
}