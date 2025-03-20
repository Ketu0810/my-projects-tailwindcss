// DOM Elements
var digitalClock = document.getElementById("digital-clock");
var analogClock = document.getElementById("analog-clock");
var ctx = analogClock.getContext("2d");
var toggleModeBtn = document.getElementById("toggle-mode");
var bgColorPicker = document.getElementById("bg-color-picker");
var fontColorPicker = document.getElementById("font-color-picker");
var fontStyle = document.getElementById("font-style");
var alarmTimeInput = document.getElementById("alarm-time");
var setAlarmBtn = document.getElementById("set-alarm");
var isAnalogMode = false;
var alarmTime = localStorage.getItem("alarmTime") || null;
// 🕒 Update Clock
function updateClock() {
    var now = new Date();
    digitalClock.innerText = now.toLocaleTimeString();
    if (isAnalogMode)
        drawAnalogClock(now);
    if (alarmTime === now.toTimeString().slice(0, 5))
        triggerAlarm();
}
// 🕰️ Draw Analog Clock
function drawAnalogClock(now) {
    if (!ctx)
        return;
    var radius = analogClock.width / 2;
    ctx.clearRect(0, 0, analogClock.width, analogClock.height);
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(radius, radius, radius - 10, 0, 2 * Math.PI);
    ctx.fill();
    var drawHand = function (angle, length, width, color) {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.moveTo(radius, radius);
        ctx.lineTo(radius + length * Math.cos(angle), radius + length * Math.sin(angle));
        ctx.stroke();
    };
    var hours = ((now.getHours() % 12) + now.getMinutes() / 60) * (Math.PI / 6);
    var minutes = (now.getMinutes() + now.getSeconds() / 60) * (Math.PI / 30);
    var seconds = now.getSeconds() * (Math.PI / 30);
    drawHand(hours, 50, 6, "black");
    drawHand(minutes, 70, 4, "black");
    drawHand(seconds, 80, 2, "red");
}
// 🔄 Toggle Digital/Analog Mode
toggleModeBtn.addEventListener("click", function () {
    isAnalogMode = !isAnalogMode;
    digitalClock.style.display = isAnalogMode ? "none" : "block";
    analogClock.style.display = isAnalogMode ? "block" : "none";
    localStorage.setItem("isAnalogMode", String(isAnalogMode));
});
// 🎨 Customization
bgColorPicker.addEventListener("input", function () {
    document.body.style.backgroundColor = bgColorPicker.value;
    localStorage.setItem("bgColor", bgColorPicker.value);
});
fontColorPicker.addEventListener("input", function () {
    digitalClock.style.color = fontColorPicker.value;
    localStorage.setItem("fontColor", fontColorPicker.value);
});
fontStyle.addEventListener("change", function () {
    digitalClock.style.fontFamily = fontStyle.value;
    localStorage.setItem("fontStyle", fontStyle.value);
});
// ⏰ Set Alarm
setAlarmBtn.addEventListener("click", function () {
    alarmTime = alarmTimeInput.value;
    localStorage.setItem("alarmTime", alarmTime);
    alert("Alarm set for ".concat(alarmTime));
});
// 🔊 Alarm Trigger
function triggerAlarm() {
    var audio = new Audio("alarm.mp3");
    audio.play();
    alert("⏰ Alarm!");
    localStorage.removeItem("alarmTime");
    alarmTime = null;
}
// 🔄 Restore Preferences
function loadPreferences() {
    document.body.style.backgroundColor = localStorage.getItem("bgColor") || "#1F2937";
    digitalClock.style.color = localStorage.getItem("fontColor") || "#FFFFFF";
    digitalClock.style.fontFamily = localStorage.getItem("fontStyle") || "Arial";
    isAnalogMode = localStorage.getItem("isAnalogMode") === "true";
    digitalClock.style.display = isAnalogMode ? "none" : "block";
    analogClock.style.display = isAnalogMode ? "block" : "none";
}
// ⏳ Update Clock Every Second
setInterval(updateClock, 1000);
loadPreferences();
