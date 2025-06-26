(async function checkForUpdates() {
  const currentVersion = "1.0";
  const versionUrl =
    "https://raw.githubusercontent.com/ivysone/Will-you-be-my-Valentine-/main/version.json";

  try {
    const response = await fetch(versionUrl);
    if (!response.ok) {
      console.warn("Could not fetch version information.");
      return;
    }
    const data = await response.json();
    const latestVersion = data.version;
    const updateMessage = data.updateMessage;

    if (currentVersion !== latestVersion) {
      alert(updateMessage);
    } else {
      console.log("You are using the latest version.");
    }
  } catch (error) {
    console.error("Error checking for updates:", error);
  }
})();

const sadgifs = [
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExa2c3bjljZWM2bmNrZHM3MjVjNDRtMWdqaHk1NDlzNTUxeGhobmkyaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l3q2K5jinAlChoCLS/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExeHh3aGJ5NnR4ZG11dHF4OWthOGZ3NGVndzloeDZtNXBpem5mYWx4eiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xTiTnIilwuFFFpf2Cc/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExMTRpZXV6bWtqa2ZiZ2hpaTAza25wa2dzbGdmN2Ywank5ZHI3bmxndiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/MwOuiiTfWfWgM/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExa3J4dzBkNGFnMzB5Z3huaGg5MmlhMTh3bGVhdDZoeGs3OWtpN3RtaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/srVgXpqz5QdTG/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExOTBuOXJydHc2amFpa21qMXpjeW5haHBjODRzd2FpcnFzd2JmZnBveCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/qUIm5wu6LAAog/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExYTY4a3h4NXExMTF2aGxlenVmZHVsaWU5ZDBudmg3aTZrZTBlNGg3OCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/W0c3xcZ3F1d0EYYb0f/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmduZHZ2YmdvcnBtN2YwOWo0bjY3d25kYzl0ZTVnMmZ3czJnMWhieiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/O3JyUHiKqsviE/giphy.gif",
];
const happygifs = [
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExemZ5MGkxenZsanpvZmNkNGRnMHN3cnM3c3o5bnJmeHRiNGZqanhmeCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xT5LMHxhOfscxPfIfm/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExcGYwNmNzOGZkY2VzYXM1bmUwd2szNno2aWo3aXZmeTYwOHVuZGMxOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/11sBLVxNs7v6WA/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExeXFhbWMza2QxMmlmaXE0bTdrNzN6N3I2ZzB5dmliNHJobXB3YjBkYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/tFSqMSMnzPRTAdvKyr/giphy.gif",
];
const messages = [
  "Андуураад дарцан уу?",
  "Яаж байна????",
  "Ээлдээ",
  "Уйллаа шүү",
  "Чи итгэлтэй байна уу??",
  "Айй life-аа гэж",
  "Жаргалааааааааааааа",
];

let messageIndex = 0;
let sadGifIndex = 0;
let happyGifIndex = 0;

function handleNoClick() {
  const noButton = document.querySelector(".no-button");
  const yesButton = document.querySelector(".yes-button");
  const gif = document.getElementById("reaction-gif");

  // Cycle through sad GIFs in order
  gif.src = sadgifs[sadGifIndex];
  sadGifIndex = (sadGifIndex + 1) % sadgifs.length;

  // Cycle through messages
  noButton.textContent = messages[messageIndex];
  messageIndex = (messageIndex + 1) % messages.length;

  // Make the "Yes" button grow, up to a cap
  const currentSize = parseFloat(window.getComputedStyle(yesButton).fontSize);
  yesButton.style.fontSize = `${currentSize * 1.5}px`;
}

function handleYesClick() {
  const gif = document.getElementById("reaction-gif");

  // Cycle through happy GIFs in order
  gif.src = happygifs[happyGifIndex];
  happyGifIndex = (happyGifIndex + 1) % happygifs.length;

  // Delay redirect to show the happy gif
  setTimeout(() => {
    window.location.href = "yes_page.html";
  }, 3); // 1.2 seconds
}

// https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2l6OGp4dHlta3kyZTB1dDFrdXJ5OTZrbGlpOGNhYmc0cHMxZ2RxNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Xft2d1ir6iMAzMju3K/giphy.gif
