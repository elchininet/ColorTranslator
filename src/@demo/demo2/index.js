import './styles.css';

export default (ColorTranslator) => {

    const container = document.createElement('div');
    const color = new ColorTranslator({ r: 255, g: 0, b: 0 });
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