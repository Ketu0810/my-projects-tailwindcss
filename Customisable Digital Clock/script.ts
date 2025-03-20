// DOM Elements
const digitalClock = document.getElementById("digital-clock") as HTMLDivElement;
const analogClock = document.getElementById("analog-clock") as HTMLCanvasElement;
const ctx = analogClock.getContext("2d");
const toggleModeBtn = document.getElementById("toggle-mode") as HTMLButtonElement;
const bgColorPicker = document.getElementById("bg-color-picker") as HTMLInputElement;
const fontColorPicker = document.getElementById("font-color-picker") as HTMLInputElement;
const fontStyle = document.getElementById("font-style") as HTMLSelectElement;
const alarmTimeInput = document.getElementById("alarm-time") as HTMLInputElement;
const setAlarmBtn = document.getElementById("set-alarm") as HTMLButtonElement;

let isAnalogMode = false;
let alarmTime: string | null = localStorage.getItem("alarmTime") || null;

// 🕒 Update Clock
function updateClock() {
    const now = new Date();
    digitalClock.innerText = now.toLocaleTimeString();
    if (isAnalogMode) drawAnalogClock(now);
    if (alarmTime === now.toTimeString().slice(0, 5)) triggerAlarm();
}

// 🕰️ Draw Analog Clock
function drawAnalogClock(now: Date) {
    if (!ctx) return;
    const radius = analogClock.width / 2;
    ctx.clearRect(0, 0, analogClock.width, analogClock.height);
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(radius, radius, radius - 10, 0, 2 * Math.PI);
    ctx.fill();

    const drawHand = (angle: number, length: number, width: number, color: string) => {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.moveTo(radius, radius);
        ctx.lineTo(radius + length * Math.cos(angle), radius + length * Math.sin(angle));
        ctx.stroke();
    };

    const hours = ((now.getHours() % 12) + now.getMinutes() / 60) * (Math.PI / 6);
    const minutes = (now.getMinutes() + now.getSeconds() / 60) * (Math.PI / 30);
    const seconds = now.getSeconds() * (Math.PI / 30);

    drawHand(hours, 50, 6, "black");
    drawHand(minutes, 70, 4, "black");
    drawHand(seconds, 80, 2, "red");
}

// 🔄 Toggle Digital/Analog Mode
toggleModeBtn.addEventListener("click", () => {
    isAnalogMode = !isAnalogMode;
    digitalClock.style.display = isAnalogMode ? "none" : "block";
    analogClock.style.display = isAnalogMode ? "block" : "none";
    localStorage.setItem("isAnalogMode", String(isAnalogMode));
});

// 🎨 Customization
bgColorPicker.addEventListener("input", () => {
    document.body.style.backgroundColor = bgColorPicker.value;
    localStorage.setItem("bgColor", bgColorPicker.value);
});

fontColorPicker.addEventListener("input", () => {
    digitalClock.style.color = fontColorPicker.value;
    localStorage.setItem("fontColor", fontColorPicker.value);
});

fontStyle.addEventListener("change", () => {
    digitalClock.style.fontFamily = fontStyle.value;
    localStorage.setItem("fontStyle", fontStyle.value);
});

// ⏰ Set Alarm
setAlarmBtn.addEventListener("click", () => {
    alarmTime = alarmTimeInput.value;
    localStorage.setItem("alarmTime", alarmTime);
    alert(`Alarm set for ${alarmTime}`);
});

// 🔊 Alarm Trigger
function triggerAlarm() {
    const audio = new Audio("alarm.mp3");
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
