// Smooth scroll and navbar active state
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section');

function onScroll() {
  let scrollPos = window.scrollY + 120;
  sections.forEach((section) => {
    if (
      scrollPos >= section.offsetTop &&
      scrollPos < section.offsetTop + section.offsetHeight
    ) {
      navLinks.forEach((link) => link.classList.remove('active'));
      const activeLink = document.querySelector(`.nav-links a[href="#${section.id}"]`);
      if (activeLink) activeLink.classList.add('active');
    }
  });
}
window.addEventListener('scroll', onScroll);

// Initialize AOS animations
AOS.init({
  duration: 900,
  once: true,
  offset: 80
});

// Mobile nav (optional: add hamburger if needed)

// --- GSAP 3D Hero Image Animation ---
if (window.innerWidth > 600) {
  const heroImageContainer = document.querySelector('.hero-image-container');
  if (heroImageContainer) {
    heroImageContainer.addEventListener('mousemove', (e) => {
      const rect = heroImageContainer.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(heroImageContainer, {
        rotationY: x / 12,
        rotationX: -y / 16,
        transformPerspective: 600,
        transformOrigin: 'center',
        duration: 0.5,
        ease: 'power2.out',
      });
    });
    heroImageContainer.addEventListener('mouseleave', () => {
      gsap.to(heroImageContainer, {
        rotationY: 0,
        rotationX: 0,
        duration: 0.7,
        ease: 'power2.out',
      });
    });
  }
}

// --- Magnetic Button Effect ---
document.querySelectorAll('.hero-buttons .btn').forEach((btn) => {
  btn.addEventListener('mousemove', function (e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(this, {
      x: x * 0.18,
      y: y * 0.18,
      scale: 1.07,
      duration: 0.3,
      ease: 'power2.out',
    });
  });
  btn.addEventListener('mouseleave', function () {
    gsap.to(this, { x: 0, y: 0, scale: 1, duration: 0.4, ease: 'power2.out' });
  });
});

// Language Switcher for Professional Details
const langBadges = document.querySelectorAll('.lang-badge');
const proInfos = {
  en: document.getElementById('pro-info-en'),
  te: document.getElementById('pro-info-te'),
  hi: document.getElementById('pro-info-hi'),
};
langBadges.forEach(badge => {
  badge.addEventListener('click', function() {
    langBadges.forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    const lang = this.getAttribute('data-lang');
    Object.keys(proInfos).forEach(key => {
      proInfos[key].style.display = (key === lang) ? 'block' : 'none';
      if (key === lang) {
        gsap.fromTo(proInfos[key], {opacity: 0, x: 60}, {opacity: 1, x: 0, duration: 0.7, ease: 'power2.out'});
      }
    });
  });
});
// Set English as default active
if (langBadges.length) langBadges[0].classList.add('active');

// --- Pro Contact Section Animations ---
document.addEventListener('DOMContentLoaded', function() {
  // GSAP entrance for contact card
  if (window.gsap) {
    gsap.set('#contact3d', {opacity: 0, y: 80, scale: 0.95, filter: 'blur(16px)'});
    gsap.to('#contact3d', {opacity: 1, y: 0, scale: 1, filter: 'blur(0)', duration: 1.2, delay: 0.3, ease: 'power4.out',
      onStart: function() {
        // Shockwave effect
        const shock = document.getElementById('contactShockwave');
        if (shock) {
          shock.style.width = '0px';
          shock.style.height = '0px';
          shock.style.opacity = '0.7';
          gsap.to(shock, {width: '600px', height: '600px', opacity: 0, duration: 1.1, ease: 'expo.out',
            onComplete: function() {
              shock.style.width = '0px';
              shock.style.height = '0px';
            }
          });
        }
      }
    });
    // 3D tilt effect
    const card = document.getElementById('contact3d');
    if (card) {
      card.addEventListener('mousemove', function(e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(card, {
          rotationY: x / 18,
          rotationX: -y / 18,
          transformPerspective: 900,
          transformOrigin: 'center',
          duration: 0.5,
          ease: 'power2.out',
        });
      });
      card.addEventListener('mouseleave', function() {
        gsap.to(card, {rotationY: 0, rotationX: 0, duration: 0.7, ease: 'power2.out'});
      });
    }
  }
});

// --- Ultra Pro Professional Section Animations ---
document.addEventListener('DOMContentLoaded', function() {
  // GSAP entrance for professional card
  if (window.gsap) {
    gsap.set('#pro3d', {opacity: 0, y: 120, scale: 0.92, filter: 'blur(24px)'});
    gsap.to('#pro3d', {opacity: 1, y: 0, scale: 1, filter: 'blur(0)', duration: 1.5, delay: 0.2, ease: 'power4.out',
      onStart: function() {
        // Avatar glow burst
        const avatarGlow = document.getElementById('proAvatarGlow');
        if (avatarGlow) {
          gsap.fromTo(avatarGlow, {opacity: 0, scale: 0.5}, {opacity: 1, scale: 1.2, duration: 0.7, ease: 'expo.out',
            yoyo: true, repeat: 1, repeatDelay: 0.2,
            onComplete: function() {
              gsap.to(avatarGlow, {scale: 1, duration: 0.3, ease: 'expo.in'});
            }
          });
        }
      }
    });
    // 3D tilt effect for pro card
    const proCard = document.getElementById('pro3d');
    if (proCard) {
      proCard.addEventListener('mousemove', function(e) {
        const rect = proCard.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(proCard, {
          rotationY: x / 16,
          rotationX: -y / 16,
          transformPerspective: 1200,
          transformOrigin: 'center',
          duration: 0.5,
          ease: 'power2.out',
        });
      });
      proCard.addEventListener('mouseleave', function() {
        gsap.to(proCard, {rotationY: 0, rotationX: 0, duration: 0.7, ease: 'power2.out'});
      });
    }
    // Language switcher shockwave
    const langBadges = document.querySelectorAll('.pro-lang-switcher-animated .lang-badge');
    const proLangShockwave = document.getElementById('proLangShockwave');
    langBadges.forEach(badge => {
      badge.addEventListener('click', function() {
        if (proLangShockwave) {
          proLangShockwave.style.width = '0px';
          proLangShockwave.style.height = '0px';
          proLangShockwave.style.opacity = '0.7';
          gsap.to(proLangShockwave, {width: '400px', height: '400px', opacity: 0, duration: 0.7, ease: 'expo.out',
            onComplete: function() {
              proLangShockwave.style.width = '0px';
              proLangShockwave.style.height = '0px';
            }
          });
        }
      });
    });
  }
});

