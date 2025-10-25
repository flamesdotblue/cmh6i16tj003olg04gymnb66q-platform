import React, { useEffect, useRef, useState } from 'react';

// Monochrome 3D-inspired particle field shifted to the left, with embedded logo (original color & size)
export default function NeuralField({ className = '', density = 1100, stroke = false, alignLeft = false }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const [imgReady, setImgReady] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => { imgRef.current = img; setImgReady(true); };
    img.src = 'https://iili.io/KrvuYQV.md.png';
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = 0;
    let height = 0;
    let device = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      device = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * device);
      canvas.height = Math.floor(height * device);
      ctx.setTransform(device, 0, 0, device, 0, 0);
    };

    const createPoints = (n) => {
      const pts = [];
      const phi = Math.PI * (3 - Math.sqrt(5));
      for (let i = 0; i < n; i++) {
        const y = 1 - (i / (n - 1)) * 2;
        const radius = Math.sqrt(1 - y * y);
        const theta = phi * i;
        const jitter = 0.015;
        const x = Math.cos(theta) * radius + (Math.random() - 0.5) * jitter;
        const z = Math.sin(theta) * radius + (Math.random() - 0.5) * jitter;
        pts.push({ x, y, z });
      }
      return pts;
    };

    const N = Math.max(400, Math.min(2200, density));
    let points = createPoints(N);

    let rotX = -0.2;
    let rotY = 0.4;

    const project = (p, fov, camZ) => {
      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
      let x = p.x * cosY - p.z * sinY;
      let z = p.x * sinY + p.z * cosY;
      let y = p.y;
      let yy = y * cosX - z * sinX;
      let zz = y * sinX + z * cosX;

      const dz = zz + camZ;
      const scale = fov / (fov + dz);
      return { x: x * scale, y: yy * scale, z: dz, s: scale };
    };

    let last = performance.now();

    const render = (t) => {
      const dt = Math.min(32, t - last);
      last = t;

      const minDim = Math.min(width, height);
      const fov = Math.max(180, minDim * 0.9);
      const camZ = 2.8;

      rotY += 0.0005 * dt;
      rotX += 0.0002 * dt;

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, width, height);

      // Left placement
      ctx.save();
      const leftX = width * (alignLeft ? 0.28 : 0.5);
      const centerY = height * 0.52;
      ctx.translate(leftX, centerY);
      ctx.scale(1, 0.98);

      const projected = points.map((p) => project(p, fov / 2, camZ)).sort((a, b) => b.z - a.z);

      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        const alpha = 0.2 + 0.8 * p.s;
        const size = Math.max(0.6, 2.6 * p.s);
        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${Math.min(0.9, alpha)})`;
        ctx.arc(p.x * minDim * 0.42, p.y * minDim * 0.42, size, 0, Math.PI * 2);
        ctx.fill();
      }

      if (stroke) {
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255,255,255,0.15)';
        ctx.lineWidth = 1;
        const R = minDim * 0.23;
        ctx.ellipse(0, 0, R * 1.05, R * 0.85, rotY * 0.7, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw logo in original color and natural size (CSS pixels adjusted for device pixel ratio)
      if (imgReady && imgRef.current) {
        const img = imgRef.current;
        const drawW = img.width / device; // convert natural width (device px) to CSS px
        const drawH = img.height / device; // convert natural height to CSS px
        ctx.save();
        ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
        ctx.restore();
      }

      ctx.restore();

      // Gentle outer vignette
      const grad = ctx.createRadialGradient(width * 0.45, height * 0.6, 0, width * 0.45, height * 0.6, Math.max(width, height) * 0.75);
      grad.addColorStop(0, 'rgba(255,255,255,0)');
      grad.addColorStop(1, 'rgba(255,255,255,0.04)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      rafRef.current = requestAnimationFrame(render);
    };

    const onResize = () => resize();
    resize();
    window.addEventListener('resize', onResize);
    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', onResize);
    };
  }, [density, stroke, alignLeft, imgReady]);

  return <canvas ref={canvasRef} className={className} />;
}
