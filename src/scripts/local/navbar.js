var path = window.location.pathname;
var page = path.split("/").pop();

var els = document.getElementsByClassName('header__navigation--element');

for(var i = 0; i < els.length; i++) {
	var a = els[i].childNodes[0].href;
	els[i].childNodes[0].classList.remove('active');
	if(a.substring(a.lastIndexOf('/')) == '/'+page) {
		console.log(els[i].childNodes[0].href);
		els[i].childNodes[0].classList.add('active');
	}
}







