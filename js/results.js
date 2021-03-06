/* SETUP: grab survey part, runs, time from url */
const qstr = window.location.search;
const params = new URLSearchParams(qstr);
let part = parseInt(params.get("p"));
let runs = parseInt(params.get("r"));
let time = parseFloat(params.get("t"));
console.log("part", part)
console.log("runs", runs);
console.log("time", time);

/* SETUP: grab s1, s2, from localStorage */
let s1 = parseInt(localStorage.getItem("s1"));
let s2 = parseInt(localStorage.getItem("s2"));
console.log("s1", s1);
console.log("s2", s2);

/* SETUP: grab indiv. level plays from localStorage */
let l0p = parseInt(localStorage.getItem("l0p"));
let l1p = parseInt(localStorage.getItem("l1p"));
let l2p = parseInt(localStorage.getItem("l2p"));
let l3p = parseInt(localStorage.getItem("l3p"));
let l4p = parseInt(localStorage.getItem("l4p"));
console.log("l0p", l0p);
console.log("l1p", l1p);
console.log("l2p", l2p);
console.log("l3p", l3p);
console.log("l4p", l4p);
let lp = l0p + "," + l1p + "," + l2p + "," + l3p + "," + l4p;

/* SETUP: grab level hi scores from localStorage */
let l0hs = parseInt(localStorage.getItem("l0hs"));
let l1hs = parseInt(localStorage.getItem("l1hs"));
let l2hs = parseInt(localStorage.getItem("l2hs"));
let l3hs = parseInt(localStorage.getItem("l3hs"));
let l4hs = parseInt(localStorage.getItem("l4hs"));
console.log("l0hs", l0hs);
console.log("l1hs", l1hs);
console.log("l2hs", l2hs);
console.log("l3hs", l3hs);
console.log("l4hs", l4hs);
let lhs = l0hs + "," + l1hs + "," + l2hs + "," + l3hs + "," + l4hs;

/* display part # */
document.getElementById("part").innerHTML = part;

/* display google form link */
form = document.getElementById("googleform");
if (part == 1) {
    form.innerHTML = "https://forms.gle/kjiYNozEDHMRrtSK8";
    form.href = "https://forms.gle/kjiYNozEDHMRrtSK8";
}
else if (part == 2) {
    form.innerHTML = "https://forms.gle/DtRVAT4J2hYqhTFp7";
    form.href = "https://forms.gle/DtRVAT4J2hYqhTFp7";
}

/* update s1 or s2 */
localStorage.setItem("s"+part, "1");

/* display raw data */
let raw = document.getElementById("rawdata");
raw.disabled = true;
if (part == 1) raw.value = qstr;
else if (part == 2) raw.value = qstr + ",lp=" + lp + ",lhs=" + lhs;