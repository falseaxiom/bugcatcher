/* grab level and score from url */
const qstr = window.location.search;
const params = new URLSearchParams(qstr);
let level = params.get("level");
let score = params.get("score");
console.log("level", level);
console.log("score", score);

/* display score */
document.getElementById("score").innerHTML = score;

/* update level if you haven't finished this one before! */
let lvl = parseInt(localStorage.getItem("lvl"));
if (lvl == parseInt(level)) {
    lvl++;
    localStorage.setItem("lvl", lvl);
}

function nextLevel() {
    location.href="./level.html?level="+lvl+"&enviro=a&s=0";
}