// --- Professional Certificates & Achievements Section Animations ---
document.addEventListener('DOMContentLoaded', function() {
  // Subtle fade-in/slide-up for certificates section and cards
  gsap.from('.cert-title-professional', {opacity: 0, y: 40, filter: 'blur(8px)', duration: 0.8, ease: 'power2.out'});
  gsap.from('.certificate-card-professional', {
    opacity: 0,
    y: 60,
    filter: 'blur(12px)',
    duration: 1,
    stagger: 0.15,
    ease: 'power2.out',
    delay: 0.2
  });
});

// --- Ultra Unique Certificates & Achievements Section Animations ---
document.addEventListener('DOMContentLoaded', function() {
  // 3D Carousel logic
  const certCards = Array.from(document.querySelectorAll('.certificate-card-3d'));
  const grid = document.querySelector('.certificates-grid-3d');
  const leftBtn = document.getElementById('certNavLeft');
  const rightBtn = document.getElementById('certNavRight');
  let activeIndex = 0;
  function updateCarousel(idx) {
    activeIndex = idx;
    certCards.forEach((card, i) => {
      card.classList.remove('active');
      let offset = i - activeIndex;
      let z = -Math.abs(offset) * 80;
      let x = offset * 380;
      let rY = offset * -35;
      gsap.to(card, {
        x: x,
        z: z,
        rotationY: rY,
        scale: i === activeIndex ? 1.12 : 0.92,
        opacity: i === activeIndex ? 1 : 0.7,
        filter: i === activeIndex ? 'blur(0) brightness(1)' : 'blur(1.5px) brightness(0.8)',
        duration: 0.8,
        ease: 'expo.inOut',
      });
      if (i === activeIndex) card.classList.add('active');
    });
  }
  updateCarousel(activeIndex);
  leftBtn.addEventListener('click', () => {
    updateCarousel((activeIndex - 1 + certCards.length) % certCards.length);
  });
  rightBtn.addEventListener('click', () => {
    updateCarousel((activeIndex + 1) % certCards.length);
  });
  // Confetti/particle burst on click/hover
  certCards.forEach((card, i) => {
    const canvas = card.querySelector('.cert-confetti');
    function burstConfetti() {
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const w = canvas.width = card.offsetWidth;
      const h = canvas.height = card.offsetHeight;
      let particles = [];
      for (let j = 0; j < 32; j++) {
        particles.push({
          x: w/2, y: h/2,
          r: Math.random() * 8 + 4,
          a: Math.random() * Math.PI * 2,
          vx: Math.cos(Math.random() * Math.PI * 2) * (Math.random() * 6 + 2),
          vy: Math.sin(Math.random() * Math.PI * 2) * (Math.random() * 6 + 2),
          color: `hsl(${Math.random()*360},100%,60%)`,
          alpha: 1
        });
      }
      let frame = 0;
      function draw() {
        ctx.clearRect(0,0,w,h);
        particles.forEach(p => {
          ctx.globalAlpha = p.alpha;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
          ctx.fillStyle = p.color;
          ctx.fill();
        });
      }
      function update() {
        frame++;
        particles.forEach(p => {
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.96;
          p.vy *= 0.96;
          p.alpha -= 0.018;
        });
        particles = particles.filter(p => p.alpha > 0);
      }
      function animate() {
        if (particles.length > 0) {
          update();
          draw();
          requestAnimationFrame(animate);
        } else {
          ctx.clearRect(0,0,w,h);
        }
      }
      animate();
    }
    card.addEventListener('click', burstConfetti);
    card.addEventListener('mouseenter', burstConfetti);
  });
  // GSAP entrance ripple
  gsap.from('.cert-title-animated', {opacity: 0, y: 60, filter: 'blur(12px)', duration: 1, ease: 'expo.out'});
  gsap.from('.cert-carousel-3d', {scale: 0.8, opacity: 0, filter: 'blur(24px)', duration: 1.2, delay: 0.2, ease: 'expo.out'});
});

// Remove all code related to theme toggling, theme icons, and day/night switching. Keep only original animation and floating code for the night theme. 

document.addEventListener('DOMContentLoaded', function () {
  if (window.particlesJS) {
    particlesJS('particles-js', {
      particles: {
        number: { value: 60, density: { enable: true, value_area: 800 } },
        color: { value: '#00ADB5' },
        shape: { type: 'circle' },
        opacity: { value: 0.3, random: true },
        size: { value: 4, random: true },
        line_linked: { enable: true, distance: 150, color: '#00ADB5', opacity: 0.2, width: 1 },
        move: { enable: true, speed: 2, direction: 'none', random: false, straight: false, out_mode: 'out' }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: { enable: true, mode: 'repulse' },
          onclick: { enable: true, mode: 'push' },
          resize: true
        },
        modes: {
          repulse: { distance: 80, duration: 0.4 },
          push: { particles_nb: 4 }
        }
      },
      retina_detect: true
    });
  }
}); 