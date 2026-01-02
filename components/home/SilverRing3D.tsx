import React, { useEffect, useRef } from 'react';

export const SilverRing3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<any>(null);
  const modelRef = useRef<any>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: -0.3, y: 0 });
  const animationRef = useRef<number>();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseRef.current.x = (clientX / innerWidth - 0.5) * -0.5;
      mouseRef.current.y = (clientY / innerHeight - 0.5) * 0.5;
      targetRotationRef.current.y = mouseRef.current.x;
      targetRotationRef.current.x = mouseRef.current.y - 0.3;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    let mounted = true;
    const loadThreeJS = async () => {
      const THREE = await import('three');
      const { FBXLoader } = await import('three/examples/jsm/loaders/FBXLoader.js');

      if (!mounted || !containerRef.current) return;

      const scene = new THREE.Scene();

      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
      camera.position.z = 5;

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      const size = Math.min(500, window.innerWidth * 0.8);
      renderer.setSize(size, size);
      renderer.setClearColor(0x000000, 0);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;
      rendererRef.current = renderer;
      containerRef.current.appendChild(renderer.domElement);

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
      scene.add(ambientLight);

      const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1.5);
      directionalLight1.position.set(5, 5, 5);
      scene.add(directionalLight1);

      const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight2.position.set(-5, -5, -5);
      scene.add(directionalLight2);

      const rimLight = new THREE.DirectionalLight(0xadd8e6, 1.2);
      rimLight.position.set(-3, 0, -5);
      scene.add(rimLight);

      const spotLight = new THREE.SpotLight(0xffffff, 1.0);
      spotLight.position.set(0, 10, 0);
      spotLight.angle = Math.PI / 6;
      scene.add(spotLight);

      const loader = new FBXLoader();
      loader.load(
        '/ring.FBX',
        (object) => {
          if (!mounted) return;
          
          const material = new THREE.MeshStandardMaterial({
            color: 0xf0f0f0,
            metalness: 1.0,
            roughness: 0.15,
            envMapIntensity: 1.5,
          });
          
          object.traverse((child: any) => {
            if (child.isMesh) {
              child.material = material;
            }
          });

          const box = new THREE.Box3().setFromObject(object);
          const center = box.getCenter(new THREE.Vector3());
          const modelSize = box.getSize(new THREE.Vector3());
          const maxDim = Math.max(modelSize.x, modelSize.y, modelSize.z);
          const scale = 3 / maxDim;
          object.scale.multiplyScalar(scale);
          object.position.sub(center.multiplyScalar(scale));

          modelRef.current = object;
          scene.add(object);
          
          // Trigger Locomotive Scroll update after model loads
          setTimeout(() => {
            const event = new CustomEvent('updateScroll');
            window.dispatchEvent(event);
          }, 100);
        },
        undefined,
        (error) => console.error('Error loading model:', error)
      );

      const animate = () => {
        if (!mounted) return;
        animationRef.current = requestAnimationFrame(animate);
        if (modelRef.current) {
          // Add continuous rotation to targets
          targetRotationRef.current.y += 0.005;
          targetRotationRef.current.x += 0.002;
          
          // Smoothly interpolate to targets (which include mouse movement)
          modelRef.current.rotation.x += (targetRotationRef.current.x - modelRef.current.rotation.x) * 0.05;
          modelRef.current.rotation.y += (targetRotationRef.current.y - modelRef.current.rotation.y) * 0.05;
          modelRef.current.rotation.z += 0.003;
        }
        renderer.render(scene, camera);
      };
      animate();
    };

    loadThreeJS();

    return () => {
      mounted = false;
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (rendererRef.current && containerRef.current && containerRef.current.contains(rendererRef.current.domElement)) {
        containerRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-80 h-80 md:w-[500px] md:h-[500px] pointer-events-none select-none" />
  );
};
