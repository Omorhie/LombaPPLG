
window.addEventListener("scroll", () => {
  const nav = document.querySelector("nav");
  nav.classList.toggle("scrolled", window.scrollY > 50);
});

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

window.addEventListener("load", () => {
    const intro = document.getElementById("intro");
    setTimeout(() => {
        intro.style.opacity = "0";
        intro.style.visibility = "hidden";
    }, 2500); 
});



window.addEventListener('load', function () {
    const lastPage = localStorage.getItem('lastPage');
    if (lastPage) {
        showPage(lastPage); 
    } else {
        showPage('home');
    }
});

document.getElementById("btn-mulai").addEventListener("click", function(e) {
  e.preventDefault(); 
  showListMateri();  
});





const materiData = [
  {
    id: 1,
    judul: "Pengantar JavaScript",
    isi: "JavaScript adalah bahasa pemrograman yang berjalan di browser dan memungkinkan halaman web menjadi interaktif dan dinamis. Dengan JavaScript, kamu bisa membuat elemen web merespon aksi pengguna seperti klik, mengubah konten secara real-time, memvalidasi form, serta membuat animasi dan efek visual. JavaScript juga digunakan di sisi server dengan platform seperti Node.js, sehingga fleksibel untuk pengembangan aplikasi full-stack.",
    video: "https://www.youtube.com/embed/RUTV_5m4VeI"
  },
  {
    id: 2,
    judul: "Dasar HTML",
    isi: "HTML (HyperText Markup Language) adalah bahasa markup standar yang digunakan untuk membuat dan menyusun konten di halaman web. HTML berfungsi sebagai kerangka dasar yang mengatur elemen-elemen seperti teks, gambar, tautan, dan multimedia agar dapat ditampilkan oleh browser. Dengan memahami dasar HTML, kamu bisa membangun struktur halaman web yang terorganisir dan siap untuk diberi gaya serta interaktivitas menggunakan CSS dan JavaScript.",
    video: "https://www.youtube.com/embed/0oA1Z6UKM5M"
  },
  {
    id: 3,
    judul: "CSS Untuk Styling",
    isi: "CSS (Cascading Style Sheets) adalah bahasa yang digunakan untuk mengatur tampilan dan layout halaman web. Dengan CSS, kamu bisa mengubah warna, font, ukuran, posisi, dan efek visual elemen HTML agar website terlihat menarik dan responsif di berbagai perangkat. CSS bekerja berdampingan dengan HTML untuk memisahkan konten dan desain, sehingga memudahkan pengelolaan dan pengembangan tampilan web.",
    video: "https://www.youtube.com/embed/V-DD30lGAL0"
  },
    {
    id: 4,
    judul: "PHP Untuk Backend",
    isi: "PHP adalah bahasa pemrograman server-side yang populer digunakan untuk mengembangkan aplikasi web dinamis dan backend website. PHP memungkinkan server untuk memproses data, berinteraksi dengan database, dan mengirimkan konten yang dihasilkan ke browser pengguna secara dinamis. Karena kemudahan penggunaannya dan dukungan luas dari banyak hosting, PHP banyak dipakai untuk membuat website, API, dan sistem manajemen konten.",
    video: "https://www.youtube.com/embed/Ak6VTSekGP4"
  },
    {
    id: 5,
    judul: "Python Bahasa Pemrograman Serba Guna dan Mudah Dipelajari",
    isi: "Python adalah bahasa pemrograman tingkat tinggi yang terkenal dengan sintaksnya yang sederhana dan mudah dipahami. Python banyak digunakan untuk berbagai keperluan mulai dari pengembangan web, analisis data, kecerdasan buatan, otomatisasi, hingga pengembangan aplikasi desktop. Komunitas besar dan banyaknya pustaka (library) membuat Python sangat fleksibel dan populer di kalangan programmer pemula maupun profesional.",
    video: "https://www.youtube.com/embed/n0tURC_xeyI"
  }
];




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

  setInterval(() => {
    currentCarousel = (currentCarousel + 1) % carouselItems.length;
    showCarouselSlide(currentCarousel);
  }, 5000);

  showCarouselSlide(currentCarousel);
}

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

  const videoWrapper = document.getElementById("video-wrapper");
  videoWrapper.innerHTML = `
    <iframe width="560" height="315" 
      src="${materi.video}" 
      frameborder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
      allowfullscreen 
      title="${materi.judul}">
    </iframe>
  `;
}

