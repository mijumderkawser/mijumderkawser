/* ==========================================================
   MOJUMDER KAWSER — PORTFOLIO INTERACTIONS
   ========================================================== */

const profile = {
  name: "MOJUMDER KAWSER",
  email: "kawsermojumder33@email.com",
  phone: "+79964507740",
  github: "https://github.com/mijumderkawser"
  // Change "yourusername" to your real GitHub username.
};

const byId = (id) => document.getElementById(id);

/* FOOTER YEAR */
const yearEl = byId("year");

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

/* GITHUB LINK */
const githubLink = byId("githubLink");

if (githubLink && profile.github && profile.github !== "yourusername") {
  githubLink.href =
    `https://github.com/${encodeURIComponent(profile.github)}`;

  githubLink.hidden = false;
}

/* MOBILE NAVIGATION */
const menuToggle = byId("menuToggle");
const siteNav = byId("siteNav");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen =
      menuToggle.getAttribute("aria-expanded") === "true";

    menuToggle.setAttribute("aria-expanded", String(!isOpen));

    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Open navigation" : "Close navigation"
    );

    siteNav.classList.toggle("is-open", !isOpen);
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
    });
  });
}

/* SCROLL PROGRESS */
const progressFill = byId("progressFill");
let scrollTicking = false;

function updateScrollProgress() {
  const scrollable =
    document.documentElement.scrollHeight - window.innerHeight;

  const progress = scrollable > 0
    ? window.scrollY / scrollable
    : 0;

  if (progressFill) {
    progressFill.style.width =
      `${Math.min(100, Math.max(0, progress * 100))}%`;
  }

  scrollTicking = false;
}

window.addEventListener("scroll", () => {
  if (!scrollTicking) {
    window.requestAnimationFrame(updateScrollProgress);
    scrollTicking = true;
  }
}, { passive: true });

updateScrollProgress();

/* REDUCED MOTION ACCESSIBILITY */
const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

/* REVEAL CONTENT ON SCROLL */
const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && !reduceMotion) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((el) => revealObserver.observe(el));
} else {
  revealItems.forEach((el) => el.classList.add("visible"));
}

/* ACTIVE NAVIGATION LINK */
const sectionLinks = Array.from(
  document.querySelectorAll(".site-nav a[href^='#']")
);

const observedSections = sectionLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window && observedSections.length) {
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        sectionLinks.forEach((link) => {
          const active =
            link.getAttribute("href") === `#${entry.target.id}`;

          link.classList.toggle("active", active);
        });
      });
    },
    { rootMargin: "-25% 0px -60% 0px", threshold: 0 }
  );

  observedSections.forEach((section) => navObserver.observe(section));
}

/* ROTATING HERO TEXT */
const rotatingWord = byId("rotatingWord");

if (rotatingWord && !reduceMotion) {
  const phrases = [
    "clear insight.",
    "better questions.",
    "useful answers."
  ];

  let phraseIndex = 0;

  window.setInterval(() => {
    rotatingWord.classList.add("is-changing");

    window.setTimeout(() => {
      phraseIndex = (phraseIndex + 1) % phrases.length;

      rotatingWord.textContent = phrases[phraseIndex];
      rotatingWord.classList.remove("is-changing");
    }, 300);
  }, 3600);
}

/* CUSTOM CURSOR */
const cursorRing = byId("cursorRing");
const cursorDot = byId("cursorDot");

const finePointer = window.matchMedia("(pointer: fine)").matches;

if (cursorRing && cursorDot && finePointer && !reduceMotion) {
  document.body.classList.add("has-custom-cursor");

  [cursorRing, cursorDot].forEach((el) => {
    el.style.opacity = "1";
  });

  let cursorX = -50;
  let cursorY = -50;
  let ringX = -50;
  let ringY = -50;

  window.addEventListener("mousemove", (event) => {
    cursorX = event.clientX;
    cursorY = event.clientY;

    cursorDot.style.transform =
      `translate(${cursorX - 2.5}px, ${cursorY - 2.5}px)`;
  }, { passive: true });

  function moveCursor() {
    ringX += (cursorX - ringX) * 0.18;
    ringY += (cursorY - ringY) * 0.18;

    cursorRing.style.transform =
      `translate(${ringX - 16}px, ${ringY - 16}px)`;

    requestAnimationFrame(moveCursor);
  }

  moveCursor();

  document.querySelectorAll("a, button").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursorRing.classList.add("cursor-hover");
    });

    el.addEventListener("mouseleave", () => {
      cursorRing.classList.remove("cursor-hover");
    });
  });

  document.addEventListener("mouseleave", () => {
    cursorRing.style.opacity = "0";
    cursorDot.style.opacity = "0";
  });

  document.addEventListener("mouseenter", () => {
    cursorRing.style.opacity = "1";
    cursorDot.style.opacity = "1";
  });
}

