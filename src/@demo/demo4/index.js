import './styles.scss';

export default (ColorTranslator) => {

    const container = document.createElement('div');
    const colors = [
        'red',
        'lime',
        'blue',
        'aqua',
        'yellow',
        'fuchsia'
    ];
    const total = colors.length;

    for (let row = 0; row < total; row++) {

        const hsl = ColorTranslator.toHSL(colors[row], false, 0);
        const step = hsl.s / (total - 1);

        for (let col = 0; col < total; col++) {

            const rgb = ColorTranslator.toHEX(hsl, true, 0);
            const cmyk = ColorTranslator.toCMYK(hsl, false, 0);

            const box = document.createElement('div');
            box.classList.add('box');
            box.style.background = rgb;
            box.innerText = `C:${cmyk.c}
                             M:${cmyk.m}
                             Y:${cmyk.y}
                             K:${cmyk.k}`;

            container.appendChild(box);

            hsl.s -= step;

        }
    }

    return container;

};