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
let wordsPerLine = 0;
let maxActiveWords = 0;
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

// --- Fungsi untuk menampilkan section halaman ---
function showSection(sectionId) {
  homeSection.classList.add("hidden");
  typingSection.classList.add("hidden");
  modeSection.classList.add("hidden");

  document.getElementById(sectionId).classList.remove("hidden");

  localStorage.setItem("lastSection", sectionId);
}

// --- Fungsi hitung kata per baris berdasarkan posisi offsetTop di DOM ---
function calculateWordsPerLineByDom() {
  const wordSpans = wordBar.querySelectorAll('.word');
  if (wordSpans.length === 0) return 0;

  let firstLineTop = wordSpans[0].offsetTop;
  let count = 0;

  for (let span of wordSpans) {
    if (span.offsetTop !== firstLineTop) break;  // baris baru sudah mulai
    count++;
  }
  return count;
}

// --- Update kata aktif di DOM ---
function updateActiveWords() {
  wordBar.innerHTML = "";

  // Tentukan jumlah baris tampil, 3 baris kalau lebar >= 1200px, selain itu 2 baris
  const numberOfLines = window.innerWidth >= 1200 ? 3 : 3;

  // Render sementara dengan jumlah kata maxActiveWords atau perkiraan default supaya bisa hitung wordsPerLine
  const tentativeWordsCount = maxActiveWords || 20;

  // Ambil slice kata yang akan ditampilkan sementara
  activeWords = words.slice(startActiveIndex, startActiveIndex + tentativeWordsCount);

  // Render kata-kata ke DOM
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

  // Hitung berapa kata per baris sebenarnya berdasarkan posisi offsetTop
  wordsPerLine = calculateWordsPerLineByDom();
  if (wordsPerLine === 0) wordsPerLine = 8; // fallback

  // Hitung maksimal kata aktif yang harus ditampilkan berdasarkan baris dan kata per baris
  maxActiveWords = wordsPerLine * numberOfLines;

  // Jika jumlah kata yang ditampilkan kurang dari maxActiveWords, render ulang agar pas
  if (activeWords.length !== maxActiveWords) {
    activeWords = words.slice(startActiveIndex, startActiveIndex + maxActiveWords);

    wordBar.innerHTML = "";

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

  // Atur tinggi wordBar supaya sesuai jumlah baris
  wordBar.style.height = `calc(1.5em * ${numberOfLines})`;

  console.log('wordsPerLine:', wordsPerLine, 'numberOfLines:', numberOfLines, 'maxActiveWords:', maxActiveWords);
}

// --- Reset dan mulai test ---
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

function startTest() {
  resetTest();

  // Tampilkan kata awal dulu supaya bisa hitung wordsPerLine dengan benar
  maxActiveWords = 16; // default sementara
  updateActiveWords();
  timerDisplay.textContent = timeLeft;
}

// --- Shuffle array Fisher-Yates ---
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// --- Highlight kata aktif ---
function highlightCurrentWord() {
  document.querySelectorAll('.word').forEach(w => w.classList.remove('active-word'));

  const relativeIndex = currentWordGlobalIndex - startActiveIndex;
  const currentWordSpan = document.querySelector(`.word[data-index="${relativeIndex}"]`);
  if (currentWordSpan) {
    currentWordSpan.classList.add('active-word');

    // Scroll kata aktif ke tampilan jika perlu (smooth)
    currentWordSpan.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
  }
}



// --- Fungsi start timer ---
function startTimer() {
  if (timerStarted) return;
  timerStarted = true;

  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timerStarted = false;
      endTest();
    }
  }, 1000);
}
// --- Event input untuk highlight huruf dan start timer ---
input.addEventListener("input", () => {
  if (!timerStarted && input.value.length > 0) {
    startTimer();
  }

  const typed = input.value;
  const currentWord = words[currentWordGlobalIndex];
  const relativeIndex = currentWordGlobalIndex - startActiveIndex;
  const currentWordSpan = document.querySelector(`.word[data-index="${relativeIndex}"]`);

  if (!currentWordSpan) return;

  const charSpans = currentWordSpan.querySelectorAll(".char");

  charSpans.forEach(charSpan => {
    charSpan.classList.remove("correct-char", "incorrect-char", "underline-active");
  });

  if (typed.length > currentWord.length) {
    charSpans.forEach(charSpan => charSpan.classList.add("incorrect-char"));
  } else {
    for (let i = 0; i < typed.length; i++) {
      if (typed[i] === currentWord[i]) {
        charSpans[i].classList.add("correct-char");
      } else {
        charSpans[i].classList.add("incorrect-char");
      }
    }
  }

  if (typed.length < charSpans.length) {
    charSpans[typed.length].classList.add("underline-active");
  } else if (typed.length === charSpans.length) {
    charSpans[charSpans.length - 1].classList.add("underline-active");
  }
});

