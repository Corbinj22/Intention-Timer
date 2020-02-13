var studyButton = document.querySelector('.study-btn');
var meditateButton = document.querySelector('.meditate-btn');
var exerciseButton = document.querySelector('.exercise-btn');
var buttonBox = document.querySelector('.button-box');
var timeBox = document.querySelector('.left-column-time-box');
var minutesInput = document.querySelector('.minutes-input');
var secondsInput = document.querySelector('.seconds-input');
var sumbitButton = document.querySelector('.start-btn');
var leftColumn = document.querySelector('.column-left');
var zeroStateWarningButton = document.querySelector('.no-input-alert');
var accomplishInput = document.querySelector('.accomplish-input');
var minutesInput = document.querySelector('.minutes-input');
var secondsInput = document.querySelector('.seconds-input');
var timeStartButton = document.querySelector('.time-button');
var counter = 0;
var logBtn = document.querySelector('.log-activity');
var rightColumn = document.querySelector('.column-right');
var pastActivitiesCard = document.querySelector('.past-activities-card');
var zeroStateBtnArray = [studyButton, meditateButton, exerciseButton];
var inputArray = [accomplishInput, minutesInput, secondsInput];


sumbitButton.addEventListener('click', inputAlert);
timeBox.addEventListener('input', checkInput);
buttonBox.addEventListener('click', toggleButton);
leftColumn.addEventListener('click', function() {
  timerStart(event);
});
leftColumn.addEventListener('click', function () {
  logActivity(event);
});
leftColumn.addEventListener('click', function() {
  toggleInitialPage(event);
});


function checkInput(event) {
  minutesInput.value = minutesInput.value.replace(/[^0-9]/, '');
  secondsInput.value = secondsInput.value.replace(/[^0-9]/, '');
};

function removeActiveClass(currentCategory) {
  for(var i = 0; i < zeroStateBtnArray.length; i++) {
    if (zeroStateBtnArray[i].dataset.category !== currentCategory) {
			zeroStateBtnArray[i].classList.remove('active');
			zeroStateBtnArray[i].firstElementChild.src = `assets/${zeroStateBtnArray[i].dataset.category}.svg`;
		}
  }
};

function toggleButton(event) {
	var currentCategory = event.target.dataset.category;
	var buttonImg = event.target.firstElementChild;
	var classList = event.target.classList;
  if (classList.contains('active')) {
		classList.remove('active');
		buttonImg.src = `assets/${currentCategory}.svg`;
	} else {
    classList.add('active');
		buttonImg.src = `assets/${currentCategory}-active.svg`;
	}
	removeActiveClass(currentCategory);
};

function inputAlert() {
  var isSelected = null;
  var filledInput = true;
  for(var i = 0; i < zeroStateBtnArray.length; i++) {
    if (zeroStateBtnArray[i].classList.contains("active")) {
      isSelected = true;
  }
};

  for(var i = 0; i < inputArray.length; i++) {
    if ((inputArray[i].value === '') || !isSelected) {
      zeroStateWarningButton.classList.remove('toggle-alert');
      filledInput = false;
    }
  };
    if (filledInput && isSelected) {
      changeLeftBox();
  }
};

function changeLeftBox() {
  var activityChoice = accomplishInput.value;
  var minutesTime = minutesInput.value;
  var secondsTime = secondsInput.value;
  if (secondsInput.value < 10) {
    secondsTime = `0${secondsTime}`
  };

  leftColumn.innerHTML = "";
  leftColumn.insertAdjacentHTML('afterbegin',`
    <h3>Current Activity</h3>
    <div class="user-activity-box">
      <div class="inserted-html">
        <p class="users-activity-choice">${activityChoice}</p>
        <p class ="timer">${minutesTime}:${secondsTime}</p>
        <button class="time-button" type="button" name="button">Start</button>
        <button class="log-activity hidden"type="button">Log Activity</button>
      </div>
    </div>`);
  for(var i = 0; i < zeroStateBtnArray.length; i++) {
    if (zeroStateBtnArray[i].classList.contains('active')) {
      timeStartButton = document.querySelector('.time-button');
      timeStartButton.classList.add(`time-button-${zeroStateBtnArray[i].dataset.category}`);
    }
  }
};

