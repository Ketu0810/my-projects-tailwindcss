var _a, _b, _c;
// Example function for AI suggestions
function showAISuggestions() {
    alert("Here are some AI suggestions for your resume!");
}
// Save progress to localStorage
function saveProgress() {
    var _a, _b, _c, _d, _e, _f;
    var name = ((_a = document.getElementById("name")) === null || _a === void 0 ? void 0 : _a.value) || "";
    var email = ((_b = document.getElementById("email")) === null || _b === void 0 ? void 0 : _b.value) || "";
    var phone = ((_c = document.getElementById("phone")) === null || _c === void 0 ? void 0 : _c.value) || "";
    var skills = ((_d = document.getElementById("skills")) === null || _d === void 0 ? void 0 : _d.value) || "";
    var experience = ((_e = document.getElementById("experience")) === null || _e === void 0 ? void 0 : _e.value) || "";
    var education = ((_f = document.getElementById("education")) === null || _f === void 0 ? void 0 : _f.value) || "";
    var resumeData = { name: name, email: email, phone: phone, skills: skills, experience: experience, education: education };
    localStorage.setItem("resumeData", JSON.stringify(resumeData));
    alert("Progress saved!");
}
// Generate and download PDF
function downloadPDF() {
    var _a, _b, _c, _d, _e, _f;
    var doc = new jsPDF();
    var name = ((_a = document.getElementById("name")) === null || _a === void 0 ? void 0 : _a.value) || "Your Name";
    var email = ((_b = document.getElementById("email")) === null || _b === void 0 ? void 0 : _b.value) || "example@gmail.com";
    var phone = ((_c = document.getElementById("phone")) === null || _c === void 0 ? void 0 : _c.value) || "+123456789";
    var skills = ((_d = document.getElementById("skills")) === null || _d === void 0 ? void 0 : _d.value) || "Your skills here...";
    var experience = ((_e = document.getElementById("experience")) === null || _e === void 0 ? void 0 : _e.value) || "Your experience here...";
    var education = ((_f = document.getElementById("education")) === null || _f === void 0 ? void 0 : _f.value) || "Your education details...";
    doc.text("Name: ".concat(name), 10, 10);
    doc.text("Email: ".concat(email), 10, 20);
    doc.text("Phone: ".concat(phone), 10, 30);
    doc.text("Skills: ".concat(skills), 10, 40);
    doc.text("Experience: ".concat(experience), 10, 50);
    doc.text("Education: ".concat(education), 10, 60);
    doc.save("resume.pdf");
}
// Button event listeners
(_a = document.getElementById("aiSuggestionsBtn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", showAISuggestions);
(_b = document.getElementById("saveProgressBtn")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", saveProgress);
(_c = document.getElementById("downloadPdfBtn")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", downloadPDF);
