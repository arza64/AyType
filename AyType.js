// =========================
// AyType Typing Test Script
// =========================

// --- DOM Elements ---
const wordBar = document.getElementById("wordbar");
const input = document.getElementById("input");
const inputBar = document.getElementById("inputBar");
const timerDisplay = document.getElementById("timer");
const resultStruk = document.getElementById("resultStruk");
const keyboard = document.getElementById("virtualKeyboard");
const btnHome = document.getElementById("btnHome");
const btnTyping = document.getElementById("btnTyping");
const btnMode = document.getElementById("btnMode");

const homeSection = document.getElementById("homeSection");
const typingSection = document.getElementById("typingSection");
const modeSection = document.getElementById("modeSection");

// --- Data & State ---
let words = [];
let maxActiveWords = 20;
let activeWords = [];
let startActiveIndex = 0;
let currentWordGlobalIndex = 0;

let correctCount = 0;
let incorrectCount = 0;
let correctCharCount = 0;
let incorrectCharCount = 0;

let timeLeft = 60;
let timerInterval = null;
let timerStarted = false;

// --- Word List ---
const wordList = [
  "yaitu", "nanti", "mudah", "di", "datang", "dia", "biasa", "biasa", "sesuatu", "orang",
  "memberikan", "sangat", "jangan", "memberi", "menjadi", "merupakan", "benar", "tidak",
  "tapi", "suatu", "pada", "kamu", "sering", "malam", "namun", "juta", "sudah", "lagi",
  "hari", "tentang", "tengah", "sangat", "makanan", "harus", "itu", "dan", "kepada",
  "menjadi", "uang", "secara", "terjadi", "pusat", "dan", "salah", "nama", "yaitu", "oleh",
  "kamu", "sendiri", "jelas", "antara", "pula", "hari", "cara", "langsung", "sekalipun",
  "ku", "oleh", "sekali", "orang", "waktu", "baru", "akibat", "ada", "terjadi", "ini",
  "sementara", "jelas", "tinggi", "oleh", "datang", "setiap", "akan", "sebab", "ketika",
  "ku", "jumlah", "naik", "tempat", "khusus", "hal", "paling", "kepada", "terlalu",
  "semua", "mungkin", "terjadi", "ke", "menurut", "sekarang", "seperti", "tanpa", "makin",
  "mereka", "tetapi", "telah", "terus", "anak", "waktu", "sementara", "bahkan", "terus",
  "dapat", "terjadi", "sering", "saat", "bila", "masuk", "tak", "tiba", "jangan", "kali",
  "sudah", "kecil", "hati", "antara", "termasuk", "barang", "bukan", "selalu", "namun",
  "seluruh", "bersama", "maupun", "oleh", "baik", "tetapi", "telah", "pusat", "baru",
  "lalu", "sedikit", "seperti", "suatu", "siap", "sesuai", "aku", "banyak", "selalu",
  "kami", "ia", "luar", "benar", "banyak", "makin", "akan", "kemudian", "untuk",
  "memberi", "ini", "kepada", "terlalu", "bisa", "ketika", "makan", "sendiri", "bagian",
  "tiba", "bagi", "juta", "setiap", "kita", "serta", "selama", "uang", "sini", "sementara",
  "bukan", "mulai", "jauh", "uang", "anak", "tahu", "malam", "nanti", "bila", "hal", "dia",
  "jalan", "sekarang", "memang", "sini", "ada", "tersebut", "kamu", "memberikan", "jalan",
  "mungkin", "sehingga", "baik", "sesuai", "suatu", "mau", "orang", "datang", "kecil",
  "yaitu", "sambil", "setelah", "termasuk", "melakukan", "tetapi", "hati", "waktu", "suatu",
  "secara", "lagi", "boleh", "dari", "sekitar", "kalau", "mencari", "apa", "ini", "karena",
  "tentang", "bahkan", "kepada", "ke", "tanpa", "hari", "anda", "cara", "kepala", "pulang",
  "serta", "akibat", "bagian", "tak", "ada", "jangan", "terhadap", "ketika", "paling",
  "seluruh", "jumlah", "diri", "sebelum", "cukup", "menurut", "perlu", "lain", "barang",
  "pulang", "tinggi", "mencari", "pusat", "kalau", "itu", "mudah", "ku", "saat", "mudah",
  "tanpa", "sekali", "pertama", "sebab", "ada", "bukan", "pertama", "segera", "cara",
  "tapi", "bagian", "luar", "harga", "telah", "makanan", "mencari", "baik", "lalu", "makan",
  "besar", "sejak", "dari", "hal", "karena", "membuat", "sebelum", "tahu", "yang", "masuk",
  "mulai", "sekali", "segera", "jalan", "selalu", "punya", "bahwa", "masalah", "bukan",
  "sedikit", "datang", "ke", "tiba", "tinggi", "malam", "ke", "memiliki", "hal", "kerja",
  "pernah", "air", "sama", "malam", "kerja", "maka", "sering", "apa", "seperti", "untuk",
  "bila", "sangat", "cepat", "mana", "setelah", "ini", "mata", "tahu", "kamu", "bagi",
  "saat", "orang", "ada", "sering", "dia", "sini", "sementara", "harga", "di", "harus",
  "hati", "tanpa", "kembali", "pernah", "cara", "uang", "sekarang", "tiba", "pernah",
  "sekali", "sendiri", "tanpa", "sering", "maupun", "hari", "memberi", "sedang", "mulai",
  "terlalu", "sementara", "tanpa", "karena", "kini", "kalau", "memberikan", "jumlah",
  "sini", "secara", "tetapi", "malam", "selalu", "sehingga", "tinggi", "jalan", "tahu",
  "dengan", "merupakan", "ke", "harus", "sementara", "maka", "benar", "waktu", "lalu",
  "hal", "semua", "mungkin", "ingin", "seluruh", "memiliki", "serta", "akibat", "melakukan",
  "terhadap", "jangan", "ketika", "besar", "ku", "cepat", "mulai", "mana", "pula", "air",
  "banyak", "tiba", "memiliki", "semua", "cara", "tiba", "melalui", "sedikit", "baru",
  "namun", "kamu", "bagi", "termasuk", "tahu", "dari", "mencari", "baik", "namun", "luar",
  "belum", "sekali", "sudah", "ia", "juga", "selama", "kali", "terhadap", "tengah", "ini",
  "suatu", "tersebut", "tinggi", "bukan", "bagi", "sudah", "pertama", "anak", "terjadi",
  "melalui", "bila", "siap", "bahwa", "itu", "boleh", "menurut", "suatu", "makin", "antara",
  "tengah", "naik", "dia", "akan", "karena", "waktu", "di", "baru", "setelah", "kamu",
  "jumlah", "sekarang", "jalan", "ingin", "punya", "terlalu", "anak", "setelah", "naik",
  "tak", "baik", "mau", "pernah", "kurang", "ku", "orang", "tidak", "diri", "jangan",
  "pulang", "nanti", "waktu", "tapi", "lalu", "paling", "aku", "makanan", "mengatakan",
  "sambil", "ini", "baru", "telah", "kecil", "membuat", "serta", "jadi", "akan", "apa",
  "khusus", "tinggi", "sendiri", "mampu", "ada", "maupun", "kepada", "langsung", "makan",
  "mulai", "antara", "aku", "terlalu", "pula", "terus", "kembali", "hal", "yaitu", "siap",
  "kali", "dari", "sama", "bagian", "orang", "mengatakan", "sangat", "barang", "mau",
  "sering", "jalan", "bila", "mencari", "tahu", "malam", "dan", "bahkan", "luar", "cara",
  "tahu", "kamu", "terjadi", "seperti", "juta", "belum", "tengah", "mungkin", "dan", "bila",
  "sebab", "setiap", "dan", "anda", "oleh", "menurut", "mudah", "sekali", "orang", "makanan",
  "bagian", "terlalu", "pusat", "sini", "akan", "lagi", "pada", "diri", "menjadi", "bukan",
  "jelas", "tanpa", "suatu", "tengah", "termasuk", "jalan", "kepala", "mana", "barang",
  "sangat", "sejak", "telah", "sekalipun", "mampu", "juta", "datang", "sampai", "hari",
  "bahwa", "juga", "dia", "sekitar", "untuk", "kalau", "bersama", "dapat", "yaitu", "ku",
  "bila", "tak", "ketika", "juta", "banyak", "ke", "tetapi", "telah", "dapat", "benar",
  "sudah", "kamu", "anak", "juta", "salah", "akibat", "sangat", "memberikan", "kemudian",
  "seperti", "membuat", "telah", "paling", "setiap", "juga", "segera", "yang", "langsung",
  "cukup", "jadi", "bersama", "jumlah", "ia", "terus", "jangan", "tetapi", "kepada", "air",
  "uang", "di", "sudah", "kepala", "anda", "tentang", "mata", "jelas", "jauh", "ke", "mata",
  "sedang", "datang", "makin", "punya", "boleh", "di", "mudah", "jangan", "perlu"
];

