// Selecting elements with proper TypeScript typings
const nameInput = document.getElementById("name") as HTMLInputElement;
const jobInput = document.getElementById("job") as HTMLInputElement;
const companyInput = document.getElementById("company") as HTMLInputElement;
const emailInput = document.getElementById("email") as HTMLInputElement;
const phoneInput = document.getElementById("phone") as HTMLInputElement;
const websiteInput = document.getElementById("website") as HTMLInputElement;
const fontSelect = document.getElementById("font") as HTMLSelectElement;
const bgColorInput = document.getElementById("bgColor") as HTMLInputElement;
const textColorInput = document.getElementById("textColor") as HTMLInputElement;
const generateButton = document.getElementById("generateCard") as HTMLButtonElement;
const exportImageButton = document.getElementById("exportImage") as HTMLButtonElement;
const exportPDFButton = document.getElementById("exportPDF") as HTMLButtonElement;
const businessCard = document.getElementById("businessCard") as HTMLDivElement;
const qrCodeDiv = document.getElementById("qrCode") as HTMLDivElement;

// Function to update business card
function updateCard(): void {
    (document.getElementById("cardName") as HTMLElement).innerText = nameInput.value || "John Doe";
    (document.getElementById("cardJob") as HTMLElement).innerText = jobInput.value || "Software Developer";
    (document.getElementById("cardCompany") as HTMLElement).innerText = companyInput.value || "Company XYZ";
    (document.getElementById("cardEmail") as HTMLElement).innerText = emailInput.value || "john@example.com";
    (document.getElementById("cardPhone") as HTMLElement).innerText = phoneInput.value || "+1234567890";
    (document.getElementById("cardWebsite") as HTMLElement).innerText = websiteInput.value || "www.example.com";
    
    // Update styles
    businessCard.style.backgroundColor = bgColorInput.value;
    businessCard.style.color = textColorInput.value;
    businessCard.style.fontFamily = fontSelect.value;
    
    // Generate QR Code
    qrCodeDiv.innerHTML = "";
    new QRCode(qrCodeDiv, {
        text: JSON.stringify({
            name: nameInput.value,
            job: jobInput.value,
            company: companyInput.value,
            email: emailInput.value,
            phone: phoneInput.value,
            website: websiteInput.value
        }),
        width: 100,
        height: 100
    });
}

// Event Listeners
generateButton.addEventListener("click", updateCard);
exportImageButton.addEventListener("click", () => {
    html2canvas(businessCard).then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "business-card.png";
        link.click();
    });
});
exportPDFButton.addEventListener("click", () => {
    const pdf = new jsPDF();
    html2canvas(businessCard).then((canvas) => {
        pdf.addImage(canvas.toDataURL("image/png"), "PNG", 10, 10, 80, 50);
        pdf.save("business-card.pdf");
    });
});
