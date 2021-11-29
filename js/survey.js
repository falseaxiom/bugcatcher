/* SETUP: grab survey part, question, runs, time from url */
const qstr = window.location.search;
const params = new URLSearchParams(qstr);
let part = parseInt(params.get("p"));
let question = parseInt(params.get("q"));
let runs = parseInt(params.get("r"));
let time = parseFloat(params.get("t"));
console.log("part", part)
console.log("question", question);
console.log("runs", runs);
console.log("time", time);

/* SETUP: grab s1, s2, from localStorage */
let s1 = parseInt(localStorage.getItem("s1"));
let s2 = parseInt(localStorage.getItem("s2"));
console.log("s1", s1);
console.log("s2", s2);

/* SETUP: time how long player is on this question */
TimeMe.initialize({
    currentPageName: "my-page", // current page
    idleTimeoutInSeconds: 5000 // seconds
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

/* SETUP: pre-fill "ide", display program description */
$(document).ready(function() {
    // pre-fill ide
    $.ajax({
        url : "content/survey/buggy/s"+part+"-"+question+"buggy.txt",
        dataType: "text",
        success : function (data) {
            $("#texty").text(data);
        }
    });

    // program description
    $("#hint0").load("content/survey/s"+part+"hintz.html #"+question);
});

/* PART PICKER: pick part */
function gotoPart(n) {
    if (document.getElementById("p"+n).classList.contains("orange")) location.href = "./survey.html?p="+n+"&q=1&r=0&t=0";
}

/* RUN: get correct answer for checking later */
let chk;
$.ajax({
    url : "content/survey/correct/s"+part+"-"+question+"correct.txt",
    success: function(data){
      chk = data.replace(/\s+/g, ' ').trim();
    }
});

/* RUN: run program */
function run() {
    // update runs
    runs++;

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
            url : "content/survey/output/s"+part+"-"+question+"output.txt",
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

/* NEXT: move to next question */
function next() {
    let next = document.getElementById("next");
    if (next.classList.contains("green")) {
        time += TimeMe.getTimeOnCurrentPageInSeconds();
        if (question == 5) {
            location.href="./results.html?p="+part+"&r="+runs+"&t="+time;
        }
        else {
            question++;
            location.href = "./survey.html?p="+part+"&q="+question+"&r="+runs+"&t="+time;
        }
    }
}