import '../../node_modules/google-code-prettify/bin/run_prettify.min';
import '../../node_modules/google-code-prettify/bin/prettify.min.css';
import '../../node_modules/google-code-prettify/styles/desert.css';
import './styles.scss';
import { ColorTranslator, Harmony } from '../';
import demo1 from './demo1';
import demo2 from './demo2';
import demo3 from './demo3';
import demo4 from './demo4';
import demo5 from './demo5';
import demo6 from './demo6';

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
]);

document.addEventListener('DOMContentLoaded', () => {
    demos.forEach((module, div) => {
        const demo = document.getElementById(div);
        const container = document.createElement('div');
        const wrapper = document.createElement('div');
        
        container.classList.add('demo-container');
        wrapper.classList.add('demo-wrapper');

        wrapper.appendChild(module(ColorTranslator, Harmony));
        container.appendChild(wrapper);
        demo.appendChild(container);
        demo.appendChild(functioToString(module));
    });
});