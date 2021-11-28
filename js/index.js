/* access localstorage, create level if necessary */
window.onload = (e) =>{
    let lvl = parseInt(localStorage.getItem("lvl"));
    if (!isNaN(lvl)) {
        console.log('lvl', lvl);
    }
    else {
        console.log('new player');
        localStorage.setItem("lvl","0");
    }
}