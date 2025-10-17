// === Stable 3D Horizontal Page Flip Navigation ===
const pages = document.querySelectorAll(".page");
const container = document.querySelector(".book-container");
let currentPage = 0;
let isTransitioning = false;

// === NEW: Icon Navigation Setup ===
const pageIcons = [
  // Page 1: Cover
  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
  // Page 2: About
  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  // Page 3: Skills
  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2z"></polygon></svg>',
  // Page 4: Projects
  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>',
  // Page 5: Resume
  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',
  // Page 6: Gallery
  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>',
  // Page 7: Blog
  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>',
  // Page 8: Contact
  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>'
];

const nav = document.createElement("div");
nav.className = "icon-navigation";
document.body.appendChild(nav);

pages.forEach((page, i) => {
  const iconBtn = document.createElement("button");
  iconBtn.className = "icon-btn";
  iconBtn.innerHTML = pageIcons[i] || ''; // Use the icon, or empty if not defined
  iconBtn.setAttribute('aria-label', page.dataset.title);
  if (i === 0) iconBtn.classList.add("active");
  iconBtn.addEventListener("click", () => goToPage(i));
  nav.appendChild(iconBtn);
});

// === Go To Page Function ===
function goToPage(index) {
  if (isTransitioning) return;
  if (index < 0) index = 0;
  if (index >= pages.length) index = pages.length - 1;

  isTransitioning = true;
  currentPage = index;

  container.style.transform = `translateX(${-index * 100}vw)`;

  pages.forEach((p, i) => p.classList.toggle("active", i === currentPage));
  updateIcons();

  setTimeout(() => (isTransitioning = false), 800);
}

// === Update Icon States ===
function updateIcons() {
  document.querySelectorAll(".icon-btn").forEach((btn, i) => {
    btn.classList.toggle("active", i === currentPage);
  });
}

// === IMPORTANT: MOUSEWHEEL SCROLL DISABLED FOR PAGE TURNING ===
// This allows for normal vertical scrolling on pages without interference.
// window.addEventListener("wheel", (e) => {
//   if (isTransitioning) return;
//   // Check if the scroll is primarily horizontal (like on a trackpad)
//   if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
//     if (e.deltaX > 0) goToPage(currentPage + 1);
//     else if (e.deltaX < 0) goToPage(currentPage - 1);
//   }
// });

// === Touch Navigation (Mobile Swipe) ===
let startX = 0;
window.addEventListener("touchstart", (e) => (startX = e.touches[0].clientX));
window.addEventListener("touchend", (e) => {
  if (isTransitioning) return;
  const endX = e.changedTouches[0].clientX;
  if (startX - endX > 60) goToPage(currentPage + 1);
  if (endX - startX > 60) goToPage(currentPage - 1);
});

// === Initialize ===
container.style.transform = "translateX(0)";
pages[0].classList.add("active");

// === Mouse-Follow Spotlight Effect ===
const coverPage = document.getElementById("p-cover");
if (coverPage) {
  coverPage.addEventListener("mousemove", (e) => {
    const rect = coverPage.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    coverPage.style.setProperty("--x", `${x}px`);
    coverPage.style.setProperty("--y", `${y}px`);
  });
}

// === Hide Scroll Hint on About Page Scroll (Corrected) ===
const aboutPageSheet = document.querySelector("#p-about .sheet");
const scrollHint = document.querySelector("#p-about .scroll-hint");
if (aboutPageSheet && scrollHint) {
  aboutPageSheet.addEventListener('scroll', () => {
    if (aboutPageSheet.scrollTop > 50) {
      scrollHint.classList.add('hidden');
    } else {
      scrollHint.classList.remove('hidden');
    }
  });
}

// === Go To Page Function (with Lazy Loading) ===
function goToPage(index) {
  if (isTransitioning) return;
  if (index < 0) index = 0;
  if (index >= pages.length) index = pages.length - 1;

  isTransitioning = true;
  currentPage = index;

  container.style.transform = `translateX(${-index * 100}vw)`;

  pages.forEach((p, i) => p.classList.toggle("active", i === currentPage));
  updateIcons();

  // --- NEW: Lazy Loading Logic ---
  const activePage = pages[index];

  // Check if we haven't loaded this page's content before
  if (!activePage.dataset.loaded) {
    const lazyImages = activePage.querySelectorAll('img.lazy');

    lazyImages.forEach(img => {
      // Start loading the real image
      img.src = img.dataset.src;

      // When the image is fully loaded, fade it in
      img.onload = () => {
        img.classList.add('loaded');
      };
    });

    // Mark the page as loaded so we don't do this again
    activePage.dataset.loaded = 'true';
  }
  // --- End of Lazy Loading Logic ---

  setTimeout(() => (isTransitioning = false), 800);
}