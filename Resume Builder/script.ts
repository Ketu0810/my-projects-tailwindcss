import { jsPDF } from "jspdf";
// Function to show AI suggestions
function showAISuggestions(): void {
    alert("Here are some AI suggestions for your resume!");
}

// Function to save progress to LocalStorage
function saveProgress(): void {
    const resumeData = {
        name: (document.getElementById("name") as HTMLInputElement)?.value || "",
        email: (document.getElementById("email") as HTMLInputElement)?.value || "",
        phone: (document.getElementById("phone") as HTMLInputElement)?.value || "",
        skills: (document.getElementById("skills") as HTMLInputElement)?.value || "",
        experience: (document.getElementById("experience") as HTMLTextAreaElement)?.value || "",
        education: (document.getElementById("education") as HTMLTextAreaElement)?.value || ""
    };

    localStorage.setItem("resumeData", JSON.stringify(resumeData));
    alert("Progress saved!");
}

// Function to generate and download a PDF
function downloadPDF(): void {
    const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
    });

    const name = (document.getElementById("name") as HTMLInputElement)?.value || "Your Name";
    const email = (document.getElementById("email") as HTMLInputElement)?.value || "example@gmail.com";
    const phone = (document.getElementById("phone") as HTMLInputElement)?.value || "+123456789";
    const skills = (document.getElementById("skills") as HTMLInputElement)?.value || "Your Skills";
    const experience = (document.getElementById("experience") as HTMLTextAreaElement)?.value || "Your Experience";
    const education = (document.getElementById("education") as HTMLTextAreaElement)?.value || "Your Education";

    doc.setFont("helvetica", "bold");
    doc.text("Resume", 90, 10);

    doc.setFont("helvetica", "normal");
    doc.text(`Name: ${name}`, 10, 30);
    doc.text(`Email: ${email}`, 10, 40);
    doc.text(`Phone: ${phone}`, 10, 50);
    doc.text(`Skills: ${skills}`, 10, 60);
    doc.text(`Experience: ${experience}`, 10, 70);
    doc.text(`Education: ${education}`, 10, 80);

    doc.save("resume.pdf");
}

// Event listeners
document.getElementById("aiSuggestionsBtn")?.addEventListener("click", showAISuggestions);
document.getElementById("saveProgressBtn")?.addEventListener("click", saveProgress);
document.getElementById("downloadPdfBtn")?.addEventListener("click", downloadPDF);
