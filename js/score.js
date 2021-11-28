/* SETUP: grab level and score from url */
const qstr = window.location.search;
const params = new URLSearchParams(qstr);
let level = params.get("level");
let score = params.get("score");
console.log("level", level);
console.log("score", score);

/* SETUP: grab lvl and high score from localStorage */
let lvl = parseInt(localStorage.getItem("lvl"));
let hiscore = parseInt(localStorage.getItem("l"+level+"hs"));
console.log("lvl", lvl);
console.log("hiscore", hiscore);

/* display score */
document.getElementById("score").innerHTML = score;

/* update level if you haven't finished this one before */
if (lvl == parseInt(level)) {
    lvl++;
    localStorage.setItem("lvl", lvl);
}

/* change tagline to based on high score */
let tagline = document.getElementById("tagline");
if (hiscore > 0) {
    if (score > hiscore) {
        tagline.innerHTML = "🐞 Amazing! You just set a new high score! 🐞";
        localStorage.setItem("l"+level+"hs", score);
    }
    else {
        tagline.innerHTML = "🐞 Your high score is still " + hiscore + "--wanna try to beat it? 🐞";
    }
}
else {
    tagline.innerHTML = "🐞 Amazing! You're a true bugcatcher in the making! 🐞";
    localStorage.setItem("l"+level+"hs", score);
}

/* move to next level */
function nextLevel() {
    location.href="./level.html?level="+lvl+"&enviro=a&s=0";
}