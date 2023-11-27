import './styles.scss';

export default (ColorTranslator) => {
    const container = document.createElement('div');
    const hsl = { H: 0, S: '90%', L: '50%' };
    const hue = [undefined, 55, 30, 0, 290, 220, 130];
    const total = hue.length;

    for (let row = 0; row < total; row++) {
        for (let col = 0; col < total; col++) {
            let index = total - row + col;
            if (index >= total) {
                index -= total;
            }
            hsl.H = hue[index];
            const rgb = hue[index] === undefined ? '#FFF' : ColorTranslator.toHEX(hsl);
            const box = document.createElement('div');

            box.classList.add('flag');
            box.style.background = rgb;

            container.appendChild(box);
        }
    }

    return container;
};
