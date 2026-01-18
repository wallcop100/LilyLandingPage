/* ================= IMAGE LIST ================= */
const imageList = [
  { src: "waterfallimages/band.png",        weight: 1 },
  { src: "waterfallimages/bankcard.png",    weight: 1 },
  { src: "waterfallimages/button.png",      weight: 1 },
  { src: "waterfallimages/coin 1.png",      weight: 1 },
  { src: "waterfallimages/coin2.png",       weight: 1 },
  { src: "waterfallimages/cream.png",       weight: 1 },
  { src: "waterfallimages/earring.png",     weight: 1 },
  { src: "waterfallimages/greeen1.png",     weight: 1 },
  { src: "waterfallimages/gum.png",         weight: 1 },
  { src: "waterfallimages/ID.png",          weight: 1 },
  { src: "waterfallimages/keys.png",        weight: 1 },
  { src: "waterfallimages/lipbalm.png",     weight: 1 },
  { src: "waterfallimages/lipgloss.png",    weight: 1 },
  { src: "waterfallimages/money(3).png",    weight: 1 },
  { src: "waterfallimages/pencil.png",      weight: 1 },
  { src: "waterfallimages/photo.png",       weight: 1 },
  { src: "waterfallimages/pill.png",        weight: 1 },
  { src: "waterfallimages/pills.png",       weight: 1 },
  { src: "waterfallimages/pin.png",         weight: 1 },
  { src: "waterfallimages/ring.png",        weight: 1 },
  { src: "waterfallimages/scissors.png",    weight: 1 },
  { src: "waterfallimages/trainticket.png", weight: 1 },
  { src: "waterfallimages/banana.png",      weight: 0.3 },
  { src: "waterfallimages/badge.png",       weight: 0.3 },
  { src: "waterfallimages/paperclip.png",   weight: 1 }
];

// Preload images
imageList.forEach(i => {
  const img = new Image();
  img.src = i.src;
  i.img = img;
});

/* ================= PANEL TOGGLE ================= */
document.getElementById("tab").onclick = () => {
  document.getElementById("panel").classList.toggle("open");
};

/* ================= CANVAS ================= */
const centerImage = new Image();
centerImage.src = "background(1).png";

// Background canvas (behind text)
const canvas = document.getElementById("canvas-bg");
const ctx = canvas.getContext("2d");

// Foreground canvas (above text)
const canvasFg = document.getElementById("canvas-fg");
const ctxFg = canvasFg.getContext("2d");

/* ================= FABRIC CACHE ================= */
const fabricCanvas = document.createElement("canvas");
const fabricCtx = fabricCanvas.getContext("2d");

function buildFabric() {
  fabricCanvas.width = canvas.width;
  fabricCanvas.height = canvas.height;

  fabricCtx.fillStyle = "#ffffff";
  fabricCtx.fillRect(0, 0, fabricCanvas.width, fabricCanvas.height);

  fabricCtx.strokeStyle = "rgba(180,170,160,0.8)";
  fabricCtx.lineWidth = 0.3;

  const size = 8;
  for (let x = 0; x < fabricCanvas.width; x += size) {
    for (let y = 0; y < fabricCanvas.height; y += size) {
      fabricCtx.beginPath();
      fabricCtx.moveTo(x + size * 0.25, y + size / 2);
      fabricCtx.lineTo(x + size * 0.75, y + size / 2);
      fabricCtx.moveTo(x + size / 2, y + size * 0.25);
      fabricCtx.lineTo(x + size / 2, y + size * 0.75);
      fabricCtx.stroke();
    }
  }
}

/* ================= RESIZE ================= */
function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvasFg.width = window.innerWidth;
  canvasFg.height = window.innerHeight;
  buildFabric();
}
window.addEventListener("resize", resize);
resize();

/* ================= IMAGE PICKER ================= */
let imageIndex = 0;

function nextImage() {
  for (let i = 0; i < imageList.length; i++) {
    const item = imageList[imageIndex];
    imageIndex = (imageIndex + 1) % imageList.length;
    if (Math.random() <= item.weight) {
      return item.img;
    }
  }
  return imageList[0].img;
}

/* ================= UTILS ================= */
function rand(min, max) {
  return Math.random() * (max - min) + min;
}

/* ================= CONTROLS ================= */
const controls = {
  count: document.getElementById("count"),
  speed: document.getElementById("speed"),
  scale: document.getElementById("scale"),
  rotation: document.getElementById("rotation"),
  fadeSpeed: document.getElementById("fadeSpeed")
};

const thumbs = {
  count: document.getElementById("count-thumb"),
  speed: document.getElementById("speed-thumb"),
  scale: document.getElementById("scale-thumb"),
  rotation: document.getElementById("rotation-thumb"),
  fadeSpeed: document.getElementById("fade-thumb")
};

