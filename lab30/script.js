const canvas = document.getElementById('tank');
const ctx = canvas.getContext('2d');

function drawBackground() {
  ctx.fillStyle = '#66ccff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#996633';
  ctx.fillRect(0, canvas.height - 50, canvas.width, 50);
}

class Fish {
  constructor(x, y, color = 'orange') {
    this.x = x; this.y = y;
    this.vx = 2; this.vy = 0;
    this.color = color;
    this.startleTime = null;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.ellipse(this.x, this.y, 20, 10, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  update(pellets) {
    const now = Date.now();
    if (this.startleTime && now - this.startleTime > 1000) {
      this.vx = 2; this.vy = 0;
      this.startleTime = null;
    }

    let target = null, dist = Infinity;
    pellets.forEach(p => {
      const dx = p.x - this.x, dy = p.y - this.y;
      const d = Math.hypot(dx, dy);
      if (d < dist) { dist = d; target = p; }
    });

    if (target && dist < 200) {
      const dx = target.x - this.x;
      const dy = target.y - this.y;
      const d = dist;
      this.vx = dx / d * 2;
      this.vy = dy / d * 2;
    }

    this.x += this.vx;
    this.y += this.vy;

    pellets.forEach((p, i) => {
      if (Math.hypot(p.x - this.x, p.y - this.y) < 15) {
        pellets.splice(i, 1);
      }
    });
  }
}

class Pellet {
  constructor(x) { this.x = x; this.y = 0; this.radius = 5; }
  update() { this.y += 3; }
  draw() {
    ctx.fillStyle = 'brown';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

const fishList = [new Fish(100, 200)];
const pellets = [];

document.getElementById('addFish').addEventListener('click', () => {
  const x = Math.random() * canvas.width;
  const y = Math.random() * (canvas.height - 100) + 50;
  fishList.push(new Fish(x, y));
});

document.getElementById('feed').addEventListener('click', () => {
  const x = Math.random() * canvas.width;
  pellets.push(new Pellet(x));
});

canvas.addEventListener('click', e => {
  const rect = canvas.getBoundingClientRect();
  const cx = e.clientX - rect.left;
  const cy = e.clientY - rect.top;
  fishList.forEach(f => {
    const dx = f.x - cx, dy = f.y - cy, d = Math.hypot(dx, dy) || 1;
    f.vx = dx / d * 5;
    f.vy = dy / d * 5;
    f.startleTime = Date.now();
  });
});

function animate() {
  drawBackground();
  pellets.forEach(p => { p.update(); p.draw(); });
  fishList.forEach(f => { f.update(pellets); f.draw(); });
  requestAnimationFrame(animate);
}

animate();