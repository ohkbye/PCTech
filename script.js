const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
})

document.querySelectorAll(".nav-link").forEach(n => n.
  addEventListener("click", () => {
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
}))

let thumbnails = document.getElementsByClassName('thumbnail');
let slider = document.getElementById('slider');

let buttonRight = document.getElementById('slide-right');
let buttonLeft = document.getElementById('slide-left');

buttonLeft.addEventListener('click', function(){
    slider.scrollLeft -= 125;
})

buttonRight.addEventListener('click', function(){
    slider.scrollLeft += 125;
})

const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
// alert(maxScrollLeft);
// alert("Left Scroll:" + slider.scrollLeft);

//AUTO PLAY THE SLIDER 
function autoPlay() {
    if (slider.scrollLeft > (maxScrollLeft - 1)) {
        slider.scrollLeft -= maxScrollLeft;
    } else {
        slider.scrollLeft += 1;
    }
}
let play = setInterval(autoPlay, 40);

// PAUSE THE SLIDE ON HOVER
for (var i=0; i < thumbnails.length; i++){

thumbnails[i].addEventListener('mouseover', function() {
    clearInterval(play);
});

thumbnails[i].addEventListener('mouseout', function() {
    return play = setInterval(autoPlay, 50);
});
}