import './styles.scss';

export default (ColorTranslator) => {
    const container = document.createElement('div');
    const colors = ['red', 'lime', 'blue', 'aqua', 'yellow', 'fuchsia'];
    const total = colors.length;

    for (let row = 0; row < total; row++) {
        const hsl = ColorTranslator.toHSLObject(colors[row]);
        const step = hsl.S / (total - 1);

        for (let col = 0; col < total; col++) {
            const rgb = ColorTranslator.toHEX(hsl);
            const cmyk = ColorTranslator.toCMYKObject(hsl, { decimals: 0 });

            const box = document.createElement('div');
            box.classList.add('box');
            box.style.background = rgb;
            box.innerText = `C:${cmyk.C}
                             M:${cmyk.M}
                             Y:${cmyk.Y}
                             K:${cmyk.K}`;

            container.appendChild(box);

            hsl.S -= step;
        }
    }

    return container;
};
