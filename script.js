/* =============================================
   GRAVITY BREAKS — Interactive Physics & Logic
   ============================================= */

// ──────────────────────────────────────────────
// 1. BUSINESS IDEAS DATABASE
// ──────────────────────────────────────────────

const IDEAS = {
  tech: [
    { title: "AI Resume Matchmaker", desc: "An AI that reads job listings and rewrites your resume to match each one perfectly, boosting interview chances by 3x." },
    { title: "Voice-Clone Customer Support", desc: "Let small businesses clone their founder's voice with AI to answer support calls 24/7 with a personal touch." },
    { title: "Code-Review-as-a-Service", desc: "On-demand senior-level code reviews powered by AI + human experts, delivered in under 2 hours." },
    { title: "Smart Meeting Summarizer", desc: "Record any meeting and get instant structured notes, action items, and follow-up emails generated automatically." },
    { title: "AI-Powered Logo Generator", desc: "Create professional brand identities in seconds using generative AI trained on award-winning design." },
    { title: "Predictive Inventory SaaS", desc: "Machine learning platform that predicts stock shortages for e-commerce stores before they happen." },
    { title: "No-Code AI Chatbot Builder", desc: "Drag-and-drop platform to build intelligent customer service chatbots without any coding knowledge." },
    { title: "Deepfake Detection API", desc: "B2B API that scans images and videos for deepfake manipulation, protecting media integrity." },
    { title: "AI Tutor Marketplace", desc: "Connect students with hyper-personalized AI tutors that adapt to their learning style in real-time." },
    { title: "Smart Contract Auditor", desc: "Automated blockchain smart contract auditing tool that finds vulnerabilities before deployment." },
  ],
  sustainability: [
    { title: "Carbon Offset Marketplace", desc: "A transparent platform where individuals and companies can buy verified carbon offsets from local projects." },
    { title: "Zero-Waste Subscription Box", desc: "Monthly curated box of sustainable, plastic-free household essentials delivered in compostable packaging." },
    { title: "Solar Panel Leasing App", desc: "Uber-style app that lets homeowners lease solar panels with zero upfront cost and instant savings." },
    { title: "Upcycled Fashion Platform", desc: "Marketplace exclusively for upcycled and repurposed clothing, turning waste into wearable art." },
    { title: "Food Waste Rescue Network", desc: "Connect restaurants with surplus food to shelters and discount buyers in real-time." },
    { title: "Eco-Score Browser Extension", desc: "Shows the environmental impact score of any product while you shop online." },
    { title: "Refill Station Finder", desc: "App that maps refill stations for cleaning products, toiletries, and pantry staples near you." },
    { title: "Green Building Materials Marketplace", desc: "B2B platform connecting contractors with sustainable, low-carbon building materials at competitive prices." },
    { title: "Ocean Plastic Collection DAO", desc: "Decentralized community that funds and tracks ocean plastic cleanup with blockchain transparency." },
    { title: "Composting-as-a-Service", desc: "Doorstep compost pickup service that converts food waste into soil and returns it to local farms." },
  ],
  ecommerce: [
    { title: "AI Personal Shopper", desc: "Conversational AI that learns your style and budget, then curates personalized shopping lists across stores." },
    { title: "Virtual Try-On Platform", desc: "AR-powered tool for fashion brands that lets customers try on clothes, glasses, and accessories virtually." },
    { title: "Micro-Brand Incubator", desc: "End-to-end platform that helps creators launch their own product brands in 30 days with AI-driven design." },
    { title: "Subscription Gift Exchange", desc: "Platform where users swap unwanted subscription box items with others, reducing waste." },
    { title: "Flash Sale Aggregator", desc: "Real-time feed of flash sales across all major e-commerce platforms, with smart price-drop alerts." },
    { title: "Handmade Goods Authenticator", desc: "Blockchain-backed certification for handmade products, guaranteeing authenticity to buyers." },
    { title: "Social Commerce Toolkit", desc: "All-in-one kit for influencers to sell products directly from their social media profiles." },
    { title: "Returns Resale Platform", desc: "Marketplace specifically for returned e-commerce items, giving them a second life at deep discounts." },
    { title: "AI Product Description Writer", desc: "Generate SEO-optimized product descriptions in seconds using AI trained on top-performing listings." },
    { title: "Cross-Border Dropship Optimizer", desc: "Tool that finds the most efficient shipping routes and warehouses for international dropshipping." },
  ],
  futuristic: [
    { title: "Metaverse Real Estate Agency", desc: "Buy, sell, and rent virtual properties across multiple metaverse platforms with a unified dashboard." },
    { title: "Brain-Computer Interface Games", desc: "Gaming studio creating titles controlled by thought, using next-gen neural interfaces." },
    { title: "Digital Twin Health Monitor", desc: "Create a digital twin of your body that simulates the effects of diet, exercise, and medication." },
    { title: "Space Tourism Travel Agency", desc: "Full-service travel agency for commercial space flights, including training and experiences." },
    { title: "Quantum Computing Sandbox", desc: "Cloud-based playground where developers can experiment with quantum algorithms without owning hardware." },
    { title: "Holographic Meeting Rooms", desc: "Replace video calls with volumetric holographic meetings that feel like being in the same room." },
    { title: "AI Dream Interpreter", desc: "Record your dreams via voice in the morning; AI analyzes patterns and provides psychological insights." },
    { title: "Autonomous Delivery Drones", desc: "Last-mile delivery service using AI-piloted drones for packages under 5kg, available in 15 minutes." },
    { title: "Memory Augmentation App", desc: "Wearable-connected app that records key moments of your day and helps you recall them with AI prompts." },
    { title: "Synthetic Biology Marketplace", desc: "Platform for ordering custom-designed biological components for research, agriculture, and medicine." },
  ]
};

