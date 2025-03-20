const bgColorInput = document.getElementById("bgColor") as HTMLInputElement;
const textColorInput = document.getElementById("textColor") as HTMLInputElement;
const fontSizeInput = document.getElementById("fontSize") as HTMLInputElement;
const paddingInput = document.getElementById("padding") as HTMLInputElement;
const preview = document.getElementById("preview") as HTMLDivElement;
const cssOutput = document.getElementById("cssOutput") as HTMLTextAreaElement;
const copyCssButton = document.getElementById("copyCss") as HTMLButtonElement;
const exportCssButton = document.getElementById("exportCss") as HTMLButtonElement;

const updatePreview = (): void => {
    const bgColor = bgColorInput.value;
    const textColor = textColorInput.value;
    const fontSize = `${fontSizeInput.value}px`;
    const padding = `${paddingInput.value}px`;

    preview.style.backgroundColor = bgColor;
    preview.style.color = textColor;
    preview.style.fontSize = fontSize;
    preview.style.padding = padding;

    const cssCode = `
    .custom-style {
        background-color: ${bgColor};
        color: ${textColor};
        font-size: ${fontSize};
        padding: ${padding};
    }`;
    cssOutput.value = cssCode;
};

// Live update
[bgColorInput, textColorInput, fontSizeInput, paddingInput].forEach(input => {
    input.addEventListener("input", updatePreview);
});

// Copy CSS to clipboard
copyCssButton.addEventListener("click", () => {
    navigator.clipboard.writeText(cssOutput.value);
    alert("✅ CSS Copied!");
});

// Export CSS as file
exportCssButton.addEventListener("click", () => {
    const blob = new Blob([cssOutput.value], { type: "text/css" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "custom-style.css";
    link.click();
});

// Initial preview update
updatePreview();
