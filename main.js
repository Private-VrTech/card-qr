import * as THREE from 'three';
import { MindARThree } from 'mindar-image-three';
const mindarThree = new MindARThree({
    container: document.querySelector("#container"),
    imageTargetSrc: "targets.mind"
});

const { renderer, scene, camera } = mindarThree;
const anchor = mindarThree.addAnchor(0);

const init = async () => {
    // Create a canvas for the text
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    // Tạo gradient cho background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, "rgba(0, 255, 255, 0.8)");
    gradient.addColorStop(1, "rgba(0, 128, 128, 0.8)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Vẽ viền cho canvas
    ctx.lineWidth = 10;
    ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    // Thiết lập kiểu chữ
    ctx.fillStyle = "#000"; // Màu chữ
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Hiệu ứng bóng mờ cho chữ
    ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;

    //input
    const inputName = document.getElementById("input-name").value || "Your Name";
    const inputDate = document.getElementById("input-date").value || "Your Date";

    ctx.fillText(`${inputName}\n${inputDate}`, canvas.width / 2, canvas.height / 2);

    // Use the canvas as a texture
    const texture = new THREE.CanvasTexture(canvas);
    const card = new THREE.PlaneGeometry(1, 0.55);
    const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
    const plane = new THREE.Mesh(card, material);
    anchor.group.add(plane);

    const hideElement = document.createElement("hidden");
    const control = document.getElementById("control");
    hideElement.appendChild(control);
}

const start = async () => {
    await init();
    await mindarThree.start();
    renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
    });
}

const submitButton = document.querySelector("#submit-btn");
submitButton.addEventListener("click", () => {
    start();
});