// --- Functions ---
function showSection(sectionId) {
  homeSection.classList.add("hidden");
  typingSection.classList.add("hidden");
  modeSection.classList.add("hidden");

  document.getElementById(sectionId).classList.remove("hidden");

  // Simpan halaman terakhir ke localStorage
  localStorage.setItem("lastSection", sectionId);
}

function startTest() {
  resetTest();
  generateWords();
  updateActiveWords();
  highlightCurrentWord();
}
// Jalankan timer baru
  timerStarted = true;
  timerDisplay.textContent = timeLeft;

  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timerStarted = false;
      endTest(); // <-- PENTING: panggil saat waktu habis
    }
  }, 1000);

function resetTest() {
  words = [...wordList];
  shuffle(words);
  activeWords = [];
  startActiveIndex = 0;
  currentWordGlobalIndex = 0;
  correctCount = 0;
  incorrectCount = 0;
  correctCharCount = 0;
  incorrectCharCount = 0;
  timeLeft = 60;
  timerStarted = false;
  clearInterval(timerInterval);

  input.value = "";
  timerDisplay.textContent = "60";
  resultStruk.classList.add("hidden");
  inputBar.classList.remove("hidden");
  wordBar.classList.remove("hidden");
  keyboard.classList.remove("hidden");
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function generateWords() {
  // Already shuffled
}

function updateActiveWords() {
  wordBar.innerHTML = "";
  activeWords = words.slice(startActiveIndex, startActiveIndex + maxActiveWords);

  activeWords.forEach((word, index) => {
    const wordSpan = document.createElement("span");
    wordSpan.className = "word";
    wordSpan.setAttribute("data-index", index);

    word.split("").forEach((char) => {
      const charSpan = document.createElement("span");
      charSpan.className = "char";
      charSpan.textContent = char;
      wordSpan.appendChild(charSpan);
    });

    wordBar.appendChild(wordSpan);
    wordBar.appendChild(document.createTextNode(" "));
  });
}

function highlightCurrentWord() {
  // Hapus semua underline sebelumnya
  document.querySelectorAll(".underline-active").forEach(el =>
    el.classList.remove("underline-active")
  );

  const relativeIndex = currentWordGlobalIndex - startActiveIndex;
  const wordSpan = document.querySelector(`.word[data-index="${relativeIndex}"]`);
  if (!wordSpan) return;

  const chars = wordSpan.querySelectorAll(".char");
  let nextIndex = input.value.length;

  // Jangan biarkan index melebihi jumlah karakter
  if (nextIndex >= chars.length) {
    nextIndex = chars.length - 1;
  }

  // Tambahkan underline ke huruf saat ini
  if (chars[nextIndex]) {
    chars[nextIndex].classList.add("underline-active");
  }
}
input.addEventListener("input", () => {
  highlightCurrentWord();
  // ... mungkin ada logika lain di sini
});

// --- Event: Input Keydown ---
input.addEventListener("keydown", (e) => {
  if (!timerStarted) {
    timerStarted = true;
    timerInterval = setInterval(() => {
      timeLeft--;
      timerDisplay.textContent = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        endTest();
      }
    }, 1000);
  }

  if (e.key === " ") {
    e.preventDefault();

    const typed = input.value.trim();
    const currentWord = words[currentWordGlobalIndex];
    const relativeIndex = currentWordGlobalIndex - startActiveIndex;
    const currentWordSpan = document.querySelector(`.word[data-index="${relativeIndex}"]`);

    // --- Cek kata benar atau tidak
    if (typed === currentWord) {
      for (let i = 0; i < currentWord.length; i++) {
        currentWordSpan.children[i].classList.add("correct-char");
      }
      currentWordSpan.classList.add("correct-word");
      correctCount++;
      correctCharCount += currentWord.length;
    } else {
      for (let i = 0; i < currentWord.length; i++) {
        currentWordSpan.children[i].classList.add("incorrect-char");
      }
      currentWordSpan.classList.add("incorrect-word");
      incorrectCount++;
      incorrectCharCount += currentWord.length;
    }

    currentWordSpan.querySelectorAll(".char").forEach(char => char.classList.remove("underline-active"));

    input.value = "";
    currentWordGlobalIndex++;

    if (currentWordGlobalIndex === startActiveIndex + maxActiveWords) {
      startActiveIndex += maxActiveWords;
      updateActiveWords();
    }

    highlightCurrentWord();
  }
});

