
function collapse() {
    var x = document.getElementById("nav");
    if (x.className === "header__navigation") {
        x.className += " responsive";
    } else {
        x.className = "header__navigation";
    }
}
