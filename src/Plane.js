import * as THREE from 'three';
import { gsap } from 'gsap';

export default class Plane {
    constructor({
        size1 = 1, size2 = 2, position = new THREE.Vector3(0, -1, 0), texture = null, textures = [], name = 'Unnamed Plane'} = {}) {
        this.geometry = new THREE.PlaneGeometry(size1, size2);
        
        this.textures = textures;
        this.currentTextureIndex = 0;

        this.material = new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.DoubleSide,
            toneMapped: false
        });

        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.copy(position);
        this.mesh.receiveShadow = true;
        

        this.positionHistory = [];
        this.maxHistoryLength = 100;


        this.speedX = 0;
        this.speedY = 0;
        this.time = 0;
        
        this.timeOffset = Math.random() * Math.PI * 2;

        this.mesh.position.copy(position);
        this.name = name;
    }

    
    getMesh() { return this.mesh; }
    setColor(hex) { this.material.color.set(hex); }

    setMetalness(v) { this.material.metalness = v; }
    setRoughness(v) { this.material.roughness = v; }

    getName() {
        return this.name;
    }
}