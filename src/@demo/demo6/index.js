import './styles.scss';

export default (ColorTranslator) => {

    const container = document.createElement('div');

    const colors = ['#F00', '#FF8000', '#FF0', '#0F0', '#00F', '#AA00FF', '#FF00AA'];

    const createBox = (color, type) => {
        const box = document.createElement('div');
        box.classList.add('box');
        box.style.backgroundColor = color;
        if (type) box.dataset.type = type;
        container.appendChild(box);
    };

    colors.forEach((color) => {
        const shades = ColorTranslator.getShades(color, 3).reverse();
        const tints = ColorTranslator.getTints(color, 3);
        shades.forEach((shade) => createBox(shade, 'shade'));
        createBox(color);
        tints.forEach((tint) => createBox(tint, 'tint'));
    });

    return container;

};