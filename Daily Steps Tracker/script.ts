// Type-safe element selectors
const goalInput = document.getElementById("goal") as HTMLInputElement;
const stepsInput = document.getElementById("steps") as HTMLInputElement;
const addStepsBtn = document.getElementById("addSteps") as HTMLButtonElement;
const resetBtn = document.getElementById("reset") as HTMLButtonElement;
const progressBar = document.getElementById("progress-bar") as HTMLDivElement;
const progressText = document.getElementById("progress-text") as HTMLParagraphElement;
const badgesContainer = document.getElementById("badges") as HTMLDivElement;

// Initial state with default values
let goal: number = Number(localStorage.getItem("goal")) || 10000;
let steps: number = Number(localStorage.getItem("steps")) || 0;

// Set initial goal input value
goalInput.value = goal.toString();
updateUI();
checkAchievements();

// Event: Add steps
addStepsBtn.addEventListener("click", () => {
  const enteredSteps = Number(stepsInput.value);
  if (enteredSteps > 0) {
    steps += enteredSteps;
    localStorage.setItem("steps", steps.toString());
    stepsInput.value = "";
    updateUI();
    checkAchievements();
  }
});

// Event: Set new goal
goalInput.addEventListener("change", () => {
  goal = Number(goalInput.value) || 10000;
  localStorage.setItem("goal", goal.toString());
  updateUI();
});

// Event: Reset steps
resetBtn.addEventListener("click", () => {
  steps = 0;
  localStorage.setItem("steps", "0");
  updateUI();
  checkAchievements();
});

// Update progress bar and text
function updateUI(): void {
  const progressPercent = Math.min((steps / goal) * 100, 100);
  progressBar.style.width = `${progressPercent}%`;
  progressText.textContent = `${steps} / ${goal} steps`;
}

// Generate achievement badges
function checkAchievements(): void {
  badgesContainer.innerHTML = ""; // Clear existing badges
  const milestones = [5000, 10000, 20000, 30000];
  milestones.forEach((milestone) => {
    if (steps >= milestone) {
      const badge = document.createElement("div");
      badge.className = "px-3 py-1 bg-yellow-400 rounded-lg font-bold flex items-center gap-2";
      badge.textContent = `${milestone} Steps 🏆`;
      badgesContainer.appendChild(badge);
    }
  });
}

// Send browser notifications for reminders
function sendReminder(): void {
  if (Notification.permission === "granted") {
    new Notification("Don't forget to log your steps! 🚶‍♂️");
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        new Notification("Don't forget to log your steps! 🚶‍♀️");
      }
    });
  }
}

// Trigger reminders every 4 hours
setInterval(sendReminder, 4 * 60 * 60 * 1000);