// ──────────────────────────────────────────────
// 2. DOM REFERENCES
// ──────────────────────────────────────────────

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const canvas = $('#particleCanvas');
const ctx = canvas.getContext('2d');
const generateBtn = $('#generateBtn');
const physicsArena = $('#physicsArena');
const arenaPlaceholder = $('#arenaPlaceholder');
const categoryBtns = $$('.cat-btn');
const savedList = $('#savedList');
const emptySaved = $('#emptySaved');
const shareModal = $('#shareModal');
const modalClose = $('#modalClose');
const modalIdeaText = $('#modalIdeaText');
const shareTwitter = $('#shareTwitter');
const shareLinkedin = $('#shareLinkedin');
const shareCopy = $('#shareCopy');
const copyConfirm = $('#copyConfirm');
const toast = $('#toast');
const toastMsg = $('#toastMsg');
const menuToggle = $('#menuToggle');
const navLinks = $('.nav-links');

// ──────────────────────────────────────────────
// 3. STATE
// ──────────────────────────────────────────────

let activeCategory = 'all';
let savedIdeas = JSON.parse(localStorage.getItem('gravityBreaks_saved') || '[]');
let mouseX = 0, mouseY = 0;

// ──────────────────────────────────────────────
// 4. PARTICLE SYSTEM (Background)
// ──────────────────────────────────────────────

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.speedY = (Math.random() - 0.5) * 0.4;
    this.opacity = Math.random() * 0.5 + 0.1;
    // Color: mix of cyan and purple
    const hue = Math.random() > 0.5 ? 185 : 270;
    this.color = `hsla(${hue}, 90%, 65%, ${this.opacity})`;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Mouse repulsion
    const dx = this.x - mouseX;
    const dy = this.y - mouseY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 120) {
      const force = (120 - dist) / 120;
      this.x += (dx / dist) * force * 2;
      this.y += (dy / dist) * force * 2;
    }

    // Wrap around
    if (this.x < 0) this.x = canvas.width;
    if (this.x > canvas.width) this.x = 0;
    if (this.y < 0) this.y = canvas.height;
    if (this.y > canvas.height) this.y = 0;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

let particles = [];

function initParticles() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const count = Math.min(Math.floor((canvas.width * canvas.height) / 8000), 200);
  particles = [];
  for (let i = 0; i < count; i++) {
    particles.push(new Particle());
  }
}

function drawConnections() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(0, 240, 255, ${0.06 * (1 - dist / 100)})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  drawConnections();
  requestAnimationFrame(animateParticles);
}

