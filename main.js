var studyButton = document.querySelector('.study-btn');
var meditateButton = document.querySelector('.meditate-btn');
var excerciseButton = document.querySelector('.exercise-btn');
var buttonBox = document.querySelector('.button-box');
var timeBox = document.querySelector('.time-box-sizing');
var minutesInput = document.querySelector('.minutes-input');
var secondsInput = document.querySelector('.seconds-input');
var sumbitButton = document.querySelector('.start-btn');
var leftColumn = document.querySelector('.column-left');

var zeroStateBtnArray = [studyButton, meditateButton, excerciseButton];
var zeroStateWarningBtn = document.getElementById('no-input-alert');
var accomplishInput = document.querySelector('.accomplish-input');
var minutesInput = document.querySelector('.minutes-input');
var secondsInput = document.querySelector('.seconds-input');
var startBtn = document.querySelector('.start-btn');
var inputArray = [accomplishInput, minutesInput, secondsInput];



// sumbitButton.addEventListener('click', function() {
//   changeLeftBox();
// })



startBtn.addEventListener('click', inputAlert);
timeBox.addEventListener('input', checkInput);
buttonBox.addEventListener('click', toggleButton);


// function inputAlert() {
//   var isNotSelected = null;
//   for(var i = 0; i < zeroStateBtnArray.length; i++) {
//     if(!zeroStateBtnArray[i].classList.contains("active")) {
//         isNotSelected = true;
//     }
//   }
//    for(var i = 0; i < inputArray.length; i++) {
//      if(inputArray[i].value === '' || isNotSelected ) {
//        //empty input field OR !== class of .active then display alert below:
//      zeroStateWarningBtn.classList.remove('toggle-alert');
//      }
//    }
//  }

function checkInput(event) {
  minutesInput.value = minutesInput.value.replace(/[^0-9]/, '');
  secondsInput.value = secondsInput.value.replace(/[^0-9]/, '');
}

function removeActiveClass(currentCategory) {
  for(var i = 0; i < zeroStateBtnArray.length; i++) {
    if(zeroStateBtnArray[i].dataset.category !== currentCategory) {
			zeroStateBtnArray[i].classList.remove('active');
			zeroStateBtnArray[i].firstElementChild.src = `assets/${zeroStateBtnArray[i].dataset.category}.svg`;
		}
  }
}

function toggleButton(event) {
	var currentCategory = event.target.dataset.category;
	var buttonImg = event.target.firstElementChild;
	var classList = event.target.classList;
  if(classList.contains('active')) {
		classList.remove('active');
		buttonImg.src = `assets/${currentCategory}.svg`;
	} else {
    classList.add('active');
		buttonImg.src = `assets/${currentCategory}-active.svg`;
	}
	removeActiveClass(currentCategory)
}


// function changeLeftBox() {
//   leftColumn.innerHTML = "";
//   leftColumn.insertAdjacentHTML('afterbegin',
//   `<h3>Current Activity</h3>
//   <div class="user-activity-box">
//     <div class="inserted-html">
//      <p class="users-activity-choice">Insert Users Choice here</p>
//      <p class = "timer">5:00</p>
//      <button class="time-button" type="button" name="button">Start</button>
//    </div>
//   </div>`);
// }

// function inputAlert(){
//   var accomplish = accomplishInput.value.length;
//   var minutes = minutesInput.value.length;
//   var seconds = secondsInput.value.length;
//   var isNotSelected = null;
//
//   for(var i = 0; i < zeroStateBtnArray.length; i++) {
//   if(!zeroStateBtnArray[i].classList.contains("active"))
//       isNotSelected = true;
//   }
//   if(accomplish < 1) {
//     accomplish = false;
//   }
//   if(minutes < 1) {
//     minutes = false;
//   }
//   if(seconds < 1) {
//     seconds = false;
//   }
//   if(!accomplish || !minutes || !seconds)

// function inputAlert(){
//   var accomplish = accomplishInput.value.length;
//   var minutes = minutesInput.value.length;
//   var seconds = secondsInput.value.length;
//   var isNotSelected = null;
//   if(accomplish === 0){
//     accomplish = "Empty";
//   }
//   if(minutes === 0){
//     minutes = "Empty";
//   }
//   if(seconds === 0){
//     seconds = "Empty";
//   }
//   for(var i = 0; i < zeroStateBtnArray.length; i++) {
//     if(!zeroStateBtnArray[i].classList.contains("active")) {
//       isNotSelected = "Empty";
//           }
//   }
//   if(seconds !== "Empty" || minutes !== "Empty" || accomplish
//   !== "Empty" || isNotSelected !== "Empty") {
//     changeLeftBox();
//   } else {
//     zeroStateWarningBtn.classList.remove('toggle-alert');
//   }
// }

function inputAlert() {
      var isSelected = null
      var filledInput = true
  for(var i = 0; i < zeroStateBtnArray.length; i++) {
    if(zeroStateBtnArray[i].classList.contains("active")) {
      console.log("button", zeroStateBtnArray[i]);
          isSelected = true;

        }
  }

  for(var i = 0; i < inputArray.length; i++) {
    if((inputArray[i].value === '') || !isSelected) {
      console.log("value",inputArray[i].value);
      console.log(isSelected);
      zeroStateWarningBtn.classList.remove('toggle-alert');
      filledInput = false;
    }
  }
  //for filledInput = true (isSelected=true no empty strings inputArray)
    if(filledInput && isSelected) {
      changeLeftBox();
  }
}

function changeLeftBox() {
       leftColumn.innerHTML = "";
       leftColumn.insertAdjacentHTML('afterbegin',
       `<h3>Current Activity</h3>
       <div class="user-activity-box">
         <div class="inserted-html">
          <p class="users-activity-choice">Insert Users Choice here</p>
          <p class = "timer">5:00</p>
          <button class="time-button" type="button" name="button">Start</button>
        </div>
       </div>`);
     }
