(() => {
    const magnifierElem = document.querySelector('.magnifier');
    const maskElem = document.querySelector('#mask-glass circle');
    const svgElem = document.querySelector('.the-svg');
    const viewBox = svgElem.getAttribute('viewBox').split(' ');
    const viewBoxWidth = viewBox[2];
    const viewBoxHeight = viewBox[3];
    const widthRatio =  viewBoxWidth / window.innerWidth ;
    const heightRatio = viewBoxHeight / window.innerHeight;
    window.addEventListener('mousemove', (e) => {
        
        magnifierElem.style.transform = `translate(${e.clientX * widthRatio }px, ${e.clientY * heightRatio}px)`;
        maskElem.style.transform = `translate(${e.clientX * widthRatio}px, ${e.clientY * heightRatio}px)`;
    });
})();