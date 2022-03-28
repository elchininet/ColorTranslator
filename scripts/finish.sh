#! /bin/sh

mkdir -p dist/web/

rm esm/index.d.ts
rm web/colortranslator.d.ts
cp web/colortranslator.js dist/web/colortranslator.js
echo '{\n    "type": "module"\n}' > esm/package.json