// Update thumb positions
function updateThumbPosition(slider, thumb) {
  const min = parseFloat(slider.min);
  const max = parseFloat(slider.max);
  const val = parseFloat(slider.value);
  const percent = (val - min) / (max - min);
  const thumbWidth = 40; // Width of thumb image
  const trackWidth = slider.offsetWidth;
  const position = percent * (trackWidth - thumbWidth);
  thumb.style.left = position + 'px';
}

// Update value displays and thumb positions
function updateDisplays() {
  document.getElementById("count-val").textContent = controls.count.value;
  document.getElementById("speed-val").textContent = Number(controls.speed.value).toFixed(1);
  document.getElementById("scale-val").textContent = Number(controls.scale.value).toFixed(2);
  document.getElementById("rot-val").textContent = Number(controls.rotation.value).toFixed(3);
  document.getElementById("fade-val").textContent = Number(controls.fadeSpeed.value).toFixed(2);
  
  // Update thumb positions
  updateThumbPosition(controls.count, thumbs.count);
  updateThumbPosition(controls.speed, thumbs.speed);
  updateThumbPosition(controls.scale, thumbs.scale);
  updateThumbPosition(controls.rotation, thumbs.rotation);
  updateThumbPosition(controls.fadeSpeed, thumbs.fadeSpeed);
}

controls.count.oninput = updateDisplays;
controls.speed.oninput = updateDisplays;
controls.scale.oninput = updateDisplays;
controls.rotation.oninput = updateDisplays;
controls.fadeSpeed.oninput = updateDisplays;

// Initialize thumb positions on load
window.addEventListener('load', updateDisplays);
updateDisplays();

/* ================= RESET BUTTON ================= */
const defaults = {
  count: 25,
  speed: 2,
  scale: 0.4,
  rotation: 0.005,
  fadeSpeed: 0.02
};

document.getElementById("resetBtn").onclick = () => {
  controls.count.value = defaults.count;
  controls.speed.value = defaults.speed;
  controls.scale.value = defaults.scale;
  controls.rotation.value = defaults.rotation;
  controls.fadeSpeed.value = defaults.fadeSpeed;
  
  updateDisplays();
  syncParticles();
  
  // Reset all existing particles
  particles.forEach((p, index) => {
    Object.assign(p, createParticle());
  });
};

/* ================= PARTICLES ================= */
const particles = [];

function createParticle() {
  const img = nextImage();
  return {
    img,
    x: rand(-100, canvas.width + 100),
    y: -rand(50, 200),
    speed: rand(0.4, Number(controls.speed.value)),
    scale: rand(0.15, Number(controls.scale.value)),
    alpha: 0,
    fadeSpeed: Number(controls.fadeSpeed.value),
    rotation: rand(0, Math.PI * 2),
    rotationSpeed: rand(-Number(controls.rotation.value), Number(controls.rotation.value)),
    layer: Math.random() > 0.5 ? 'fg' : 'bg' // Randomly assign to foreground or background
  };
}

function syncParticles() {
  while (particles.length < controls.count.value) {
    particles.push(createParticle());
  }
  particles.length = controls.count.value;
}

syncParticles();
controls.count.oninput = () => {
  syncParticles();
  updateDisplays();
};

/* ================= ANIMATION ================= */
function animate() {
  // Clear both canvases
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctxFg.clearRect(0, 0, canvasFg.width, canvasFg.height);

  // Draw fabric on background canvas only
  ctx.drawImage(fabricCanvas, 0, 0);

  // Draw center image on background canvas only
  if (centerImage.complete) {
    const scale = Math.min(canvas.width, canvas.height) / 2000;
    const w = centerImage.naturalWidth * scale;
    const h = centerImage.naturalHeight * scale;

    ctx.globalAlpha = 0;
    ctx.drawImage(
      centerImage,
      (canvas.width - w) / 2,
      (canvas.height - h) / 2,
      w,
      h
    );
    ctx.globalAlpha = 1;
  }

  // Draw particles on their respective layers
  particles.forEach(p => {
    if (!p.img.complete) return;

    p.alpha = Math.min(1, p.alpha + p.fadeSpeed);

    const w = p.img.naturalWidth * p.scale;
    const h = p.img.naturalHeight * p.scale;

    // Choose the correct context based on particle layer
    const context = p.layer === 'fg' ? ctxFg : ctx;

    context.save();
    context.translate(p.x + w / 2, p.y + h / 2);
    context.rotate(p.rotation);
    context.globalAlpha = p.alpha;
    context.drawImage(p.img, -w / 2, -h / 2, w, h);
    context.restore();

    p.y += p.speed;
    p.rotation += p.rotationSpeed;

    if (p.y > canvas.height + h) {
      Object.assign(p, createParticle());
    }
  });

  requestAnimationFrame(animate);
}

animate();