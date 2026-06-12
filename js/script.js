// ===========================
// SCROLL REVEAL
// ===========================
const revealEls = document.querySelectorAll('.reveal-up, .reveal-right');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.12 }
);

revealEls.forEach(el => revealObserver.observe(el));

// ===========================
// HERO INSTANT REVEAL ON LOAD
// ===========================
window.addEventListener('load', () => {
  document.querySelectorAll('.hero .reveal-up, .hero .reveal-right').forEach(el => {
    el.classList.add('visible');
  });
});

// ===========================
// ANIMATED DOT GRID (PARTICLES)
// ===========================
const canvas = document.getElementById('particles');
if (canvas) {
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const dots = [];
  const spacing = 50;

  function buildDots() {
    dots.length = 0;
    for (let x = 0; x < canvas.width; x += spacing) {
      for (let y = 0; y < canvas.height; y += spacing) {
        dots.push({ x, y, phase: Math.random() * Math.PI * 2 });
      }
    }
  }
  buildDots();
  window.addEventListener('resize', buildDots);

  let mouse = { x: -9999, y: -9999 };
  window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const t = Date.now() * 0.0015;

    dots.forEach(dot => {
      const wave = Math.sin(t + dot.phase);
      const dx = dot.x - mouse.x;
      const dy = dot.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const proximity = Math.max(0, 1 - dist / 220);

      const size = 2.0 + wave * 0.8 + proximity * 2.5;
      const opacity = 0.08 + (wave + 1) / 2 * 0.12 + proximity * 0.5;

      ctx.beginPath();
      ctx.arc(dot.x, dot.y, size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(201,168,124,${opacity})`;
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }
  animate();
}
