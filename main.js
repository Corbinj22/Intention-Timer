var studyButton = document.querySelector('.study-btn');
var meditateButton = document.querySelector('.meditate-btn');
var exerciseButton = document.querySelector('.exercise-btn');
var buttonBox = document.querySelector('.button-box');
var timeBox = document.querySelector('.left-column-time-box');
var minutesInput = document.querySelector('.minutes-input');
var secondsInput = document.querySelector('.seconds-input');
var sumbitButton = document.querySelector('.start-btn');
var leftColumn = document.querySelector('.column-left');
var zeroStateWarningBtn = document.querySelector('.no-input-alert');
var accomplishInput = document.querySelector('.accomplish-input');
var minutesInput = document.querySelector('.minutes-input');
var secondsInput = document.querySelector('.seconds-input');
var outputAccomplisment = document.querySelector('.users-activity-choice');
var timeStartButton = document.querySelector('.time-button');
var counter = 0;
var logBtn = document.querySelector('.log-activity');



var zeroStateBtnArray = [studyButton, meditateButton, exerciseButton];
var inputArray = [accomplishInput, minutesInput, secondsInput];

sumbitButton.addEventListener('click', inputAlert);
timeBox.addEventListener('input', checkInput);
buttonBox.addEventListener('click', toggleButton);

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

function inputAlert() {
  var isSelected = null;
  var filledInput = true;
  for(var i = 0; i < zeroStateBtnArray.length; i++) {
    if(zeroStateBtnArray[i].classList.contains("active")) {
    isSelected = true;
  }
}
  for(var i = 0; i < inputArray.length; i++) {
    if((inputArray[i].value === '') || !isSelected) {
      zeroStateWarningBtn.classList.remove('toggle-alert');
      filledInput = false;
    }
  }
    if(filledInput && isSelected) {
    changeLeftBox();
  }
}

function changeLeftBox() {
  var activityChoice = accomplishInput.value;
  var minutesTime = minutesInput.value;
  var secondsTime = secondsInput.value;
  if(secondsInput.value < 10) {
    secondsTime = `0${secondsTime}`;
  }
  leftColumn.innerHTML = "";
  leftColumn.insertAdjacentHTML('afterbegin',`
  <h3>Current Activity</h3>
  <div class="user-activity-box">
    <div class="inserted-html">
      <p class="users-activity-choice">${activityChoice}</p>
      <p class ="timer">${minutesTime}:${secondsTime}</p>
      <button class="time-button" type="button" onclick="timerStart()" name="button">Start</button>
      <button class="log-activity hidden"type="button">Log Activity</button>
    </div>
  </div>`);
  for(var i = 0; i < zeroStateBtnArray.length; i++) {
    if(zeroStateBtnArray[i].classList.contains('active')) {
      timeStartButton = document.querySelector('.time-button');
      timeStartButton.classList.add(`time-button-${zeroStateBtnArray[i].dataset.category}`);
    }
  }
}

function timerStart(){
  var seconds = parseInt(secondsInput.value);
  var minutes = parseInt(minutesInput.value);
  var totalTime = (minutes*60) + seconds;
  var timer = document.querySelector('.timer');
  var logBtn = document.querySelector('.log-activity');
  var timeTracker = setInterval(function () {
    counter++;
    var s = totalTime - counter;
    var min = Math.floor(s / 60);
    var sec = s % 60;
    timer.innerHTML = `${min}:${sec}`;
    if(sec < 10) {
      timer.innerHTML = `${min}:0${sec}`;
    }
    if(s === 0) {
      clearInterval(timeTracker);
      logBtn.classList.remove('hidden');
    }
  }, 1000);
}
