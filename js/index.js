/* access localstorage, create level if necessary */
window.onload = (e) =>{
    let lvl = parseInt(localStorage.getItem("lvl"));
    if (!isNaN(lvl)) {
        console.log('got a level :)', lvl);
    }
    else {
        console.log('got no level :(');
        localStorage.setItem("lvl","0");
    }
}