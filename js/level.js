/* grab level and environment from url */
const qstr = window.location.search;
const params = new URLSearchParams(qstr);
let level = params.get("level");
let enviro = params.get("enviro");
console.log("level", level);
console.log("enviro", enviro);

/* change title */
window.onload = (e) => {
    let title = document.getElementById("title");
    switch (parseInt(level)) {
        case 0:
            title.innerHTML = "Level 0: Tutorial";
            break;
        case 1:
            title.innerHTML = "Level 1: Syntax Errors";
            break;
        case 2:
            title.innerHTML = "Level 2: Variable Scope";
            break;
        default:
            title.innerHTML = "Error: No Level Found";
    }
}

/* pre-fill "ide", list Hintz */
$(document).ready(function() {
    $.ajax({
        url : "txt/"+level+enviro+"buggy.txt",
        dataType: "text",
        success : function (data) {
            $("#texty").text(data);
        }
    });
    $("#hint0").load("hintz/" + level + enviro + "hintz.html #0");
});

/* display more Hintz */
numHintz = 0;
function newHint() {
    if (numHintz < 3) {
        numHintz++;
        $("#hint"+numHintz).load("hintz/" + level + enviro + "hintz.html #" + numHintz);
    }
}

/* get correct answer for checking later */
let chk;
$.ajax({
    url: "txt/"+level+enviro+"correct.txt",
    success: function(data){
      chk = data.replace(/\s+/g, ' ').trim();
    }
});

/* run program */
function run() {
    // get text in ide
    let text = document.getElementById("texty");
    let val = text.value.replace(/\s+/g, ' ').trim();

    // get terminal
    let term = document.getElementById("terminal")

    console.log(val);
    console.log(chk);

    // if answer is correct, un-grey next button
    if (val === chk) {
        let next = document.getElementById("next");
        next.classList.remove("grey");
        next.classList.add("green");
        $.ajax({
            url : "txt/"+level+enviro+"output.txt",
            dataType: "text",
            success : function (data) {
                term.innerHTML = data;
            }
        });
        
    }
    else {
        term.innerHTML = "> Error: bugs present in code";
    }
}

/* calculate score */
function calcScore() {
    return 1000;
}

/* move to next level! */
function next() {
    let next = document.getElementById("next");
    if (next.classList.contains("green")) {
        if (enviro == 'c' || level == "0") {
            score = calcScore();
            location.href="./score.html?level="+level+"&score="+score;
        }
        else {
            nextenv = String.fromCharCode(enviro.charCodeAt(0)+1);
            location.href = "./level.html?level="+level+"&enviro="+nextenv;
        }
    }
}