// ──────────────────────────────────────────────
// 5. IDEA GENERATION
// ──────────────────────────────────────────────

function getRandomIdea(category) {
  let pool;
  if (category === 'all') {
    // Merge all categories
    pool = Object.entries(IDEAS).flatMap(([cat, ideas]) =>
      ideas.map(idea => ({ ...idea, category: cat }))
    );
  } else {
    pool = IDEAS[category].map(idea => ({ ...idea, category }));
  }
  return pool[Math.floor(Math.random() * pool.length)];
}

function createIdeaCard(idea, index) {
  const card = document.createElement('div');
  card.className = 'idea-card';
  card.style.animationDelay = `${index * 0.1}s`;

  const isSaved = savedIdeas.some(s => s.title === idea.title);

  card.innerHTML = `
    <span class="card-category ${idea.category}">${idea.category}</span>
    <h3 class="card-title">${idea.title}</h3>
    <p class="card-desc">${idea.desc}</p>
    <div class="card-actions">
      <button class="card-action-btn save-btn ${isSaved ? 'saved' : ''}" data-title="${idea.title}" data-desc="${idea.desc}" data-cat="${idea.category}">
        ${isSaved ? '⭐ Saved' : '☆ Save'}
      </button>
      <button class="card-action-btn share-btn" data-title="${idea.title}" data-desc="${idea.desc}">
        🔗 Share
      </button>
    </div>
  `;

  // Drag support
  setupDrag(card);

  return card;
}

function generateIdeas() {
  // Ripple effect on button
  generateBtn.classList.add('ripple');
  setTimeout(() => generateBtn.classList.remove('ripple'), 600);

  // Hide placeholder
  if (arenaPlaceholder) arenaPlaceholder.style.display = 'none';

  // Generate 3 new idea cards
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < 3; i++) {
    const idea = getRandomIdea(activeCategory);
    const card = createIdeaCard(idea, i);
    fragment.appendChild(card);
  }

  // Prepend new cards (newest at top)
  physicsArena.prepend(fragment);

  // Limit total cards to 12
  const allCards = physicsArena.querySelectorAll('.idea-card');
  if (allCards.length > 12) {
    for (let i = 12; i < allCards.length; i++) {
      allCards[i].style.opacity = '0';
      allCards[i].style.transform = 'translateY(40px) scale(0.9)';
      setTimeout(() => allCards[i].remove(), 300);
    }
  }
}

// ──────────────────────────────────────────────
// 6. DRAG PHYSICS
// ──────────────────────────────────────────────

function setupDrag(el) {
  let isDragging = false;
  let startX, startY, origLeft, origTop;
  let velX = 0, velY = 0;
  let lastX, lastY, lastTime;

  const onPointerDown = (e) => {
    isDragging = true;
    el.classList.add('dragging');
    const rect = el.getBoundingClientRect();
    startX = e.clientX;
    startY = e.clientY;
    origLeft = rect.left;
    origTop = rect.top;
    lastX = e.clientX;
    lastY = e.clientY;
    lastTime = Date.now();

    el.style.position = 'fixed';
    el.style.left = rect.left + 'px';
    el.style.top = rect.top + 'px';
    el.style.width = rect.width + 'px';
    el.style.zIndex = '100';
    el.style.transition = 'none';

    e.preventDefault();
  };

  const onPointerMove = (e) => {
    if (!isDragging) return;
    const now = Date.now();
    const dt = now - lastTime || 1;

    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    velX = dx / dt * 16;
    velY = dy / dt * 16;

    el.style.left = (origLeft + (e.clientX - startX)) + 'px';
    el.style.top = (origTop + (e.clientY - startY)) + 'px';

    lastX = e.clientX;
    lastY = e.clientY;
    lastTime = now;
  };

  const onPointerUp = () => {
    if (!isDragging) return;
    isDragging = false;
    el.classList.remove('dragging');

    // Apply inertia   
    animateInertia(el, velX, velY);
  };

  el.addEventListener('pointerdown', onPointerDown);
  document.addEventListener('pointermove', onPointerMove);
  document.addEventListener('pointerup', onPointerUp);
}

