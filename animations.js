// ─────────────────────────────────────────────────────────────────────────
// 1. GLOBAL UTILITIES & DEVICE CONFIGURATIONS
// ─────────────────────────────────────────────────────────────────────────
const isHoverDevice = () => window.matchMedia('(hover: hover)').matches;

// ─────────────────────────────────────────────────────────────────────────
// 2. TIMELINE SYNCHRONIZATION: IFRAME DEMO LIFECYCLE CONTROLLER
// ─────────────────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────
// 2. TIMELINE SYNCHRONIZATION: IFRAME DEMO LIFECYCLE CONTROLLER
// ─────────────────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────
// 2. TIMELINE SYNCHRONIZATION: IFRAME DEMO LIFECYCLE CONTROLLER
// ─────────────────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────
// 2. TIMELINE SYNCHRONIZATION: IFRAME DEMO LIFECYCLE CONTROLLER
// ─────────────────────────────────────────────────────────────────────────
function setupFeatureAnimations() {
  const textBlocks = document.querySelectorAll('.showcase-text-block');
  if (!textBlocks.length) return;

  const isMobile = window.innerWidth < 961;

  function sendPlay(iframe) {
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage('playDemo', '*');
    }
  }

  function sendReset(iframe) {
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage('resetDemo', '*');
    }
  }

  const observerOptions = {
    root: null,
    threshold: 0.5, // Balanced threshold for both mobile and desktop
    rootMargin: '0px'
  };

  const showcaseObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const feature = entry.target.getAttribute('data-feature');
      
      if (entry.isIntersecting) {
        // Clear active status of other blocks to ensure only one is active at a time
        document.querySelectorAll('.showcase-text-block').forEach(b => {
          if (b !== entry.target) b.classList.remove('active');
        });
        entry.target.classList.add('active');

        if (!isMobile) {
          // ── Desktop Pinned Logic ──
          const targetIframe = document.querySelector(`.glass-demo-iframes iframe[data-feature="${feature}"]`);
          const allIframes = document.querySelectorAll('.glass-demo-iframes iframe');
          
          allIframes.forEach(iframe => {
            if (iframe === targetIframe) {
              iframe.classList.add('active');
              setTimeout(() => sendPlay(iframe), 300);
            } else {
              iframe.classList.remove('active');
              sendReset(iframe);
            }
          });

          const glowIndicator = document.getElementById('showcase-glow-indicator');
          if (glowIndicator) {
            glowIndicator.className = 'glass-frame-glow'; // reset
            if (feature === 'grammar' || feature === 'translate') {
              glowIndicator.classList.add('glow-blue');
            } else if (feature === 'tone') {
              glowIndicator.classList.add('glow-violet');
            } else if (feature === 'assist') {
              glowIndicator.classList.add('glow-mixed');
            } else if (feature === 'summarize') {
              glowIndicator.classList.add('glow-gold');
            }
          }
        } else {
          // ── Mobile Standard Logic ──
          const mobileIframe = entry.target.querySelector('.mobile-only-demo-wrap iframe');
          if (mobileIframe) {
            setTimeout(() => sendPlay(mobileIframe), 300);
          }
        }

      } else {
        entry.target.classList.remove('active');

        if (isMobile) {
          const mobileIframe = entry.target.querySelector('.mobile-only-demo-wrap iframe');
          if (mobileIframe) sendReset(mobileIframe);
        }
      }
    });

    // Determine the active feature robustly after processing all changes
    const activeBlock = document.querySelector('.showcase-text-block.active');
    if (activeBlock) {
      const activeFeature = activeBlock.getAttribute('data-feature');
      const allGlows = document.querySelectorAll('.showcase-bg-glow');
      allGlows.forEach(glow => {
        if (glow.getAttribute('data-glow') === activeFeature) {
          glow.classList.add('active');
        } else {
          glow.classList.remove('active');
        }
      });
    }
  }, observerOptions);

  textBlocks.forEach(block => {
    showcaseObserver.observe(block);
    
    const iframe = isMobile 
      ? block.querySelector('.mobile-only-demo-wrap iframe')
      : document.querySelector(`.glass-demo-iframes iframe[data-feature="${block.getAttribute('data-feature')}"]`);
      
    if (iframe) {
      iframe.addEventListener('load', () => {
        if (block.classList.contains('active')) {
          sendPlay(iframe);
        }
      });
    }
  });
}
// ─────────────────────────────────────────────────────────────────────────
// 3. PREMIUM GEOMETRIC ENGINE: SPRING-MASS TYPOGRAPHIC COGNITION FLOW CANVASES
// ─────────────────────────────────────────────────────────────────────────
function setupParticleWaveCanvas() {
  const introSection = document.querySelector('.features-intro-slide');
  const canvas = document.getElementById('noetic-universe-canvas');
  if (!canvas || !introSection) return;

  const ctx = canvas.getContext('2d');
  const bubble = document.getElementById('universe-bubble');
  const headlineEl = document.getElementById('universe-headline');
  const subheadlineEl = document.getElementById('universe-subheadline');
  
  let animationFrameId;
  let isSectionActive = false;
  
  // Real layout dimensions
  let cssWidth = canvas.offsetWidth;
  let cssHeight = canvas.offsetHeight;

  const brandPalette = {
    base: '#020205',
    logoGlow: 'rgba(168, 85, 247, 0.2)',
    fix: '#3B82F6', tone: '#8B5CF6', assist: '#06B6D4', summarize: '#10B981', translate: '#F59E0B'
  };

  const toolsConfig = [
    { type: 'fix', label: 'Fixing grammar in Gmail', color: brandPalette.fix },
    { type: 'tone', label: 'Making your message friendlier', color: brandPalette.tone },
    { type: 'assist', label: 'Helping complete your thought', color: brandPalette.assist },
    { type: 'summarize', label: 'Condensing long conversations', color: brandPalette.summarize },
    { type: 'translate', label: 'Translating instantly', color: brandPalette.translate }
  ];

  const appConfigs = [
    { name: 'WhatsApp', file: 'whatsapp.svg', color: '#25D366' },
    { name: 'Gmail', file: 'gmail.svg', color: '#EA4335' },
    { name: 'Instagram', file: 'instagram.svg', color: '#E1306C' },
    { name: 'Slack', file: 'slack.svg', color: '#4A154B' },
    { name: 'LinkedIn', file: 'linkedin.svg', color: '#0077B5' },
    { name: 'Messages', file: 'messages.svg', color: '#34C759' },
    { name: 'Notion', file: 'notion.svg', color: '#FFFFFF' },
    { name: 'X', file: 'x.svg', color: '#FFFFFF' }
  ];

  let stars = [];
  let apps = [];
  let currentActiveTool = null;
  let eventTimer = 0;
  let targetAppInstance = null;
  let targetToolInstance = null;
  let environmentalHueShift = null;
  let ambientPulseWave = { radius: 0, alpha: 0, active: false, color: '#FFF' };

  const copyDeck = { headline: "Everything you need to write better.", subheadline: "Five tools. Every app. One keyboard." };
  let headlineProgress = 0;
  let subheadlineProgress = 0;

  const logoImage = new Image();
  logoImage.src = 'noetic-logo.png';

  // Squeezed multi-tier radius metrics (Downscaled by 30% to prevent edge clipping)
  appConfigs.forEach((cfg, idx) => {
    const img = new Image();
    img.src = `./assets/apps/${cfg.file}`;
    
    const orbitScale = 0.135 + (idx * 0.028); 
    const speedVal = 0.004; 
    apps.push({
      img,
      name: cfg.name,
      baseColor: cfg.color,
      a: orbitScale * 1.25, 
      b: orbitScale * 0.58,
      tilt: (-20 + (idx * 5)) * Math.PI / 180, 
      speed: speedVal,
      angle: (idx * (Math.PI * 2 / appConfigs.length)),
      size: 30, // Premium sized app icons
      x: 0, y: 0,
      state: 'orbiting',
      transProgress: 0,
      hovered: false
    });
  });

  // High-DPI Resolution Realignment (Eliminates Canvas Blurriness)
  function setRetinaDimensions() {
    cssWidth = canvas.offsetWidth;
    cssHeight = canvas.offsetHeight;
    const dpr = window.devicePixelRatio || 1;
    
    canvas.width = cssWidth * dpr;
    canvas.height = cssHeight * dpr;
    
    ctx.scale(dpr, dpr);
    
    // Smooth stellar generation tracking mapping
    stars = [];
    for (let i = 0; i < 30; i++) {
      stars.push({
        x: Math.random() * cssWidth,
        y: Math.random() * cssHeight,
        size: Math.random() * 1.3 + 0.4,
        alpha: Math.random() * 0.45 + 0.15,
        speed: Math.random() * 0.02 + 0.005,
        twinkleSpeed: Math.random() * 3.5 + 1,
        color: Math.random() > 0.8 ? (Math.random() > 0.5 ? '#A855F7' : '#007AFF') : '#FFFFFF'
      });
    }
  }
  window.addEventListener('resize', setRetinaDimensions);
  setRetinaDimensions();

  function triggerGravitationalPulse() {
    if (apps.some(a => a.state !== 'orbiting')) return;
    targetAppInstance = apps[Math.floor(Math.random() * apps.length)];
    targetToolInstance = toolsConfig[Math.floor(Math.random() * toolsConfig.length)];
    targetAppInstance.state = 'attracting';
    targetAppInstance.startX = targetAppInstance.x;
    targetAppInstance.startY = targetAppInstance.y;
    targetAppInstance.transProgress = 0;
  }

  function executePulseWave(color) {
    ambientPulseWave.radius = 25;
    ambientPulseWave.alpha = 0.9;
    ambientPulseWave.color = color;
    ambientPulseWave.active = true;
  }

  function drawNebula(cx, cy, colorHex, intensity) {
    if (!colorHex) return;
    ctx.save();
    const grad = ctx.createRadialGradient(cx, cy, 5, cx, cy, Math.min(cssWidth, cssHeight) * 0.35);
    grad.addColorStop(0, colorHex + '20');
    grad.addColorStop(0.6, colorHex + '03');
    grad.addColorStop(1, 'transparent');
    ctx.fillStyle = grad;
    ctx.globalAlpha = intensity;
    ctx.fillRect(0, 0, cssWidth, cssHeight);
    ctx.restore();
  }

  function drawFallbackLogo(ctx, cx, cy, size) {
    ctx.beginPath();
    ctx.arc(cx, cy, size / 2, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(168, 85, 247, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }



  // Unified Rendering Runtime
  function universeLoop(timestamp) {
    if (!isSectionActive) return;
    
    ctx.clearRect(0, 0, cssWidth, cssHeight);

    // Center core calculation matrices vertically
    const cx = cssWidth / 2;
    const cy = cssHeight / 2; 

    // 1. Cosmic Background Star System
    // 1. Cosmic Background Star System
    stars.forEach(star => {
      star.y -= star.speed;
      if (star.y < 0) {
        star.y = cssHeight;
        star.x = Math.random() * cssWidth;
      }
      ctx.save();
      ctx.fillStyle = star.color;
      ctx.globalAlpha = star.alpha * (0.7 + Math.sin(timestamp * 0.001 * star.twinkleSpeed) * 0.3);
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
    ctx.globalAlpha = 1.0;

    // 2. Light Nebula Fields
    drawNebula(cx, cy, '#A855F7', 0.35);
    if (environmentalHueShift) {
      drawNebula(cx, cy, environmentalHueShift.color, environmentalHueShift.intensity);
    }

    // 3. Shockwave Matrices
    if (ambientPulseWave.active) {
      ambientPulseWave.radius += 4.5;
      ambientPulseWave.alpha -= 0.02;
      if (ambientPulseWave.alpha <= 0) {
        ambientPulseWave.active = false;
      } else {
        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, ambientPulseWave.radius, 0, Math.PI * 2);
        ctx.strokeStyle = ambientPulseWave.color;
        ctx.lineWidth = 1.2;
        ctx.globalAlpha = ambientPulseWave.alpha;
        ctx.stroke();
        ctx.restore();
      }
    }

    // 4. Centerpiece Render Channel
    ctx.save();
    const breathe = Math.sin(timestamp * 0.0012) * 4;
    const logoSize = Math.min(cssWidth * 0.09, 54);
    
    ctx.shadowBlur = 30;
    ctx.shadowColor = currentActiveTool ? currentActiveTool.color : 'rgba(168, 85, 247, 0.3)';
    
    try {
      if (logoImage.complete && logoImage.naturalWidth !== 0) {
        ctx.drawImage(logoImage, cx - logoSize / 2, cy - logoSize / 2 + breathe, logoSize, logoSize);
      } else {
        drawFallbackLogo(ctx, cx, cy + breathe, logoSize);
      }
    } catch(e) {
      drawFallbackLogo(ctx, cx, cy + breathe, logoSize);
    }
    ctx.restore();

    // 5. Parametric Vector Path Calculus
    apps.forEach(app => {
      const calcA = cssWidth * app.a;
      const calcB = cssHeight * app.b;

      if (app.state === 'orbiting') {
        app.angle += app.speed;
        const rawX = calcA * Math.cos(app.angle);
        const rawY = calcB * Math.sin(app.angle);
        app.x = cx + (rawX * Math.cos(app.tilt) - rawY * Math.sin(app.tilt));
        app.y = cy + (rawX * Math.sin(app.tilt) + rawY * Math.cos(app.tilt));
        
        // Render crisp geometry guides with gradient tracks
        ctx.save();
        const orbitGrad = ctx.createLinearGradient(cx - calcA, cy - calcB, cx + calcA, cy + calcB);
        orbitGrad.addColorStop(0, 'rgba(255, 255, 255, 0.01)');
        orbitGrad.addColorStop(0.5, app.baseColor + '22');
        orbitGrad.addColorStop(1, 'rgba(255, 255, 255, 0.01)');
        ctx.strokeStyle = orbitGrad;
        ctx.lineWidth = 1;
        
        ctx.beginPath();
        for (let t = 0; t < Math.PI * 2; t += 0.08) {
          const tx = calcA * Math.cos(t);
          const ty = calcB * Math.sin(t);
          ctx.lineTo(
            cx + (tx * Math.cos(app.tilt) - ty * Math.sin(app.tilt)),
            cy + (tx * Math.sin(app.tilt) + ty * Math.cos(app.tilt))
          );
        }
        ctx.closePath();
        ctx.stroke();
        ctx.restore();

      } else if (app.state === 'attracting') {
        app.transProgress += 0.03;
        const t = Math.min(app.transProgress, 1.0);
        const ease = t * t * (3 - 2 * t);
        
        app.x = app.startX + (cx - app.startX) * ease;
        app.y = app.startY + (cy - app.startY) * ease;

        ctx.beginPath();
        ctx.moveTo(app.x, app.y);
        ctx.lineTo(cx, cy);
        ctx.strokeStyle = app.baseColor + '22';
        ctx.lineWidth = 1;
        ctx.stroke();

        if (t >= 1.0) {
          app.state = 'processing';
          currentActiveTool = targetToolInstance;
          environmentalHueShift = { color: targetToolInstance.color, intensity: 0.7 };
          executePulseWave(targetToolInstance.color);
          
          document.querySelectorAll('.tool-constellation').forEach(el => {
            if (el.getAttribute('data-tool') === targetToolInstance.type) el.classList.add('active');
          });

          if (bubble) {
            bubble.textContent = targetToolInstance.label;
            bubble.style.left = `${cx}px`;
            bubble.style.top = `${cy - logoSize / 2}px`;
            bubble.classList.add('visible');
          }

          setTimeout(() => {
            app.state = 'returning';
            app.transProgress = 0;
            if (bubble) bubble.classList.remove('visible');
            document.querySelectorAll('.tool-constellation').forEach(el => el.classList.remove('active'));
            currentActiveTool = null;
            environmentalHueShift = { color: targetToolInstance.color, intensity: 0.0 };
          }, 1500);
        }

      } else if (app.state === 'returning') {
        app.transProgress += 0.025;
        const t = Math.min(app.transProgress, 1.0);
        const ease = t * t * (3 - 2 * t);

        const rawX = calcA * Math.cos(app.angle);
        const rawY = calcB * Math.sin(app.angle);
        const targX = cx + (rawX * Math.cos(app.tilt) - rawY * Math.sin(app.tilt));
        const targY = cy + (rawX * Math.sin(app.tilt) + rawY * Math.cos(app.tilt));

        app.x = cx + (targX - cx) * ease;
        app.y = cy + (targY - cy) * ease;

        if (t >= 1.0) app.state = 'orbiting';
      }

      // 6. Alpha-Blended Graphic Blitting Pipeline
      ctx.save();
      
      // Calculate 3D perspective scale based on position (depth)
      const depthRatio = app.state === 'orbiting' ? Math.sin(app.angle) : 0;
      const zScale = 0.75 + (depthRatio * 0.25); // Range: 0.5 to 1.0
      const currentSize = app.size * zScale;
      const currentOpacity = 0.725 + (depthRatio * 0.275); // Range: 0.45 to 1.0
      
      ctx.globalAlpha = app.state === 'orbiting' ? currentOpacity : 1.0;
      
      // Render soft canvas dropshadow offsets beneath active orbiting app logos
      ctx.shadowColor = 'rgba(0, 0, 0, 0.45)';
      ctx.shadowBlur = 6;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 5 * zScale;
      
      if (app.hovered || app.state === 'processing') {
        ctx.shadowBlur = 15;
        ctx.shadowColor = app.baseColor;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 2;
      }
      
      try {
        ctx.drawImage(app.img, app.x - currentSize / 2, app.y - currentSize / 2, currentSize, currentSize);
      } catch(e) {
        ctx.beginPath();
        ctx.arc(app.x, app.y, currentSize / 2 - 2, 0, Math.PI * 2);
        ctx.fillStyle = app.baseColor;
        ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,0.1)';
        ctx.stroke();
      }
      ctx.restore();
    });

    if (environmentalHueShift && environmentalHueShift.intensity > 0) {
      environmentalHueShift.intensity -= 0.008;
    }

    animationFrameId = requestAnimationFrame(universeLoop);
  }

  const universeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      isSectionActive = entry.isIntersecting;
      if (isSectionActive) {
        animationFrameId = requestAnimationFrame(universeLoop);
      } else {
        cancelAnimationFrame(animationFrameId);
      }
    });
  }, { threshold: 0.1 });
  universeObserver.observe(introSection);

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    apps.forEach(app => {
      app.hovered = (Math.hypot(app.x - mx, app.y - my) < app.size);
    });
  });
}
// ─────────────────────────────────────────────────────────────────────────
// 4. ORIGINAL SYSTEM CONTROLLERS PRESERVED & STABILIZED
// ─────────────────────────────────────────────────────────────────────────
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -100px 0px' };
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
}, observerOptions);

