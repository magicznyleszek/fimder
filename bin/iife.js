// -----------------------------------------------------------------------------
// node script for wraping a file in IIFE
// -----------------------------------------------------------------------------

const fs = require('fs');
const process = require('process');

const iifeStart = ';(function () {\n';
const iifeEnd = '})();\n';

// make sure file paramter given
const file = process.argv[2];
if (typeof file !== 'string') {
    throw new Error('Missing file parameter!');
}

const fileData = fs.readFileSync(file);
fs.writeFileSync(file, iifeStart + fileData + iifeEnd);

console.info('IIFE', file);
