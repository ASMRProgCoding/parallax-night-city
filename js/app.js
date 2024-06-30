const layers = document.querySelectorAll(".layer");

const Z_VALUE_COEFFICIENT = 0.05;
const PARTICLES_COUNT = 1000;

document.addEventListener("mousemove", (e) => {
  const x = e.clientX - window.innerWidth / 2;
  const y = e.clientY - window.innerHeight / 2;

  layers.forEach((layer) => {
    const speedX = layer.getAttribute("data-speed-x");
    const speedY = layer.getAttribute("data-speed-y");
    const leftOffset = parseFloat(getComputedStyle(layer).left);

    const isLeft = leftOffset - window.innerWidth / 2 ? 1 : -1;
    const zValue = (e.clientX - leftOffset) * isLeft * Z_VALUE_COEFFICIENT;

    const rotateDeg = x / window.innerWidth;

    layer.style.transform = `translateX(calc(-50% + ${
      x * speedX
    }px)) translateY(calc(-50% + ${y * speedY}px))
    rotateY(${rotateDeg}deg) translateZ(${zValue}px)
    perspective(2000px)
    `;
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  if (!canvas?.getContext) return;

  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;
  ctx.strokeStyle = "rgba(204, 238, 255, 0.5)";
  ctx.lineWidth = 2;
  ctx.lineCap = "round";

  const particles = [];
  for (let i = 0; i < PARTICLES_COUNT; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      l: Math.random(),
      xs: -4 + Math.random() * 4 + 2,
      ys: Math.random() * 10 + 40,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.x + p.l * p.xs, p.y + p.l * p.ys);
      ctx.stroke();
    }

    move();
  }

  function move() {
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.xs;
      p.y += p.ys;
      if (p.x > w || p.y > h) {
        p.x = Math.random() * w;
        p.y = -20;
      }
    }
  }

  setInterval(draw, 30);
});
