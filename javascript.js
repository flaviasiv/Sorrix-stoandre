//navlinks menu mobile
const toggleButton = document.getElementsByClassName('btn-toggle')[0]
const navbarLinks = document.getElementsByClassName('menu-links')[0]

toggleButton.addEventListener('click', () => {
  navbarLinks.classList.toggle('active')
})

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
