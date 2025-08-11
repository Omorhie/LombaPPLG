// Data materi
const materiData = [
  {
    id: 1,
    judul: "Pengantar JavaScript",
    isi: "JavaScript adalah bahasa pemrograman yang digunakan untuk membuat halaman web menjadi interaktif.",
    video: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
  {
    id: 2,
    judul: "Dasar HTML",
    isi: "HTML adalah bahasa markup yang digunakan untuk membuat struktur halaman web.",
    video: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
  {
    id: 3,
    judul: "CSS untuk Styling",
    isi: "CSS digunakan untuk mendesain tampilan halaman web supaya menarik.",
    video: "https://www.w3schools.com/html/mov_bbb.mp4"
  }
];

// DOM references
const listMateriSection = document.getElementById("materi-list");
const materiGrid = document.getElementById("materi-grid");
const materiDetailSection = document.getElementById("materi-detail");
const judulMateri = document.getElementById("materi-detail-title");
const isiMateri = document.getElementById("materi-detail-text");
const videoMateri = document.getElementById("materi-video");
const backBtn = document.getElementById("back-btn");

const homeText = document.getElementById("home-text");
const carouselItems = document.querySelectorAll(".carousel-item");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

const navHome = document.getElementById("nav-home");
const navMateri = document.getElementById("nav-materi");
const navQuiz = document.getElementById("nav-quiz");

const quizSection = document.getElementById("quiz-section");
const quizQuestionEl = document.getElementById("quiz-question");
const quizOptionsEl = document.getElementById("quiz-options");
const nextQuestionBtn = document.getElementById("next-question-btn");
const quizFeedback = document.getElementById("quiz-feedback");

let currentCarousel = 0;

// Carousel functions
const carouselContainer = document.querySelector(".carousel-container");
function initCarousel() {
  const carousel = document.querySelector(".carousel");

  function showCarouselSlide(idx) {
    carousel.style.transform = `translateX(-${idx * 100}%)`;
  }

  prevBtn.addEventListener("click", () => {
    currentCarousel = (currentCarousel - 1 + carouselItems.length) % carouselItems.length;
    showCarouselSlide(currentCarousel);
  });

  nextBtn.addEventListener("click", () => {
    currentCarousel = (currentCarousel + 1) % carouselItems.length;
    showCarouselSlide(currentCarousel);
  });

  // Auto slide setiap 5 detik
  setInterval(() => {
    currentCarousel = (currentCarousel + 1) % carouselItems.length;
    showCarouselSlide(currentCarousel);
  }, 5000);

  showCarouselSlide(currentCarousel);
}

// Render grid materi
function renderGridMateri() {
  materiGrid.innerHTML = "";
  materiData.forEach(materi => {
    const card = document.createElement("div");
    card.classList.add("materi-card");

    const judul = document.createElement("h3");
    judul.textContent = materi.judul;

    const ringkasan = document.createElement("p");
    ringkasan.textContent = materi.isi.length > 100 ? materi.isi.slice(0, 100) + "..." : materi.isi;

    const btn = document.createElement("button");
    btn.classList.add("btn-detail");
    btn.textContent = "Lihat Detail";
    btn.addEventListener("click", () => {
      showMateriDetail(materi);
    });

    card.appendChild(judul);
    card.appendChild(ringkasan);
    card.appendChild(btn);

    materiGrid.appendChild(card);
  });
}

function showListMateri() {
  homeText.classList.add("hidden");
  carouselItems.forEach(i => i.classList.add("hidden"));
  listMateriSection.classList.remove("hidden");
  materiDetailSection.classList.add("hidden");
  quizSection.classList.add("hidden");
  renderGridMateri();
}

function showMateriDetail(materi) {
  listMateriSection.classList.add("hidden");
  materiDetailSection.classList.remove("hidden");
  quizSection.classList.add("hidden");
  homeText.classList.add("hidden");

  judulMateri.textContent = materi.judul;
  isiMateri.textContent = materi.isi;
  videoMateri.querySelector("source").src = materi.video;
  videoMateri.load();
}

// Quiz Data
const quizData = [
  {
    question: "Apa kepanjangan dari HTML?",
    options: ["HyperText Markup Language", "Hyperlink Text Mark Language", "Home Tool Markup Language", "HyperText Markdown Language"],
    answer: "HyperText Markup Language"
  },
  {
    question: "Apa fungsi CSS dalam web?",
    options: ["Memberi gaya pada halaman web", "Menambah interaktivitas", "Menyimpan data", "Menjalankan server"],
    answer: "Memberi gaya pada halaman web"
  },
  {
    question: "Bahasa pemrograman mana yang berjalan di browser?",
    options: ["JavaScript", "Python", "Java", "C#"],
    answer: "JavaScript"
  },
  {
    question: "Apa itu variabel dalam pemrograman?",
    options: ["Tempat menyimpan data", "Perintah cetak", "Fungsi khusus", "Operator logika"],
    answer: "Tempat menyimpan data"
  },
  {
    question: "Tag HTML mana yang digunakan untuk membuat paragraf?",
    options: ["<p>", "<div>", "<span>", "<h1>"],
    answer: "<p>"
  }
];

// Fungsi untuk mengacak elemen array (Fisher-Yates Shuffle)
function shuffleArray(array) {
  for(let i = array.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

let currentQuizIndex = 0;
let score = 0;
let shuffledQuizData = [];

function startQuiz() {
  score = 0;
  currentQuizIndex = 0;

  shuffledQuizData = [...quizData];
  shuffleArray(shuffledQuizData);

  showQuestion();
}

function showQuestion() {
  clearQuizFeedback();

  const currentQuiz = shuffledQuizData[currentQuizIndex];

  const options = [...currentQuiz.options];
  shuffleArray(options);

  quizQuestionEl.textContent = `Q${currentQuizIndex + 1}. ${currentQuiz.question}`;
  quizOptionsEl.innerHTML = "";

  options.forEach(option => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.classList.add("quiz-option-btn");
    btn.addEventListener("click", () => selectAnswer(option, btn));
    li.appendChild(btn);
    quizOptionsEl.appendChild(li);
  });

  nextQuestionBtn.disabled = true;
}

function selectAnswer(selectedOption, buttonClicked) {
  const currentQuiz = shuffledQuizData[currentQuizIndex];

  // Disable semua tombol dan reset warna dulu
  document.querySelectorAll(".quiz-option-btn").forEach(btn => {
    btn.disabled = true;
    btn.style.backgroundColor = "";
    btn.style.color = "";
  });

  if(selectedOption === currentQuiz.answer) {
    score++;
    quizFeedback.textContent = "Benar! 🎉";
    quizFeedback.style.color = "green";

    buttonClicked.style.backgroundColor = "green";
    buttonClicked.style.color = "white";
  } else {
    quizFeedback.textContent = `Salah! Jawaban benar: ${currentQuiz.answer}`;
    quizFeedback.style.color = "red";

    buttonClicked.style.backgroundColor = "red";
    buttonClicked.style.color = "white";

    document.querySelectorAll(".quiz-option-btn").forEach(btn => {
      if(btn.textContent === currentQuiz.answer){
        btn.style.backgroundColor = "green";
        btn.style.color = "white";
      }
    });
  }

  nextQuestionBtn.disabled = false;
}

function clearQuizFeedback() {
  quizFeedback.textContent = "";
}

nextQuestionBtn.addEventListener("click", () => {
  currentQuizIndex++;
  if(currentQuizIndex < shuffledQuizData.length) {
    showQuestion();
  } else {
    showQuizResult();
  }
});

function showQuizResult() {
  const quizContainer = document.getElementById("quiz-container");
  quizContainer.innerHTML = `
    <h3>Quiz selesai!</h3>
    <p>Skor kamu: ${score} dari ${shuffledQuizData.length}</p>
    <button id="restart-quiz-btn">Coba Lagi</button>
  `;

  document.getElementById("restart-quiz-btn").addEventListener("click", () => {
    quizContainer.innerHTML = `
      <p id="quiz-question"></p>
      <ul id="quiz-options"></ul>
      <button id="next-question-btn" disabled>Next</button>
      <p id="quiz-feedback"></p>
    `;
    // Re-attach event listener tombol next
    document.getElementById("next-question-btn").addEventListener("click", () => {
      currentQuizIndex++;
      if(currentQuizIndex < shuffledQuizData.length) {
        showQuestion();
      } else {
        showQuizResult();
      }
    });
    startQuiz();
  });
}

// Navigasi
navHome.addEventListener("click", e => {
  e.preventDefault();
  showHome();
});

navMateri.addEventListener("click", e => {
  e.preventDefault();
  showListMateri();
});

navQuiz.addEventListener("click", e => {
  e.preventDefault();
  quizSection.classList.remove("hidden");
  listMateriSection.classList.add("hidden");
  materiDetailSection.classList.add("hidden");
  homeText.classList.add("hidden");
  startQuiz();
});

backBtn.addEventListener("click", showListMateri);

function showHome() {
  homeText.classList.remove("hidden");
  carouselItems.forEach(i => i.classList.remove("hidden"));
  carouselContainer.classList.remove("hidden");
  prevBtn.classList.remove("hidden");
  nextBtn.classList.remove("hidden");

  listMateriSection.classList.add("hidden");
  materiDetailSection.classList.add("hidden");
  quizSection.classList.add("hidden");
}

navQuiz.addEventListener("click", e => {
  e.preventDefault();
  quizSection.classList.remove("hidden");

  // Sembunyikan carousel dan tombolnya
  carouselContainer.classList.add("hidden");
  prevBtn.classList.add("hidden");
  nextBtn.classList.add("hidden");

  listMateriSection.classList.add("hidden");
  materiDetailSection.classList.add("hidden");
  homeText.classList.add("hidden");

  startQuiz();
});


// FAQ toggle
document.querySelectorAll(".faq-question").forEach(button => {
  button.addEventListener("click", () => {
    const answer = button.nextElementSibling;
    const isExpanded = button.getAttribute("aria-expanded") === "true";

    // Tutup semua yang terbuka
    document.querySelectorAll(".faq-question").forEach(btn => {
      btn.setAttribute("aria-expanded", "false");
      btn.nextElementSibling.hidden = true;
    });

    if (!isExpanded) {
      button.setAttribute("aria-expanded", "true");
      answer.hidden = false;
    }
  });
});

// Inisialisasi awal
function init() {
  initCarousel();
  showHome();
}

init();
