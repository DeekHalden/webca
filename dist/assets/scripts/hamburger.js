'use strict';
function collapse() {
	toggleMenu();
    var nav = document.getElementById("nav");
    if (nav.className === "header__navigation") {
        nav.className += " responsive";
    } else {
        nav.className = "header__navigation";
    }
}
function toggleMenu() {
	var navButton = document.getElementsByClassName("header__navigation--icon_menu")[0]
	navButton.classList.toggle('active');
}
