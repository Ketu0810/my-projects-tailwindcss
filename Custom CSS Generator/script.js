var bgColorInput = document.getElementById("bgColor");
var textColorInput = document.getElementById("textColor");
var fontSizeInput = document.getElementById("fontSize");
var paddingInput = document.getElementById("padding");
var preview = document.getElementById("preview");
var cssOutput = document.getElementById("cssOutput");
var copyCssButton = document.getElementById("copyCss");
var exportCssButton = document.getElementById("exportCss");
var updatePreview = function () {
    var bgColor = bgColorInput.value;
    var textColor = textColorInput.value;
    var fontSize = "".concat(fontSizeInput.value, "px");
    var padding = "".concat(paddingInput.value, "px");
    preview.style.backgroundColor = bgColor;
    preview.style.color = textColor;
    preview.style.fontSize = fontSize;
    preview.style.padding = padding;
    var cssCode = "\n    .custom-style {\n        background-color: ".concat(bgColor, ";\n        color: ").concat(textColor, ";\n        font-size: ").concat(fontSize, ";\n        padding: ").concat(padding, ";\n    }");
    cssOutput.value = cssCode;
};
// Live update
[bgColorInput, textColorInput, fontSizeInput, paddingInput].forEach(function (input) {
    input.addEventListener("input", updatePreview);
});
// Copy CSS to clipboard
copyCssButton.addEventListener("click", function () {
    navigator.clipboard.writeText(cssOutput.value);
    alert("✅ CSS Copied!");
});
// Export CSS as file
exportCssButton.addEventListener("click", function () {
    var blob = new Blob([cssOutput.value], { type: "text/css" });
    var link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "custom-style.css";
    link.click();
});
// Initial preview update
updatePreview();
