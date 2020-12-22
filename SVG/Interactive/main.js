(() => {
    const reactMonElem = document.querySelector('.react-mon');
    const targetPos = {x: 0, y: 0};
    const easeValue = 0.05;
    const reactMonInfo = {
        x: 0,
        y: 0,
    };

    window.addEventListener('mousemove', (e) => {
        targetPos.x = e.clientX - innerWidth * 0.5;
        targetPos.y = e.clientY - innerHeight * 0.5;
    });

    let dx;
    let dy;
    function render() {
        dx = targetPos.x - reactMonInfo.x;
        dy = targetPos.y - reactMonInfo.y;
        reactMonInfo.x = reactMonInfo.x + dx * easeValue;
        reactMonInfo.y = reactMonInfo.y + dy * easeValue;
        reactMonElem.style.transform = `translate3d(${reactMonInfo.x}px, ${reactMonInfo.y}px, 0px)`;
        requestAnimationFrame(render);
    }
    render();

})();