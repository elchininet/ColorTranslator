import './styles.scss';

export default (ColorTranslator) => {

    const container = document.createElement('div');
    const hexColors = [
        '#FE2712', '#FE5409', '#FB9902',
        '#FABD03', '#FFFE32', '#D1EA2C',
        '#66B132', '#0392CE', '#0247FE',
        '#3D00A5', '#8601B0', '#A7194B'
    ];

    hexColors.forEach((color) => {

        const rgb = ColorTranslator.toRGB(color);
        const hsl = ColorTranslator.toHSL(color, { decimals: 0 });
        const hwb = ColorTranslator.toHWB(color, { decimals: 0 });
        const lab = ColorTranslator.toCIELab(color, { decimals: 0 });
        const lch = ColorTranslator.toLCH(color, { decimals: 0 });

        const rgbDiv = document.createElement('div');
        const hslDiv = document.createElement('div');
        const hwbDiv = document.createElement('div');
        const labDiv = document.createElement('div');
        const lchDiv = document.createElement('div');

        rgbDiv.style.backgroundColor = rgb;
        rgbDiv.textContent = rgb;

        hslDiv.style.backgroundColor = hsl;
        hslDiv.textContent = hsl;

        hwbDiv.style.backgroundColor = hwb;
        hwbDiv.textContent = hwb;

        labDiv.style.backgroundColor = lab;
        labDiv.textContent = lab;

        lchDiv.style.backgroundColor = lch;
        lchDiv.textContent = lch;

        container.appendChild(rgbDiv);
        container.appendChild(hslDiv);
        container.appendChild(hwbDiv);
        container.appendChild(labDiv);
        container.appendChild(lchDiv);

    });

    return container;

};