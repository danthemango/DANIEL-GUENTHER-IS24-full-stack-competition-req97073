// take object of products and replace all id strings
// with a newly generated product number
// usage: node productId2Num.js infile.json > outfile.json

function getRandomInt() {
  return Math.floor(Math.random() * (Number.MAX_SAFE_INTEGER - 10 + 1));
}

const filename = process.argv[2];
const products = require(filename)

const newObj = {};
Object.values(products).forEach(product => {
    let productId;
    do {
        productId = getRandomInt();
    } while(newObj[productId]);
    newObj[productId] = product;
});

console.log(JSON.stringify(newObj, null, 4));
