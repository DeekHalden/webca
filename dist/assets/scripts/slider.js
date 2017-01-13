'use strict';

var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function showDivs(n) {
    var i;

    var x = document.getElementsByClassName("main__slider--container");
  
	if (n > x.length) {
		slideIndex = 1;
	}    

	if (n < 1) {
		slideIndex = x.length;
	}

	for (i = 0; i < x.length; i++) {
		x[i].classList.remove('block');
		x[i].classList.add('hidden');
	}

	x[slideIndex-1].classList.remove('hidden');
	x[slideIndex-1].classList.add('block');
	

}