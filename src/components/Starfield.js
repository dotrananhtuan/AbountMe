import { useEffect, useRef } from 'react';

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function Starfield() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: false });
    let animationId;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let lastTime = performance.now();

    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    const stars = [];
    const shootingStars = [];

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function createStars() {
      stars.length = 0;
      const count = Math.max(100, Math.floor((width * height) / 5000));
      for (let i = 0; i < count; i += 1) {
        const z = Math.random();
        const angle = random(0, Math.PI * 2);
        const drift = random(0.01, 0.03) * (0.35 + z);
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          z,
          r: Math.random() < 0.85 ? random(0.35, 0.9) : random(0.9, 1.5),
          twinkle: Math.random() * Math.PI * 2,
          twinkleSpeed: random(0.004, 0.015),
          sparkle: Math.random() > 0.92,
          vx: Math.cos(angle) * drift,
          vy: Math.sin(angle) * drift,
          phase: Math.random() * Math.PI * 2,
          wobble: random(0.008, 0.028),
        });
      }
    }

    function spawnShootingStar() {
      const roll = Math.random();
      let size;
      if (roll < 0.5) {
        size = {
          speed: random(1.6, 2.6),
          len: random(60, 110),
          width: random(0.8, 1.2),
          head: random(1.0, 1.6),
        };
      } else if (roll < 0.82) {
        size = {
          speed: random(1.05, 1.7),
          len: random(120, 200), // Cũ: 80 - 130
          width: random(1.5, 2.4), // Cũ: 1.1 - 1.7
          head: random(1.8, 2.8), // Cũ: 1.4 - 2.0
        };
      } else {
        size = {
          speed: random(0.55, 1.05),
          len: random(220, 380), // Tăng độ dài đuôi (Cũ: 160 - 260)
          width: random(2.8, 4.2), // Tăng độ rộng vệt sáng (Cũ: 2.0 - 3.1)
          head: random(3.0, 4.5), // Tăng kích thước đầu sao băng (Cũ: 2.2 - 3.2)
        };
      }

      const fromLeft = Math.random() > 0.3;
      shootingStars.push({
        x: fromLeft ? random(-120, width * 0.55) : random(0, width * 0.85),
        y: random(-50, height * 0.38),
        angle: fromLeft ? random(0.28, 0.48) : random(0.32, 0.52),
        life: 0,
        ...size,
      });
    }

    function drawBackground() {
      const g = ctx.createRadialGradient(
        width * 0.5,
        height * 0.35,
        40,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.75,
      );
      g.addColorStop(0, '#141820');
      g.addColorStop(0.45, '#0b0d12');
      g.addColorStop(1, '#050608');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, width, height);
    }

    function wrap(value, max) {
      if (value < -8) return max + 8;
      if (value > max + 8) return -8;
      return value;
    }

    function drawStars(dt, time) {
      const px = (mouse.x - 0.5) * 2;
      const py = (mouse.y - 0.5) * 2;
      const mx = mouse.x * width;
      const my = mouse.y * height;

      for (let i = 0; i < stars.length; i += 1) {
        const s = stars[i];
        s.twinkle += s.twinkleSpeed * dt;
        s.phase += s.wobble * dt;

        s.x += (s.vx + Math.sin(s.phase) * 0.12) * dt;
        s.y += (s.vy + Math.cos(s.phase * 0.85) * 0.1) * dt;
        s.x = wrap(s.x, width);
        s.y = wrap(s.y, height);

        const depth = 5 + s.z * 18;
        const dx = s.x - mx;
        const dy = s.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy) + 40;
        const pull = (14 * s.z) / dist;

        const x = s.x - px * depth + dx * pull;
        const y = s.y - py * depth + dy * pull;
        const alpha = 0.28 + 0.72 * (0.5 + 0.5 * Math.sin(s.twinkle + time * 0.0004));

        ctx.fillStyle = `rgba(232, 238, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, s.r, 0, Math.PI * 2);
        ctx.fill();

        if (s.sparkle) {
          const arm = 4 + s.z * 4;
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.55})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(x - arm, y);
          ctx.lineTo(x + arm, y);
          ctx.moveTo(x, y - arm);
          ctx.lineTo(x, y + arm);
          ctx.stroke();
        }
      }
    }

    function shootingAlpha(star) {
      const fadeIn = Math.min(1, star.life / 18);
      const edge =
        star.x < 40 || star.y < 40
          ? Math.min(star.x, star.y) / 40
          : star.x > width - 80 || star.y > height - 80
            ? Math.min(width - star.x, height - star.y) / 80
            : 1;
      return Math.max(0, Math.min(1, fadeIn * edge));
    }

    function drawShootingStars(dt) {
      if (Math.random() < 0.007 * dt && shootingStars.length < 3) {
        spawnShootingStar();
      }

      for (let i = shootingStars.length - 1; i >= 0; i -= 1) {
        const s = shootingStars[i];
        s.x += Math.cos(s.angle) * s.speed * dt;
        s.y += Math.sin(s.angle) * s.speed * dt;
        s.life += dt;

        const alpha = shootingAlpha(s);
        const tailX = s.x - Math.cos(s.angle) * s.len;
        const tailY = s.y - Math.sin(s.angle) * s.len;

        const grad = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
        grad.addColorStop(0, `rgba(255, 255, 255, ${0.95 * alpha})`);
        grad.addColorStop(0.22, `rgba(210, 226, 255, ${0.5 * alpha})`);
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.strokeStyle = grad;
        ctx.lineWidth = s.width;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.arc(s.x, s.y, s.head, 0, Math.PI * 2);
        ctx.fill();

        if (s.x > width + 160 || s.y > height + 160 || (alpha <= 0.02 && s.life > 40)) {
          shootingStars.splice(i, 1);
        }
      }
    }

    function tick(now) {
      const dt = Math.min((now - lastTime) / 16.67, 2.4);
      lastTime = now;

      mouse.x += (mouse.tx - mouse.x) * 0.025 * dt;
      mouse.y += (mouse.ty - mouse.y) * 0.025 * dt;

      drawBackground();
      drawStars(dt, now);
      drawShootingStars(dt);
      animationId = requestAnimationFrame(tick);
    }

    function onMove(event) {
      mouse.tx = event.clientX / width;
      mouse.ty = event.clientY / height;
    }

    function onResize() {
      resize();
      createStars();
    }

    resize();
    createStars();
    spawnShootingStar();
    spawnShootingStar();
    window.addEventListener('mousemove', onMove);
    window.addEventListener('resize', onResize);
    lastTime = performance.now();
    animationId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className='starfield' aria-hidden='true' />;
}

export default Starfield;
