const createMonitorButton = document.getElementById("createMonitor");
const saveMonitorButton = document.getElementById("saveMonitor");
const cameraBoxes = document.querySelectorAll(".camera-box");
const monitorContainer = document.querySelector(".monitor-container");
const selectedCameras = [];

createMonitorButton.addEventListener("click", () => {
    const numCameras = parseInt(prompt("Select the number of cameras for this monitor:", "4"));

    if (isValidNumCameras(numCameras)) {
        selectCameras(numCameras);
    } else {
        alert("Invalid number of cameras. Please select a valid number.");
    }
});

cameraBoxes.forEach((cameraBox, index) => {
    cameraBox.addEventListener("click", () => {
        toggleCameraSelection(index);
    });
});

saveMonitorButton.addEventListener("click", () => {
    displaySelectedCameras();
});

function isValidNumCameras(num) {
    return [1, 4, 6, 8, 9, 16, 25, 36, 64].includes(num);
}

function selectCameras(numCameras) {
    selectedCameras.length = 0;

    for (let i = 0; i < numCameras; i++) {
        const cameraBox = createCameraBox(i);
        selectedCameras.push(cameraBox);
    }
    updateSelectedCameras();
}

function createCameraBox(cameraIndex) {
    const cameraBox = document.createElement("div");
    cameraBox.className = "small-camera-box";
    cameraBox.dataset.cameraIndex = cameraIndex;
    return cameraBox;
}

function toggleCameraSelection(cameraIndex) {
    const index = selectedCameras.findIndex(box => parseInt(box.dataset.cameraIndex) === cameraIndex);
    if (index !== -1) {
        selectedCameras.splice(index, 1);
    } else {
        selectedCameras.push(createCameraBox(cameraIndex));
    }
    updateSelectedCameras();
}

function updateSelectedCameras() {
    const smallCameraBoxes = document.querySelectorAll(".small-camera-box");
    smallCameraBoxes.forEach((box, index) => {
        if (selectedCameras.some(selectedBox => parseInt(selectedBox.dataset.cameraIndex) === index)) {
            box.classList.add("selected");
        } else {
            box.classList.remove("selected");
        }
    });
}

function displaySelectedCameras() {
    monitorContainer.innerHTML = "";

    const numCameras = selectedCameras.length;
    
    const rows = Math.sqrt(numCameras);
    
    if (isValidNumCameras(numCameras) && Number.isInteger(rows)) {
        monitorContainer.style.gridTemplateColumns = `repeat(${rows}, 1fr)`;
        
        selectedCameras.forEach(cameraBox => {
            const cameraIndex = parseInt(cameraBox.dataset.cameraIndex);
            const cameraSource = cameraBoxes[cameraIndex].dataset.cameraSource;
            
            const cameraImage = document.createElement("img");
            cameraImage.className = "camera-image";
            cameraImage.src = cameraSource;
            
            const cameraContainer = document.createElement("div");
            cameraContainer.className = "camera-box-full-screen";
            cameraContainer.appendChild(cameraImage);
            
            monitorContainer.appendChild(cameraContainer);
        });
    } else {
        alert("Invalid number of cameras. Please select a valid number.");
    }
}