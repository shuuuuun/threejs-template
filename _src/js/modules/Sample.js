import 'three/examples/js/controls/EditorControls.js';

export default class Sample {
  constructor(opts = {}) {
    this.RENDER_INTERVAL = 30;
    this.TICK_INTERVAL = 1500;
    
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.container = opts.container || document.createElement('div');
    
    this.init();
  }
  
  init() {
    { // renderer
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setClearColor( 0x222222 ); // 背景色
      this.renderer.setPixelRatio(window.devicePixelRatio || 1);
      this.renderer.setSize( this.width, this.height );
      this.container.appendChild( this.renderer.domElement );
    }
    { // scene
      this.scene = new THREE.Scene();
    }
    { // camera
      const perscamera = new THREE.PerspectiveCamera( 45, this.width / this.height, 1, 10000 ); // fov(視野角),aspect,near,far
      const orthocamera = new THREE.OrthographicCamera( this.width / -2, this.width / 2, this.height / 2, this.height / -2, 1, 10000 );
      this.camera = perscamera;
      this.camera.position.set(100, 100, 100);
      this.camera.up.set(0, 1, 0);
      this.camera.lookAt({ x:0, y:0, z:0 });
    }
    { // controls
      this.controls = new THREE.EditorControls( this.camera, this.renderer.domElement );
    }
    { // lights
      const ambientLight = new THREE.AmbientLight(0xffffff);
      this.scene.add(ambientLight);
    }
    { // axis
      const axis = new THREE.AxisHelper(1000);
      axis.position.set(0,0,0);
      this.scene.add(axis);
    }
    { // grid
      const grid = new THREE.GridHelper(50, 10); // size, step
      this.scene.add(grid);
    }
    { // cube
      const geometry = new THREE.CubeGeometry(20, 20, 20);
      const material = new THREE.MeshLambertMaterial({ color: 0xffcc66 });
      const cube = new THREE.Mesh(geometry, material);
      this.scene.add(cube);
    }
  }

  tick() {
  }

  render() {
    this.renderer.render( this.scene, this.camera );
  }

  stop() {
    cancelAnimationFrame(this.loopId);
  }

  start() {
    const startTime = Date.now();
    let previousTime = startTime;
    let previousRenderTime = previousTime;
    let previousTickTime = previousTime;
    this.loopId;
    
    const loop = (timestamp) => {
      const nowTime = Date.now();
      const elapsedTime = nowTime - startTime;
      const deltaTime = nowTime - previousTime;
      const deltaRenderTime = nowTime - previousRenderTime;
      const deltaTickTime = nowTime - previousTickTime;
      
      if (deltaRenderTime > this.RENDER_INTERVAL) {
        previousRenderTime = nowTime;
        this.render();
      }
      if (deltaTickTime > this.TICK_INTERVAL) {
        previousTickTime = nowTime;
        this.tick();
      }
      
      previousTime = nowTime;
      this.loopId = requestAnimationFrame(loop);
    };
    
    loop();
  }
}
