#! /bin/sh

RIMRAF="./node_modules/rimraf/bin.js"

$RIMRAF dist/
$RIMRAF esm/
$RIMRAF web/
$RIMRAF index.d.ts
$RIMRAF index.js