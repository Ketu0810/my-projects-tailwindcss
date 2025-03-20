// Selecting elements with proper TypeScript typings
var nameInput = document.getElementById("name");
var jobInput = document.getElementById("job");
var companyInput = document.getElementById("company");
var emailInput = document.getElementById("email");
var phoneInput = document.getElementById("phone");
var websiteInput = document.getElementById("website");
var fontSelect = document.getElementById("font");
var bgColorInput = document.getElementById("bgColor");
var textColorInput = document.getElementById("textColor");
var generateButton = document.getElementById("generateCard");
var exportImageButton = document.getElementById("exportImage");
var exportPDFButton = document.getElementById("exportPDF");
var businessCard = document.getElementById("businessCard");
var qrCodeDiv = document.getElementById("qrCode");
// Function to update business card
function updateCard() {
    document.getElementById("cardName").innerText = nameInput.value || "John Doe";
    document.getElementById("cardJob").innerText = jobInput.value || "Software Developer";
    document.getElementById("cardCompany").innerText = companyInput.value || "Company XYZ";
    document.getElementById("cardEmail").innerText = emailInput.value || "john@example.com";
    document.getElementById("cardPhone").innerText = phoneInput.value || "+1234567890";
    document.getElementById("cardWebsite").innerText = websiteInput.value || "www.example.com";
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
exportImageButton.addEventListener("click", function () {
    html2canvas(businessCard).then(function (canvas) {
        var link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "business-card.png";
        link.click();
    });
});
exportPDFButton.addEventListener("click", function () {
    var pdf = new jsPDF();
    html2canvas(businessCard).then(function (canvas) {
        pdf.addImage(canvas.toDataURL("image/png"), "PNG", 10, 10, 80, 50);
        pdf.save("business-card.pdf");
    });
});
