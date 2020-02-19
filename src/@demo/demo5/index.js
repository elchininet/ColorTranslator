import './styles.scss';

export default (ColorTranslator) => {

    const container = document.createElement('div');

    for (let i = 0; i < 3; i++) {

        const blends = ColorTranslator.blendHEX('#FF0000', '#FFFF00', 3 + i * 3);

        blends.forEach(blend => {
            const box = document.createElement('div');
            box.classList.add('box', `file${i}`);
            box.style.background = blend;
            container.appendChild(box);
        });

    }

    return container;

};