function animateInertia(el, velX, velY) {
  const friction = 0.92;
  const gravity = 0.5;
  const bounce = 0.6;

  function step() {
    velX *= friction;
    velY += gravity;      // gravity pulls down
    velY *= friction;

    let left = parseFloat(el.style.left) + velX;
    let top = parseFloat(el.style.top) + velY;

    // Bounce off bottom
    const maxY = window.innerHeight - el.offsetHeight;
    if (top > maxY) {
      top = maxY;
      velY *= -bounce;
    }

    // Bounce off sides
    if (left < 0) { left = 0; velX *= -bounce; }
    const maxX = window.innerWidth - el.offsetWidth;
    if (left > maxX) { left = maxX; velX *= -bounce; }

    // Bounce off top
    if (top < 0) { top = 0; velY *= -bounce; }

    el.style.left = left + 'px';
    el.style.top = top + 'px';

    if (Math.abs(velX) > 0.3 || Math.abs(velY) > 0.5) {
      requestAnimationFrame(step);
    } else {
      // Settle: return to document flow after a beat
      setTimeout(() => {
        el.style.position = '';
        el.style.left = '';
        el.style.top = '';
        el.style.width = '';
        el.style.zIndex = '';
        el.style.transition = '';
      }, 800);
    }
  }

  requestAnimationFrame(step);
}

// ──────────────────────────────────────────────
// 7. FLOATING HERO ELEMENTS (draggable)
// ──────────────────────────────────────────────

$$('.float-el').forEach(el => {
  setupDrag(el);
});

// ──────────────────────────────────────────────
// 8. SAVE & SHARE
// ──────────────────────────────────────────────

function saveIdea(title, desc, category) {
  const exists = savedIdeas.find(s => s.title === title);
  if (exists) {
    // Remove
    savedIdeas = savedIdeas.filter(s => s.title !== title);
    showToast('Idea removed from saved');
  } else {
    savedIdeas.push({ title, desc, category });
    showToast('⭐ Idea saved!');
  }
  localStorage.setItem('gravityBreaks_saved', JSON.stringify(savedIdeas));
  renderSaved();
  updateSaveButtons();
}

function renderSaved() {
  savedList.innerHTML = '';
  if (savedIdeas.length === 0) {
    savedList.innerHTML = '<p class="empty-saved">No saved ideas yet. Generate some and hit the ⭐ button!</p>';
    return;
  }
  savedIdeas.forEach((idea, i) => {
    const item = document.createElement('div');
    item.className = 'saved-item';
    item.style.animationDelay = `${i * 0.08}s`;
    item.innerHTML = `
      <div class="saved-info">
        <div class="saved-cat">${idea.category}</div>
        <div class="saved-title">${idea.title}</div>
        <div class="saved-desc">${idea.desc}</div>
      </div>
      <button class="saved-remove" data-title="${idea.title}">✕ Remove</button>
    `;
    savedList.appendChild(item);
  });
}

function updateSaveButtons() {
  $$('.save-btn').forEach(btn => {
    const title = btn.dataset.title;
    const isSaved = savedIdeas.some(s => s.title === title);
    btn.className = `card-action-btn save-btn ${isSaved ? 'saved' : ''}`;
    btn.textContent = isSaved ? '⭐ Saved' : '☆ Save';
  });
}

let currentShareIdea = '';

function openShareModal(title, desc) {
  currentShareIdea = `${title}: ${desc}`;
  modalIdeaText.textContent = currentShareIdea;
  shareModal.classList.remove('hidden');
  copyConfirm.classList.add('hidden');
}

function closeShareModal() {
  shareModal.classList.add('hidden');
}

// ──────────────────────────────────────────────
// 9. TOAST
// ──────────────────────────────────────────────

function showToast(msg) {
  toastMsg.textContent = msg;
  toast.classList.remove('hidden');
  // Force reflow for animation
  void toast.offsetWidth;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.classList.add('hidden'), 400);
  }, 2200);
}

// ──────────────────────────────────────────────
// 10. EVENT LISTENERS
// ──────────────────────────────────────────────

// Generate button
generateBtn.addEventListener('click', generateIdeas);

