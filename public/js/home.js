const fadeElems = document.querySelectorAll('section');

const observer = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('opacity-100', 'translate-y-0');
        entry.target.style.transition = 'opacity 1s ease, transform 1s ease';
      }
    });
  },
  { threshold: 0.2 }
);

fadeElems.forEach(el => {
  el.classList.add('opacity-0', 'translate-y-8');
  observer.observe(el);
});


const phrases = [
"I'm a Web Developer",
"MERN Stack & Mobile Enthusiast",
"Crafting Scalable Digital Experiences"
];

const el = document.getElementById("typewriter-text");

let currentPhrase = 0;
let currentChar = 0;
let isDeleting = false;

function type() {
const fullText = phrases[currentPhrase];
const delay = isDeleting ? 50 : 100;

el.textContent = fullText.substring(0, currentChar);

  
  
if (!isDeleting && currentChar < fullText.length) {
currentChar++;
} else if (isDeleting && currentChar > 0) {
currentChar--;
} else {
if (!isDeleting) {
  isDeleting = true;
  setTimeout(type, 1000); // pause before deleting
  return;
} else {
  isDeleting = false;
  currentPhrase = (currentPhrase + 1) % phrases.length;
}
}

setTimeout(type, delay);
}

// Start typing after initial load
document.addEventListener("DOMContentLoaded", () => {
setTimeout(type, 1000);
});


document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".project-slide");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  let current = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("opacity-100", i === index);
      slide.classList.toggle("opacity-0", i !== index);
    });
  }

  prevBtn.addEventListener("click", () => {
    current = (current - 1 + slides.length) % slides.length;
    showSlide(current);
  });

  nextBtn.addEventListener("click", () => {
    current = (current + 1) % slides.length;
    showSlide(current);
  });
});

const categories = [
  {
    name: "Frontend",
    description: "HTML, CSS, JS and React expertise",
    skills: [
      { icon: "/images/html.png", name: "HTML", percent: 95 },
      { icon: "/images/css.png", name: "CSS", percent: 90 },
      { icon: "/images/js.png", name: "JavaScript", percent: 85 },
      { icon: "/images/tailwind.png", name: "Tailwind CSS", percent: 90 },
      { icon: "/images/react.png", name: "React", percent: 90 },
    ],
  },
  {
    name: "Backend",
    description: "Node.js, Express & Python skills",
    skills: [
      { icon: "/images/nodejs.png", name: "Node.js", percent: 85 },
      { icon: "/images/express.png", name: "Express.js", percent: 80 },
      { icon: "/images/python.png", name: "Python", percent: 75 },
    ],
  },
  {
    name: "Database",
    description: "MongoDB & PostgreSQL knowledge",
    skills: [
      { icon: "/images/mongodb.png", name: "MongoDB", percent: 80 },
      { icon: "/images/mysql.png", name: "PostgreSQL", percent: 70 },
    ],
  },
  {
    name: "Tools",
    description: "Git, Docker & Linux command line",
    skills: [
      { icon: "/images/git.png", name: "Git", percent: 90 },
      { icon: "/images/github.png", name: "Github", percent: 65 },
      { icon: "/images/figma.png", name: "figma", percent: 75 },
    ],
  },
];
const container = document.getElementById("category-container");
let expandedClone = null;

// Utility: Create skill item card
function createSkillCard(skill) {
  const card = document.createElement("div");
  card.className =
    "skill-card bg-black w-100% h-100% rounded-xl p-5 shadow-md flex flex-col items-center space-y-3";

  const iconWrapper = document.createElement("div");
  iconWrapper.className =
    "w-20 h-20   flex items-center justify-center shadow-inner";

  const img = document.createElement("img");
  img.src = skill.icon;
  img.alt = skill.name;
  img.className = "w-100% h-100% object-cover rounded-full";

  iconWrapper.appendChild(img);

  const skillName = document.createElement("h4");
  skillName.className = "text-base font-semibold text-white";
  skillName.textContent = skill.name;

  const progressContainer = document.createElement("div");
  progressContainer.className = "w-full h-3 rounded-full overflow-hidden";

  card.append(iconWrapper, skillName, progressContainer);
  return card;
}

// Utility: Expand a category card
function expandCard(card, category, index) {
  if (expandedClone) return;

  const rect = card.getBoundingClientRect();
  const vw = window.innerWidth,
    vh = window.innerHeight;
  const targetW = Math.min(vw * 0.9, 900);
  const targetH = Math.min(vh * 0.8, 700);
  const targetTop = (vh - targetH) / 2;
  const targetLeft = (vw - targetW) / 2;

  expandedClone = card.cloneNode(true);
  expandedClone.dataset.index = index;
  expandedClone.className += " z-50 fixed";
  Object.assign(expandedClone.style, {
    position: "fixed",
    top: `${rect.top}px`,
    left: `${rect.left}px`,
    width: `${rect.width}px`,
    height: `${rect.height}px`,
    margin: 0,
    borderRadius: "1.5rem",
    backgroundColor: "#121212",
    padding: "2rem",
    boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    transition: "all 0.5s ease-in-out",
  });

  expandedClone.innerHTML = `
      <h3 class="text-4xl font-extrabold mb-6">${category.name} Skills</h3>
      <div id="expanded-skills" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full mb-6"></div>
      <button id="close-expanded" class="mt-auto  text-white font-bold py-3 px-6 rounded-lg transition">
        Close
      </button>
    `;

  const skillsEl = expandedClone.querySelector("#expanded-skills");
  category.skills.forEach((skill) =>
    skillsEl.appendChild(createSkillCard(skill))
  );

  document.body.appendChild(expandedClone);
 

  requestAnimationFrame(() => {
    Object.assign(expandedClone.style, {
      top: `${targetTop}px`,
      left: `${targetLeft}px`,
      width: `${targetW}px`,
      height: `${targetH}px`,
      borderRadius: "1rem",
    });
  });

  expandedClone
    .querySelector("#close-expanded")
    .addEventListener("click", collapseCard);
  document.addEventListener("keydown", handleEscape);
}

// Utility: Collapse expanded view
function collapseCard() {
  if (!expandedClone) return;

  const index = expandedClone.dataset.index;
  const original = container.querySelector(
    `.category-card[data-index="${index}"]`
  );
  const rect = original.getBoundingClientRect();

  Object.assign(expandedClone.style, {
    top: `${rect.top}px`,
    left: `${rect.left}px`,
    width: `${rect.width}px`,
    height: `${rect.height}px`,
    borderRadius: "1.5rem",
    opacity: 0,
  });

  setTimeout(() => {
    expandedClone.remove();
    expandedClone = null;
    document.body.style.overflow = "";
    document.removeEventListener("keydown", handleEscape);
  }, 500);
}

// Handle escape key to close popup
function handleEscape(e) {
  if (e.key === "Escape") collapseCard();
}

// Generate category cards
categories.forEach((cat, idx) => {
  const card = document.createElement("div");
  card.className =
    "category-card  bg-[#121212] hover:bg-[#242423]  rounded-3xl cursor-pointer shadow-md p-8 text-white w-full aspect-square flex justify-center flex-col items-center text-center transition duration-300";
  card.dataset.index = idx;
  card.innerHTML = `
      <h3 class="text-2xl font-bold mb-2">${cat.name}</h3>
      <p class="text-sm opacity-70">${cat.description}</p>
    `;
  card.addEventListener("click", () => expandCard(card, cat, idx));
  container.appendChild(card);
});
;