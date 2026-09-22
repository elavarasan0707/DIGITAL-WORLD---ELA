import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Surround3DBackground:
 * Renders the authentic, full-screen 3D World Globe (Earth Globe) surrounding the entire website.
 * Features:
 * - Central 3D Digital World Globe with cobalt wireframe, inner dark core, and atmospheric depth.
 * - 1,400+ glowing digital data constellation nodes on the globe surface (cyan, gold, white).
 * - Signature golden metallic orbital ring and secondary cyan orbital ring inclined in 3D space.
 * - Golden flight beacon orbiting continuously along the orbital ellipse.
 * - Ambient starry cosmic field distributed across 3D depth.
 * - Fully responsive camera and scale for Laptop, Tablet, and Mobile phone screens.
 * - Interactive subtle mouse/touch rotation parallax.
 */
export const Surround3DBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    let renderer: THREE.WebGLRenderer | null = null;
    let scene: THREE.Scene | null = null;
    let camera: THREE.PerspectiveCamera | null = null;
    let animationFrameId: number;

    try {
      scene = new THREE.Scene();

      // Viewport dimensions
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Perspective Camera
      camera = new THREE.PerspectiveCamera(48, width / height, 0.1, 2500);
      
      // Responsive initial camera position
      const isMobile = width < 640;
      const isTablet = width >= 640 && width < 1024;
      camera.position.z = isMobile ? 380 : isTablet ? 340 : 310;
      camera.position.y = 0;

      // WebGL Renderer
      renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Main Group holding the 3D World Globe & Orbital Systems
      const worldGroup = new THREE.Group();
      scene.add(worldGroup);

      // Base radius for the 3D World Globe
      const globeRadius = isMobile ? 80 : 95;

      // 1. Digital Wireframe World Sphere (Authentic First World Globe)
      const wireframeGeo = new THREE.SphereGeometry(globeRadius, 48, 48);
      const wireframeMat = new THREE.MeshBasicMaterial({
        color: 0x1e40af, // Rich cobalt blue
        wireframe: true,
        transparent: true,
        opacity: 0.28
      });
      const wireframeGlobe = new THREE.Mesh(wireframeGeo, wireframeMat);
      worldGroup.add(wireframeGlobe);

      // 2. Inner Deep Obsidian Core to give the World Globe solid volume
      const coreGeo = new THREE.SphereGeometry(globeRadius * 0.96, 32, 32);
      const coreMat = new THREE.MeshBasicMaterial({
        color: 0x030712,
        transparent: true,
        opacity: 0.92
      });
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);
      worldGroup.add(coreMesh);

      // 3. Digital Data Nodes & Fiber Optic Constellations on Globe
      const particleCount = isMobile ? 850 : 1400;
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);

      const colorBlue = new THREE.Color(0x38bdf8); // Cyan
      const colorGold = new THREE.Color(0xf59e0b); // Gold
      const colorWhite = new THREE.Color(0xffffff);

      for (let i = 0; i < particleCount; i++) {
        // Fibonacci sphere point distribution for uniform, beautiful global distribution
        const phi = Math.acos(-1 + (2 * i) / particleCount);
        const theta = Math.sqrt(particleCount * Math.PI) * phi;
        const r = globeRadius + (Math.random() * 4 - 2);

        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);

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
        size: isMobile ? 2.0 : 2.5,
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending
      });
      const particleSystem = new THREE.Points(particleGeo, particleMat);
      worldGroup.add(particleSystem);

      // 4. Primary Golden Metallic Orbital Ring
      const ringGroup1 = new THREE.Group();
      ringGroup1.rotation.x = Math.PI / 3;
      ringGroup1.rotation.y = -Math.PI / 6;

      const ringRadius1 = globeRadius * 1.55;
      const ringGeo1 = new THREE.TorusGeometry(ringRadius1, 0.75, 16, 120);
      const ringMat1 = new THREE.MeshBasicMaterial({
        color: 0xf59e0b, // Golden metallic
        transparent: true,
        opacity: 0.85
      });
      const orbitRing1 = new THREE.Mesh(ringGeo1, ringMat1);
      ringGroup1.add(orbitRing1);
      worldGroup.add(ringGroup1);

      // 5. Secondary Cyan Orbital Ring (Counter-inclined)
      const ringGroup2 = new THREE.Group();
      ringGroup2.rotation.x = -Math.PI / 3.6;
      ringGroup2.rotation.z = Math.PI / 4;

      const ringRadius2 = globeRadius * 1.8;
      const ringGeo2 = new THREE.TorusGeometry(ringRadius2, 0.5, 16, 120);
      const ringMat2 = new THREE.MeshBasicMaterial({
        color: 0x38bdf8, // Cyan
        transparent: true,
        opacity: 0.55
      });
      const orbitRing2 = new THREE.Mesh(ringGeo2, ringMat2);
      ringGroup2.add(orbitRing2);
      worldGroup.add(ringGroup2);

      // 6. Orbiting Golden Flight Beacon / Growth Rocket
      const beaconGeo = new THREE.ConeGeometry(4, 11, 8);
      const beaconMat = new THREE.MeshBasicMaterial({ color: 0xffd700 });
      const beacon = new THREE.Mesh(beaconGeo, beaconMat);
      scene.add(beacon);

      // Light trail for beacon
      const beaconGlowGeo = new THREE.SphereGeometry(3, 16, 16);
      const beaconGlowMat = new THREE.MeshBasicMaterial({
        color: 0xfbbf24,
        transparent: true,
        opacity: 0.75
      });
      const beaconGlow = new THREE.Mesh(beaconGlowGeo, beaconGlowMat);
      scene.add(beaconGlow);

      // 7. Ambient Deep Space Constellation Stars
      const starCount = isMobile ? 700 : 1200;
      const starPositions = new Float32Array(starCount * 3);
      const starColors = new Float32Array(starCount * 3);

      for (let i = 0; i < starCount; i++) {
        starPositions[i * 3] = (Math.random() - 0.5) * 1800;
        starPositions[i * 3 + 1] = (Math.random() - 0.5) * 1400;
        starPositions[i * 3 + 2] = (Math.random() - 0.5) * 1200;

        const starRand = Math.random();
        const sCol = starRand < 0.65 ? colorBlue : starRand < 0.88 ? colorGold : colorWhite;
        starColors[i * 3] = sCol.r;
        starColors[i * 3 + 1] = sCol.g;
        starColors[i * 3 + 2] = sCol.b;
      }

      const starGeo = new THREE.BufferGeometry();
      starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
      starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

      const starMat = new THREE.PointsMaterial({
        size: 1.6,
        vertexColors: true,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
      });
      const starField = new THREE.Points(starGeo, starMat);
      scene.add(starField);

      // Mouse & Touch Parallax Controls
      let mouseX = 0;
      let mouseY = 0;
      let targetRotX = 0;
      let targetRotY = 0;

      const handleMouseMove = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = (e.clientY / window.innerHeight) * 2 - 1;
        mouseX = x * 0.35;
        mouseY = y * 0.25;
      };

      const handleTouchMove = (e: TouchEvent) => {
        if (e.touches.length > 0) {
          const touch = e.touches[0];
          const x = (touch.clientX / window.innerWidth) * 2 - 1;
          const y = (touch.clientY / window.innerHeight) * 2 - 1;
          mouseX = x * 0.25;
          mouseY = y * 0.2;
        }
      };

      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      window.addEventListener('touchmove', handleTouchMove, { passive: true });

      // Responsive Resize
      const handleResize = () => {
        if (!containerRef.current || !renderer || !camera) return;
        const w = window.innerWidth;
        const h = window.innerHeight;
        camera.aspect = w / h;

        const mobile = w < 640;
        const tablet = w >= 640 && w < 1024;
        camera.position.z = mobile ? 380 : tablet ? 340 : 310;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener('resize', handleResize);

      // Animation Loop
      let angle = 0;
      let rotSpeed = 0.0035;

      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);

        targetRotY += rotSpeed;
        angle += 0.018;

        // Rotate the 3D World Globe
        worldGroup.rotation.y = targetRotY + mouseX * 0.4;
        worldGroup.rotation.x = mouseY * 0.25;

        // Counter-rotate orbital rings smoothly
        ringGroup1.rotation.z += 0.003;
        ringGroup2.rotation.y -= 0.0025;

        // Calculate beacon orbiting position in 3D
        const orbitRadius = globeRadius * 1.55;
        const bx = Math.cos(angle) * orbitRadius;
        const by = Math.sin(angle) * (globeRadius * 0.95);
        const bz = Math.sin(angle * 0.8) * 15;

        const v = new THREE.Vector3(bx, by, bz);
        v.applyEuler(ringGroup1.rotation);
        
        beacon.position.copy(v);
        beaconGlow.position.copy(v);
        beacon.rotation.z = angle + Math.PI / 2;

        // Subtle ambient starfield drift
        starField.rotation.y += 0.0003;

        renderer?.render(scene!, camera!);
      };

      animate();

      return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('resize', handleResize);
        if (renderer && renderer.domElement) {
          renderer.dispose();
        }
      };
    } catch (err) {
      console.warn('WebGL initialization fallback for 3D background:', err);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      id="surround-3d-background-container"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      style={{ opacity: 0.95 }}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
      {/* Subtle radial vignette gradient to focus content */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(3,7,18,0.7)_80%,rgba(3,7,18,0.95)_100%)] pointer-events-none"></div>
    </div>
  );
};
