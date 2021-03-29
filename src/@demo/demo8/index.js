import './styles.scss';

export default (ColorTranslator, { Harmony }) => {

    const container = document.createElement('div');

    const harmonies = [
        { label: 'Complementary',       value: Harmony.COMPLEMENTARY },
        { label: 'Split Complementary', value: Harmony.SPLIT_COMPLEMENTARY },
        { label: 'Analogous',           value: Harmony.ANALOGOUS },
        { label: 'Triadic',             value: Harmony.TRIADIC },
        { label: 'Tetradic',            value: Harmony.TETRADIC },
        { label: 'Square',              value: Harmony.SQUARE }
    ];

    const baseColor = '#F00';

    const createElement = (className, parent) => {
        const div = document.createElement('div');
        div.classList.add(className);
        parent.appendChild(div);
        return div;
    };

    const createHarmony = (item) => {

        const wrapper = createElement('wrapper', container);
        const wheel = createElement('wheel', wrapper);
        const harmony = createElement('harmony', wrapper);
        createElement('label', wrapper).innerText = item.label;

        fetch('images/color-wheel.svg')
            .then(result => result.text())
            .then((svgCode) => {
                wheel.innerHTML = svgCode;
                wheel.querySelectorAll('path').forEach((path) => {
                    const color = new ColorTranslator(baseColor).setH(30 * (+path.dataset.name - 1));
                    path.setAttribute('data-color', color.HEX);
                    path.setAttribute('fill', color.setL(70).setS(35).HEX);        
                });
                const harmonyColors = ColorTranslator.getHarmony(baseColor, item.value);
                harmonyColors.forEach((hex) => {
                    wheel.querySelector(`path[data-color="${hex}"]`).setAttribute('fill', hex);
                    createElement('box', harmony).style.background = hex;                    
                });
            });
            
    };

    harmonies.forEach((item) => createHarmony(item));

    return container;

};