function timerStart() {
  if (event.target.classList.contains('time-button')) {
    document.querySelector('.time-button').disabled = true;
    var counter = 0
    var seconds = parseInt(secondsInput.value);
    var minutes = parseInt(minutesInput.value);
    var totalTime = (minutes*60) + seconds;
    var timer = document.querySelector('.timer');
    var logBtn = document.querySelector('.log-activity');
    var timeTracker = setInterval(function() {
      counter++;
      var s = totalTime - counter;
      var min = Math.floor(s / 60);
      var sec = s % 60;
      timer.innerHTML = `${min}:${sec}`;
      if (sec < 10) {
        timer.innerHTML = `${min}:0${sec}`;
      };
      if (s === 0) {
        clearInterval(timeTracker);
        logBtn.classList.remove('hidden');
        timeStartButton.innerHTML = `${"COMPLETE!"}`;
      }
    }, 1000);
  }
};

function logActivity(event) {
  var activityChoice = accomplishInput.value;
  var minutesTime = minutesInput.value;
  var secondsTime = secondsInput.value;
  var activityLabel = null;
  if (studyButton.classList.contains('active')) {
    activityLabel = "STUDY";
  } else if (exerciseButton.classList.contains('active')) {
    activityLabel = "EXERCISE";
  } else if (meditateButton.classList.contains('active')) {
    activityLabel = "MEDITATE"
  }
  if (event.target.classList.contains('log-activity')) {
    rightColumn.innerHTML = "";
    rightColumn.insertAdjacentHTML('afterbegin',`
    <h2>Past Activities</h2>
    <div class = "past-activities-card">
      <h3 id = "activity-label">${activityLabel}</h3>
      <p id = "time-input">${minutesTime} MIN ${secondsTime} SECONDS</p>
      <p id = "activity-input">${activityChoice}</p>
      <div class="bar"></div>
    </div>`);
  for(var i = 0; i < zeroStateBtnArray.length; i++) {
    if(zeroStateBtnArray[i].classList.contains('active')) {
      barColor = document.querySelector('.bar');
      barColor.classList.add(`bar-${zeroStateBtnArray[i].dataset.category}`);
      }
    }
    leftColumn.innerHTML = "";
    leftColumn.insertAdjacentHTML('afterbegin',`
    <button class="create-new-activity">CREATE A NEW ACTIVITY</button>`);
  }
}

function toggleInitialPage () {
  if (event.target.classList.contains('create-new-activity')) {
    leftColumn.innerHTML = "";
    leftColumn.insertAdjacentHTML('afterbegin',`
      <h3>New Activity</h3>
       <div class="user-activity-box">
        <p class="left-box-global-p">Select a category:</p>
        <div class="button-box">
          <div class="activity-selection">
            <button class = "category-btn study-btn" type="button" data-category="study" name="button">
            <img class="non-active-img" src="assets/study.svg">Study</button>
          </div>
          <div class="activity-selection">
            <button class = "category-btn meditate-btn" type="button" data-category='meditate' name="button">
            <img class="non-active-img" src="assets/meditate.svg">Meditate</button>
          </div>
          <div class="activity-selection">
            <button class = "category-btn exercise-btn" type="button" data-category='exercise' name="button">
            <img class="non-active-img" src="assets/exercise.svg">Excercise</button>
          </div>
        </div>
        <p class = "left-box-global-p">What would you like to accomplish during this time?</p>
        <input class="full-width-input accomplish-input" type="text" name="accomplishForm" onsubmit="return validateForm()" value="">
        <p class="toggle-alert no-input-alert"><img class="warning-img" src="assets/warning.svg"> A description is required.</p>
        <div class="left-column-time-box">
          <div class="time-box-sizing">
            <p class = "left-box-global-p">Minutes</p>
            <input class="half-width-input minutes-input" type="text" name="minutesForm" onsubmit="return validateForm()" value="">
          </div>
          <div class="time-box-sizing">
            <p class = "left-box-global-p">Seconds</p>
            <input class="half-width-input seconds-input" type="text" name="secondsForm" onsubmit="return validateForm()" value="">
          </div>
        </div>
        <button class="start-btn" type="button" name="button">START ACTIVITY</button>
      </div>`);
  }
}
