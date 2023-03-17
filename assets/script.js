var descriptionEl = $('.description');
var saveBtnEl = $('.saveBtn');

var taskList = JSON.parse(localStorage.getItem("taskList")) || [];


// Function to process save button
function handleFormSubmit(event) {
  // Prevent the default behavior
  event.preventDefault();
  // Gets the user input and the time block div it belong
  var timeBlockEl = $(this).parent().attr('id');
  var timeBlockElId = "#" + timeBlockEl;
  var text = $('.description', timeBlockElId).val().trim(); 
  // Creates new array from save button event
  var newTask = {
    task: text,
    time: timeBlockEl
  };
  // Check if time-block already exist
  if (taskList.some(taskList => taskList.time === newTask.time)) {
    // Get the index number of the object if time-block already exists
    var arrayIndex = taskList.findIndex(taskList => taskList.time === newTask.time);
    // Remove the old object 
    taskList.splice(arrayIndex, 1);
    // Push updated object with updated value
    savetoLocal();
  }
  else {
    savetoLocal();
  }

  // Function to save array to local storage
  function savetoLocal() {
    taskList.push(newTask);
    localStorage.setItem("taskList", JSON.stringify(taskList));
  }
}

// Function to convert the current time into interger
function textToNum(timeText) {
  var timeVal = timeText.slice(0, -2);
  var timeAMPM = timeText.slice(-2);
  if ((timeAMPM === "PM") && (timeVal != 12)) {
    var timeInt = parseInt(timeVal) + 12;
    return (timeInt);
  } if ((timeAMPM === "PM") && (timeVal == 12)) {
    var timeInt = 12;
    return (timeInt);
  } else {
    var timeInt = parseInt(timeVal);
    return (timeInt);
  }
}

// Display the current date in the header of the page.
var today = dayjs();
$('#currentDay').text(today.format('dddd, MMMM Do'));

// Listener for click events on the save button
saveBtnEl.on('click', handleFormSubmit);

// Persist saved events during page refresh
window.onload = function () {
  var taskList = JSON.parse(window.localStorage.getItem('taskList'));
  if (taskList !== null) {
    for (var i = 0; i < taskList.length; i++) {
      var task = taskList[i].task;
      var time = taskList[i].time;
      var timeId = "#" + time;
      $('.description', timeId).text(task);

    }
  }
}

// Get the current time
var now = dayjs().format('hA');
var nowTime = textToNum(now);

// Gives class past, present, or future class to each time block by comparing to current time
var hourDiv = $('div', '.time-block');
for (var i = 0; i < hourDiv.length; i++) {
  var timeBlock = hourDiv.eq(i).text();
  var hourDivTime = textToNum(timeBlock);

  if (hourDivTime === nowTime) {
    hourDiv.eq(i).siblings('.description').addClass('present');
  } else if (hourDivTime < nowTime) {
    hourDiv.eq(i).siblings('.description').addClass('past');
  } else {
    hourDiv.eq(i).siblings('.description').addClass('future');
  }
}
