import './styles.scss';

export default (ColorTranslator) => {

    const container = document.createElement('div');
    const rows = 11;
    const mult = 3;

    for (let i = 0; i < rows; i++) {

        const blends = ColorTranslator.blendHEX('#FF0000', '#FFFF00', mult + i * mult);

        blends.forEach((blend, index) => {
            const box = document.createElement('div');
            box.classList.add('box', `file${i}`);
            box.style.background = blend;
            box.innerText = index + 1;
            container.appendChild(box);
        });

    }

    return container;

};