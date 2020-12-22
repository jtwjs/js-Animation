(() => {
    window.addEventListener('DOMContentLoaded', () => {
        const rectElem = document.querySelector('.rect');
        const aniElem = document.querySelector('.ani');

        rectElem.addEventListener('click', () => {
            aniElem.beginElement();
        });
    })
})();