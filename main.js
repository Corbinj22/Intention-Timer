var studyButton = document.querySelector('.study-btn');
var meditateButton = document.querySelector('.meditate-btn');
var excerciseButton = document.querySelector('.excercise-btn');
var buttonBox = document.querySelector('.button-box');
var zeroStateBtnArray = [studyButton, meditateButton, excerciseButton];


buttonBox.addEventListener('click', function() {
  toggleButton(event);
});

function toggleButton(event) {
  var currentCategory = null;
  if(event.target.classList.contains('category-btn')) {
    currentCategory = event.target.dataset.category;
    event.target.classList.add('active');
    var buttonImg = event.target.firstElementChild;
    buttonImg.src = `assets/${currentCategory}-active.svg` ;
  // } else if(event.target.classList.contains('active')){
  //   // currentCategory = event.target.dataset.category;
  //   // removeActiveClass(currentCategory);
  //   console.log(1);
  // }
}

function removeActiveClass(currentCategory) {
  for(var i = 0; i < zeroStateBtnArray.length; i++) {
    zeroStateBtnArray[i].classList.remove('active');
  }
}

// if target doesnt contain class of hidden, add hidden
// target brother'element toggle delete classlist of hidden;
