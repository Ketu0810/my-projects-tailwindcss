// Type-safe element selectors
var goalInput = document.getElementById("goal");
var stepsInput = document.getElementById("steps");
var addStepsBtn = document.getElementById("addSteps");
var resetBtn = document.getElementById("reset");
var progressBar = document.getElementById("progress-bar");
var progressText = document.getElementById("progress-text");
var badgesContainer = document.getElementById("badges");
// Initial state with default values
var goal = Number(localStorage.getItem("goal")) || 10000;
var steps = Number(localStorage.getItem("steps")) || 0;
// Set initial goal input value
goalInput.value = goal.toString();
updateUI();
checkAchievements();
// Event: Add steps
addStepsBtn.addEventListener("click", function () {
    var enteredSteps = Number(stepsInput.value);
    if (enteredSteps > 0) {
        steps += enteredSteps;
        localStorage.setItem("steps", steps.toString());
        stepsInput.value = "";
        updateUI();
        checkAchievements();
    }
});
// Event: Set new goal
goalInput.addEventListener("change", function () {
    goal = Number(goalInput.value) || 10000;
    localStorage.setItem("goal", goal.toString());
    updateUI();
});
// Event: Reset steps
resetBtn.addEventListener("click", function () {
    steps = 0;
    localStorage.setItem("steps", "0");
    updateUI();
    checkAchievements();
});
// Update progress bar and text
function updateUI() {
    var progressPercent = Math.min((steps / goal) * 100, 100);
    progressBar.style.width = "".concat(progressPercent, "%");
    progressText.textContent = "".concat(steps, " / ").concat(goal, " steps");
}
// Generate achievement badges
function checkAchievements() {
    badgesContainer.innerHTML = ""; // Clear existing badges
    var milestones = [5000, 10000, 20000, 30000];
    milestones.forEach(function (milestone) {
        if (steps >= milestone) {
            var badge = document.createElement("div");
            badge.className = "px-3 py-1 bg-yellow-400 rounded-lg font-bold flex items-center gap-2";
            badge.textContent = "".concat(milestone, " Steps \uD83C\uDFC6");
            badgesContainer.appendChild(badge);
        }
    });
}
// Send browser notifications for reminders
function sendReminder() {
    if (Notification.permission === "granted") {
        new Notification("Don't forget to log your steps! 🚶‍♂️");
    }
    else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function (permission) {
            if (permission === "granted") {
                new Notification("Don't forget to log your steps! 🚶‍♀️");
            }
        });
    }
}
// Trigger reminders every 4 hours
setInterval(sendReminder, 4 * 60 * 60 * 1000);
