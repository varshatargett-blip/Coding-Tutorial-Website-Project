// ── Theme Toggle ──────────────────────────
const themeBtn = document.getElementById('themeBtn');

if (themeBtn) {
  function applyTheme(dark) {
    document.body.classList.toggle('dark', dark);
    themeBtn.textContent = dark ? '☀️' : '🌙';
    // Using 'tpt-theme' ensures it matches the tutorial pages perfectly!
    localStorage.setItem('tpt-theme', dark ? 'dark' : 'light'); 
  }

  // Restore saved preference on page load
  applyTheme(localStorage.getItem('tpt-theme') === 'dark');

  // Listen for the button click
  themeBtn.addEventListener('click', () => {
    applyTheme(!document.body.classList.contains('dark'));
  });
}

// ── Card Entrance Animation ────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.animation =
        `fadeUp 0.45s ease ${i * 0.05}s both`;
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.course-card').forEach(card => {
  card.style.opacity = '0';
  observer.observe(card);
});

// Re-use fadeUp from CSS (defined globally)
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(22px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);

// ── Search Focus ──────────────────────────
const searchInput = document.querySelector('.search-bar input');
document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    searchInput?.focus();
  }
});








const slider = document.getElementById("slider");

function slideLeft() {
  slider.scrollBy({
    left: -883,
    behavior: "smooth"
  });
}

function slideRight() {
  slider.scrollBy({
    left: 883,
    behavior: "smooth"
  });
}


let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener("mousedown", (e) => {
  isDown = true;
  slider.style.cursor = "grabbing";
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener("mouseleave", () => {
  isDown = false;
  slider.style.cursor = "grab";
});

slider.addEventListener("mouseup", () => {
  isDown = false;
  slider.style.cursor = "grab";
});

slider.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 2; // speed
  slider.scrollLeft = scrollLeft - walk;
});
