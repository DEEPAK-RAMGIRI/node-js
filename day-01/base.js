const os = require('os')
const path = require('path')

// import os from 'os';
console.log(os.type())
console.log(os.version())
console.log(os.homedir())

console.log(__dirname);
console.log(__filename);

console.log(path.dirname(__filename))
console.log(path.basename(__filename))
console.log(path.extname(__filename))

const math = require('./math')
console.log(math.add(1,2));
console.log(math.sub(2,1));