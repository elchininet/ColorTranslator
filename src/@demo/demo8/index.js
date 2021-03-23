import './styles.scss';

export default (ColorTranslator, { Harmony }) => {

    const container = document.createElement('div');
    const base = '#F00';
    const harmonies = [
        { label: 'Complementary',       value: Harmony.COMPLEMENTARY },
        { label: 'Split Complementary', value: Harmony.SPLIT_COMPLEMENTARY },
        { label: 'Analogous',           value: Harmony.ANALOGOUS },
        { label: 'Triadic',             value: Harmony.TRIADIC },
        { label: 'Tetradic',            value: Harmony.TETRADIC },
        { label: 'Square',              value: Harmony.SQUARE }
    ];
    
    harmonies.forEach((item) => {

        const row = document.createElement('div');
        row.classList.add('row');

        const colors = ColorTranslator.getHarmony(base, item.value);

        colors.forEach((hex) => {
            const box = document.createElement('div');
            box.classList.add('box');
            box.style.background = hex;
            row.appendChild(box);
        });

        const label = document.createElement('div');
        label.classList.add('label');
        label.innerText = item.label;
        row.appendChild(label);

        container.appendChild(row);
    });

    return container;

};