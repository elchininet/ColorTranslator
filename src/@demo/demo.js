import '../../node_modules/google-code-prettify/bin/run_prettify.min.js';
import '../../node_modules/google-code-prettify/bin/prettify.min.css';
import '../../node_modules/google-code-prettify/styles/desert.css';
import 'whatwg-fetch';
import './styles.css';
import { ColorTranslator, Harmony, Mix } from '../index.ts';
import demo1 from './demo1/index.js';
import demo2 from './demo2/index.js';
import demo3 from './demo3/index.js';
import demo4 from './demo4/index.js';
import demo5 from './demo5/index.js';
import demo6 from './demo6/index.js';
import demo7 from './demo7/index.js';
import demo8 from './demo8/index.js';
import demo9 from './demo9/index.js';
import demo10 from './demo10/index.js';
import demo11 from './demo11/index.js';

const functioToString = (fn) => {
    const article = document.createElement('article');
    const pre = document.createElement('pre');
    article.classList.add('function-container');
    pre.classList.add('prettyprint');
    article.appendChild(pre);
    pre.innerHTML = fn.toString().replace('(ColorTranslator)', '()');
    return article;
};

const demos = new Map([
    ['demo1', demo1],
    ['demo2', demo2],
    ['demo3', demo3],
    ['demo4', demo4],
    ['demo5', demo5],
    ['demo6', demo6],
    ['demo7', demo7],
    ['demo8', demo8],
    ['demo9', demo9],
    ['demo10', demo10],
    ['demo11', demo11]
]);

document.addEventListener('DOMContentLoaded', () => {
    demos.forEach((module, div) => {
        const demo = document.getElementById(div);
        const container = document.createElement('div');
        const wrapper = document.createElement('div');

        container.classList.add('demo-container');
        wrapper.classList.add('demo-wrapper');

        wrapper.appendChild(module(ColorTranslator, { Harmony, Mix }));
        container.appendChild(wrapper);
        demo.appendChild(container);
        demo.appendChild(functioToString(module));
    });
});