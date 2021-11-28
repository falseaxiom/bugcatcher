/* access localstorage, update level */
window.onload = (e) =>{
    let elem = document.getElementById("level");
    let lvl = parseInt(localStorage.getItem("lvl"));
    if (!isNaN(lvl)) {
        console.log('lvl', lvl);
        for (var i = 0; i <= lvl; i++) {
            let lvlBlock = document.getElementById(String(i));
            lvlBlock.classList.remove("levelGrey");
            lvlBlock.classList.add("level");
        }
    }
    else {
        console.log('new player');
        localStorage.setItem("lvl","0");
        let lvlBlock = document.getElementById("0");
        lvlBlock.classList.remove = "levelGrey";
        lvlBlock.classList.add = "level";
    }
}

/* if level is clickable, go to it */
function gotoLevel(n) {
    if (document.getElementById(String(n)).classList.contains("level")) {
        location.href = './level.html?l='+n+"&e=a&s=0";
    }
}