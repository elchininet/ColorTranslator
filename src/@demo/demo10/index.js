import './styles.scss';

export default (ColorTranslator, { Harmony }) => {
    const container = document.createElement('div');

    const harmonies = [
        { label: 'Complementary', value: Harmony.COMPLEMENTARY },
        { label: 'Split Complementary', value: Harmony.SPLIT_COMPLEMENTARY },
        { label: 'Analogous', value: Harmony.ANALOGOUS },
        { label: 'Triadic', value: Harmony.TRIADIC },
        { label: 'Tetradic', value: Harmony.TETRADIC },
        { label: 'Square', value: Harmony.SQUARE }
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

        fetch('images/wheel-additive.svg')
            .then((result) => result.text())
            .then((svgCode) => {
                const harmonyColors = ColorTranslator.getHarmony(baseColor, item.value);
                const selector = 'path' + harmonyColors.map((color) => `:not([fill="${color}"])`).join('');
                wheel.innerHTML = svgCode;
                harmonyColors.forEach((hex) => (createElement('box', harmony).style.background = hex));
                wheel.querySelectorAll(selector).forEach((path) => path.setAttribute('fill-opacity', '0.25'));
            });
    };

    harmonies.forEach((item) => createHarmony(item));

    return container;
};
