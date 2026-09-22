import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export const HeroGlobe: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [webglSupported, setWebglSupported] = useState<boolean>(true);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    let renderer: THREE.WebGLRenderer | null = null;
    let scene: THREE.Scene | null = null;
    let camera: THREE.PerspectiveCamera | null = null;
    let animationFrameId: number;

    try {
      // Scene
      scene = new THREE.Scene();

      // Camera
      const width = containerRef.current.clientWidth || 500;
      const height = containerRef.current.clientHeight || 500;
      camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
      camera.position.z = 240;

      // WebGL Renderer
      renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // 1. Core Digital Wireframe Sphere
      const sphereRadius = 68;
      const sphereGeo = new THREE.SphereGeometry(sphereRadius, 36, 36);
      const wireframeMat = new THREE.MeshBasicMaterial({
        color: 0x1e3a8a, // deep blue
        wireframe: true,
        transparent: true,
        opacity: 0.22
      });
      const wireframeGlobe = new THREE.Mesh(sphereGeo, wireframeMat);
      scene.add(wireframeGlobe);

      // 2. Inner Glowing Core
      const innerCoreGeo = new THREE.SphereGeometry(sphereRadius * 0.95, 24, 24);
      const innerCoreMat = new THREE.MeshBasicMaterial({
        color: 0x0f172a,
        transparent: true,
        opacity: 0.85
      });
      const innerCore = new THREE.Mesh(innerCoreGeo, innerCoreMat);
      scene.add(innerCore);

      // 3. Digital Particles / Data Nodes on Globe
      const particleCount = 750;
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);

      const colorBlue = new THREE.Color(0x38bdf8); // Cyan
      const colorGold = new THREE.Color(0xf59e0b); // Gold
      const colorWhite = new THREE.Color(0xffffff);

      for (let i = 0; i < particleCount; i++) {
        // Fibonacci sphere point distribution
        const phi = Math.acos(-1 + (2 * i) / particleCount);
        const theta = Math.sqrt(particleCount * Math.PI) * phi;
        const r = sphereRadius + (Math.random() * 4 - 2);

        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);

        // Mix 70% blue, 25% gold, 5% white
        const rand = Math.random();
        const col = rand < 0.65 ? colorBlue : rand < 0.9 ? colorGold : colorWhite;
        colors[i * 3] = col.r;
        colors[i * 3 + 1] = col.g;
        colors[i * 3 + 2] = col.b;
      }

      const particleGeo = new THREE.BufferGeometry();
      particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const particleMat = new THREE.PointsMaterial({
        size: 2.2,
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending
      });
      const particleSystem = new THREE.Points(particleGeo, particleMat);
      scene.add(particleSystem);

      // 4. Golden Orbital Ring (Signature brand visual)
      const ringCurve = new THREE.EllipseCurve(
        0, 0,
        sphereRadius * 1.5, sphereRadius * 0.85,
        0, 2 * Math.PI,
        false,
        0
      );
      const ringPoints = ringCurve.getPoints(120);
      const ringGeo = new THREE.BufferGeometry().setFromPoints(ringPoints);
      const ringMat = new THREE.LineBasicMaterial({
        color: 0xf59e0b, // Golden metallic
        linewidth: 2,
        transparent: true,
        opacity: 0.85
      });
      const orbitRing1 = new THREE.Line(ringGeo, ringMat);
      orbitRing1.rotation.x = Math.PI / 3;
      orbitRing1.rotation.y = -Math.PI / 6;
      scene.add(orbitRing1);

      // 5. Cyan Secondary Orbit
      const orbitRing2 = new THREE.Line(ringGeo, new THREE.LineBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.5
      }));
      orbitRing2.rotation.x = -Math.PI / 4;
      orbitRing2.rotation.z = Math.PI / 5;
      scene.add(orbitRing2);

      // 6. Orbiting Golden Rocket/Airplane Beacon
      const beaconGeo = new THREE.ConeGeometry(3.5, 9, 6);
      const beaconMat = new THREE.MeshBasicMaterial({ color: 0xffd700 });
      const beacon = new THREE.Mesh(beaconGeo, beaconMat);
      scene.add(beacon);

      // Mouse interactivity & parallax
      let mouseX = 0;
      let mouseY = 0;
      let targetRotationX = 0;
      let targetRotationY = 0;

      const handleMouseMove = (e: MouseEvent) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        mouseX = (x / (rect.width / 2)) * 0.5;
        mouseY = (y / (rect.height / 2)) * 0.5;
      };

      window.addEventListener('mousemove', handleMouseMove);

      // Animation loop
      let angle = 0;
      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);

        targetRotationY += 0.0035;
        angle += 0.02;

        if (wireframeGlobe && particleSystem) {
          wireframeGlobe.rotation.y = targetRotationY + mouseX * 0.5;
          wireframeGlobe.rotation.x = mouseY * 0.25;
          particleSystem.rotation.y = targetRotationY + mouseX * 0.5;
          particleSystem.rotation.x = mouseY * 0.25;
        }

        if (orbitRing1) {
          orbitRing1.rotation.z += 0.002;
        }
        if (orbitRing2) {
          orbitRing2.rotation.y -= 0.003;
        }

        // Move beacon along orbit
        if (beacon) {
          const orbitRadius = sphereRadius * 1.5;
          const bx = Math.cos(angle) * orbitRadius;
          const by = Math.sin(angle) * (sphereRadius * 0.85);
          
          // Apply ring transformation
          const v = new THREE.Vector3(bx, by, 0);
          v.applyEuler(orbitRing1.rotation);
          beacon.position.copy(v);
          beacon.rotation.z = angle + Math.PI / 2;
        }

        renderer?.render(scene!, camera!);
      };

      animate();

      // ResizeObserver
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const newWidth = entry.contentRect.width;
          const newHeight = entry.contentRect.height;
          if (newWidth > 0 && newHeight > 0 && camera && renderer) {
            camera.aspect = newWidth / newHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(newWidth, newHeight);
          }
        }
      });
      resizeObserver.observe(containerRef.current);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        cancelAnimationFrame(animationFrameId);
        resizeObserver.disconnect();
        renderer?.dispose();
      };
    } catch (err) {
      console.warn('WebGL initialization failed, falling back to 2D holographic globe', err);
      setWebglSupported(false);
    }
  }, []);

  return (
    <div 
      id="hero-3d-globe-container"
      ref={containerRef} 
      className="relative w-full h-[400px] sm:h-[480px] lg:h-[560px] flex items-center justify-center pointer-events-none select-none"
    >
      {webglSupported ? (
        <canvas 
          id="hero-threejs-canvas"
          ref={canvasRef} 
          className="w-full h-full block" 
        />
      ) : (
        /* CSS 3D Holographic Fallback */
        <div className="relative w-72 h-72 rounded-full border border-amber-500/40 flex items-center justify-center bg-gradient-to-br from-blue-950/80 via-slate-950 to-amber-950/30 shadow-[0_0_80px_rgba(245,158,11,0.25)]">
          <div className="absolute inset-4 rounded-full border border-sky-400/30 animate-spin" style={{ animationDuration: '24s' }}></div>
          <div className="absolute inset-10 rounded-full border border-amber-400/40 -rotate-45"></div>
          <div className="w-32 h-32 rounded-full bg-blue-600/20 blur-xl"></div>
          <div className="text-center z-10">
            <span className="font-heading text-xl font-bold text-amber-400">ELA DIGITAL</span>
            <p className="text-[10px] text-slate-400 tracking-widest mt-1">GLOBAL NETWORK</p>
          </div>
        </div>
      )}

      {/* Floating Holographic Analytics Badge Left */}
      <div className="absolute -left-2 sm:left-4 top-1/4 pointer-events-auto bg-slate-900/80 backdrop-blur-md border border-amber-500/30 rounded-2xl p-3 sm:p-4 shadow-[0_10px_30px_rgba(0,0,0,0.6)] animate-float">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-[11px] font-mono text-slate-300 font-semibold uppercase">Global Client Roas</span>
        </div>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-xl sm:text-2xl font-black text-amber-400 font-heading">3.8x — 6.2x</span>
          <span className="text-[10px] text-emerald-400 font-bold">+280%</span>
        </div>
        <p className="text-[9px] text-slate-400 mt-0.5">Optimized Performance</p>
      </div>

      {/* Floating Analytics Badge Right */}
      <div className="absolute -right-2 sm:right-4 bottom-1/4 pointer-events-auto bg-slate-900/80 backdrop-blur-md border border-sky-500/30 rounded-2xl p-3 sm:p-4 shadow-[0_10px_30px_rgba(0,0,0,0.6)] animate-float-delayed">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
          <span className="text-[11px] font-mono text-slate-300 font-semibold uppercase">WhatsApp AI Flow</span>
        </div>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-xl sm:text-2xl font-black text-sky-400 font-heading">98.4%</span>
          <span className="text-[10px] text-amber-400 font-bold">Open Rate</span>
        </div>
        <p className="text-[9px] text-slate-400 mt-0.5">Instant Lead Qualification</p>
      </div>
    </div>
  );
};
