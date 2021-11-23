/* grab level and environment from url */
const qstr = window.location.search;
const params = new URLSearchParams(qstr);
let question = params.get("question");
console.log("question", question);

/* change title, focus on "ide" */
window.onload = (e) => {
    let title = document.getElementById("title");
    switch (parseInt(question)) {
        case 0:
            title.innerHTML = "";
            break;
        case 1:
            title.innerHTML = "Question 1";
            break;
        case 2:
            title.innerHTML = "Question 2";
            break;
        case 3:
            title.innerHTML = "Question 3";
            break;
        case 4:
            title.innerHTML = "Question 4";
            break;
        case 5:
            title.innerHTML = "Question 5";
            break;
        default:
            title.innerHTML = "Error: No Level Found";
    }

    // focus on "ide"
    let text = document.getElementById("texty");
    text.focus();
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

/* get correct answer for checking later */
let chk;
$.ajax({
    url: "txt/"+level+enviro+"correct.txt",
    success: function(data){
      chk = data;
    }
});

/* run program */
function run() {
    // get text in ide
    let text = document.getElementById("texty");
    let val = text.value;

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