// --- Event keydown untuk spasi (mengakhiri kata) ---
input.addEventListener("keydown", (e) => {
  if (e.key === " ") {
    e.preventDefault();

    const typed = input.value.trim();
    if (typed === "") return;

    const currentWord = words[currentWordGlobalIndex];
    const relativeIndex = currentWordGlobalIndex - startActiveIndex;
    const currentWordSpan = document.querySelector(`.word[data-index="${relativeIndex}"]`);
    if (!currentWordSpan) return;

    // Cek benar atau salah
    if (typed === currentWord) {
      for (let i = 0; i < currentWord.length; i++) {
        currentWordSpan.children[i].classList.add("correct-char");
        currentWordSpan.children[i].classList.remove("incorrect-char");
      }
      currentWordSpan.classList.add("correct-word");
      currentWordSpan.classList.remove("incorrect-word");
      correctCount++;
      correctCharCount += currentWord.length;
    } else {
      for (let i = 0; i < currentWord.length; i++) {
        currentWordSpan.children[i].classList.add("incorrect-char");
        currentWordSpan.children[i].classList.remove("correct-char");
      }
      currentWordSpan.classList.add("incorrect-word");
      currentWordSpan.classList.remove("correct-word");
      incorrectCount++;
      incorrectCharCount += currentWord.length;
    }

    // Hapus underline aktif
    currentWordSpan.querySelectorAll(".char").forEach(char => char.classList.remove("underline-active"));

    input.value = "";
    currentWordGlobalIndex++;

    // Geser kata aktif jika sudah melewati wordsPerLine
    const relativePos = currentWordGlobalIndex - startActiveIndex;

    if (relativePos >= wordsPerLine) {
      startActiveIndex += wordsPerLine;
      updateActiveWords();
    }

    highlightCurrentWord();
  }
});

// --- Event resize window ---
// Perbarui wordsPerLine dan maxActiveWords jika ukuran berubah
window.addEventListener("resize", () => {
  // Jika test sudah mulai, perbarui
  if (!timerStarted) return;

  // Tunggu sejenak agar DOM stabil, gunakan setTimeout
  setTimeout(() => {
    // Jangan reset kata aktif, cuma hitung ulang
    wordsPerLine = calculateWordsPerLineByDom();
    if (wordsPerLine === 0) wordsPerLine = 8;
    maxActiveWords = wordsPerLine * 2;
    updateActiveWords();
    highlightCurrentWord();
  }, 100);
});

// --- Fungsi akhir tes ---
function endTest() {
    alert(`Waktu habis! Kamu mengetik ${correctCount} kata dengan akurasi ${(correctCharCount / (correctCharCount + incorrectCharCount) * 100).toFixed(2)}%`);
  // Bisa kamu ganti dengan tampilkan hasil yang lebih baik
}

// --- Mulai awal ---
startTest();
highlightCurrentWord();


// ----- Selesai Tes -----
function endTest() {
  // Sembunyikan elemen input dan keyboard
  inputBar.classList.add("hidden");
  wordBar.classList.add("hidden");
  keyboard.classList.add("hidden");

  // Tanggal & Hari
  const today = new Date();
  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  const formattedDate = today.toLocaleDateString("id-ID", options);
  const [dayName, ...dateParts] = formattedDate.split(", ");
  document.getElementById("dayName").textContent = dayName;
  document.getElementById("fullDate").textContent = dateParts.join(", ");

  // Kalkulasi Akurasi
  const accuracy = correctCharCount / (correctCharCount + incorrectCharCount) * 100 || 0;

  // Kalkulasi WPM Final (gabungan dari Raw, Net, dan Kata)
  function calculateFinalWPM(correctCharCount, incorrectCharCount, correctCount, durationSeconds) {
    const totalTyped = correctCharCount + incorrectCharCount;
    const minutes = durationSeconds / 60;

    const wpmRaw = totalTyped / 5 / minutes;
    const wpmNet = correctCharCount / 5 / minutes;
    const wpmKata = correctCount / minutes;

    const wpmFinal = (wpmRaw * 0.3) + (wpmNet * 0.5) + (wpmKata * 0.2);

    return {
      wpmRaw,
      wpmNet,
      wpmKata,
      wpmFinal,
      totalTyped
    };
  }

  const { wpmFinal, wpmNet, wpmRaw, wpmKata, totalTyped } = calculateFinalWPM(
    correctCharCount,
    incorrectCharCount,
    correctCount,
    60
  );

  // Tampilkan ke layar
  document.querySelector(".wpm").textContent = `${Math.round(wpmFinal)} WPM`;

  document.querySelector(".result-section").innerHTML = `
    <p>Total Benar     : ${correctCount} kata</p>
    <p>Total Salah     : ${incorrectCount} kata</p>
    <p>Akurasi         : ${accuracy.toFixed(2)}%</p>
    <p>Total Karakter  : ${totalTyped}</p>
    <p class="indent">Hijau : ${correctCharCount}</p>
    <p class="indent">Merah : ${incorrectCharCount}</p>
    <p>Waktu           : 60 Detik</p>
    <p>Title           : <span id="title">${getTitle(wpmFinal)}</span></p>
  `;

  // Tampilkan struk hasil
  resultStruk.classList.remove("hidden");
}

// ----- Klasifikasi Title -----
function getTitle(wpmFinal) {
  if (wpmFinal <= 20) return "Baby's Fingers";
  if (wpmFinal <= 40) return "Beginner";
  if (wpmFinal <= 60) return "Competent";
  if (wpmFinal <= 80) return "Pro Typer";
  if (wpmFinal <= 100) return "Expert";
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