function setupScrollReveal() {
  document.querySelectorAll('.reveal, .reveal-group').forEach(el => revealObserver.observe(el));
}

function setupTiltCards() {
  if (!isHoverDevice()) return;
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const angleX = ((e.clientY - rect.top) - (rect.height / 2)) / (rect.height / 2) * 10;
      const angleY = ((rect.width / 2) - (e.clientX - rect.left)) / (rect.width / 2) * 10;
      card.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg)`;
    });
    card.addEventListener('mouseleave', () => card.style.transform = 'rotateX(0) rotateY(0)');
  });
}

function setupNavbarScroll() {
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) nav.classList.add('scrolled'); else nav.classList.remove('scrolled');
  }, { passive: true });
}

function setupAccordion() {
  document.querySelectorAll('.accordion-item').forEach(item => {
    const header = item.querySelector('.accordion-header');
    const content = item.querySelector('.accordion-content');
    header.addEventListener('click', () => {
      document.querySelectorAll('.accordion-item').forEach(other => {
        if (other !== item && other.classList.contains('open')) {
          other.classList.remove('open');
          other.querySelector('.accordion-content').style.maxHeight = '0';
        }
      });
      item.classList.toggle('open');
      content.style.maxHeight = item.classList.contains('open') ? content.scrollHeight + 'px' : '0';
    });
  });
}

function setupHamburgerMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navMobile = document.querySelector('.nav-mobile');
  if (!hamburger) return;
  hamburger.addEventListener('click', () => { hamburger.classList.toggle('active'); navMobile.classList.toggle('open'); });
  document.querySelectorAll('.nav-mobile a').forEach(l => l.addEventListener('click', () => { hamburger.classList.remove('active'); navMobile.classList.remove('open'); }));
}

function setupOrbParallax() {
  const hero = document.querySelector('.section-hero');
  if (!hero) return;
  hero.addEventListener('mousemove', (e) => {
    if (!isHoverDevice()) return;
    const r = hero.getBoundingClientRect();
    const distX = (e.clientX - r.left - (r.width / 2)) / 20;
    const distY = (e.clientY - r.top - (r.height / 2)) / 20;
    hero.querySelectorAll('.orb').forEach((orb, idx) => {
      orb.style.transform = `translate(${distX * ((idx + 1) * 0.5)}px, ${distY * ((idx + 1) * 0.5)}px)`;
    });
  });
}

function setupPricingHover() {
  if (!isHoverDevice()) return;
  document.querySelectorAll('.pricing-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', (((e.clientX - r.left) / r.width) * 100) + '%');
      card.style.setProperty('--my', (((e.clientY - r.top) / r.height) * 100) + '%');
    });
  });
}

// Global Core Integration Map for Deep Snapping Target Jumps
function setupSnapDeepLinking() {
  document.querySelectorAll('a[href*="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      const hashIndex = href.indexOf('#');
      if (hashIndex === -1) return;
      
      const targetId = href.substring(hashIndex);
      if (targetId === '#') return;
      
      const path = href.substring(0, hashIndex);
      const isHomepage = path === '' || path === '/' || path === '/index.html';
      
      // Normalize pathname
      let currentPath = window.location.pathname;
      if (currentPath.endsWith('/')) {
        currentPath = currentPath + 'index.html';
      }
      const isCurrentlyHomepage = currentPath === '/index.html' || currentPath === '/' || currentPath === '';
      
      if (isHomepage && isCurrentlyHomepage) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
        }
      }
    });
  });
}

// Releases scroll snapping dynamically when scrolling past the pinned features showcase
function setupScrollSnapRelease() {
  const showcase = document.getElementById('features-showcase');
  if (!showcase) return;

  const html = document.documentElement;

  const handleScroll = () => {
    if (window.innerWidth < 961) {
      html.classList.remove('no-snap');
      return;
    }

    const rect = showcase.getBoundingClientRect();
    
    // Once the bottom of the showcase hits the bottom of the viewport (or scrolls past it),
    // disable snapping to allow continuous scrolling down.
    if (rect.bottom <= window.innerHeight + 10) {
      html.classList.add('no-snap');
    } else {
      html.classList.remove('no-snap');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', handleScroll, { passive: true });
  handleScroll();
}

// ─────────────────────────────────────────────────────────────────────────
// 5. WORD SWAP CYCLE
// ─────────────────────────────────────────────────────────────────────────
function startWordSwap() {
  const swapSpan = document.getElementById('word-swap');
  if (!swapSpan) return;

  // Correct apps: Instagram, Gmail, WhatsApp, LinkedIn, Messages
  const appAssets = [
    'assets/apps/instagram.svg',
    'assets/apps/gmail.svg',
    'assets/apps/whatsapp.svg',
    'assets/apps/linkedin.svg',
    'assets/apps/messages.svg'
  ];

  // Preload all icons immediately
  appAssets.forEach(src => {
    const img = new Image();
    img.src = src;
  });

  // Cycle: app. → icon1 → icon2 → ... → icon5 → app. → repeat
  let currentIdx = 0; // 0 = "app.", 1-5 = icons
  const totalStates = appAssets.length + 1; // 6 states

  function runSwapCycle() {
    swapSpan.style.opacity = '0';
    swapSpan.style.transform = 'translateY(-8px)';
    swapSpan.style.filter = 'blur(4px)';

    setTimeout(() => {
      currentIdx = (currentIdx + 1) % totalStates;

      if (currentIdx === 0) {
        swapSpan.innerHTML = 'app.';
      } else {
        swapSpan.innerHTML = `<img src="${appAssets[currentIdx - 1]}" alt="" class="swap-icon">`;
      }

      swapSpan.style.opacity = '1';
      swapSpan.style.transform = 'translateY(0)';
      swapSpan.style.filter = 'blur(0)';

      // app. (idx 0) stays visible for 1s, icons stay visible for 1.3s
      const nextDelay = (currentIdx === 0) ? 1000 : 1300;
      setTimeout(runSwapCycle, nextDelay);
    }, 200);
  }

  // Initial wait of 1 second on page load before starting the cycle
  setTimeout(runSwapCycle, 1000);
}

// ─────────────────────────────────────────────────────────────────────────
// 5.5. PLAN SELECTION ENGINE
// ─────────────────────────────────────────────────────────────────────────
function selectPlan(plan) {
  const buttons = document.querySelectorAll('.ios-segment-btn');
  buttons.forEach(btn => {
    if (btn.getAttribute('data-plan') === plan) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  const displayPrice = document.getElementById('display-price');
  const displayStrikePrice = document.getElementById('display-strike-price');
  const displayPeriod = document.getElementById('display-period');
  const displaySavings = document.getElementById('display-savings');
  const planTag = document.getElementById('plan-tag');

  if (!displayPrice || !displayPeriod || !displaySavings || !planTag) return;

  if (plan === 'weekly') {
    displayPrice.textContent = '₹49';
    if (displayStrikePrice) {
      displayStrikePrice.style.display = 'none';
    }
    displayPeriod.textContent = '/ week';
    displaySavings.textContent = 'Flexible weekly billing';
    planTag.textContent = 'Basic';
    planTag.style.background = 'rgba(0,122,255,0.15)';
    planTag.style.color = 'var(--blue)';
    planTag.style.borderColor = 'rgba(0,122,255,0.3)';
  } else if (plan === 'monthly') {
    displayPrice.textContent = '₹99';
    if (displayStrikePrice) {
      displayStrikePrice.textContent = '₹200';
      displayStrikePrice.style.display = 'inline-block';
    }
    displayPeriod.textContent = '/ month';
    displaySavings.textContent = 'Save 50% compared to weekly';
    planTag.textContent = 'Most Popular';
    planTag.style.background = 'rgba(255,176,32,0.15)';
    planTag.style.color = 'var(--gold)';
    planTag.style.borderColor = 'rgba(255,176,32,0.3)';
  } else if (plan === 'yearly') {
    displayPrice.textContent = '₹999';
    if (displayStrikePrice) {
      displayStrikePrice.textContent = '₹1,188';
      displayStrikePrice.style.display = 'inline-block';
    }
    displayPeriod.textContent = '/year';
    displaySavings.textContent = 'Save 16% compared to monthly';
    planTag.textContent = 'Best Value';
    planTag.style.background = 'rgba(139, 92, 246, 0.15)';
    planTag.style.color = 'var(--violet)';
    planTag.style.borderColor = 'rgba(139, 92, 246, 0.3)';
  }
}

function setupDropdownToggles() {
  document.querySelectorAll('.nav-dropdown-toggle').forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const wrapper = toggle.closest('.nav-dropdown-wrapper');
      if (wrapper) {
        wrapper.classList.toggle('active');
        document.querySelectorAll('.nav-dropdown-wrapper').forEach(w => {
          if (w !== wrapper) w.classList.remove('active');
        });
      }
    });
  });

  document.addEventListener('click', () => {
    document.querySelectorAll('.nav-dropdown-wrapper').forEach(w => {
      w.classList.remove('active');
    });
  });
}

// ─────────────────────────────────────────────────────────────────────────
// 6. RUNTIME DOCUMENT INIT INITIALIZER
// ─────────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Force browser to start from the top of the page on refresh
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);

  setupScrollReveal();
  setupTiltCards();
  setupNavbarScroll();
  setupAccordion();
  setupHamburgerMenu();
  setupDropdownToggles();
  setupOrbParallax();
  setupPricingHover();
  
  // Launch Premium Core Operations Engines
  setupFeatureAnimations();
  setupParticleWaveCanvas();
  setupSnapDeepLinking();
  setupScrollSnapRelease();
  
  // Launch word swap cycle
  startWordSwap();

  // Handle deep links from subpages on load
  if (window.location.hash) {
    const hash = window.location.hash;
    setTimeout(() => {
      const targetElement = document.querySelector(hash);
      if (targetElement) {
        targetElement.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }
    }, 400);
  }
});