//input---
input.addEventListener("input", () => {
  const typed = input.value;
  const currentWord = words[currentWordGlobalIndex];
  const relativeIndex = currentWordGlobalIndex - startActiveIndex;
  const currentWordSpan = document.querySelector(`.word[data-index="${relativeIndex}"]`);
  if (!currentWordSpan) return;

  const charSpans = currentWordSpan.querySelectorAll(".char");

  charSpans.forEach((charSpan, i) => {
    charSpan.classList.remove("correct-char", "incorrect-char", "underline-active");
    if (i < typed.length) {
      if (typed[i] === currentWord[i]) {
        charSpan.classList.add("correct-char");
      } else {
        charSpan.classList.add("incorrect-char");
      }
    }
  });

  

  input.addEventListener("input", () => {
  const typed = input.value;
  const currentWord = words[currentWordGlobalIndex];
  const relativeIndex = currentWordGlobalIndex - startActiveIndex;
  const currentWordSpan = document.querySelector(`.word[data-index="${relativeIndex}"]`);

  // Reset warna dulu
  currentWordSpan.querySelectorAll(".char").forEach(char => {
    char.classList.remove("correct-char", "incorrect-char");
  });

  // Kalau huruf yang diketik kelebihan → semua merah
  if (typed.length > currentWord.length) {
    currentWordSpan.querySelectorAll(".char").forEach((charSpan) => {
      charSpan.classList.add("incorrect-char");
    });
    return;
  }

  // Kalau belum kelebihan, cek satu per satu
  for (let i = 0; i < typed.length; i++) {
    const expected = currentWord[i];
    const actual = typed[i];
    const charSpan = currentWordSpan.children[i];

    if (expected === actual) {
      charSpan.classList.add("correct-char");
    } else {
      charSpan.classList.add("incorrect-char");
    }
  }
});

  if (typed.length < charSpans.length) {
    charSpans[typed.length].classList.add("underline-active");
  }
});

