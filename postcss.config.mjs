/** @type {import('postcss-load-config').Config} */

import postcssNested from 'postcss-nested';
import autoprefixer from 'autoprefixer';
import postcssSimpleVars from 'postcss-simple-vars';
import postcssCalc from 'postcss-calc';
import postcssFor from 'postcss-for';

export default {
  plugins: [
    postcssNested,
    autoprefixer,
    postcssSimpleVars,
    postcssCalc,
    postcssFor
  ]
};