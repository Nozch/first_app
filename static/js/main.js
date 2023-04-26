const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.PlaneGeometry(40, 40, 23, 23);
const material = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true, opacity: 0.5});
const grid = new THREE.Mesh(geometry, material);
scene.add(grid);

camera.position.set(0, 0, 50);
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onMouseClick(event) {
  event.preventDefault();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(scene.children);

  if (intersects.length > 0) {
    const point = intersects[0].point;
    const waveCenter = new THREE.Vector2(point.x, point.y);
    const waveStartTime = performance.now();
    
    const wavePeriod = 50;
    //smaller the wave thicker
    const waveDuration = 7000;
    
    const animateWave = () => {
      const waveElapsedTime = performance.now() - waveStartTime;
      const waveSpeed = 0.01;
    //smaller the animation slower 

      const positionAttribute = geometry.attributes.position;
      

      for (let i = 0;  i < positionAttribute.count; i++) {
        const vertex = new THREE.Vector3(
          positionAttribute.getX(i),
          positionAttribute.getY(i),
          positionAttribute.getZ(i)
        );

        const distance = waveCenter.distanceTo(new THREE.Vector2(vertex.x, vertex.y));
        const timeOffset = distance / waveSpeed;

        if (waveElapsedTime > timeOffset) {
          vertex.z = Math.sin((waveElapsedTime - timeOffset) / wavePeriod) * 2;  
        }

        positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
      }

      

      positionAttribute.needsUpdate = true;
      renderer.render(scene, camera);

      if (waveElapsedTime < waveDuration) {
        requestAnimationFrame(animateWave);
      }
    };
    
    animateWave();
  }
}

window.addEventListener('click', onMouseClick, false);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
