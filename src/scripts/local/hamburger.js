var navButton = document.getElementsByClassName("nav_button")[0];
navButton.addEventListener('click', toggleMenu);

function toggleMenu() {
	navButton.classList.toggle('active');
	collapse();
}

function collapse() {
    var nav = document.getElementById("nav");
    if (nav.className === "header__navigation") {
        nav.className += " responsive";
    } else {
        nav.className = "header__navigation";
    }
}