//----- result----
function endTest() {
  inputBar.classList.add("hidden");
  wordBar.classList.add("hidden");
  keyboard.classList.add("hidden");

  const totalTyped = correctCharCount + incorrectCharCount;
  const accuracy = totalTyped > 0 ? (correctCharCount / totalTyped) * 100 : 0;
  const wpm = correctCount;

  const today = new Date();
  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  const formattedDate = today.toLocaleDateString("id-ID", options);
  const [dayName, ...dateParts] = formattedDate.split(", ");
  document.getElementById("dayName").textContent = dayName;
  document.getElementById("fullDate").textContent = dateParts.join(", ");

  document.querySelector(".wpm").textContent = `${wpm} WPM`;
  document.querySelector(".result-section").innerHTML = `
    <p>Total Benar     : ${correctCount} kata</p>
    <p>Total Salah     : ${incorrectCount} kata</p>
    <p>Akurasi         : ${accuracy.toFixed(2)}%</p>
    <p>Total Karakter  : ${totalTyped}</p>
    <p class="indent">Hijau : ${correctCharCount}</p>
    <p class="indent">Merah : ${incorrectCharCount}</p>
    <p>Waktu           : 60 Detik</p>
    <p>Title           : <span id="title">${getTitle(wpm)}</span></p>
  `;
  resultStruk.classList.remove("hidden");
}

