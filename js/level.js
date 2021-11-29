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
    idleTimeoutInSeconds: 600 // seconds
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
        case 3:
            title.innerHTML = "Level 3: Indexing Errors";
            break;
        case 4:
            title.innerHTML = "Level 4: Logic Errors";
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

/* SETUP: pre-fill "ide" and tutorial, display program description */
$(document).ready(function() {
    // pre-fill ide
    $.ajax({
        url : "content/level"+level+"/buggy/"+level+enviro+"buggy.txt",
        dataType: "text",
        success : function (data) {
            $("#texty").text(data);
        }
    });

    // tutorial
    if (enviro == 'a') {
        $("#dialog").load("content/level"+level+"/"+level+"tutorial.html #0")
    }

    // program description
    $("#hint0").load("content/level"+level+"/"+level+"hintz.html #"+enviro);
});

/* TUTORIAL: click thru dialog */
let dialog = document.getElementById("dialog");
let d = 0;
function nextDialog() {
    d++;
    $("#dialog").load("content/level"+level+"/"+level+"tutorial.html #"+d);

    // display proper bug
    let bug = document.getElementById("bug");
    if (level == 1) {
        if (d == 2) {
            bug.src = "imgs/brackets.gif";
        }
        else if (d == 5) {
            bug.src = "imgs/semicolon.png";
        }
        else if (d == 7) {
            bug.src = "imgs/typo.png";
        }
        else if (d == 9) {
            bug.src = "imgs/logo.png";
        }
    }

    // exit dialog
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
        $("#hint"+numHintz).load("content/level"+level+"/"+level+"hintz.html #"+numHintz);
    }
}

/* RUN: get correct answer for checking later */
let chk;
$.ajax({
    url: "content/level"+level+"/correct/"+level+enviro+"correct.txt",
    success: function(data){
      chk = data.replace(/ +?/g, ' ').trim();
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
    let val = text.value.replace(/ +?/g, ' ').trim();

    // get "terminal"
    let term = document.getElementById("terminal")

    // if answer is correct, display correct output in terminal & un-grey next button
    let valA = val.split('\n');
    let chkA = chk.split('\n');
    let err = '';
    for (let i = 0; i < valA.length; i++) {
        if (valA[i] !== chkA[i]) {
            if (err === '') err += '<div>> error at line '+(i+1)+'</div>';
            else            err += '<div>error at line '+(i+1)+'</div>';
        }
    }
    if (err === '') {
        console.log("pass");
        let next = document.getElementById("next");
        next.classList.remove("grey");
        next.classList.add("green");
        $.ajax({
            url : "content/level"+level+"/output/"+level+enviro+"output.txt",
            dataType: "text",
            success : function (data) {
                term.innerHTML = data;
            }
        });
    }
    else {
        console.log("nopass");
        term.innerHTML = err;
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