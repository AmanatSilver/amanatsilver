import React, { useEffect, useRef } from 'react';

interface RingModel3DProps {
  size?: number;
  autoRotate?: boolean;
  className?: string;
}

export const RingModel3D: React.FC<RingModel3DProps> = ({ 
  size = 150, 
  autoRotate = true, 
  className = '' 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<any>(null);
  const modelRef = useRef<any>(null);
  const animationRef = useRef<number>();

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
        },
        undefined,
        (error) => console.error('Error loading model:', error)
      );

      const animate = () => {
        if (!mounted) return;
        animationRef.current = requestAnimationFrame(animate);
        if (modelRef.current && autoRotate) {
          modelRef.current.rotation.y += 0.005;
          modelRef.current.rotation.x = -0.3;
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
  }, [size, autoRotate]);

  return <div ref={containerRef} className={className} />;
};