const quizData = [
  {
    question: "Apa kepanjangan dari HTML?",
    options: [
      "HyperText Markup Language",
      "Hyperlink Text Mark Language",
      "Home Tool Markup Language",
      "HyperText Markdown Language"
    ],
    answer: "HyperText Markup Language"
  },
  {
    question: "Apa fungsi CSS dalam web?",
    options: [
      "Memberi gaya pada halaman web",
      "Menambah interaktivitas",
      "Menyimpan data",
      "Menjalankan server"
    ],
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
  },
  {
    question: "Mana yang termasuk tipe data numerik?",
    options: ["String", "Boolean", "Float", "Array"],
    answer: "Float"
  },
  {
    question: "Perintah `if` digunakan untuk?",
    options: [
      "Mengulangi perintah berkali-kali",
      "Memilih antara dua atau lebih opsi berdasarkan kondisi",
      "Mendefinisikan fungsi baru",
      "Menyimpan data"
    ],
    answer: "Memilih antara dua atau lebih opsi berdasarkan kondisi"
  },
  {
    question: "Loop yang digunakan untuk menjalankan perintah selama kondisi bernilai benar adalah?",
    options: ["if", "switch", "while", "print"],
    answer: "while"
  },
  {
    question: "Apa itu rekursi dalam pemrograman?",
    options: [
      "Fungsi yang memanggil dirinya sendiri",
      "Variabel khusus",
      "Perulangan tanpa akhir",
      "Operator matematika"
    ],
    answer: "Fungsi yang memanggil dirinya sendiri"
  },
  {
    question: "Apa itu konsep OOP (Object-Oriented Programming)?",
    options: [
      "Pemrograman berbasis objek dan kelas",
      "Bahasa pemrograman web",
      "Cara menulis kode tanpa fungsi",
      "Bahasa markup"
    ],
    answer: "Pemrograman berbasis objek dan kelas"
  },
  {
    question: "Apa itu exception handling?",
    options: [
      "Menangani error saat program berjalan",
      "Membuat program lebih cepat",
      "Menambah gaya pada halaman web",
      "Menyimpan data ke database"
    ],
    answer: "Menangani error saat program berjalan"
  },
  {
    question: "Apa itu algoritma dalam pemrograman?",
    options: [
      "Langkah-langkah penyelesaian masalah",
      "Bahasa pemrograman baru",
      "Perintah mencetak teks",
      "Tipe data khusus"
    ],
    answer: "Langkah-langkah penyelesaian masalah"
  }
];

