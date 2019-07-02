import "../../node_modules/google-code-prettify/bin/run_prettify.min";
import "../../node_modules/google-code-prettify/bin/prettify.min.css";
import "../../node_modules/google-code-prettify/styles/desert.css";
import "./styles.css";
import { colortranslator } from "../colortranslator";
import demo1 from "./demo1";
import demo2 from "./demo2";
import demo3 from "./demo3";
import demo4 from "./demo4";

const functioToString = (fn) => {
    const article = document.createElement("article");
    const pre = document.createElement("pre");
    pre.classList.add("prettyprint");
    article.appendChild(pre);
    pre.innerHTML = fn;
    return article;
};

const demos = new Map([
    ["demo1", demo1],
    ["demo2", demo2],
    ["demo3", demo3],
    ["demo4", demo4]
]);

document.addEventListener("DOMContentLoaded", () => {
    demos.forEach((module, div) => {
        const cocontainer = document.getElementById(div);
        cocontainer.appendChild(module(colortranslator));
        cocontainer.appendChild(functioToString(module));
    });
});