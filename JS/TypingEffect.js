// H1 typing (ONCE only)
const nameText = "Glan Monis";
const nameEl = document.getElementById("typingName");

let nameIndex = 0;

function typeNameOnce() {
  if (nameIndex < nameText.length) {
    nameEl.textContent += nameText.charAt(nameIndex);
    nameIndex++;
    setTimeout(typeNameOnce, 150); // speed
  }
}

typeNameOnce();



//subtitle
const subtitles = [
  "BCA Graduate",
  "Aspiring Software Developer",
  "Frontend & Web Enthusiast",
  "AI-Driven Tech Learner",
  "Problem Solver & Lifelong Learner"
];

const subtitleEl = document.getElementById("typedSubtitle");

let subIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeSubtitle() {
  const currentText = subtitles[subIndex];

  if (!isDeleting) {
    subtitleEl.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentText.length) {
      setTimeout(() => (isDeleting = true), 1500); // pause after typing
    }
  } else {
    subtitleEl.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      subIndex = (subIndex + 1) % subtitles.length;
    }
  }

  setTimeout(typeSubtitle, isDeleting ? 60 : 100);
}

typeSubtitle();
