// convert json array into an object with keys
// specified by projectId
// usage: node productArr2obj.js infile.json > outfile.json

const filename = process.argv[2];
const products = require(filename)

const newObj = {};
products.forEach(product => {
    const productId = product.productId;
    delete product.productId;
    newObj[productId] = product;
})

console.log(JSON.stringify(newObj, null, 4));
