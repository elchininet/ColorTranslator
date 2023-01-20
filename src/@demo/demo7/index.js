import './styles.scss';


export default (ColorTranslator) => {

    const container = document.createElement('div');

    const mixes = [
        '#FF0000',
        '#00FF00',
        '#0000FF',
        [1, 3],
        [1, 2],
        [2, 3],
        [1, 2, 3]
    ];

    const fillPlanes = () => {
        const planes = container.querySelectorAll('#planes path');
        planes.forEach((plane, index) => {
            let color = '#CCCCCC';
            if (typeof mixes[index] === 'string') {
                color = mixes[index];
            } else if(mixes[index]) {
                const colors = mixes[index].map((i) => mixes[i - 1]);
                color = mixes[index] = ColorTranslator.getMixHEX(colors);
            }
            plane.setAttribute('fill', color);
        });
    };

    fetch('images/color-mixes.svg')
        .then(result => result.text())
        .then((svgCode) => {
            container.innerHTML = svgCode;
            fillPlanes();
        });

    return container;

};