function getTitle(wpm) {
  if (wpm <= 20) return "Baby's Fingers";
  if (wpm <= 40) return "Beginner";
  if (wpm <= 60) return "Competent";
  if (wpm <= 80) return "Pro Typer";
  if (wpm <= 100) return "Expert";
  return "The God";
}

document.getElementById("btnShareResult").addEventListener("click", () => {
  const wpm = document.querySelector(".wpm")?.textContent || "0 WPM";
  const accuracy = document.querySelector(".result-section")?.children[2]?.textContent || "Akurasi: -";
  const title = document.getElementById("title")?.textContent || "-";

  const shareText = `📊 Hasil Tes AyType:
🖋️ ${wpm}
🎯 ${accuracy}
🏅 Title: ${title}

Coba kamu juga di aytype.com`;

  if (navigator.share) {
    navigator.share({
      title: "Hasil Tes AyType",
      text: shareText,
      url: window.location.href,
    }).catch(err => console.log("Gagal membagikan:", err));
  } else {
    alert("Perangkat kamu belum mendukung fitur Bagikan.");
  }
});

function restartTest() {
  resultStruk.classList.add("hidden");
  inputBar.classList.remove("hidden");
  wordBar.classList.remove("hidden");
  keyboard.classList.remove("hidden");
  startTest();
}

document.addEventListener("DOMContentLoaded", () => {
  const btnDownload = document.getElementById("btnDownloadImage");
  const resultDiv = document.getElementById("resultStruk");

  btnDownload.addEventListener("click", () => {
    // Tambahkan class temp-visible untuk memastikan tampil
    resultDiv.classList.add("temp-visible");
    resultDiv.classList.remove("hidden");

    // Tunggu sebentar agar browser render ulang
    setTimeout(() => {
      html2canvas(resultDiv, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true
      }).then(canvas => {
        const link = document.createElement("a");
        link.download = "hasil-aytype.png";
        link.href = canvas.toDataURL("image/png");
        link.click();

        // Setelah selesai, kembalikan ke semula
        resultDiv.classList.remove("temp-visible");
        resultDiv.classList.add("hidden");
      });
    }, 500); // delay waktu render
  });
});


// --- Navigation Buttons ---
btnHome.addEventListener("click", () => showSection("homeSection"));
btnTyping.addEventListener("click", () => {
  showSection("typingSection");
  startTest();
});
btnMode.addEventListener("click", () => {
  alert("Mode akan datang segera!");
  showSection("modeSection");
});

// --- Saat halaman dimuat ulang ---
window.onload = function () {
  const lastSection = localStorage.getItem("lastSection") || "homeSection";
  showSection(lastSection);

  if (lastSection === "typingSection") {
    startTest();
  }
};

document.addEventListener("keydown", (e) => {
  const key = e.key.toUpperCase();
  const keyEl = document.querySelector(`.key[data-key="${key}"]`);
  if (keyEl) {
    keyEl.classList.add("active");
  }
});

document.addEventListener("keyup", (e) => {
  const key = e.key.toUpperCase();
  const keyEl = document.querySelector(`.key[data-key="${key}"]`);
  if (keyEl) {
    keyEl.classList.remove("active");
  }
});
