let canvas;


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
})