let canvas;
let raf;

document.addEventListener("DOMContentLoaded", () => {
    canvas = document.getElementById("canvas");
    const footer = document.getElementById("footer");
    const header = document.getElementById("header");
    
    canvas.width = header.getBoundingClientRect().width;
    canvas.height = window.innerHeight - header.getBoundingClientRect().height - footer.getBoundingClientRect().height;
    addEventListener("resize", () => {
        canvas.width = header.getBoundingClientRect().width;
        canvas.height = window.innerHeight - header.getBoundingClientRect().height - footer.getBoundingClientRect().height;
    })

    window.requestAnimationFrame(draw);
})

const draw = () => {
    drawRadialGradient();
    drawIndicator();
}

const drawRadialGradient = () => {
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width * 1.2);
    gradient.addColorStop(0, 'lightblue');
    gradient.addColorStop(1, 'magenta');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

const degsToRads = (degs) => {
    return degs * Math.PI / 180;
}

const drawIndicator = () => {
    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = "pink";
    ctx.lineWidth = 30;
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height, canvas.height / 4, degsToRads(225), degsToRads(315));
    ctx.stroke();
}