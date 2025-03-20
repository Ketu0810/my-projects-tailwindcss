// Define elements
const wordInput = document.getElementById("wordInput") as HTMLInputElement;
const searchBtn = document.getElementById("searchBtn") as HTMLButtonElement;
const resultDiv = document.getElementById("result") as HTMLDivElement;
const pronunciationDiv = document.getElementById("pronunciation") as HTMLDivElement;
const playAudioBtn = document.getElementById("playAudioBtn") as HTMLButtonElement;
const audioPlayer = document.getElementById("audioPlayer") as HTMLAudioElement;

// API URL
const API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

// Function to fetch word data
async function fetchWord(word: string): Promise<void> {
    resultDiv.innerHTML = "<p class='text-gray-500'>Loading...</p>";
    pronunciationDiv.classList.add("hidden");

    try {
        const response = await fetch(API_URL + word);
        if (!response.ok) throw new Error("Word not found");

        const data = await response.json();
        displayResult(data[0]);
    } catch (error) {
        resultDiv.innerHTML = "<p class='text-red-500'>Word not found. Try another word.</p>";
    }
}

// Function to display result
function displayResult(data: any): void {
    const { word, phonetics, meanings } = data;
    const definition = meanings[0]?.definitions[0]?.definition || "No definition available";
    const example = meanings[0]?.definitions[0]?.example || "No example available";
    
    // Extract pronunciation audio URL
    const audioUrl = phonetics.find((p: any) => p.audio)?.audio || null;

    resultDiv.innerHTML = `
        <h2 class="text-xl font-bold mt-4">${word}</h2>
        <p class="mt-2"><strong>Definition:</strong> ${definition}</p>
        <p class="mt-2"><strong>Example:</strong> ${example}</p>
    `;

    // Show pronunciation section if audio is available
    if (audioUrl) {
        pronunciationDiv.classList.remove("hidden");
        audioPlayer.src = audioUrl;
    } else {
        pronunciationDiv.classList.add("hidden");
    }
}

// Play pronunciation audio
playAudioBtn.addEventListener("click", () => {
    if (audioPlayer.src) {
        audioPlayer.play();
    }
});

// Event Listener
searchBtn.addEventListener("click", () => {
    const word = wordInput.value.trim();
    if (word) fetchWord(word);
});
