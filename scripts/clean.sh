#! /bin/sh

RIMRAF="./node_modules/rimraf/dist/cjs/src/bin.js"

$RIMRAF dist/
$RIMRAF esm/
$RIMRAF web/
$RIMRAF index.d.ts
$RIMRAF index.js