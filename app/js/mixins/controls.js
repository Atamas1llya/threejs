import lock from 'pointer-lock';

module.exports = {
  animateMovementTick () {
    const { movement } = this;

    if (movement.forward) {
      this.camera.position.x -= Math.sin(this.camera.rotation.y) * 0.1;
      this.camera.position.z -= Math.cos(this.camera.rotation.y) * 0.1;
    }
    if (movement.back) {
      this.camera.position.x += Math.sin(this.camera.rotation.y) * 0.1;
      this.camera.position.z += Math.cos(this.camera.rotation.y) * 0.1;
    }
    if (movement.left) {
      this.camera.position.x += Math.sin(this.camera.rotation.y - Math.PI / 2) * 0.1;
      this.camera.position.z += Math.cos(this.camera.rotation.y - Math.PI / 2) * 0.1;
    }
    if (movement.right) {
      this.camera.position.x -= Math.sin(this.camera.rotation.y - Math.PI / 2) * 0.1;
      this.camera.position.z -= Math.cos(this.camera.rotation.y - Math.PI / 2) * 0.1;
    }

    if (movement.top) {
      this.camera.position.y += 0.1;
    } else if (movement.bottom) {
      this.camera.position.y -= 0.1;
    }
  },

  _initializeCameraWiggle () {
    const { movement } = this;

    if (movement.forward || movement.back || movement.left || movement.right) {
      if (this.stepState <= this.stepSize) {
        this.camera.position.y += this.stepRange;
        this.camera.rotation.y += this.stepRange * Math.PI / 180;
        if (this.toggled) {
          this.camera.position.x += this.stepRange;
        } else {
          this.camera.position.x -= this.stepRange;
        }
      }

      else if (this.stepState <= this.stepSize * 2) {
        this.camera.position.y -= this.stepRange;
        this.camera.rotation.y -= this.stepRange * Math.PI / 180;
        if (this.toggled) {
          this.camera.position.x += this.stepRange;
        } else {
          this.camera.position.x -= this.stepRange;
        }
      }
      else {
        this.stepState = 0;
        this.toggled = !this.toggled;
      }

      this.stepState += 1;
    }
  },

  _initializeControls () {
    this.movement = {};
    this.pointer = lock(document.body);
    this.pointer.on('attain', this._setupPointer.bind(this));

    this.stepState = 20;
    this.stepSize = 9;
    this.stepRange = 0.5 / 100;
    this.toggled = true;


    window.addEventListener('keydown', ({ keyCode }) => {
      const { movement } = this;
      switch (keyCode) {
        case 87: movement.forward = true; break;
        case 83: movement.back = true; break;
        case 65: movement.left = true; break;
        case 68: movement.right = true; break;
        case 32: movement.top = true; break;
        case 16: movement.bottom = true; break;
      }
      this.movement = movement;
    })

    window.addEventListener('keyup', ({ keyCode }) => {
      const { movement } = this;
      switch (keyCode) {
        case 87: movement.forward = false; break;
        case 83: movement.back = false; break;
        case 65: movement.left = false; break;
        case 68: movement.right = false; break;
        case 32: movement.top = false; break;
        case 16: movement.bottom = false; break;
      }
      this.movement = movement;
    })
  },

  _handleMove(initial, move) {
    initial.x += move.dx;

    if (initial.y + move.dy < 90 && initial.y + move.dy > -90) {
      initial.y += move.dy;
    }

    this.camera.rotation.y = -(initial.x * Math.PI / 180);
    this.camera.rotation.x = -(initial.y * Math.PI / 180);

    this.camera.updateProjectionMatrix();
  },

  _setupPointer (movements) {
    const initial = { x: 0, y: 0 }

    movements.on('data', this._handleMove.bind(this, initial));
  }
}