/* ==========================================================
   LIVING DATA UNIVERSE
   Subtle connected particles behind the website
   ========================================================== */

(function initDataUniverse() {
  const canvas = byId("universe-bg");

  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  if (!ctx) return;

  let width = 0;
  let height = 0;
  let dpr = 1;
  let dots = [];
  let scrollProgress = 0;

  const mouse = {
    x: 0,
    y: 0,
    active: false
  };

  const maxDpr = window.innerWidth <= 760 ? 1.25 : 1.5;

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;

    dpr = Math.min(window.devicePixelRatio || 1, maxDpr);

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = width <= 760 ? 34 : 66;

    dots = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      r: 0.7 + Math.random() * 1.1,
      warm: Math.random() > 0.35
    }));

    draw(false);
  }

  function draw(move = true) {
    ctx.clearRect(0, 0, width, height);

    if (move && !reduceMotion) {
      dots.forEach((dot) => {
        dot.x += dot.vx;
        dot.y += dot.vy;

        if (dot.x < 0) dot.x = width;
        if (dot.x > width) dot.x = 0;
        if (dot.y < 0) dot.y = height;
        if (dot.y > height) dot.y = 0;
      });
    }

    const mx = mouse.active
      ? (mouse.x / Math.max(width, 1) - 0.5) * 9
      : 0;

    const my = mouse.active
      ? (mouse.y / Math.max(height, 1) - 0.5) * 9
      : 0;

    const visible = dots.map((p) => ({
      ...p,
      x: p.x + mx,
      y: p.y + my - scrollProgress * 6
    }));

    const limit = width <= 760 ? 100 : 135;

    // Connect nearby points.
    for (let i = 0; i < visible.length; i++) {
      for (let j = i + 1; j < visible.length; j++) {
        const a = visible[i];
        const b = visible[j];

        const dx = a.x - b.x;
        const dy = a.y - b.y;

        const distance = Math.hypot(dx, dy);

        if (distance > limit) continue;

        const alpha = (1 - distance / limit) * 0.16;

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);

        ctx.strokeStyle = a.warm
          ? `rgba(212,131,98,${alpha})`
          : `rgba(232,184,158,${alpha})`;

        ctx.lineWidth = 0.65;
        ctx.stroke();
      }
    }

    // Draw the data points.
    visible.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);

      ctx.fillStyle = p.warm
        ? "rgba(212,131,98,.62)"
        : "rgba(232,184,158,.62)";

      ctx.fill();
    });
  }

  let rafId = 0;

  function animate() {
    draw(true);

    if (!reduceMotion) {
      rafId = requestAnimationFrame(animate);
    }
  }

  window.addEventListener("resize", resize, { passive: true });

  window.addEventListener("mousemove", (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
    mouse.active = true;

    if (reduceMotion) draw(false);
  }, { passive: true });

  window.addEventListener("scroll", () => {
    const max =
      document.documentElement.scrollHeight - window.innerHeight;

    scrollProgress = max > 0 ? window.scrollY / max : 0;

    if (reduceMotion) draw(false);
  }, { passive: true });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      cancelAnimationFrame(rafId);
    } else if (!reduceMotion) {
      animate();
    }
  });

  resize();

  if (reduceMotion) {
    draw(false);
  } else {
    animate();
  }
})();

/* ==========================================================
   ROTATING 3D NEURAL NETWORK SPHERE
   Three.js must load before this script
   ========================================================== */

