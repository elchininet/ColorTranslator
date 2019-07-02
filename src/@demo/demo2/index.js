import "./styles.css";

export default (colortranslator) => {

    const container = document.createElement("div");
    const hsl = { h: 0, s: "100%", l: "50%" };
    const hue = [0, 30, 60, 120, 240, 280, 320, 0];
    let rainbow;

    for (let r = 0; r < hue.length; r++) {

        hsl.h = hue[r];

        const rgb = colortranslator.toHEX(hsl);
        const bow = document.createElement("div");
        bow.classList.add("rainbow");
        bow.style.background = rgb;

        if (rainbow) {
            rainbow.appendChild(bow);
        } else {
            container.appendChild(bow);
        }

        rainbow = bow;
    }

    rainbow.style.background = "#333";

    return container;

};