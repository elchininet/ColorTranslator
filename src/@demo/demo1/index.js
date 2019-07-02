import "./styles.css";

export default (colortranslator) => {

    const container = document.createElement("div");
    const hsl = { h: 180, s: "", l: "" };

    for (let row = 0; row < 10; row++) {

        for (let col = 0; col < 10; col++) {

            hsl.s = `${row * 10}%`;
            hsl.l = `${col * 5 + 30}%`;

            const rgb = colortranslator.toHEX(hsl);
            const code = colortranslator.toRGB(hsl, false);
            const box = document.createElement("div");

            box.classList.add("box");
            box.style.background = rgb;

            box.innerText =
                `R:${code.r}
                 G:${code.g}
                 B:${code.b}`;
            container.appendChild(box);

        }
    }

    return container;

};