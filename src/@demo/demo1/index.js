import './styles.scss';

export default (ColorTranslator) => {

    const container = document.createElement('div');
    const color = new ColorTranslator('hsl(180 100% 50%)', { decimals: 0 });

    for (let row = 0; row < 10; row++) {

        for (let col = 0; col < 10; col++) {

            color
                .setS(row * 10)
                .setL(col * 5 + 30);

            const box = document.createElement('div');

            box.classList.add('box');
            box.style.background = color.HEX;

            box.innerText =
                `R:${color.R}
                 G:${color.G}
                 B:${color.B}`;
            container.appendChild(box);

        }
    }

    return container;

};