(function initNeuralSphere() {
  const canvas = byId("bg3d");

  if (!canvas || typeof THREE === "undefined") return;

  const isMobile = window.innerWidth <= 760;

  let renderer;

  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "low-power"
    });
  } catch (error) {
    console.warn(
      "3D background unavailable; the rest of the site will still work.",
      error
    );
    return;
  }

  const reduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  renderer.setPixelRatio(
    Math.min(window.devicePixelRatio || 1, isMobile ? 1.2 : 1.5)
  );

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
  camera.position.z = 8;

  const group = new THREE.Group();
  scene.add(group);

  const TERRACOTTA = 0xd48362;
  const SAND = 0xe8b89e;

  const positions = [];
  const nodes = [];

  const count = isMobile ? 52 : 94;
  const radius = 1.55;
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  // Create spherical network nodes.
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const ringRadius = Math.sqrt(1 - y * y);
    const angle = goldenAngle * i;

    const p = new THREE.Vector3(
      Math.cos(angle) * ringRadius * radius,
      y * radius,
      Math.sin(angle) * ringRadius * radius
    );

    nodes.push(p);

    positions.push(p.x, p.y, p.z);
  }

  const nodeGeometry = new THREE.BufferGeometry();

  nodeGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3)
  );

  const nodeMaterial = new THREE.PointsMaterial({
    color: SAND,
    size: 0.055,
    transparent: true,
    opacity: 0.7,
    depthWrite: false,
    sizeAttenuation: true,
    blending: THREE.AdditiveBlending
  });

  group.add(new THREE.Points(nodeGeometry, nodeMaterial));

  // Connect nearby neural nodes.
  const linePositions = [];

  for (let i = 0; i < nodes.length; i++) {
    const nearest = [];

    for (let j = 0; j < nodes.length; j++) {
      if (i === j) continue;

      nearest.push({
        j,
        d: nodes[i].distanceToSquared(nodes[j])
      });
    }

    nearest.sort((a, b) => a.d - b.d);

    nearest.slice(0, 2).forEach(({ j }) => {
      if (j <= i) return;

      const a = nodes[i];
      const b = nodes[j];

      linePositions.push(
        a.x, a.y, a.z,
        b.x, b.y, b.z
      );
    });
  }

  const lineGeometry = new THREE.BufferGeometry();

  lineGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(linePositions, 3)
  );

  group.add(
    new THREE.LineSegments(
      lineGeometry,
      new THREE.LineBasicMaterial({
        color: TERRACOTTA,
        transparent: true,
        opacity: 0.24,
        depthWrite: false
      })
    )
  );

  // Inner geometric core.
  const core = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.55, 1),
    new THREE.MeshBasicMaterial({
      color: TERRACOTTA,
      wireframe: true,
      transparent: true,
      opacity: 0.32,
      depthWrite: false
    })
  );

  group.add(core);

  // Orbital rings.
  const orbit = new THREE.Mesh(
    new THREE.TorusGeometry(2.05, 0.008, 6, 100),
    new THREE.MeshBasicMaterial({
      color: SAND,
      transparent: true,
      opacity: 0.30,
      depthWrite: false
    })
  );

  orbit.rotation.x = Math.PI / 2.7;
  group.add(orbit);

  const orbitTwo = new THREE.Mesh(
    new THREE.TorusGeometry(2.24, 0.006, 6, 100),
    new THREE.MeshBasicMaterial({
      color: TERRACOTTA,
      transparent: true,
      opacity: 0.22,
      depthWrite: false
    })
  );

  orbitTwo.rotation.x = Math.PI / 2.2;
  orbitTwo.rotation.y = Math.PI / 5;

  group.add(orbitTwo);

  // Distant background particles.
  const particlesCount = isMobile ? 70 : 140;
  const starsPositions = new Float32Array(particlesCount * 3);

  for (let i = 0; i < particlesCount; i++) {
    starsPositions[i * 3] = (Math.random() - 0.5) * 19;
    starsPositions[i * 3 + 1] = (Math.random() - 0.5) * 12;
    starsPositions[i * 3 + 2] = (Math.random() - 0.5) * 5;
  }

  const starsGeometry = new THREE.BufferGeometry();

  starsGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(starsPositions, 3)
  );

  scene.add(
    new THREE.Points(
      starsGeometry,
      new THREE.PointsMaterial({
        color: SAND,
        size: 0.018,
        transparent: true,
        opacity: 0.25,
        depthWrite: false
      })
    )
  );

  // Keep the renderer responsive.
  function resize() {
    const w = window.innerWidth;
    const h = window.innerHeight;

    renderer.setSize(w, h, false);

    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  window.addEventListener("resize", resize, { passive: true });
  resize();

  // Mouse and scroll response.
  let mouseX = 0;
  let mouseY = 0;
  let scrollP = 0;

  window.addEventListener("mousemove", (event) => {
    mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

  window.addEventListener("scroll", () => {
    const max =
      document.documentElement.scrollHeight - window.innerHeight;

    scrollP = max > 0 ? window.scrollY / max : 0;
  }, { passive: true });

  const clock = new THREE.Clock();

  function render() {
    const t = reduced ? 0 : clock.getElapsedTime();
    const wide = window.innerWidth > 760;

    const targetX = wide
      ? 4.0 * Math.cos(scrollP * Math.PI * 2)
      : 0;

    group.position.x += (targetX - group.position.x) * 0.035;

    group.position.y =
      Math.sin(t * 0.35) * 0.1 - scrollP * 0.3;

    group.scale.setScalar(wide ? 0.88 : 0.5);

    group.rotation.y = t * 0.10 + mouseX * 0.08;
    group.rotation.x = t * 0.045 + mouseY * 0.06;

    core.rotation.x = t * 0.18;
    core.rotation.y = -t * 0.22;

    orbit.rotation.z = t * 0.08;
    orbitTwo.rotation.y = Math.PI / 5 + t * 0.06;

    renderer.render(scene, camera);
  }

  function animate() {
    render();

    if (!reduced && !document.hidden) {
      requestAnimationFrame(animate);
    }
  }

  if (reduced) {
    render();
  } else {
    animate();
  }

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden && !reduced) animate();
  });

})();