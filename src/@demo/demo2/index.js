import './styles.scss';

export default (ColorTranslator) => {

    const container = document.createElement('div');
    const color = new ColorTranslator({ R: 255, G: 0, B: 0 });
    const hue = [0, 30, 60, 120, 240, 280, 320, 0];
    let rainbow;

    for (let r = 0; r < hue.length; r++) {

        color.setH(hue[r]);

        const bow = document.createElement('div');

        bow.classList.add('rainbow');
        bow.style.background = color.HEX;

        if (rainbow) {
            rainbow.appendChild(bow);
        } else {
            container.appendChild(bow);
        }

        rainbow = bow;
    }

    rainbow.style.background = '#333';

    return container;

};