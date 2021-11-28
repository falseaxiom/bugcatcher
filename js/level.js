/* SETUP: grab level and environment from url */
const qstr = window.location.search;
const params = new URLSearchParams(qstr);
let level = params.get("l");
let enviro = params.get("e");
let s = parseFloat(params.get("s"));
console.log("level", level);
console.log("enviro", enviro);

/* SETUP: grab true level from localStorage */
let lvl = localStorage.getItem("lvl");
console.log("lvl", lvl);

/* SETUP: set level high score if never played before */
let hiscore = parseInt(localStorage.getItem("l"+level+"hs"));
if (isNaN(hiscore)) {
    localStorage.setItem("l"+level+"hs", 0);
}

/* SETUP: time how long player is on this level */
TimeMe.initialize({
    currentPageName: "my-page", // current page
    idleTimeoutInSeconds: 1000 // seconds
});

/* SETUP: change title, display tutorial if necessary */
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

    // autoselect textarea
    document.getElementById("texty").focus();

    // display tutorial if on first problem of level
    if (enviro == 'a' && level == lvl) {
        document.getElementById("tut").classList.remove("hidden");
    }
}

/* SETUP: pre-fill "ide" and tutorial, list Hintz */
$(document).ready(function() {
    $.ajax({
        url : "txt/buggy/"+level+enviro+"buggy.txt",
        dataType: "text",
        success : function (data) {
            $("#texty").text(data);
        }
    });

    if (enviro == 'a') {
        $("#dialog").load("tutorial/"+level+"dialog.html #0")
    }

    $("#hint0").load("hintz/" + level + enviro + "hintz.html #0");
});

/* TUTORIAL: click thru dialog */
let dialog = document.getElementById("dialog");
let d = 0;
function nextDialog() {
    d++;
    $("#dialog").load("tutorial/"+level+"dialog.html #"+d);
    if (dialog.innerHTML == "") {
        document.getElementById("tut").classList.add("hidden");
        document.getElementById("texty").focus();
    }
}

/* TUTORIAL: skip tutorial */
function skipTut() {
    document.getElementById("tut").classList.add("hidden");
}

/* HINTZ: display more Hintz */
numHintz = 0;
function newHint() {
    if (numHintz < 3) {
        numHintz++;
        $("#hint"+numHintz).load("hintz/" + level + enviro + "hintz.html #" + numHintz);
    }
}

/* RUN: get correct answer for checking later */
let chk;
$.ajax({
    url: "txt/correct/"+level+enviro+"correct.txt",
    success: function(data){
      chk = data.replace(/\s+/g, ' ').trim();
    }
});

/* RUN: run program */
numRuns = 0;
function run() {
    // update numRuns
    numRuns++;
    console.log("numRuns", numRuns);

    // get text in ide
    let text = document.getElementById("texty");
    let val = text.value.replace(/\s+/g, ' ').trim();

    // get "terminal"
    let term = document.getElementById("terminal")

    // if answer is correct, display correct output in terminal & un-grey next button
    if (val === chk) {
        let next = document.getElementById("next");
        next.classList.remove("grey");
        next.classList.add("green");
        $.ajax({
            url : "txt/output/"+level+enviro+"output.txt",
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

/* RUN: calculate running score (function of time & number of runs) */
function calcScore() {
    let timeSpent = TimeMe.getTimeOnCurrentPageInSeconds();
    s += timeSpent + (10 * numRuns);
}

/* NEXT: move to next enviro! */
function next() {
    calcScore();
    let next = document.getElementById("next");
    if (next.classList.contains("green")) {
        if (enviro == 'e' || level == "0") {
            let score = 1000 - Math.min(900, parseInt(s)); // min score of 100
            location.href="./score.html?level="+level+"&score="+score;
        }
        else {
            nextenv = String.fromCharCode(enviro.charCodeAt(0)+1);
            location.href = "./level.html?l="+level+"&e="+nextenv+"&s="+s;
        }
    }
}