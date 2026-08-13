const navToggle = document.querySelector("#nav-toggle");
const siteNav = document.querySelector("#site-nav");
const siteHeader = document.querySelector(".site-header");
const themeToggle = document.querySelector("#theme-toggle");
const themeIcon = themeToggle?.querySelector("i");
const themeMeta = document.querySelector('meta[name="theme-color"]');
const navLinks = [...document.querySelectorAll(".site-nav a")];
const sections = [...document.querySelectorAll("main section[id]")];
const revealItems = [...document.querySelectorAll("[data-reveal]")];
const roleRotator = document.querySelector(".role-rotator");
const filterButtons = [...document.querySelectorAll(".filter-button")];
const galleryCards = [...document.querySelectorAll(".gallery-card")];
const backToTopLink = document.querySelector(".back-to-top");
const root = document.documentElement;
const themeColors = {
   dark: "#0d1218",
   light: "#f5efe6",
};

const syncHeaderOffset = () => {
   if (!siteHeader) {
      return;
   }

   document.documentElement.style.setProperty("--header-offset", `${siteHeader.offsetHeight}px`);
};

const applyTheme = (theme, persist = true) => {
   root.dataset.theme = theme;

   if (persist) {
      localStorage.setItem("theme", theme);
   }

   if (themeMeta) {
      themeMeta.setAttribute("content", themeColors[theme]);
   }

   if (themeToggle) {
      const isDark = theme === "dark";
      themeToggle.setAttribute("aria-pressed", String(isDark));
      themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
   }

   if (themeIcon) {
      themeIcon.className = theme === "dark" ? "bx bx-sun" : "bx bx-moon";
   }
};

applyTheme(root.dataset.theme || "dark", false);
syncHeaderOffset();

if (themeToggle) {
   themeToggle.addEventListener("click", () => {
      const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
      applyTheme(nextTheme);
   });
}

if (navToggle && siteNav) {
   navToggle.addEventListener("click", () => {
      const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!isExpanded));
      siteNav.classList.toggle("is-open", !isExpanded);
   });

   navLinks.forEach((link) => {
      link.addEventListener("click", () => {
         navToggle.setAttribute("aria-expanded", "false");
         siteNav.classList.remove("is-open");
      });
   });
}

const updateActiveSection = () => {
   const scrollMarker = window.scrollY + 160;

   sections.forEach((section) => {
      const start = section.offsetTop;
      const end = start + section.offsetHeight;
      const link = document.querySelector(`.site-nav a[href="#${section.id}"]`);

      if (!link) {
         return;
      }

      if (scrollMarker >= start && scrollMarker < end) {
         navLinks.forEach((navLink) => navLink.classList.remove("is-active"));
         link.classList.add("is-active");
      }
   });
};

const revealObserver = new IntersectionObserver(
   (entries) => {
      entries.forEach((entry) => {
         if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
         }
      });
   },
   {
      threshold: 0.16,
      rootMargin: "0px 0px -50px 0px",
   }
);

revealItems.forEach((item) => revealObserver.observe(item));

if (roleRotator) {
   const roles = (roleRotator.dataset.roles || "")
      .split("|")
      .map((item) => item.trim())
      .filter(Boolean);

   if (roles.length > 1) {
      let roleIndex = 0;

      window.setInterval(() => {
         roleIndex = (roleIndex + 1) % roles.length;
         roleRotator.textContent = roles[roleIndex];
      }, 2200);
   }
}

filterButtons.forEach((button) => {
   button.addEventListener("click", () => {
      const selectedFilter = button.dataset.filter;

      filterButtons.forEach((item) => {
         const isActive = item === button;
         item.classList.toggle("is-active", isActive);
         item.setAttribute("aria-pressed", String(isActive));
      });

      galleryCards.forEach((card) => {
         const matches = selectedFilter === "all" || card.dataset.category === selectedFilter;
         card.classList.toggle("is-hidden", !matches);
      });
   });
});

if (backToTopLink) {
   backToTopLink.addEventListener("click", (event) => {
      event.preventDefault();
      window.scrollTo({
         top: 0,
         behavior: "smooth",
      });
   });
}

window.addEventListener("resize", syncHeaderOffset);
window.addEventListener("scroll", updateActiveSection, { passive: true });
window.addEventListener("load", () => {
   syncHeaderOffset();
   updateActiveSection();
});
