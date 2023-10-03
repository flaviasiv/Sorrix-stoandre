//navlinks menu mobile
const toggleButton = document.getElementsByClassName('btn-toggle')[0]
const navbarLinks = document.getElementsByClassName('menu-links')[0]

toggleButton.addEventListener('click', () => {
  navbarLinks.classList.toggle('active')
})

//slider1 

const wrapper = document.querySelector(".container");
const carousel = document.querySelector(".slider-wrapper");
const arrowsBtns = document.querySelectorAll(".slider-wrapper i"); //botoes
const firstCardWidth = carousel.querySelector(".slider").offsetWidth;
const carouselChildrens = [...carousel.children];

let isDragging = false, startX, startScrollLeft, timeoutId;

let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

carouselChildrens.slice(-cardPerView).reverse().forEach(card =>{
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

carouselChildrens.slice(0, cardPerView).forEach(card =>{
    carousel.insertAdjacentHTML("beforeEnd", card.outerHTML);
});

arrowsBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
    })
});

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
    if(!isDragging) return;
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
};

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");

};

const autoPlay = () => {
    if(window.innerWidth < 800) return; //retorna se window for menor que 800
    //autoplay carrosel acada 4000ms
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 4000)

}
autoPlay();

const infiniteScroll = () => {
    if(carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - ( 2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    } else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth){
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    } 

    clearTimeout(timeoutId);
    if(!wrapper.matches(":hover")) autoPlay();
};

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);





//slider2
const slider = document.querySelector(".carousel"),
firstImg = slider.querySelectorAll("img")[0],
arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStartt = false, prevPageX, prevScrollLeft, positionDiff;

const showHideIcons = () => {
    // showing and hiding prev/next icon according to slider scroll left value
    let scrollWidth = slider.scrollWidth - slider.clientWidth; // getting max scrollable width
    arrowIcons[0].style.display = slider.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = slider.scrollLeft == scrollWidth ? "none" : "block";
}

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        let firstImgWidthh = firstImg.clientWidth + 14; // getting first img width & adding 14 margin value
        // if clicked icon is left, reduce width value from the slider scroll left else add to it
        slider.scrollLeft += icon.id === "left" ? -firstImgWidthh : firstImgWidthh;
        setTimeout(() => showHideIcons(), 60); // calling showHideIcons after 60ms
    });
});

const autoSlide = () => {
    // if there is no image left to scroll then return from here
    if(slider.scrollLeft - (slider.scrollWidth - slider.clientWidth) > -1 || slider.scrollLeft <= 0) return;

    positionDiff = Math.abs(positionDiff); // making positionDiff value to positive
    let firstImgWidthh = firstImg.clientWidth + 14;
    // getting difference value that needs to add or reduce from slider left to take middle img center
    let valDifference = firstImgWidthh - positionDiff;

    if(slider.scrollLeft > prevScrollLeft) { // if user is scrolling to the right
        return slider.scrollLeft += positionDiff > firstImgWidthh / 3 ? valDifference : -positionDiff;
    }
    // if user is scrolling to the left
    slider.scrollLeft -= positionDiff > firstImgWidthh / 3 ? valDifference : -positionDiff;
}

const dragStartt = (e) => {
  // updatating global variables value on mouse down event
  isDragStartt = true;
  prevPageX = e.pageX || e.touches[0].pageX;
  prevScrollLeft = slider.scrollLeft;
}
const draggingg = (e) => {
  // scrolling images/slider to left according to mouse pointer
  if(!isDragStartt) return;
  e.preventDefault();
  isDragging = true;
  slider.classList.add("dragging");
  positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
  slider.scrollLeft = prevScrollLeft - positionDiff;
  showHideIcons();
}
const dragStopp = () => {
  isDragStartt = false;
  slider.classList.remove("dragging");
  if(!isDragging) return;
  isDragging = false;
  autoSlide();
}
slider.addEventListener("mousedown", dragStartt);
slider.addEventListener("touchstart", dragStartt);
document.addEventListener("mousemove", draggingg);
slider.addEventListener("touchmove", draggingg);
document.addEventListener("mouseup", dragStopp);
slider.addEventListener("touchend", dragStopp);

//form



//slder 3 

//function next(t){
//    let elm = t.parentElement.parentElement.children[0];
//    let item = elm.getElementsByClassName("item");
//    elm.append(item[0]);
//  }
//  
//  function prev(t){
//    let elm = t.parentElement.parentElement.children[0];
//    let item = elm.getElementsByClassName("item");
//    elm.prepend(item[item.length - 1]);
//}
//
//function showSlides(n) {
//  var i;
//  var slides = document.getElementsByClassName("imgslide");
//  var dots = document.getElementsByClassName("dot2");
//  if (n > slides.length) {slideIndex = 1}
//    if (n < 1) {slideIndex = slides.length}
//    for (i = 0; i < slides.length; i++) {
//      slides[i].style.display = "none";
//    }
//    for (i = 0; i < dots.length; i++) {
//      dots[i].className = dots[i].className.replace(" active", "");
//    }
//  slides[slideIndex-1].style.display = "block";
//  dots[slideIndex-1].className += " active";
//}
