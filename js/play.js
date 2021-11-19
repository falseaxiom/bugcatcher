/* access localstorage, update level */
window.onload = (e) =>{
    let elem = document.getElementById("level");
    let lvl = parseInt(localStorage.getItem("lvl"));
    if (!isNaN(lvl)) {
        console.log('got a level :)', lvl);
        for (var i = 0; i <= lvl; i++) {
            let lvlBlock = document.getElementById(String(i));
            lvlBlock.classList.remove("levelGrey");
            lvlBlock.classList.add("level");
        }
    }
    else {
        console.log('got no level :(');
        localStorage.setItem("lvl","0");
        let lvlBlock = document.getElementById("0");
        lvlBlock.classList.remove = "levelGrey";
        lvlBlock.classList.add = "level";
    }
}

/* if level is clickable, go to it */
function gotoLevel(n) {
    console.log(n)
    if (document.getElementById(String(n)).classList.contains("level")) {
        location.href = './level.html?level='+n+"&enviro=a";
    }
}