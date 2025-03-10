// Load SVG and start animation
function loadSVG() {
    fetch("image.svg")
        .then(response => {
            if (!response.ok) throw new Error("SVG not found");
            return response.text();
        })
        .then(data => {
            document.getElementById("svg-container").innerHTML = data;
            setTimeout(startAnimation, 100);
        })
        .catch(error => console.error("Error loading SVG:", error));
}

// Animate SVG paths
function startAnimation() {
    document.querySelectorAll("path").forEach(path => {
        const length = path.getTotalLength();
        path.style.transition = "none";
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;
        path.getBoundingClientRect(); // Force reflow
        setTimeout(() => {
            path.style.transition = "stroke-dashoffset 3s ease-in-out";
            path.style.strokeDashoffset = 0;
        }, 50);
    });
}

// Create falling Om symbols
function createOmSymbol() {
    const omSymbol = document.createElement("div");
    omSymbol.classList.add("om-symbol");
    omSymbol.innerText = "ॐ";
    omSymbol.style.left = Math.random() * 100 + "vw";
    document.body.appendChild(omSymbol);
    omSymbol.addEventListener("animationend", () => omSymbol.remove());
}

// Event listeners
document.addEventListener("click", startAnimation);
setInterval(createOmSymbol, 1500);
loadSVG();