// Category filters
categoryBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    categoryBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeCategory = btn.dataset.category;
  });
});

// Delegate save and share clicks on arena
physicsArena.addEventListener('click', (e) => {
  const saveBtn = e.target.closest('.save-btn');
  if (saveBtn) {
    saveIdea(saveBtn.dataset.title, saveBtn.dataset.desc, saveBtn.dataset.cat);
    return;
  }
  const shareBtn = e.target.closest('.share-btn');
  if (shareBtn) {
    openShareModal(shareBtn.dataset.title, shareBtn.dataset.desc);
  }
});

// Saved list remove
savedList.addEventListener('click', (e) => {
  const removeBtn = e.target.closest('.saved-remove');
  if (removeBtn) {
    savedIdeas = savedIdeas.filter(s => s.title !== removeBtn.dataset.title);
    localStorage.setItem('gravityBreaks_saved', JSON.stringify(savedIdeas));
    renderSaved();
    updateSaveButtons();
    showToast('Idea removed');
  }
});

// Share modal
modalClose.addEventListener('click', closeShareModal);
shareModal.addEventListener('click', (e) => {
  if (e.target === shareModal) closeShareModal();
});

shareTwitter.addEventListener('click', () => {
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent('🚀 Business Idea from GravityBreaks:\n\n' + currentShareIdea)}`;
  window.open(url, '_blank', 'width=550,height=420');
});

shareLinkedin.addEventListener('click', () => {
  const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}&summary=${encodeURIComponent(currentShareIdea)}`;
  window.open(url, '_blank', 'width=550,height=420');
});

shareCopy.addEventListener('click', () => {
  navigator.clipboard.writeText('🚀 ' + currentShareIdea).then(() => {
    copyConfirm.classList.remove('hidden');
    showToast('Copied to clipboard!');
  });
});

// Mobile menu toggle
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = menuToggle.querySelectorAll('span');
  menuToggle.classList.toggle('active');
});

// Track mouse for particles
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Responsive canvas resize
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Smooth scroll for nav links
$$('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      // Update active nav
      $$('.nav-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      // Close mobile menu
      navLinks.classList.remove('open');
    }
  });
});

// Header scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const header = $('#mainHeader');
  const current = window.scrollY;
  if (current > 100) {
    header.style.background = 'rgba(10, 10, 15, 0.95)';
  } else {
    header.style.background = 'rgba(10, 10, 15, 0.85)';
  }
  lastScroll = current;
});

// ──────────────────────────────────────────────
// 11. KEYBOARD SHORTCUT
// ──────────────────────────────────────────────

document.addEventListener('keydown', (e) => {
  // Press Space bar or Enter on the page to generate
  if (e.code === 'Space' && e.target === document.body) {
    e.preventDefault();
    generateIdeas();
    generateBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  // Escape closes modal and chatbot
  if (e.code === 'Escape') {
    closeShareModal();
    const chatWindow = $('#chatbotWindow');
    if (chatWindow && !chatWindow.classList.contains('hidden')) {
      chatWindow.classList.add('hidden');
    }
  }
});

// ──────────────────────────────────────────────
// 12. CHATBOT WIDGET
// ──────────────────────────────────────────────

const chatbotToggle = $('#chatbotToggle');
const chatbotWindow = $('#chatbotWindow');
const chatbotClose = $('#chatbotClose');

if (chatbotToggle && chatbotWindow && chatbotClose) {
  chatbotToggle.addEventListener('click', () => {
    chatbotWindow.classList.toggle('hidden');
    // Swap icon between chat and close
    const icon = chatbotToggle.querySelector('.chatbot-toggle-icon');
    if (chatbotWindow.classList.contains('hidden')) {
      icon.textContent = '💬';
    } else {
      icon.textContent = '✕';
    }
  });

  chatbotClose.addEventListener('click', () => {
    chatbotWindow.classList.add('hidden');
    const icon = chatbotToggle.querySelector('.chatbot-toggle-icon');
    icon.textContent = '💬';
  });
}

// ──────────────────────────────────────────────
// 13. INIT
// ──────────────────────────────────────────────

function init() {
  initParticles();
  animateParticles();
  renderSaved();
}

init();
