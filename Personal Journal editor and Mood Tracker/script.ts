interface JournalEntry {
  date: string;
  text: string;
  mood: string;
}

document.addEventListener("DOMContentLoaded", () => {
  const html = document.documentElement;
  const darkModeToggle = document.getElementById("darkModeToggle") as HTMLButtonElement;
  const entriesContainer = document.getElementById("entries") as HTMLDivElement;
  const entryDate = document.getElementById("entryDate") as HTMLInputElement;
  const entryText = document.getElementById("entryText") as HTMLTextAreaElement;
  const moods = document.querySelectorAll<HTMLSpanElement>(".mood");
  const saveEntryBtn = document.getElementById("saveEntry") as HTMLButtonElement;
  let selectedMood = "😄";

  // ✅ Dark Mode (Fixed)
  const themeKey = "theme";

  const setDarkMode = (isDark: boolean) => {
    html.classList.toggle("dark", isDark);
    darkModeToggle.textContent = isDark ? "🌞" : "🌙";
    localStorage.setItem(themeKey, isDark ? "dark" : "light");
  };

  const savedTheme = localStorage.getItem(themeKey);
  setDarkMode(savedTheme === "dark");

  darkModeToggle.addEventListener("click", () => {
    const isDarkMode = !html.classList.contains("dark");
    setDarkMode(isDarkMode);
  });

  // Mood Selection
  moods.forEach((mood) => {
    mood.classList.add(
      "cursor-pointer", "text-3xl", "p-2", "rounded-full",
      "hover:bg-[#A7C4BC]", "hover:text-white", "transition", "select-none"
    );

    mood.addEventListener("click", () => {
      moods.forEach((m) => m.classList.remove("bg-[#A7C4BC]", "text-white"));
      mood.classList.add("bg-[#A7C4BC]", "text-white");
      selectedMood = mood.dataset.mood || "😄";
    });
  });

  // Save Entry
  saveEntryBtn.addEventListener("click", () => {
    const date = entryDate.value;
    const text = entryText.value.trim();

    if (!date || !text) {
      alert("Please select a date and write something!");
      return;
    }

    const newEntry: JournalEntry = { date, text, mood: selectedMood };
    const entries = getEntries();
    entries.push(newEntry);
    saveEntries(entries);
    displayEntries();
    entryText.value = "";
  });

  // Display Entries
  const displayEntries = () => {
    entriesContainer.innerHTML = "";
    getEntries().forEach((entry, index) => {
      const div = document.createElement("div");
      div.className = "p-4 bg-white dark:bg-gray-700 rounded-xl shadow text-left flex justify-between items-start";
      div.innerHTML = `
        <div>
          <div class="text-sm text-gray-500">${entry.date}</div>
          <div class="text-xl">${entry.mood}</div>
          <p class="mt-2 text-gray-700 dark:text-gray-300">${entry.text}</p>
        </div>
        <button class="delete-entry text-red-500 hover:text-red-700 text-xl ml-4">❌</button>
      `;
      div.querySelector(".delete-entry")?.addEventListener("click", () => deleteEntry(index));
      entriesContainer.appendChild(div);
    });
  };

  const deleteEntry = (index: number) => {
    const entries = getEntries();
    entries.splice(index, 1);
    saveEntries(entries);
    displayEntries();
  };

  const getEntries = (): JournalEntry[] =>
    JSON.parse(localStorage.getItem("journalEntries") || "[]");

  const saveEntries = (entries: JournalEntry[]) => {
    localStorage.setItem("journalEntries", JSON.stringify(entries));
  };

  displayEntries();
});