function shuffleArray(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

let currentQuizIndex = 0;
let score = 0;
let shuffledQuizData = [];

const quizContainer = document.getElementById("quiz-container");

function renderQuizUI() {
  quizContainer.innerHTML = `
    <p id="quiz-question"></p>
    <ul id="quiz-options" style="padding:0; list-style:none; margin-top:10px;"></ul>
    <div style="margin-top:14px;">
      <button id="next-question-btn" disabled class="btn-primary">Next</button>
    </div>
    <p id="quiz-feedback" style="margin-top:10px;"></p>
  `;

  const nextBtn = document.getElementById("next-question-btn");
  nextBtn.removeEventListener?.("click", onNextQuestion);
  nextBtn.addEventListener("click", onNextQuestion);
}

function startQuiz() {
  score = 0;
  currentQuizIndex = 0;

  shuffledQuizData = shuffleArray([...quizData]);

  renderQuizUI();
  showQuestion();
}

function showQuestion() {
  const questionEl = document.getElementById("quiz-question");
  const optionsEl = document.getElementById("quiz-options");
  const nextBtn = document.getElementById("next-question-btn");
  const feedbackEl = document.getElementById("quiz-feedback");

  if (!shuffledQuizData.length) return;

  optionsEl.innerHTML = "";
  feedbackEl.textContent = "";
  nextBtn.disabled = true;

  const current = shuffledQuizData[currentQuizIndex];

  const options = shuffleArray([...current.options]);

  questionEl.textContent = `Q${currentQuizIndex + 1}. ${current.question}`;

  options.forEach(opt => {
    const li = document.createElement("li");
    li.style.marginBottom = "8px";

    const btn = document.createElement("button");
    btn.className = "quiz-option-btn";
    btn.type = "button";
    btn.textContent = opt;
    btn.style.padding = "10px 14px";
    btn.style.borderRadius = "8px";
    btn.style.border = "1px solid rgba(0,0,0,0.06)";
    btn.style.cursor = "pointer";
    btn.style.background = "#0077ff";
    btn.style.color = "white";
    btn.style.fontWeight = "600";

    btn.addEventListener("click", () => selectAnswer(btn, opt));

    li.appendChild(btn);
    optionsEl.appendChild(li);
  });
}

function selectAnswer(buttonClicked, selectedOption) {
  const current = shuffledQuizData[currentQuizIndex];
  const feedbackEl = document.getElementById("quiz-feedback");
  const nextBtn = document.getElementById("next-question-btn");

  document.querySelectorAll(".quiz-option-btn").forEach(b => b.disabled = true);

  document.querySelectorAll(".quiz-option-btn").forEach(b => {
    b.style.opacity = "0.95";
  });

  if (selectedOption === current.answer) {
    score++;
    feedbackEl.textContent = "Benar! 🎉";
    feedbackEl.style.color = "green";
    buttonClicked.style.background = "#28a745";
    buttonClicked.style.color = "white";
  } else {
    feedbackEl.textContent = `Salah! Jawaban benar: ${current.answer}`;
    feedbackEl.style.color = "red";
    buttonClicked.style.background = "#dc3545";
    buttonClicked.style.color = "white";
    document.querySelectorAll(".quiz-option-btn").forEach(b => {
      if (b.textContent === current.answer) {
        b.style.background = "#28a745";
        b.style.color = "white";
      }
    });
  }

  nextBtn.disabled = false;
}

function onNextQuestion() {
  currentQuizIndex++;
  if (currentQuizIndex < shuffledQuizData.length) {
    showQuestion();
  } else {
    showQuizResult();
  }
}

function showQuizResult() {
  quizContainer.innerHTML = `
    <div>
      <h3>Quiz selesai!</h3>
      <p>Skor kamu: <strong>${score}</strong> dari ${shuffledQuizData.length}</p>
      <div style="margin-top:12px;">
        <button id="restart-quiz-btn" class="btn-primary">Coba Lagi</button>
      </div>
    </div>
  `;

  const restartBtn = document.getElementById("restart-quiz-btn");
  restartBtn.addEventListener("click", () => {
    startQuiz();
  });

}


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

  carouselContainer.classList.add("hidden");
  prevBtn.classList.add("hidden");
  nextBtn.classList.add("hidden");

  listMateriSection.classList.add("hidden");
  materiDetailSection.classList.add("hidden");
  homeText.classList.add("hidden");

  startQuiz();
});


document.querySelectorAll(".faq-question").forEach(button => {
  button.addEventListener("click", () => {
    const answer = button.nextElementSibling;
    const isExpanded = button.getAttribute("aria-expanded") === "true";

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

function init() {
  initCarousel();
  showHome();
}

init();
