/* SETUP: grab survey part and question from url */
const qstr = window.location.search;
const params = new URLSearchParams(qstr);
let part = parseInt(params.get("p"));
let question = parseInt(params.get("q"));
console.log("part", part)
console.log("question", question);

/* SETUP: grab s1, s2 from localStorage */
let s1 = parseInt(localStorage.getItem("s1"));
let s2 = parseInt(localStorage.getItem("s2"));
console.log("s1", s1);
console.log("s2", s2);

/* SETUP: time how long player is on this question */
TimeMe.initialize({
    currentPageName: "my-page", // current page
    idleTimeoutInSeconds: 1000 // seconds
});

/* SETUP: change title, display part picker (if needed), grey out buttons as necessary */
window.onload = (e) => {
    let title = document.getElementById("title");
    title.innerHTML = "Survey Part " + part + ": Question " + question;

    // display part picker @ beginning
    if (part == 0) {
        document.getElementById("pp").classList.remove("hidden");
    }

    // autoselect textarea
    document.getElementById("texty").focus();

    // grey out buttons
    let p1Button = document.getElementById("p1");
    let p2Button = document.getElementById("p2");
    if (s1 == 0) { // before part 1 complete, grey out part 2
        p1Button.classList.add("orange");
        p2Button.classList.add("grey");
    }
    else {
        p1Button.classList.add("grey"); // part 1 done - grey out
        if (s2 == 0) p2Button.classList.add("orange"); // part 2 not done - still orange
        else         p2Button.classList.add("grey");   // part 2 done - grey out
    }
}

/* SETUP: pre-fill "ide", program description */
$(document).ready(function() {
    // pre-fill ide
    $.ajax({
        url : "txt/buggy/s"+part+"-"+question+"buggy.txt",
        dataType: "text",
        success : function (data) {
            $("#texty").text(data);
        }
    });

    // program description
    $("#hint0").load("hintz/s" + part + "hintz.html #" + question);
});

/* PART PICKER: pick part */
function gotoPart(n) {
    if (document.getElementById("p"+n).classList.contains("orange")) location.href = "./survey.html?p="+n+"&q=1";
}

/* RUN: get correct answer for checking later */
let chk;
$.ajax({
    url : "txt/correct/s"+part+"-"+question+"correct.txt",
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
            url : "txt/output/s"+part+"-"+question+"output.txt",
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

/* RUN: update data */
function update() {
    let timeSpent = TimeMe.getTimeOnCurrentPageInSeconds();
    s += timeSpent + (10 * numRuns);
}

/* NEXT: move to next question */
function next() {
    let next = document.getElementById("next");
    if (next.classList.contains("green")) {
        if (question == 8) {
            let score = 1000 - Math.max(0, parseInt(s))
            location.href="./score.html?p="+part+"&s="+score;
        }
        else {
            question++;
            location.href = "./survey.html?p="+part+"&q="+question;
        }
    }
}