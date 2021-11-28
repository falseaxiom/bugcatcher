/* SETUP: grab level and environment from url */
const qstr = window.location.search;
const params = new URLSearchParams(qstr);
let question = params.get("question");
let s = parseFloat(params.get("s"));
console.log("level", level);
console.log("enviro", enviro);

/* SETUP: grab true level from localStorage */
let lvl = localStorage.getItem("lvl");
console.log("lvl", lvl);

/* SETUP: time how long player is on this level */
TimeMe.initialize({
    currentPageName: "my-page", // current page
    idleTimeoutInSeconds: 1000 // seconds
});

/* SETUP: change title, autoselect "ide" (so user knows you can type in it) */
window.onload = (e) => {
    let title = document.getElementById("title");
    title.innerHTML = "Survey Part " + part + ": Question " + question;

    // display  if on first problem of level
    if (enviro == 'a' && level == lvl) {
        document.getElementById("tut").classList.remove("hidden");
    }

    // focus on "ide"
    document.getElementById("texty").focus();
}

/* SETUP: pre-fill "ide" and tutorial, list Hintz */
$(document).ready(function() {
    $.ajax({
        url : "txt/"+part+"-"+question+"buggy.txt",
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
    url: "txt/"+level+enviro+"correct.txt",
    success: function(data){
      chk = data.replace(/\s+/g, ' ').trim();
    }
});

/* RUN: run program */
numRuns = 0;
function run() {
    // update numRuns
    numRuns++;

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

/* RUN: calculate running score (function of time & number of runs) */
function calcScore() {
    let timeSpent = TimeMe.getTimeOnCurrentPageInSeconds();
    s += timeSpent + (10 * numRuns);
}

/* NEXT: move to next enviro/level! */
function next() {
    calcScore();
    let next = document.getElementById("next");
    if (next.classList.contains("green")) {
        if (enviro == 'c' || level == "0") {
            let score = 1000 - Math.max(0, parseInt(s))
            location.href="./score.html?level="+level+"&score="+score;
        }
        else {
            nextenv = String.fromCharCode(enviro.charCodeAt(0)+1);
            location.href = "./level.html?level="+level+"&enviro="+nextenv+"&s="+s;
        }
    }
}