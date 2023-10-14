let canvas;
let raf;
let goodArc = {
    start: 0,
    end: 0
}
let perfectArc = {
    start: 0,
    end: 0
}
let indicatorHandPosition = -45;
let indicatorHandDirection = "up";

let clickCoords = {
    x: 0,
    y: 0
}

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

    canvas.addEventListener("click", (e) => {
        clickCoords.x = e.clientX;
        clickCoords.y = e.clientY;
    })

    setInterval(() => {
        if (indicatorHandDirection === "up") {
            indicatorHandPosition += 1;
        } else {
            indicatorHandPosition -=1;
        }

        if (indicatorHandPosition >= 45) {
            indicatorHandDirection = "down";
        } else if (indicatorHandPosition <= -45) {
            indicatorHandDirection = "up";
        }
    }, 10);

    goodDegs(30);
    perfectDegs(10);

    window.requestAnimationFrame(draw);
})

const draw = () => {
    drawRadialGradient();
    drawIndicator();
    drawIndicatorHand();
    drawCookButton();
    
    if (isButtonClicked()) {
        console.log("clicked");
    }

    window.requestAnimationFrame(draw);
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

    ctx.strokeStyle = "rgb(255, 255, 0, 0.5)";
    ctx.lineWidth = 40;
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height, canvas.height / 4, degsToRads(goodArc.start), degsToRads(goodArc.end));
    ctx.stroke();

    ctx.strokeStyle = "rgb(255, 0, 0, 0.5)";
    ctx.lineWidth = 50;
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height, canvas.height / 4, degsToRads(perfectArc.start), degsToRads(perfectArc.end));
    ctx.stroke();
}

const goodDegs = (degs) => {
    const start = Math.ceil(Math.random() * (315 - degs - 225) + 225);
    const end = start + degs;
    goodArc.start = start;
    goodArc.end = end;
}

const perfectDegs = (degs) => {
    const start = (goodArc.start + goodArc.end) / 2 - degs / 2;
    const end = start + degs;
    perfectArc.start = start;
    perfectArc.end = end;
}

const drawIndicatorHand = () => {
    const ctx = canvas.getContext('2d');
    ctx.translate(canvas.width / 2, canvas.height);
    ctx.rotate(degsToRads(indicatorHandPosition));
    ctx.translate(-canvas.width / 2, -canvas.height);

    ctx.strokeStyle = "rgb(255, 255, 255, 0.8)";
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height - 200);
    ctx.lineTo(canvas.width / 2, canvas.height - canvas.height / 4 - 50);
    ctx.stroke();
    ctx.resetTransform();
}

const drawCookButton = () => {
    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = "rgb(255, 255, 255)";
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height - 100, 50, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.stroke();
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height - 100, 50, 0, 2 * Math.PI);
    ctx.stroke();
    
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 - 20, canvas.height - 100 - 20);
    ctx.lineTo(canvas.width / 2 - 20, canvas.height - 100 + 20);
    ctx.lineTo(canvas.width / 2 + 20, canvas.height - 100);
    ctx.closePath();
    ctx.fill();
}

const isButtonClicked = () => {
    const distance = Math.sqrt(Math.pow(clickCoords.x - canvas.width / 2, 2) + Math.pow(clickCoords.y - canvas.height + 100, 2));
    if (distance <= 50) {
        clickCoords = {
            x: 0,
            y: 0
        };
        return true;
    } else {
        clickCoords = {
            x: 0,
            y: 0
        };
        return false;
    }
}